export class CKYCell
{
    public parses:PossibleParse[];

    constructor(parses?:PossibleParse[])
    {
        this.parses = parses;
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