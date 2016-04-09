"use strict";
const FileWorker_1 = require("../../core/FileWorker");
const TreeParser_1 = require("../../core/parsers/TreeParser");
class TestHandler {
    static testTreePrint() {
        var trainTrees = FileWorker_1.FileWorker.readTextFile("./data/train.trees");
        var trees = trainTrees.split(/\n/g);
        let parsed = TreeParser_1.TreeParser.parseTree(trees[1]);
        console.log(parsed.toString());
    }
}
exports.TestHandler = TestHandler;
