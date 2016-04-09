import {TransitionTuple} from "../models/TransitionTuple";
import {Corpus} from "../training/Corpus";

export abstract class _EstimationMethod
{
    public corpus:Corpus;

    constructor(corpus:Corpus)
    {
        this.corpus = corpus;
    }

    public countTag(tag:string):number
    {
        var gramTuple = this.corpus.tagUnigramTuples[tag];

        if(!gramTuple)
            return 0;

        return gramTuple.count;
    }

    public countTransition(prevTag:string, tag:string):number
    {
        var key = [prevTag,tag].toString();

        var gramTuple = this.corpus.transitionMatrix[key];

        if(!gramTuple)
            return 0;

        return gramTuple.count;
    }

    public countEmission(word:string, tag:string):number
    {
        var key = [word,tag].toString();

        var gramTuple = this.corpus.emissionMatrix[key];

        if(!gramTuple)
            return 0;

        return gramTuple.count;
    }

    public abstract computeEmissionProbability(word:string, tag:string):number;

    public abstract computeTransitionProbability(prevTag:string, tag:string):number;
}