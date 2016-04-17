"use strict";
const _ = require("lodash");
const _GrammarBase_1 = require("./_GrammarBase");
class PCFG extends _GrammarBase_1._GrammarBase {
    findRuleByRHS(RHS) {
<<<<<<< HEAD
        for (let rule of this.rules) {
            if (_.isEqual(RHS, rule.right)) {
                return rule;
            }
        }
=======
>>>>>>> feature/CKYHandler
        return null;
    }
}
exports.PCFG = PCFG;
