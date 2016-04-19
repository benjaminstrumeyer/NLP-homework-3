"use strict";
const _ = require("lodash");
class GrammarRule {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.observationCount = 1;
    }
    isUnary() {
        return this.right.length === 1;
    }
    isBinary() {
        return this.right.length === 2;
    }
    toString() {
        return `${this.left} => ${this.right.join(" ")}`;
    }
    equals(otherRule) {
        return (this.left === otherRule.left) &&
            _.isEqual(this.right, otherRule.right);
    }
}
exports.GrammarRule = GrammarRule;
