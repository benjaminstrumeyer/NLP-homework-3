export class GrammarRule
{
    public left:string;
    public right:string[];

    constructor(left:string, right:string[])
    {
        this.left = left;
        this.right = right;
    }

    public toString():string
    {
        return `${this.left} => ${this.right.reduce((x,y) => x + " | " + y)}`;
    }
}