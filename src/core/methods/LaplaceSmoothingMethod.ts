import {_EstimationMethod} from "./_EstimationMethod";
import {GrammarRule} from "../models/GrammarRule";

export class LaplaceSmoothingMethod extends _EstimationMethod
{
    private distinctCount:number;

    constructor(rules)
    {
        super(rules);

        this.distinctCount = this.rules.length;
    }

    private k = 1;

    public computeProbability(rule:GrammarRule):number
    {
        var ruleCount = rule.observationCount;

        var leftCount = this.rules
            .filter(x => x.left === rule.left)
            .map(x => x.observationCount)
            .reduce((x, y) => x + y);

        return (ruleCount + this.k) / (leftCount + this.distinctCount + this.k);
    }
}