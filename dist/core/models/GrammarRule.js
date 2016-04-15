"use strict";
class GrammarRule {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.observationCount = 1;
    }
    toString() {
        var ruleString = `${this.left} => ${this.right}`;
        return `(${this.observationCount})\t${ruleString}\t\t\t${this.probability}`;
    }
    equals(otherRule) {
        return (this.left === otherRule.left) && (this.right === otherRule.right);
    }
}
exports.GrammarRule = GrammarRule;
