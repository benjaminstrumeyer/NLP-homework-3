"use strict";
class TreeNode {
    constructor(data, parent) {
        this.toString = function (depth) {
            depth = depth || 0;
            var result = "";
            if (depth > 0) {
                for (let i = 0; i < depth - 1; i++) {
                    result += "| ";
                }
                result += "|-";
            }
            result += this.data + "\n";
            for (let child of this.children) {
                result += child.toString(depth + 1);
            }
            return result;
        };
        this.data = data;
        this.parent = parent;
        this.children = [];
        if (parent) {
            parent.children.push(this);
        }
    }
    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }
    addChildren(...nodes) {
        for (let node of nodes) {
            this.addChild(node);
        }
    }
    isTerminal() {
        return this.children.length === 0;
    }
}
exports.TreeNode = TreeNode;
