"use strict";
const FileWorker_1 = require("../FileWorker");
const PCFG_1 = require("../grammar/PCFG");
class GrammarBuilder {
    static buildGrammar() {
        var languageModel = GrammarBuilder.buildGrammarFromFile();
        if (!languageModel) {
            languageModel = GrammarBuilder.buildGrammarFromTrainingData();
        }
        return languageModel;
    }
    static buildGrammarFromTrainingData() {
        var trainingData = FileWorker_1.FileWorker.getTrainingTrees();
        var grammar = new PCFG_1.PCFG();
        grammar.train(trainingData);
        FileWorker_1.FileWorker.writeGrammarFile(grammar);
        console.log("\nGrammar built and written to file!\n");
        return grammar;
    }
    static buildGrammarFromFile() {
        var grammar = FileWorker_1.FileWorker.readGrammarFile();
        if (!grammar) {
            return null;
        }
        console.log("\nGrammar successfully read from file!\n");
        return grammar;
    }
}
exports.GrammarBuilder = GrammarBuilder;
