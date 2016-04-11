"use strict";
const GrammarRule_1 = require("../models/GrammarRule");
const TreeParser_1 = require("../parsers/TreeParser");
class _GrammarBase {
    train(unparsedTrees) {
        var treeLines = unparsedTrees.split(/\n/g);
        let parsedTree = TreeParser_1.TreeParser.parseTree(treeLines[0]);
        let rules = this.convertTreeToRules(parsedTree);
        this.rules = rules;
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
