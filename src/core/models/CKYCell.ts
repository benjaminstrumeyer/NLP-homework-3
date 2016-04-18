import {GrammarRule} from "./GrammarRule";
import {MathHelper} from "../helpers/MathHelper";

export class CKYCell
{
    public parses:PossibleParse[];

    constructor(parses?:PossibleParse[])
    {
        this.parses = parses || [];
    }
    
    public pruneNonOptimalParses()
    {
        var possibleParses = this.parses;

        var currentParse = possibleParses[0];

        for (let k = 1; k < possibleParses.length; k++)
        {
            if (currentParse.nonTerminal === possibleParses[k].nonTerminal)
            {
                if (currentParse.score < possibleParses[k].score)
                {
                    //possibleParses.splice(i, 1);
                    delete(possibleParses[0]);
                }
                else
                {
                    delete(possibleParses[k]);
                }
            }
        }

        // Now we have an array of possibleParses and undefined elements. Filter them.
        var prunedOptimalParseList = [];
        for (let p = 0; p < possibleParses.length; p++)
        {
            if (possibleParses[p] != null)
            {
                prunedOptimalParseList.push(possibleParses[p]);
            }
        }

        this.parses = prunedOptimalParseList;
    }

    public getScoreByNonTerminal(nonTerminal:string):number
    {
        var matchingParse = this.parses
            .filter(x => x.nonTerminal === nonTerminal)[0];

        if(!matchingParse)
            return 0;

        return matchingParse.score;
    }
}

export class PossibleParse
{
    public nonTerminal:string;
    public score: number;

    constructor(nonTerminal?:string, score?:number)
    {
        this.nonTerminal = nonTerminal;
        this.score = score || 0;
    }
}