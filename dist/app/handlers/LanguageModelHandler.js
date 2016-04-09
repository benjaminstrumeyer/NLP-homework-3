"use strict";
const LanguageModelBuilder_1 = require("../../core/builders/LanguageModelBuilder");
const _HandlerBase_1 = require("./_HandlerBase");
class LanguageModelHandler {
    static rebuild() {
        _HandlerBase_1._HandlerBase.languageModel = LanguageModelBuilder_1.LanguageModelBuilder.buildLanguageModelFromTrainingData();
    }
}
exports.LanguageModelHandler = LanguageModelHandler;
