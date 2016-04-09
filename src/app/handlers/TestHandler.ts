import {PCFG} from "../../core/models/PCFG";
import {TreeNode} from "../../core/models/TreeNode";

export class TestHandler
{
    public static testTreePrint()
    {
        var tree = new PCFG();

        tree.root = new TreeNode("TOP");
        tree.root.children.push(
            new TreeNode("SQ"),
            new TreeNode("PUNC")
        );

        var result = tree.toString();

        console.log(result);
    }
}