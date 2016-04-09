import {FileWorker} from "../FileWorker";
import {LanguageModel} from "../training/LanguageModel";

export class LanguageModelBuilder
{
    public static buildLanguageModel():LanguageModel
    {
        // Try to read from file, otherwise build from training data
        var languageModel = LanguageModelBuilder.buildLanguageModelFromFile();
        if (!languageModel)
        {
            // Build from training data
            languageModel = LanguageModelBuilder.buildLanguageModelFromTrainingData();
        }

        return languageModel;
    }

    public static buildLanguageModelFromTrainingData():LanguageModel
    {
        // Get training data
        var trainingData = FileWorker.getTrainingCorpus();

        // Train language model with training data
        var languageModel = new LanguageModel();
        languageModel.train(trainingData);

        // Write the built model to file
        FileWorker.writeLanguageModelFile(languageModel);

        console.log("\nLanguage Model built and written to file!\n");

        return languageModel;
    }

    public static buildLanguageModelFromFile():LanguageModel
    {
        // Try to read from the language model file, return null if file not found
        var corpus = FileWorker.readLanguageModelFile();
        if (!corpus)
        {
            return null;
        }

        var languageModel = new LanguageModel();
        languageModel.corpus = corpus;
        languageModel.instantiateMethods();

        console.log("\nLanguage Model successfully read from file!\n");

        return languageModel;
    }
}