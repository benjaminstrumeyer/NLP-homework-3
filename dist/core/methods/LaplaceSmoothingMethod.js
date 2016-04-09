"use strict";
const _EstimationMethod_1 = require("./_EstimationMethod");
class LaplaceSmoothingMethod extends _EstimationMethod_1._EstimationMethod {
    constructor(corpus) {
        super(corpus);
        this.k = 1;
    }
}
exports.LaplaceSmoothingMethod = LaplaceSmoothingMethod;
