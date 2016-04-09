"use strict";
const FileWorker_1 = require("../FileWorker");
class LanguageModelBuilder {
    static buildLanguageModel() {
        var languageModel = LanguageModelBuilder.buildLanguageModelFromFile();
        if (!languageModel) {
            languageModel = LanguageModelBuilder.buildLanguageModelFromTrainingData();
        }
        return languageModel;
    }
    static buildLanguageModelFromTrainingData() {
        var trainingData = FileWorker_1.FileWorker.getTrainingCorpus();
        var languageModel = new LanguageModel();
        languageModel.train(trainingData);
        FileWorker_1.FileWorker.writeLanguageModelFile(languageModel);
        console.log("\nLanguage Model built and written to file!\n");
        return languageModel;
    }
    static buildLanguageModelFromFile() {
        var corpus = FileWorker_1.FileWorker.readLanguageModelFile();
        if (!corpus) {
            return null;
        }
        var languageModel = new LanguageModel();
        languageModel.corpus = corpus;
        languageModel.instantiateMethods();
        console.log("\nLanguage Model successfully read from file!\n");
        return languageModel;
    }
}
exports.LanguageModelBuilder = LanguageModelBuilder;
