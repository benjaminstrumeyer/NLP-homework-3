import _ = require("lodash");

export class GrammarRule
{
    public left:string;
    public right:string[];

    public observationCount:number;
    public probability:number;

    constructor(left:string, right:string[])
    {
        this.left = left;
        this.right = right;

        this.observationCount = 1;
    }

    public isBinary():boolean
    {
        return this.right.length === 2;
    }

    public isUnary():boolean
    {
        return this.right.length === 1;
    }

    public toString():string
    {
        var ruleString = `${this.left} => ${this.right.join(" ")}`;

        return `(${this.observationCount})\t${ruleString}\t\t\t${this.probability}`;
    }

    public equals(otherRule:GrammarRule):boolean
    {
        return (this.left === otherRule.left) &&
            _.isEqual(this.right.sort(), otherRule.right.sort());
    }
}