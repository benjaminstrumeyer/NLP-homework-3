import {PCFG} from "../grammar/PCFG";
import {CKYCell, PossibleParse} from "../models/CKYCell";
import {PCFGTree} from "../models/PCFGTree";
import {MathHelper} from "../helpers/MathHelper";
import {TreeNode} from "../models/TreeNode";

export class CKYParser
{
    private grammar:PCFG;
    private table:CKYCell[][];

    constructor(grammar:PCFG)
    {
        this.grammar = grammar;
    }

    public parse(sequence:string):PCFGTree
    {
        // Split sequence to words
        var words = sequence.trim().split(/\s+/g);

        // Empty the table out for every parse
        this.reinitializeTable(words.length);

        // This is the diagonal initializing loop
        for (let i = 0; i < words.length; i++)
        {
            // Find all the rules that have the right hand side as the word i.
            let word = words[i];

            // Find all the rules in the grammar with word on the right side.
            let cell = this.initializeCell(word);

            this.table[i][i] = cell;
        }

        // Let's fill up every other cell
        for (let j = 1; j < words.length; j++)
        {
            for (let i = j - 1; i >= 0; i--)
            {
                this.processTableCell(i, j);
            }
        }

        // Check if final cell has a TOP
        var topRightCell = this.table[0][words.length-1];

        var topParse = topRightCell.searchParsesForNonTerminal("TOP");

        if (!topParse)
            return null;

        // If it does, form the tree from the back pointers in the Parses
        var pcfgTree = this.createTreeFromParsePointers(topParse);

        // Return the final parsed tree
        return pcfgTree;
    }

    private reinitializeTable(length)
    {
        this.table = new Array(length).fill([])
            .map(x => new Array(length).fill([])
                .map(x => new CKYCell()));
    }

    private initializeCell(word:string):CKYCell
    {
        var rules = this.grammar.rules;

        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);

        var parses = matchingRules
            .map(rule =>
            {
                let parse = new PossibleParse(rule.left, rule.probability);
                parse.terminal = word;
                return parse;
            });

        return new CKYCell(parses);
    }

    private processTableCell(i:number, j:number)
    {
        var table = this.table;
        var currentCell = table[i][j];

        var possibleParses = [];
        for (let k = i; k < j; k++)
        {
            let rowCell = table[i][k];
            let colCell = table[k + 1][j];

            // Here find all the possible parses that come from the row cells and col cells
            let foundParses = this.findPossibleParses(rowCell, colCell);
            possibleParses = possibleParses.concat(foundParses);
        }

        currentCell.parses = possibleParses;

        // After finding and scoring the possible parses
        // Let's prune so we only have the optimal parses
        currentCell.pruneNonOptimalParses();
    }

    private findPossibleParses(rowCell:CKYCell, colCell:CKYCell):PossibleParse[]
    {
        var possibleParses = [];

        // Find all possible parses X, that has X -> rowCell.any() colCell.any()
        for (let rowParse of rowCell.parses)
        {
            for (let colParse of colCell.parses)
            {
                let rhs = [rowParse.nonTerminal, colParse.nonTerminal];

                // Find all rules in grammar where RHS matches
                let matchingRules = this.grammar.findRulesByRHS(rhs);

                // Skip if LHS was not found
                if (matchingRules.length === 0)
                    continue;

                // For each matching rule, add a possible parse
                for (let rule of matchingRules)
                {
                    // If found, score the possible parse
                    let score = (() =>
                    {
                        var rowScore = rowCell.getScoreByNonTerminal(rule.right[0]);
                        var colScore = colCell.getScoreByNonTerminal(rule.right[1]);
                        var probabilityRule = rule.probability;

                        return MathHelper.doLogSum(rowScore, colScore, probabilityRule);
                    })();

                    let parse = new PossibleParse(rule.left, score);

                    parse.rowBackPointer = rowParse;
                    parse.colBackPointer = colParse;

                    // Add the parse
                    possibleParses.push(parse);
                }
            }
        }

        return possibleParses;
    }

    private createTreeFromParsePointers(start:PossibleParse):PCFGTree
    {
        var root = new TreeNode(start.nonTerminal);

        var traverseParsePointers = function (node:TreeNode, parse:PossibleParse)
        {
            if (!parse.rowBackPointer || !parse.colBackPointer)
            {
                node.addChild(new TreeNode(parse.terminal));
                return;
            }

            var rowBackNode = new TreeNode(parse.rowBackPointer.nonTerminal);
            var colBackNode = new TreeNode(parse.colBackPointer.nonTerminal);

            traverseParsePointers(rowBackNode, parse.rowBackPointer);
            traverseParsePointers(colBackNode, parse.colBackPointer);

            node.addChildren(rowBackNode, colBackNode);
        };

        traverseParsePointers(root, start);

        return new PCFGTree(root);
    }
}