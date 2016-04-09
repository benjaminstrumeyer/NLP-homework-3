"use strict";
class TreeNode {
    constructor(data, parent = null) {
        this.data = data;
        this.parent = parent;
        this.children = [];
    }
    isTerminal() {
        return this.children.length === 0;
    }
}
exports.TreeNode = TreeNode;
