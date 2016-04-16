import {PCFG} from "../grammar/PCFG";
import {CKYCell, PossibleParse} from "../models/CKYCell";

export class CKYParser
{
    private grammar:PCFG;
    private table:CKYCell[][];

    constructor(grammar:PCFG)
    {
        this.grammar = grammar;
    }

    public parse(sequence:string)
    {
        var words = sequence.split(/\s+/g);

        // This is the diagonal initializing loop
        for (let i = 0; i < words.length; i++)
        {
            // Find all the rules that have the right hand side as the word i.
            let word = words[i];

            // Find all the rules in the grammar with word on the right side.
            let cell = this.findLHSForTerminal(word);

            this.table[i][i] = cell;
        }

        // Let's fill up every other cell
        for (let j = 0; j < words.length; j++)
        {
            for (let i = j - 1; i >= 0; i--)
            {
                

            }
        }
    }

    private processTableCell(i:number, j:number)
    {
        var table = this.table;
        var currentCell = table[i][j];
        
        for (let k = 0; k < j - i; k++)
        {
            let left = table[i][i + k];
            let right = table[i + 1 + k][j];
        }
    }

    private findLHSForTerminal(word:string):CKYCell
    {
        var rules = this.grammar.rules;

        var matchingRules = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);

        var parses = matchingRules
            .map(rule => new PossibleParse(rule.left, rule.probability));

        return new CKYCell(parses);
    }
}