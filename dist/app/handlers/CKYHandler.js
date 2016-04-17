"use strict";
const FileWorker_1 = require("../../core/FileWorker");
const Preprocess_1 = require("../../core/Preprocess");
const CKYParser_1 = require("../../core/parsers/CKYParser");
const _HandlerBase_1 = require("./_HandlerBase");
class CKYHandler {
    static parseTestText() {
        var testText = FileWorker_1.FileWorker.readTextFile("./data/test.txt");
        var lines = Preprocess_1.Preprocess.getLines(testText);
        var parsedTrees = [];
        for (let line of lines) {
            var parsedTree = this.parser.parse(line);
            parsedTrees.push(parsedTree);
        }
    }
}
CKYHandler.parser = new CKYParser_1.CKYParser(_HandlerBase_1._HandlerBase.grammar);
exports.CKYHandler = CKYHandler;
