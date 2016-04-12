import _ = require("lodash");

export class GrammarRule
{
    public left:string;
    public right:string[];

    public observationCount:number;

    constructor(left:string, right:string[])
    {
        this.left = left;
        this.right = right;

        this.observationCount = 1;
    }

    public toString():string
    {
        return `(${this.observationCount})\t ${this.left} => ${this.right.reduce((x, y) => x + " | " + y)}`;
    }

    public isEqual(otherRule:GrammarRule):boolean
    {
        return (this.left === otherRule.left) &&
            _.isEqual(this.right.sort(), otherRule.right.sort());
    }
}