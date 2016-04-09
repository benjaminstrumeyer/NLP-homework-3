"use strict";
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
class FileWorker {
    static getTestCorpus() {
        return fs.readFileSync("./data/test.txt").toString();
    }
    static getTrainingCorpus() {
        return fs.readFileSync("./data/train.txt").toString();
    }
    static readLanguageModelFile() {
        try {
            return jsonfile.readFileSync(FileWorker._languageModelFile, { throws: false });
        }
        catch (e) {
            if (e.code !== "ENOENT")
                throw e;
            return null;
        }
    }
    static writeLanguageModelFile(languageModel) {
        try {
            var dir = path.parse(FileWorker._languageModelFile).dir;
            fs.mkdirSync(dir);
        }
        catch (e) {
            if (e.code !== "EEXIST")
                throw e;
        }
        jsonfile.writeFileSync(FileWorker._languageModelFile, languageModel.corpus);
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
FileWorker._languageModelFile = "./output/language_model.json";
exports.FileWorker = FileWorker;
