"use strict";
class CKYCell {
    constructor(parses) {
        this.parses = parses;
    }
    pruneNonOptimalParses() {
        this.scorePossibleParses();
    }
    scorePossibleParses() {
        for (let parse of this.parses) {
        }
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
