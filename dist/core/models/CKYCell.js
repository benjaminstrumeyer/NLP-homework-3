"use strict";
class CKYCell {
    constructor(parses) {
        this.parses = parses;
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
