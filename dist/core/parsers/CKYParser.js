"use strict";
const CKYCell_1 = require("../models/CKYCell");
const MathHelper_1 = require("../helpers/MathHelper");
class CKYParser {
    constructor(grammar) {
        this.grammar = grammar;
    }
    parse(sequence) {
        this.table = [[]];
        var words = sequence.split(/\s+/g);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let cell = this.initializeCell(word);
            this.table[i][i] = cell;
        }
        for (let j = 0; j < words.length; j++) {
            for (let i = j - 1; i >= 0; i--) {
                this.processTableCell(i, j);
            }
        }
        return null;
    }
    processTableCell(i, j) {
        var table = this.table;
        var currentCell = table[i][j];
        var possibleParses = currentCell.parses;
        for (let k = i; k < j; k++) {
            let rowCell = table[i][k];
            let colCell = table[k + 1][j];
            possibleParses.concat(this.findPossibleParses(rowCell, colCell));
        }
        currentCell.pruneNonOptimalParses();
    }
    findPossibleParses(rowCell, colCell) {
        var possibleParses = [];
        for (let rowParse of rowCell.parses) {
            for (let colParse of colCell.parses) {
<<<<<<< HEAD
                let rhs = [rowParse.nonTerminal, colParse.nonTerminal];
                let rule = this.grammar.findRuleByRHS(rhs);
                if (!rule)
                    continue;
                let score = (() => {
                    var rowScore = rowCell.getScoreByNonTerminal(rule.right[0]);
                    var colScore = colCell.getScoreByNonTerminal(rule.right[1]);
                    var probabilityRule = rule.probability;
                    return MathHelper_1.MathHelper.doLogSum(rowScore, colScore, probabilityRule);
                })();
                possibleParses.push(new CKYCell_1.PossibleParse(rule.left, score));
=======
                var rhs = [rowParse.nonTerminal, colParse.nonTerminal];
                var rule = this.grammar.findRuleByRHS(rhs);
                if (!rule)
                    continue;
                var possibleParse = new CKYCell_1.PossibleParse(rule.left);
                var score = 0;
                possibleParse.score = score;
                possibleParses.push(possibleParse);
>>>>>>> feature/CKYHandler
            }
        }
        return possibleParses;
    }
    initializeCell(word) {
        var rules = this.grammar.rules;
        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);
        var parses = matchingRules
            .map(rule => new CKYCell_1.PossibleParse(rule.left, rule.probability));
        return new CKYCell_1.CKYCell(parses);
    }
}
exports.CKYParser = CKYParser;
