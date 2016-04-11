"use strict";
class GrammarRule {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    toString() {
        return `${this.left} => ${this.right.reduce((x, y) => x + " | " + y)}`;
    }
}
exports.GrammarRule = GrammarRule;
