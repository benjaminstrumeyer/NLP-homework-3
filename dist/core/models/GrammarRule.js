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
        var ruleString = `${this.left} => ${this.right.join(" ")}`;
        return `(${this.observationCount})\t${ruleString}\t\t\t${this.probability}`;
    }
    equals(otherRule) {
        return (this.left === otherRule.left) &&
            _.isEqual(this.right, otherRule.right);
    }
}
exports.GrammarRule = GrammarRule;
