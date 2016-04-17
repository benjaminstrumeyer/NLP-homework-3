"use strict";
const MathHelper_1 = require("../helpers/MathHelper");
class CKYCell {
    constructor(parses) {
        this.parses = parses;
    }
    pruneNonOptimalParses(table, i, j) {
        var possibleParses = CKYCell[i][j];
        var currentParse;
        if (possibleParses[1] != null) {
            currentParse = CKYCell[i][j][0];
            for (let k = 1; i < possibleParses.length; i++) {
                if (currentParse.nonTerminal === possibleParses[k].nonTerminal) {
                    if (currentParse.score < possibleParses[k].score) {
                        delete (table[i][j][0]);
                    }
                    else {
                        delete (table[i][j][k]);
                    }
                }
            }
        }
        var prunedOptimalParseList;
        for (let p = 0; p < possibleParses.length; p++) {
            if (possibleParses[p] != null) {
                prunedOptimalParseList.push(possibleParses[p]);
            }
        }
        table[i][j] = prunedOptimalParseList;
    }
    scorePossibleParses(table, i, j, k, parse, rule) {
        var scoreik = this.getScoreByNonTerminal(table, i, j, rule.right[0]);
        var scorek1j = this.getScoreByNonTerminal(table, i, j, rule.right[1]);
        var probabilityRule = rule.probability;
        var logsum = MathHelper_1.MathHelper.doLogSum(scoreik, scorek1j, probabilityRule);
        return logsum;
    }
    getScoreByNonTerminal(table, i, j, nonTerminal) {
        var parses = CKYCell[i][j];
        var score = null;
        for (let parse of parses) {
            if (nonTerminal === parse.nonTerminal) {
                score = parse.score;
            }
        }
        return score;
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
