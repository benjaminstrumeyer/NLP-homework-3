import {_GrammarBase} from "./_GrammarBase";
import {GrammarRule} from "../models/GrammarRule";

export class PCFG extends _GrammarBase
{
    public findRuleByRHS(RHS:string[]):GrammarRule
    {
        // Find LHS given the RHS
        // Loop through this.rules

        var matchedRule:GrammarRule = null;
        var rules = this.rules;

        for (let i = 0; i < rules.length; i++)
        {
            if (RHS === rules[i].right) {
                matchedRule = rules[i];
            }
        }

        // Return null if no rules match
        return matchedRule;
    }
}