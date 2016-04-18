import {PCFG} from "../grammar/PCFG";
import {CKYCell, PossibleParse} from "../models/CKYCell";
import {PCFGTree} from "../models/PCFGTree";
import {MathHelper} from "../helpers/MathHelper";

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

        // Gotta return the final parsed tree
        return null;
    }

    private reinitializeTable(length)
    {
        this.table = new Array(length).fill([])
            .map(x => new Array(length).fill([])
                .map(x => new CKYCell()));
    }

    private processTableCell(i:number, j:number)
    {
        var table = this.table;
        var currentCell = table[i][j];

        var possibleParses = currentCell.parses;
        for (let k = i; k < j; k++)
        {
            let rowCell = table[i][k];
            let colCell = table[k + 1][j];

            // Here find all the possible parses that come from the row cells and col cells
            possibleParses.concat(this.findPossibleParses(rowCell, colCell));
        }

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
                let rule = this.grammar.findRuleByRHS(rhs);

                // Skip if LHS was not found
                if (!rule)
                    continue;

                // If found, score the possible parse
                let score = (() =>
                {
                    var rowScore = rowCell.getScoreByNonTerminal(rule.right[0]);
                    var colScore = colCell.getScoreByNonTerminal(rule.right[1]);
                    var probabilityRule = rule.probability;

                    return MathHelper.doLogSum(rowScore, colScore, probabilityRule);
                })();

                // Add the parse
                possibleParses.push(new PossibleParse(rule.left, score));
            }
        }

        return possibleParses;
    }

    private initializeCell(word:string):CKYCell
    {
        var rules = this.grammar.rules;

        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);

        var parses = matchingRules
            .map(rule => new PossibleParse(rule.left, rule.probability));

        return new CKYCell(parses);
    }
}