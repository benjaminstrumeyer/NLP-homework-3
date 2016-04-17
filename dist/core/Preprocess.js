"use strict";
class Preprocess {
    static getLines(text) {
        var lines = text.split(/\n/g);
        var result = [];
        for (let line of lines) {
            if (line && !(/^\s+$/g).test(line))
                result.push(line);
        }
        return result;
    }
}
exports.Preprocess = Preprocess;
