"use strict";
const _ = require("lodash");
class GrammarRule {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.observationCount = 1;
    }
    isBinary() {
        return this.right.length === 2;
    }
    isUnary() {
        return this.right.length === 1;
    }
    toString() {
        var ruleString = `${this.left} => ${this.right.join(" ")}`;
        return `(${this.observationCount})\t${ruleString}\t\t\t${this.probability}`;
    }
    equals(otherRule) {
        return (this.left === otherRule.left) &&
            _.isEqual(this.right.sort(), otherRule.right.sort());
    }
}
exports.GrammarRule = GrammarRule;
