"use strict";
class PCFGTree {
    constructor(root) {
        this.toString = function () {
            if (!this.root)
                return null;
            return this.root.toString();
        };
        this.root = root;
    }
}
exports.PCFGTree = PCFGTree;
