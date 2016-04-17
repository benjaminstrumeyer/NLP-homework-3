"use strict";
class CKYCell {
    constructor(parses) {
        this.parses = parses;
    }
    pruneNonOptimalParses() {
        var possibleParses = this.parses;
        var currentParse = possibleParses[0];
        for (let k = 1; k < possibleParses.length; k++) {
            if (currentParse.nonTerminal === possibleParses[k].nonTerminal) {
                if (currentParse.score < possibleParses[k].score) {
                    delete (possibleParses[0]);
                }
                else {
                    delete (possibleParses[k]);
                }
            }
        }
        var prunedOptimalParseList = [];
        for (let p = 0; p < possibleParses.length; p++) {
            if (possibleParses[p] != null) {
                prunedOptimalParseList.push(possibleParses[p]);
            }
        }
        this.parses = prunedOptimalParseList;
    }
    getScoreByNonTerminal(nonTerminal) {
        var matchingParse = this.parses
            .filter(x => x.nonTerminal === nonTerminal)[0];
        if (!matchingParse)
            return 0;
        return matchingParse.score;
    }
}
exports.CKYCell = CKYCell;
class PossibleParse {
    constructor(nonTerminal, score) {
        this.nonTerminal = nonTerminal;
        this.score = score;
    }
}
exports.PossibleParse = PossibleParse;
