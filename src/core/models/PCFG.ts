import {TreeNode} from "./TreeNode";

export class PCFG
{
    public root:TreeNode;

    constructor() {}

    public toString():string
    {
        if(!this.root)
            return null;

        return this.root.toString();
    }
}