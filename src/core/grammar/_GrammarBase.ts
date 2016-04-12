import _ = require("lodash");

import {GrammarRule} from "../models/GrammarRule";
import {TreeParser} from "../parsers/TreeParser";
import {PCFGTree} from "../models/PCFGTree";
import {TreeNode} from "../models/TreeNode";
import {Preprocess} from "../Preprocess";

export abstract class _GrammarBase
{
    public rules:GrammarRule[];

    public train(unparsedTrees:string)
    {
        var treeLines = Preprocess.getTreeLines(unparsedTrees);

        var allRules = [];
        for (let tree of treeLines)
        {
            let parsedTree = TreeParser.parseTree(tree);
            let rules = this.convertTreeToRules(parsedTree);

            allRules = allRules.concat(rules);
        }

        // Get the unique rules from the parsed rules
        var uniqueRules = _.uniqWith(allRules, (x, y) =>
        {
            var isEqual = x.isEqual(y);
            
            if(isEqual)
            {
                x.observationCount++;
                y.observationCount++;
            }

            return isEqual;
        });

        this.rules = uniqueRules;

        console.log(
            this.rules
                .sort((x,y) => y.observationCount - x.observationCount)
                .map(x => x.toString())
                .reduce((x,y) => x+"\n"+y)
        );
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
        var right = node.children.map(child => child.data);

        rules.push(new GrammarRule(left, right));

        var childrenRules = node.children
            .map(child => this.parseTreeNodes(child))
            .reduce((left, right) => left.concat(right));

        return rules.concat(childrenRules);
    }
}