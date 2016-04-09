import {FileWorker} from "../../core/FileWorker";
import {Preprocess} from "../../core/Preprocess";
import {LanguageModelBuilder} from "../../core/builders/LanguageModelBuilder";
import {_HandlerBase} from "./_HandlerBase";

export class LanguageModelHandler
{
    public static rebuild()
    {
        _HandlerBase.languageModel = LanguageModelBuilder.buildLanguageModelFromTrainingData();
    }
}