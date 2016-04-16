"use strict";
const CKYCell_1 = require("../models/CKYCell");
class CKYParser {
    constructor(grammar) {
        this.grammar = grammar;
    }
    parse(sequence) {
        var words = sequence.split(/\s+/g);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let cell = this.findLHSForTerminal(word);
            this.table[i][i] = cell;
        }
        for (let j = 0; j < words.length; j++) {
            for (let i = j - 1; i >= 0; i--) {
            }
        }
    }
    processTableCell(i, j) {
        var table = this.table;
        var currentCell = table[i][j];
        for (let k = 0; k < j - i; k++) {
            let left = table[i][i + k];
            let right = table[i + 1 + k][j];
        }
    }
    findLHSForTerminal(word) {
        var rules = this.grammar.rules;
        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);
        var parses = matchingRules
            .map(rule => new CKYCell_1.PossibleParse(rule.left, rule.probability));
        return new CKYCell_1.CKYCell(parses);
    }
}
exports.CKYParser = CKYParser;