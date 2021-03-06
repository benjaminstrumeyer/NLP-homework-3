"use strict";
const _ = require("lodash");
class CKYCell {
    constructor(parses) {
        this.parses = parses || [];
    }
    pruneNonOptimalParses() {
        var possibleParses = this.parses;
        var optimalParses = [];
        for (let parse of possibleParses) {
            let optimalParse = possibleParses
                .filter(p => p.nonTerminal === parse.nonTerminal)
                .reduce((left, right) => {
                if (left.score >= right.score)
                    return left;
                return right;
            });
            optimalParses.push(optimalParse);
        }
        var prunedOptimalParses = _.uniqWith(optimalParses, (x, y) => x.nonTerminal === y.nonTerminal);
        this.parses = prunedOptimalParses;
    }
    getScoreByNonTerminal(nonTerminal) {
        var matchingParse = this.parses
            .filter(x => x.nonTerminal === nonTerminal)[0];
        if (!matchingParse)
            return 0;
        return matchingParse.score;
    }
    searchParsesForNonTerminal(nonTerminal) {
        return this.parses.filter(parse => parse.nonTerminal === nonTerminal)[0];
    }
}
exports.CKYCell = CKYCell;
class PossibleParse {
    constructor(nonTerminal, score) {
        this.nonTerminal = nonTerminal;
        this.score = score || 0;
    }
}
exports.PossibleParse = PossibleParse;
