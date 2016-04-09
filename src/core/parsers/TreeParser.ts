import {PCFG} from "../models/PCFG";
import {TreeNode} from "../models/TreeNode";
export class TreeParser
{
    public parseTree(tree: string):PCFG {
        var nodeName = "";
        var currentNode:TreeNode;
        var pcfgTree = new PCFG();

        for(let i = 0; i < tree.length; i++) {
            let currentChar = tree[i];

            if (currentChar === " ") {
                continue;
            }
            if (currentChar === "(") {
                let node = new TreeNode(nodeName, (currentNode || null));

                if (!!currentNode) {
                    pcfgTree.root = node;
                }
                currentNode = node;

                nodeName = "";
            }
            else if (currentChar === ")") {
                new TreeNode(nodeName,currentNode);
                currentNode = currentNode.parent;
                nodeName = "";
            }
            else { // node
                nodeName += currentChar;
            }
        }
    }

}