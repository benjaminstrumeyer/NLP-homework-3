import {_EstimationMethod} from "./_EstimationMethod";
import {Corpus} from "../training/Corpus";

export class LaplaceSmoothingMethod extends _EstimationMethod
{
    constructor(corpus:Corpus)
    {
        super(corpus);
    }

    private k = 1;

    public computeTagUnigramProbability(tag:string):number
    {
        var vocabLength = this.corpus.wordVocabulary.length;
        var unigramCount = this.countTag(tag);

        return (unigramCount + this.k) / (this.corpus.tokens.length + vocabLength + this.k);
    }

    public computeEmissionProbability(word:string, tag:string):number
    {
        var vocabLength = this.corpus.wordVocabulary.length;

        var tagCount = this.countTag(tag);
        var emissionCount = this.countEmission(word, tag);

        return (emissionCount + this.k) / (tagCount + vocabLength + this.k);
    }

    public computeTransitionProbability(prevTag:string, tag:string):number
    {
        var vocabLength = this.corpus.wordVocabulary.length;

        var tagCount = this.countTag(prevTag);
        var transitionCount = this.countTransition(prevTag, tag);

        return (transitionCount + this.k) / (tagCount + vocabLength + this.k);
    }
}