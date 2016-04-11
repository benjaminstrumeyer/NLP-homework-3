"use strict";
const GrammarBuilder_1 = require("../../core/builders/GrammarBuilder");
const _HandlerBase_1 = require("./_HandlerBase");
class GrammarHandler {
    static rebuild() {
        _HandlerBase_1._HandlerBase.grammar = GrammarBuilder_1.GrammarBuilder.buildGrammarFromTrainingData();
    }
}
exports.GrammarHandler = GrammarHandler;
