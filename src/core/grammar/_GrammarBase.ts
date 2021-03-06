import _ = require("lodash");
import ProgressBar = require("progress");

import {GrammarRule} from "../models/GrammarRule";
import {TreeParser} from "../parsers/TreeParser";
import {PCFGTree} from "../models/PCFGTree";
import {TreeNode} from "../models/TreeNode";
import {Preprocess} from "../Preprocess";
import {LaplaceSmoothingMethod} from "../methods/LaplaceSmoothingMethod";

export abstract class _GrammarBase
{
    public rules:GrammarRule[];

    public train(unparsedTrees:string)
    {
        var treeLines = Preprocess.getLines(unparsedTrees);

        var progressBar = new ProgressBar("Building grammar from test.trees for :elapseds [:bar] :percent",
            {
                total: treeLines.length,
                width: 50,
                complete: "#"
            });

        var allRules = [];
        for (let tree of treeLines)
        {
            let parsedTree = TreeParser.parseTree(tree);
            let rules = this.convertTreeToRules(parsedTree);

            allRules = allRules.concat(rules);

            progressBar.tick()
        }

        // Get the unique rules from the parsed rules
        var uniqueRules = _.uniqWith(allRules, (x, y) =>
        {
            var isEqual = x.equals(y);

            if(isEqual)
            {
                x.observationCount++;
                y.observationCount++;
            }

            return isEqual;
        });

        this.rules = uniqueRules;

        // Compute the probabilities
        this.computeProbabilitiesOfRules();
    }

    private computeProbabilitiesOfRules()
    {
        var rules = this.rules;
        var laplaceMethod = new LaplaceSmoothingMethod(rules);

        var progressBar = new ProgressBar("Computing probabilities for rules for :elapseds [:bar] :percent",
            {
                total: rules.length,
                width: 50,
                complete: "#"
            });

        for (let rule of rules)
        {
            rule.probability = laplaceMethod.computeProbability(rule);

            progressBar.tick()
        }
    }

    private convertTreeToRules(tree:PCFGTree):GrammarRule[]
    {
        var root = tree.root;

        return this.parseTreeNodes(root);
    }

    private parseTreeNodes(node:TreeNode):GrammarRule[]
    {
        if (node.isTerminal())
            return [];

        var rules:GrammarRule[] = [];

        var left = node.data;
        var right = node.children.map(child => child.data) as string[];

        rules.push(new GrammarRule(left, right));

        var childrenRules = node.children
            .map(child => this.parseTreeNodes(child))
            .reduce((left, right) => left.concat(right));

        return rules.concat(childrenRules);
    }
}