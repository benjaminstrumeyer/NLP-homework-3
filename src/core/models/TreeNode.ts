export class TreeNode
{
    public parent:TreeNode;
    public children:TreeNode[];

    public data:string;

    constructor(data:string, parent?:TreeNode)
    {
        this.data = data;
        this.parent = parent;
        this.children = [];
        if (parent)
        {
            parent.children.push(this);
        }
    }

    public addChild(node:TreeNode)
    {
        node.parent = this;
        this.children.push(node);
    }

    public addChildren(...nodes:TreeNode[])
    {
        for (let node of nodes)
        {
            this.addChild(node);
        }        
    }

    public isTerminal():boolean
    {
        return this.children.length === 0;
    }

    public toString = function(depth?:number):string
    {
        depth = depth || 0;

        var result = "";

        if (depth > 0)
        {
            for (let i = 0; i < depth - 1; i++)
            {
                result += "| ";
            }
            result += "|-";
        }

        result += this.data + "\n";

        for (let child of this.children)
        {
            result += child.toString(depth + 1);
        }

        return result;
    }
}