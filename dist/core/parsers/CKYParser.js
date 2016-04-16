"use strict";
const NonTerminalTuple_1 = require("../models/NonTerminalTuple");
class CKYParser {
    constructor(grammar) {
        this.grammar = grammar;
    }
    parse(sequence) {
        var words = sequence.split(/\s+/g);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let tuples = this.findLHSForNonTerminal(word);
            this.table[i][i] = tuples;
        }
        for (let j = 0; j < words.length; j++) {
            for (let i = j - 1; i >= 0; i--) {
            }
        }
    }
    processTableCell(i, j) {
        for (let k = 0; k < j; k++) {
            let left = this.table[i][k];
            let right = this.table[i + k][j];
        }
    }
    findLHSForNonTerminal(word) {
        var rules = this.grammar.rules;
        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);
        var tuples = matchingRules
            .map(rule => {
            let t = new NonTerminalTuple_1.NonTerminalTuple();
            t.nonTerminal = rule.left;
            t.score = rule.probability;
            return t;
        });
        return tuples;
    }
}
exports.CKYParser = CKYParser;
