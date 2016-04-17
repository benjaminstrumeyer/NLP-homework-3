import {GrammarRule} from "./GrammarRule";
import {MathHelper} from "../helpers/MathHelper";
export class CKYCell
{
    public parses:PossibleParse[];

    constructor(parses?:PossibleParse[])
    {
        this.parses = parses;
    }
    
    public pruneNonOptimalParses(table:CKYCell[][], i:number, j:number)
    {
        var possibleParses = CKYCell[i][j];
        var currentParse;

        if (possibleParses[1] != null) {
            currentParse = CKYCell[i][j][0];
            for (let k = 1; i < possibleParses.length; i++)
            {
                if (currentParse.nonTerminal === possibleParses[k].nonTerminal)
                {
                    if (currentParse.score < possibleParses[k].score)
                    {
                        //possibleParses.splice(i, 1);
                        delete(table[i][j][0]);
                    }
                    else
                    {
                        delete(table[i][j][k]);
                    }
                }
            }
        }

        // Now we have an array of possibleParses and undefined elements. Filter them.
        var prunedOptimalParseList;
        for (let p = 0; p < possibleParses.length; p++)
        {
            if (possibleParses[p] != null)
            {
                prunedOptimalParseList.push(possibleParses[p]);
            }
        }

        table[i][j] = prunedOptimalParseList;
        // This might not work if javascript isn't call by reference with arrays.
        // I looked it up and it said it was, but i can't test this.


        // At position 2, remove 2 items, then relace it qith "", "": splice!
        // Let's score the parses first
        //this.scorePossibleParses();

        // Delete parses that have non optimal scores

        // We can do this by looping through the array of possible parses. Check if the nonTerminal is the same, and if they are, delete the one with the lower score.



    }
    
    public scorePossibleParses(table:CKYCell[][], i: number, j: number, k:number, parse:PossibleParse, rule:GrammarRule):number
    {
        var scoreik = this.getScoreByNonTerminal(table, i, j, rule.right[0]);
        var scorek1j = this.getScoreByNonTerminal(table, i, j, rule.right[1]);
        var probabilityRule = rule.probability;

        var logSumArray = [scoreik, scorek1j, probabilityRule];

        // I would like to compute the log sum here. Pls halp it won't let me import..
        var logsum = doLogSum(logSumArray);

        return logsum; //The score for this PossibleParse


        // Not sure why you wrote a loop here. I might be misunderstanding, but
        // if rowParse and colParse in CKYParser refer to the two different possible parses arrays
        // in which we form our right side, then
        // We add rules one at a time to the table within that loop. So there shouldn't be a loop in here at all.
        //Correct me if i'm wrong


        //for (let parse of this.parses)
        //{
        //    // Compute the score for this parse
        //
        //}


        // Set the parse.score
    }

    public getScoreByNonTerminal(table: CKYCell[][], i: number, j:number, nonTerminal:String):number
    {
        var parses = CKYCell[i][j];
        var score = null;
        for (let parse of parses)
        {
            if (nonTerminal === parse.nonTerminal) {
                score = parse.score;
            }
        }
        return score;
    }

}

export class PossibleParse
{
    public nonTerminal:string;
    public score: number;

    constructor(nonTerminal?:string, score?:number)
    {
        this.nonTerminal = nonTerminal;
        this.score = score;
    }
}