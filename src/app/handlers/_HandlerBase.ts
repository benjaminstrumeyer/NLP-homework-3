import {LanguageModel} from "../../core/training/LanguageModel";
import {LanguageModelBuilder} from "../../core/builders/LanguageModelBuilder";
import {EvaluatorHandler} from "./EvaluatorHandler";
import {TagParser} from "../../core/parsers/TagParser";
import {Preprocess} from "../../core/Preprocess";
import {FileWorker} from "../../core/FileWorker";
import {FrequencyBasedTagger} from "../../core/taggers/FrequencyBasedTagger";
import {HMMTagger} from "../../core/taggers/HMMTagger";
import {WordTagPair} from "../../core/models/WordTagPair";

export class _HandlerBase
{
    public static languageModel = LanguageModelBuilder.buildLanguageModel();

    public static testCorpus = FileWorker.getTestCorpus();

    public static frequencyBasedTagger = new FrequencyBasedTagger(_HandlerBase.languageModel);
    public static hmmTagger = new HMMTagger(_HandlerBase.languageModel);

    private static _testCorpusSequences:WordTagPair[][];
    private static _fbtPredictedSequences:WordTagPair[][];
    private static _hmmPredictedSequences:WordTagPair[][];

    public static get testCorpusSequences():WordTagPair[][]
    {
        // If we did this, no need
        if (_HandlerBase._testCorpusSequences)
            return _HandlerBase._testCorpusSequences;

        var sentences = Preprocess.getSentences(_HandlerBase.testCorpus);

        _HandlerBase._testCorpusSequences = sentences
            .map(sentence =>
            {
                var tokens = Preprocess.tokenize(sentence);

                // Return without the start tag
                return TagParser.parseTokens(tokens).slice(1);
            });

        return _HandlerBase._testCorpusSequences;
    }

    public static get testCorpusPairs():WordTagPair[]
    {
        return _HandlerBase.testCorpusSequences
            .reduce((prev, next) =>
            {
                return prev.concat(next);
            });
    }

    public static get fbtPredictedSequences():WordTagPair[][]
    {
        // If we did this, no need
        if (_HandlerBase._fbtPredictedSequences)
            return _HandlerBase._fbtPredictedSequences;

        console.log("\nRunning Frequency Based Tagger on the test data...");

        _HandlerBase._fbtPredictedSequences = _HandlerBase.frequencyBasedTagger
            .predictTagsForCorpus(_HandlerBase.testCorpus);

        return _HandlerBase._fbtPredictedSequences;
    }

    public static get hmmPredictedSequences():WordTagPair[][]
    {
        // If we did this, no need
        if (_HandlerBase._hmmPredictedSequences)
            return _HandlerBase._hmmPredictedSequences;

        console.log("\nRunning HMM Tagger on the test data...");

        _HandlerBase._hmmPredictedSequences = _HandlerBase.hmmTagger
            .predictTagsForCorpus(_HandlerBase.testCorpus);

        return _HandlerBase._hmmPredictedSequences;
    }
}