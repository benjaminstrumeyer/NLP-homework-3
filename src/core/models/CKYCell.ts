export class CKYCell
{
    public parses:PossibleParse[];

    constructor(parses?:PossibleParse[])
    {
        this.parses = parses;
    }
    
    public pruneNonOptimalParses()
    {
        // Let's score the parses first
        this.scorePossibleParses();
        
        // Delete parses that have non optimal scores
    }
    
    public scorePossibleParses()
    {
        for (let parse of this.parses)
        {
            // Compute the score for this parse
        }
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