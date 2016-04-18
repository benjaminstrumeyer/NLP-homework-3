import {FileWorker} from "../../core/FileWorker";
import {Preprocess} from "../../core/Preprocess";
import {CKYParser} from "../../core/parsers/CKYParser";
import {_HandlerBase} from "./_HandlerBase";
import {TreeParser} from "../../core/parsers/TreeParser";

export class CKYHandler
{
    private static parser = new CKYParser(_HandlerBase.grammar);

    public static parseTestText()
    {
        var testText = FileWorker.readTextFile("./data/test.txt");
        
        var lines = Preprocess.getLines(testText);

        var parsedTrees = [];

        for (let line of lines)
        {
            var parsedTree = CKYHandler.parser.parse(line);
            var parsedTreeString = TreeParser.deparseTree(parsedTree);
            parsedTrees.push(parsedTreeString);
        }

        var parsedText = parsedTrees.join("\n");
        FileWorker.writeTextFile("./output/parsed.trees", parsedText);
    }
}