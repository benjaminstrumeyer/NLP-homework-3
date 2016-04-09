"use strict";
const PCFG_1 = require("../../core/models/PCFG");
const TreeNode_1 = require("../../core/models/TreeNode");
class TestHandler {
    static testTreePrint() {
        var tree = new PCFG_1.PCFG();
        tree.root = new TreeNode_1.TreeNode("TOP");
        tree.root.children.push(new TreeNode_1.TreeNode("SQ"), new TreeNode_1.TreeNode("PUNC"));
        var result = tree.toString();
        console.log(result);
    }
}
exports.TestHandler = TestHandler;
