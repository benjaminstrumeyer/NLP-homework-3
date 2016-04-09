import {_EstimationMethod} from "./_EstimationMethod";
import {Corpus} from "../training/Corpus";

export class MaxLikelihoodEstimationMethod extends _EstimationMethod
{
    constructor(corpus:Corpus)
    {
        super(corpus);
    }

    public computeEmissionProbability(word:string, tag:string):number
    {
        var tagCount = this.countTag(tag);
        var emissionCount = this.countEmission(word, tag);

        return emissionCount / tagCount;
    }

    public computeTransitionProbability(prevTag:string, tag:string):number
    {
        var tagCount = this.countTag(prevTag);
        var transitionCount = this.countTransition(prevTag, tag);

        return transitionCount / tagCount;
    }
}