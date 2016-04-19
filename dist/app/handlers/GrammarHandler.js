"use strict";
const GrammarBuilder_1 = require("../../core/builders/GrammarBuilder");
const _HandlerBase_1 = require("./_HandlerBase");
class GrammarHandler {
    static rebuild() {
        _HandlerBase_1._HandlerBase.grammar = GrammarBuilder_1.GrammarBuilder.buildGrammarFromTrainingData();
    }
    static getTop(count) {
        var grammar = _HandlerBase_1._HandlerBase.grammar;
        var top = grammar.rules
            .sort((x, y) => y.observationCount - x.observationCount)
            .slice(0, count || 10)
            .map(rule => rule.toString())
            .reduce((x, y) => x + "\n" + y);
        console.log("\n" + top + "\n");
    }
}
exports.GrammarHandler = GrammarHandler;
