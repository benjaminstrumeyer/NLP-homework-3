"use strict";
class PCFGTree {
    constructor() {
        this.toString = function () {
            if (!this.root)
                return null;
            return this.root.toString();
        };
    }
}
exports.PCFGTree = PCFGTree;
