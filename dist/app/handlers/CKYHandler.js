"use strict";
const FileWorker_1 = require("../../core/FileWorker");
const Preprocess_1 = require("../../core/Preprocess");
const CKYParser_1 = require("../../core/parsers/CKYParser");
const _HandlerBase_1 = require("./_HandlerBase");
const TreeParser_1 = require("../../core/parsers/TreeParser");
class CKYHandler {
    static parseTestText() {
        var testText = FileWorker_1.FileWorker.readTextFile("./data/test.txt");
        var lines = Preprocess_1.Preprocess.getLines(testText);
        var parsedTrees = [];
        for (let line of lines) {
            var parsedTree = this.parser.parse(line);
            var parsedTreeString = TreeParser_1.TreeParser.deparseTree(parsedTree);
            parsedTrees.push(parsedTreeString);
        }
        var parsedText = parsedTrees.join("\n");
        FileWorker_1.FileWorker.writeTextFile("./output/parsed.trees", parsedText);
    }
}
CKYHandler.parser = new CKYParser_1.CKYParser(_HandlerBase_1._HandlerBase.grammar);
exports.CKYHandler = CKYHandler;
