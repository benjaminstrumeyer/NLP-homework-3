"use strict";
const _ = require("lodash");
const _GrammarBase_1 = require("./_GrammarBase");
class PCFG extends _GrammarBase_1._GrammarBase {
    findRulesByRHS(RHS) {
        return this.rules.filter(rule => _.isEqual(RHS, rule.right));
    }
}
exports.PCFG = PCFG;
