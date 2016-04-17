"use strict";
const _GrammarBase_1 = require("./_GrammarBase");
class PCFG extends _GrammarBase_1._GrammarBase {
    findRuleByRHS(RHS) {
        var matchedRule = null;
        var rules = this.rules;
        for (let i = 0; i < rules.length; i++) {
            if (RHS === rules[i].right) {
                matchedRule = rules[i];
            }
        }
        return matchedRule;
    }
}
exports.PCFG = PCFG;
