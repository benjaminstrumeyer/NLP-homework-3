import {FileWorker} from "../../core/FileWorker";
import {Preprocess} from "../../core/Preprocess";
import {CKYParser} from "../../core/parsers/CKYParser";
import {_HandlerBase} from "./_HandlerBase";

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
            var parsedTree = this.parser.parse(line);
            parsedTrees.push(parsedTree);
        }

        // Do something here with the parsed trees
        // I guess we have to deparse the parsedTrees into string format like in test.trees
        // And then compare them? We should just output a file like parsed.trees
        // Then run his Python script or whatever
    }
}