"use strict";
class Preprocess {
    static getTreeLines(trees) {
        var treeLines = trees.split(/\n/g);
        var result = [];
        for (let treeLine of treeLines) {
            if (treeLine && !(/^\s+$/g).test(treeLine))
                result.push(treeLine);
        }
        return result;
    }
}
exports.Preprocess = Preprocess;
