"use strict";
class Preprocess {
    static tokenizeCorpus(corpus) {
        var sentences = Preprocess.getSentences(corpus);
        var tokens = [];
        for (let sentence of sentences) {
            tokens = tokens.concat(Preprocess.tokenize(sentence));
        }
        return tokens;
    }
    static getSentences(corpus) {
        var lines = corpus.split(/\n/g);
        var result = [];
        for (let line of lines) {
            let sentence = line.trim();
            if (!sentence)
                continue;
            sentence = sentence.replace(/^(\d+\s)/g, "");
            result.push("<s>/<s> " + sentence);
        }
        return result;
    }
    static tokenize(sentence) {
        return sentence.split(/\s+/g);
    }
}
exports.Preprocess = Preprocess;
