import {PCFGTree} from "../../core/models/PCFGTree";
import {TreeNode} from "../../core/models/TreeNode";
import {FileWorker} from "../../core/FileWorker";
import {TreeParser} from "../../core/parsers/TreeParser";
import {Preprocess} from "../../core/Preprocess";

export class TestHandler
{
    public static testTreePrint()
    {
        var trainTrees = FileWorker.readTextFile("./data/train.trees");

        var trees = Preprocess.getLines(trainTrees);

        for (let tree of trees)
        {
            let parsed = TreeParser.parseTree(tree);
            let deparsed = TreeParser.deparseTree(parsed);

            if (tree.trim() !== deparsed.trim())
            {
                console.log(tree);
                console.log(deparsed);
            }
        }
    }
}