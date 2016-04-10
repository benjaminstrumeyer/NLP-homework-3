"use strict";
const FileWorker_1 = require("../../core/FileWorker");
const TreeParser_1 = require("../../core/parsers/TreeParser");
class TestHandler {
    static testTreePrint() {
        var trainTrees = FileWorker_1.FileWorker.readTextFile("./data/train.trees");
        var trees = trainTrees.split(/\n/g);
        for (let tree of trees) {
            let parsed = TreeParser_1.TreeParser.parseTree(tree);
            if (parsed)
                console.log(parsed.toString());
        }
    }
}
exports.TestHandler = TestHandler;
