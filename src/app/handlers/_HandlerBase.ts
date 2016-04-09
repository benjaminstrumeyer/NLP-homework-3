import {LanguageModelBuilder} from "../../core/builders/LanguageModelBuilder";
import {Preprocess} from "../../core/Preprocess";
import {FileWorker} from "../../core/FileWorker";

export class _HandlerBase
{
    public static languageModel = LanguageModelBuilder.buildLanguageModel();

    public static testCorpus = FileWorker.getTestCorpus();
}