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
        if (parent) {
            parent.children.push(this);
        }
    }

    public isTerminal():boolean
    {
        return this.children.length === 0;
    }
}