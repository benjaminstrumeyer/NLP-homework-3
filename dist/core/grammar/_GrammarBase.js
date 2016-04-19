"use strict";
const _ = require("lodash");
const ProgressBar = require("progress");
const GrammarRule_1 = require("../models/GrammarRule");
const TreeParser_1 = require("../parsers/TreeParser");
const Preprocess_1 = require("../Preprocess");
const LaplaceSmoothingMethod_1 = require("../methods/LaplaceSmoothingMethod");
class _GrammarBase {
    train(unparsedTrees) {
        var treeLines = Preprocess_1.Preprocess.getLines(unparsedTrees);
        var progressBar = new ProgressBar("Building grammar from test.trees for :elapseds [:bar] :percent", {
            total: treeLines.length,
            width: 50,
            complete: "#"
        });
        var allRules = [];
        for (let tree of treeLines) {
            let parsedTree = TreeParser_1.TreeParser.parseTree(tree);
            let rules = this.convertTreeToRules(parsedTree);
            allRules = allRules.concat(rules);
            progressBar.tick();
        }
        var uniqueRules = _.uniqWith(allRules, (x, y) => {
            var isEqual = x.equals(y);
            if (isEqual) {
                x.observationCount++;
                y.observationCount++;
            }
            return isEqual;
        });
        this.rules = uniqueRules;
        this.computeProbabilitiesOfRules();
    }
    computeProbabilitiesOfRules() {
        var rules = this.rules;
        var laplaceMethod = new LaplaceSmoothingMethod_1.LaplaceSmoothingMethod(rules);
        var progressBar = new ProgressBar("Computing probabilities for rules for :elapseds [:bar] :percent", {
            total: rules.length,
            width: 50,
            complete: "#"
        });
        for (let rule of rules) {
            rule.probability = laplaceMethod.computeProbability(rule);
            progressBar.tick();
        }
    }
    convertTreeToRules(tree) {
        var root = tree.root;
        return this.parseTreeNodes(root);
    }
    parseTreeNodes(node) {
        if (node.isTerminal())
            return [];
        var rules = [];
        var left = node.data;
        var right = node.children.map(child => child.data);
        rules.push(new GrammarRule_1.GrammarRule(left, right));
        var childrenRules = node.children
            .map(child => this.parseTreeNodes(child))
            .reduce((left, right) => left.concat(right));
        return rules.concat(childrenRules);
    }
}
exports._GrammarBase = _GrammarBase;
