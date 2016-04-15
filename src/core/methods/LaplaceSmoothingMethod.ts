import {_EstimationMethod} from "./_EstimationMethod";
import {GrammarRule} from "../models/GrammarRule";

export class LaplaceSmoothingMethod extends _EstimationMethod
{
    constructor(rules)
    {
        super(rules);
    }

    private k = 1;

    public computeProbability(rule:GrammarRule):number
    {
        var ruleCount = rule.observationCount;

        var totalCount = this.rules
            .map(x => x.observationCount)
            .reduce((x,y) => x + y);

        var distinctCount = this.rules.length;

        return (ruleCount + this.k) / (totalCount + distinctCount + this.k);
    }
}