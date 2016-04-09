"use strict";
const LanguageModelBuilder_1 = require("../../core/builders/LanguageModelBuilder");
const FileWorker_1 = require("../../core/FileWorker");
class _HandlerBase {
}
_HandlerBase.languageModel = LanguageModelBuilder_1.LanguageModelBuilder.buildLanguageModel();
_HandlerBase.testCorpus = FileWorker_1.FileWorker.getTestCorpus();
exports._HandlerBase = _HandlerBase;
