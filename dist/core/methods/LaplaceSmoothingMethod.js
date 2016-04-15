"use strict";
const _EstimationMethod_1 = require("./_EstimationMethod");
class LaplaceSmoothingMethod extends _EstimationMethod_1._EstimationMethod {
    constructor(rules) {
        super(rules);
        this.k = 1;
        this.distinctCount = this.rules.length;
    }
    computeProbability(rule) {
        var ruleCount = rule.observationCount;
        var leftCount = this.rules
            .filter(x => x.left === rule.left)
            .map(x => x.observationCount)
            .reduce((x, y) => x + y);
        return (ruleCount + this.k) / (leftCount + this.distinctCount + this.k);
    }
}
exports.LaplaceSmoothingMethod = LaplaceSmoothingMethod;
