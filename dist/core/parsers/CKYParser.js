"use strict";
const CKYCell_1 = require("../models/CKYCell");
const PCFGTree_1 = require("../models/PCFGTree");
const MathHelper_1 = require("../helpers/MathHelper");
const TreeNode_1 = require("../models/TreeNode");
class CKYParser {
    constructor(grammar) {
        this.grammar = grammar;
    }
    parse(sequence) {
        var words = sequence.trim().split(/\s+/g);
        this.reinitializeTable(words.length);
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let cell = this.initializeCell(word);
            this.table[i][i] = cell;
        }
        for (let j = 1; j < words.length; j++) {
            for (let i = j - 1; i >= 0; i--) {
                this.processTableCell(i, j);
            }
        }
        var topRightCell = this.table[words.length - 1][words.length - 1];
        var topParse = topRightCell.searchParsesForNonTerminal("TOP");
        if (!topParse)
            return null;
        var pcfgTree = this.createTreeFromParsePointers(topParse);
        console.log(pcfgTree.toString());
        return pcfgTree;
    }
    reinitializeTable(length) {
        this.table = new Array(length).fill([])
            .map(x => new Array(length).fill([])
            .map(x => new CKYCell_1.CKYCell()));
    }
    initializeCell(word) {
        var rules = this.grammar.rules;
        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);
        var parses = matchingRules
            .map(rule => {
            let parse = new CKYCell_1.PossibleParse(rule.left, rule.probability);
            parse.terminal = word;
            return parse;
        });
        return new CKYCell_1.CKYCell(parses);
    }
    processTableCell(i, j) {
        var table = this.table;
        var currentCell = table[i][j];
        var possibleParses = [];
        for (let k = i; k < j; k++) {
            let rowCell = table[i][k];
            let colCell = table[k + 1][j];
            let foundParses = this.findPossibleParses(rowCell, colCell);
            possibleParses = possibleParses.concat(foundParses);
        }
        currentCell.parses = possibleParses;
        currentCell.pruneNonOptimalParses();
    }
    findPossibleParses(rowCell, colCell) {
        var possibleParses = [];
        for (let rowParse of rowCell.parses) {
            for (let colParse of colCell.parses) {
                let rhs = [rowParse.nonTerminal, colParse.nonTerminal];
                let matchingRules = this.grammar.findRulesByRHS(rhs);
                if (matchingRules.length === 0)
                    continue;
                for (let rule of matchingRules) {
                    let score = (() => {
                        var rowScore = rowCell.getScoreByNonTerminal(rule.right[0]);
                        var colScore = colCell.getScoreByNonTerminal(rule.right[1]);
                        var probabilityRule = rule.probability;
                        return MathHelper_1.MathHelper.doLogSum(rowScore, colScore, probabilityRule);
                    })();
                    let parse = new CKYCell_1.PossibleParse(rule.left, score);
                    parse.rowBackPointer = rowParse;
                    parse.colBackPointer = colParse;
                    possibleParses.push(parse);
                }
            }
        }
        return possibleParses;
    }
    createTreeFromParsePointers(start) {
        var root = new TreeNode_1.TreeNode(start.nonTerminal);
        var traverseParsePointers = function (node, parse) {
            if (!parse.rowBackPointer || !parse.colBackPointer) {
                node.addChild(new TreeNode_1.TreeNode(parse.terminal));
                return;
            }
            var rowBackNode = new TreeNode_1.TreeNode(parse.rowBackPointer.nonTerminal);
            var colBackNode = new TreeNode_1.TreeNode(parse.colBackPointer.nonTerminal);
            traverseParsePointers(rowBackNode, parse.rowBackPointer);
            traverseParsePointers(colBackNode, parse.colBackPointer);
            node.addChildren(rowBackNode, colBackNode);
        };
        traverseParsePointers(root, start);
        return new PCFGTree_1.PCFGTree(root);
    }
}
exports.CKYParser = CKYParser;
