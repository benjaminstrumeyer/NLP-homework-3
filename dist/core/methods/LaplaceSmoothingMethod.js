"use strict";
const _EstimationMethod_1 = require("./_EstimationMethod");
class LaplaceSmoothingMethod extends _EstimationMethod_1._EstimationMethod {
    constructor(rules) {
        super(rules);
        this.k = 1;
        this.totalCount = this.rules
            .map(x => x.observationCount)
            .reduce((x, y) => x + y);
        this.distinctCount = this.rules.length;
    }
    computeProbability(rule) {
        var ruleCount = rule.observationCount;
        return (ruleCount + this.k) / (this.totalCount + this.distinctCount + this.k);
    }
}
exports.LaplaceSmoothingMethod = LaplaceSmoothingMethod;
