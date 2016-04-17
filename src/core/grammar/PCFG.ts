import _ = require("lodash");
import {_GrammarBase} from "./_GrammarBase";
import {GrammarRule} from "../models/GrammarRule";

export class PCFG extends _GrammarBase
{
    public findRuleByRHS(RHS:string[]):GrammarRule
    {
        for (let rule of this.rules)
        {
            if (_.isEqual(RHS, rule.right))
            {
                return rule;
            }
        }

        // Return null if no rules match
        return null;
    }
}