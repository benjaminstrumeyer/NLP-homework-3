"use strict";
class TreeNode {
    constructor(data, parent = null) {
        this.data = data;
        this.parent = parent;
        this.children = [];
        if (parent) {
            parent.children.push(this);
        }
    }
    isTerminal() {
        return this.children.length === 0;
    }
}
exports.TreeNode = TreeNode;
