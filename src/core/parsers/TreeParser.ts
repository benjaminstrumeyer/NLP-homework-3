import {PCFG} from "../models/PCFG";
import {TreeNode} from "../models/TreeNode";

export class TreeParser
{
    public static parseTree(tree:string):PCFG
    {
        var nodeName = "";
        var currentNode:TreeNode;
        var pcfgTree = new PCFG();

        for (let i = 0; i < tree.length; i++)
        {
            let currentChar = tree[i];

            // We ignore spaces
            if (currentChar === " ")
                continue;

            if (currentChar === "(")
            {
                // Make a node for the last encounter
                let node = new TreeNode(nodeName, (currentNode || null));

                // If we are at the top, that means it's the root
                if (!currentNode)
                {
                    pcfgTree.root = node;
                }

                // Now set that new node as current
                currentNode = node;

                nodeName = "";
            }
            else if (currentChar === ")")
            {
                // If we saw a terminal and a right paren, then make that terminal a new node
                if(nodeName)
                    new TreeNode(nodeName, currentNode);

                // Go up the tree
                currentNode = currentNode.parent;
                nodeName = "";
            }
            else
            {
                nodeName += currentChar;
            }
        }

        return pcfgTree;
    }

}