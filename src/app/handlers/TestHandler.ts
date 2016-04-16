import {PCFGTree} from "../../core/models/PCFGTree";
import {TreeNode} from "../../core/models/TreeNode";
import {FileWorker} from "../../core/FileWorker";
import {TreeParser} from "../../core/parsers/TreeParser";

export class TestHandler
{
    public static testTreePrint()
    {
        var trainTrees = FileWorker.readTextFile("./data/train.trees");

        var trees = trainTrees.split(/\n/g);

        for (let tree of trees)
        {
            let parsed = TreeParser.parseTree(tree);

            if(parsed)
                console.log(parsed);
        }
    }
}