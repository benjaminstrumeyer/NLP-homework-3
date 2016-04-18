import _ = require("lodash");
import {_GrammarBase} from "./_GrammarBase";
import {GrammarRule} from "../models/GrammarRule";

export class PCFG extends _GrammarBase
{
    public findRulesByRHS(RHS:string[]):GrammarRule[]
    {
        return this.rules.filter(rule => _.isEqual(RHS, rule.right));
    }
}