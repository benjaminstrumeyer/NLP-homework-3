"use strict";
const FileWorker_1 = require("../FileWorker");
const PCFG_1 = require("../grammar/PCFG");
const GrammarRule_1 = require("../models/GrammarRule");
class GrammarBuilder {
    static buildGrammar() {
        var grammar = GrammarBuilder.buildGrammarFromFile();
        if (!grammar) {
            grammar = GrammarBuilder.buildGrammarFromTrainingData();
        }
        return grammar;
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
        var newGrammar = new PCFG_1.PCFG();
        Object.assign(newGrammar, grammar);
        for (let i = 0; i < newGrammar.rules.length; i++) {
            let rule = newGrammar.rules[i];
            let newRule = new GrammarRule_1.GrammarRule(rule.left, rule.right);
            Object.assign(newRule, rule);
            newGrammar.rules[i] = newRule;
        }
        console.log("\nGrammar successfully read from file!\n");
        return newGrammar;
    }
}
exports.GrammarBuilder = GrammarBuilder;
