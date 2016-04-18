import {GrammarRule} from "./GrammarRule";
import {MathHelper} from "../helpers/MathHelper";
import _ = require("lodash");

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

        var optimalParses = [];

        // Go through each parse and find the optimal parse with the highest score
        for (let parse of possibleParses)
        {
            let optimalParse = possibleParses.filter(p => p.nonTerminal === parse.nonTerminal)
                .reduce((left, right) =>
                {
                    if(left.score > right.score)
                        return left;

                    return right;
                });

            optimalParses.push(optimalParse);
        }

        // Now prune the parse list to keep only the highest scored parse
        var prunedOptimalParses = _.uniqWith(optimalParses, (x,y) => x.nonTerminal === y.nonTerminal);

        // Save it to this.parses
        this.parses = prunedOptimalParses;
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