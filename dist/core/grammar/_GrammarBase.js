"use strict";
const _ = require("lodash");
const GrammarRule_1 = require("../models/GrammarRule");
const TreeParser_1 = require("../parsers/TreeParser");
const Preprocess_1 = require("../Preprocess");
class _GrammarBase {
    train(unparsedTrees) {
        var treeLines = Preprocess_1.Preprocess.getTreeLines(unparsedTrees);
        var allRules = [];
        for (let tree of treeLines) {
            let parsedTree = TreeParser_1.TreeParser.parseTree(tree);
            let rules = this.convertTreeToRules(parsedTree);
            allRules = allRules.concat(rules);
        }
        var uniqueRules = _.uniqWith(allRules, (x, y) => {
            var isEqual = x.isEqual(y);
            if (isEqual) {
                x.observationCount++;
                y.observationCount++;
            }
            return isEqual;
        });
        this.rules = uniqueRules;
        console.log(this.rules.map(x => x.toString()));
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
