"use strict";
const FileWorker_1 = require("../../core/FileWorker");
const Preprocess_1 = require("../../core/Preprocess");
const _HandlerBase_1 = require("./_HandlerBase");
const CKYParser_1 = require("../../core/parsers/CKYParser");
class TestHandler {
    static test() {
        var testText = FileWorker_1.FileWorker.readTextFile("./data/test.txt");
        var lines = Preprocess_1.Preprocess.getLines(testText);
        var parsedTree = TestHandler.parser.parse(lines[0]);
        console.log(parsedTree.toString());
    }
}
TestHandler.parser = new CKYParser_1.CKYParser(_HandlerBase_1._HandlerBase.grammar);
exports.TestHandler = TestHandler;
