import {GrammarRule} from "../models/GrammarRule";

export abstract class _EstimationMethod
{
    protected rules:GrammarRule[];

    constructor(rules)
    {
        this.rules = rules;
    }

    abstract computeProbability(rule:GrammarRule):number;
}