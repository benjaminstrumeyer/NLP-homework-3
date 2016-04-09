export class TreeNode
{
    public parent:TreeNode;
    public children:TreeNode[];

    public data:string;

    constructor(data:string, parent:TreeNode = null)
    {
        this.data = data;

        this.parent = parent;
        this.children = [];
    }

    public isTerminal():boolean
    {
        return this.children.length === 0;
    }
}