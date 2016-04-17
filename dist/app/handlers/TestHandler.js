"use strict";
const FileWorker_1 = require("../../core/FileWorker");
const TreeParser_1 = require("../../core/parsers/TreeParser");
const Preprocess_1 = require("../../core/Preprocess");
class TestHandler {
    static testTreePrint() {
        var trainTrees = FileWorker_1.FileWorker.readTextFile("./data/train.trees");
        var trees = Preprocess_1.Preprocess.getLines(trainTrees);
        for (let tree of trees) {
            let parsed = TreeParser_1.TreeParser.parseTree(tree);
            let deparsed = TreeParser_1.TreeParser.deparseTree(parsed);
            if (tree.trim() !== deparsed.trim()) {
                console.log(tree);
                console.log(deparsed);
            }
        }
    }
}
exports.TestHandler = TestHandler;
