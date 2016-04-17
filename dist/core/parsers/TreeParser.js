"use strict";
const PCFGTree_1 = require("../models/PCFGTree");
const TreeNode_1 = require("../models/TreeNode");
class TreeParser {
    static parseTree(tree) {
        var nodeName = "";
        var currentNode;
        var pcfgTree = new PCFGTree_1.PCFGTree();
        for (let i = 0; i < tree.length; i++) {
            let currentChar = tree[i];
            if (currentChar === " ")
                continue;
            if (currentChar === "(") {
                let node = new TreeNode_1.TreeNode(nodeName, (currentNode || null));
                if (!currentNode) {
                    pcfgTree.root = node;
                }
                currentNode = node;
                nodeName = "";
            }
            else if (currentChar === ")") {
                if (nodeName)
                    new TreeNode_1.TreeNode(nodeName, currentNode);
                currentNode = currentNode.parent;
                nodeName = "";
            }
            else {
                nodeName += currentChar;
            }
        }
        return pcfgTree;
    }
    static deparseTree(tree) {
        var deparseTreeNode = function (node) {
            var result = node.data;
            if (node.isTerminal())
                return result;
            result += "(";
            var deparsedChildren = [];
            for (let child of node.children) {
                deparsedChildren.push(this.deparseTreeNode(child));
            }
            result += deparsedChildren.join(" ");
            result += ")";
            return result;
        };
        return deparseTreeNode(tree.root);
    }
}
exports.TreeParser = TreeParser;
