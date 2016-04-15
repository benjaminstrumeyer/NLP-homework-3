"use strict";
const _EstimationMethod_1 = require("./_EstimationMethod");
class LaplaceSmoothingMethod extends _EstimationMethod_1._EstimationMethod {
    constructor(rules) {
        super(rules);
        this.k = 1;
    }
    computeProbability(rule) {
        var ruleCount = rule.observationCount;
        var totalCount = this.rules.reduce((x, y) => x + y.observationCount);
        var distinctCount = this.rules.length;
        return (ruleCount + this.k) / (totalCount + distinctCount + this.k);
    }
}
exports.LaplaceSmoothingMethod = LaplaceSmoothingMethod;
