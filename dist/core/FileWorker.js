"use strict";
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
class FileWorker {
    static getTestTrees() {
        return fs.readFileSync("./data/test.trees").toString();
    }
    static getTrainingTrees() {
        return fs.readFileSync("./data/train.trees").toString();
    }
    static readGrammarFile() {
        try {
            return jsonfile.readFileSync(FileWorker._grammarFile, { throws: false });
        }
        catch (e) {
            if (e.code !== "ENOENT")
                throw e;
            return null;
        }
    }
    static writeGrammarFile(grammar) {
        try {
            var dir = path.parse(FileWorker._grammarFile).dir;
            fs.mkdirSync(dir);
        }
        catch (e) {
            if (e.code !== "EEXIST")
                throw e;
        }
        jsonfile.writeFileSync(FileWorker._grammarFile, grammar);
        var rulesText = grammar.rules
            .sort((x, y) => {
            if (x.left < y.left)
                return -1;
            if (x.left > y.left)
                return 1;
            return 0;
        })
            .map(x => x.toString())
            .reduce((x, y) => x + "\n" + y);
        FileWorker.writeTextFile(FileWorker._rulesFile, rulesText);
    }
    static readTextFile(filename) {
        return fs.readFileSync(filename).toString();
    }
    static writeTextFile(filename, data) {
        try {
            var dir = path.parse(filename).dir;
            fs.mkdirSync(dir);
        }
        catch (e) {
            if (e.code !== "EEXIST")
                throw e;
        }
        fs.writeFileSync(filename, data);
    }
    static writeJsonFile(filename, data) {
        try {
            var dir = path.parse(filename).dir;
            fs.mkdirSync(dir);
        }
        catch (e) {
            if (e.code !== "EEXIST")
                throw e;
        }
        jsonfile.writeFileSync(filename, data);
    }
}
FileWorker._grammarFile = "./output/grammar.json";
FileWorker._rulesFile = "./output/rules.txt";
exports.FileWorker = FileWorker;
