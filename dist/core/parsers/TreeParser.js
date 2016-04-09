"use strict";
const PCFG_1 = require("../models/PCFG");
const TreeNode_1 = require("../models/TreeNode");
class TreeParser {
    static parseTree(tree) {
        var nodeName = "";
        var currentNode;
        var pcfgTree = new PCFG_1.PCFG();
        for (let i = 0; i < tree.length; i++) {
            let currentChar = tree[i];
            if (currentChar === " ") {
                continue;
            }
            if (currentChar === "(") {
                let node = new TreeNode_1.TreeNode(nodeName, (currentNode || null));
                if (!currentNode) {
                    pcfgTree.root = node;
                }
                currentNode = node;
                nodeName = "";
            }
            else if (currentChar === ")") {
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
}
exports.TreeParser = TreeParser;
