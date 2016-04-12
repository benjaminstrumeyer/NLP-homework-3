"use strict";
const _ = require("lodash");
class GrammarRule {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.observationCount = 1;
    }
    toString() {
        return `(${this.observationCount})\t ${this.left} => ${this.right.reduce((x, y) => x + " | " + y)}`;
    }
    isEqual(otherRule) {
        return (this.left === otherRule.left) &&
            _.isEqual(this.right.sort(), otherRule.right.sort());
    }
}
exports.GrammarRule = GrammarRule;
