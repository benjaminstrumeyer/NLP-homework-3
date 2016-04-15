import {_EstimationMethod} from "./_EstimationMethod";
import {GrammarRule} from "../models/GrammarRule";

export class LaplaceSmoothingMethod extends _EstimationMethod
{
    private totalCount:number;
    private distinctCount:number;

    constructor(rules)
    {
        super(rules);

        this.totalCount = this.rules
            .map(x => x.observationCount)
            .reduce((x,y) => x + y);

        this.distinctCount = this.rules.length;
    }

    private k = 1;

    public computeProbability(rule:GrammarRule):number
    {
        var ruleCount = rule.observationCount;

        return (ruleCount + this.k) / (this.totalCount + this.distinctCount + this.k);
    }
}