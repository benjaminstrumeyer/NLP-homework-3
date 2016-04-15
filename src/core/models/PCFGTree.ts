import {TreeNode} from "./TreeNode";

export class PCFGTree
{
    public root:TreeNode;

    constructor()
    {
    }

    public toString = function ():string
    {
        if (!this.root)
            return null;

        return this.root.toString();
    }
}