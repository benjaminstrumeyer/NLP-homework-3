import ProgressBar = require("progress");

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

        var progressBar = new ProgressBar("Parsing test.txt for :elapseds [:bar] :percent",
            {
                total: lines.length,
                width: 50,
                complete: "#"
            });

        for (let line of lines)
        {
            var parsedTree = CKYHandler.parser.parse(line);
            var parsedTreeString = TreeParser.deparseTree(parsedTree);
            parsedTrees.push(parsedTreeString);

            progressBar.tick();
        }

        console.log("\nCKY Parser finished parsing test.txt and wrote the resulting trees into ./output/parsed.trees.\n");

        var parsedText = parsedTrees.join("\n");
        FileWorker.writeTextFile("./output/parsed.trees", parsedText);
    }

    public static parseSingleSentence(sentence:string)
    {
        console.log(sentence);

        var parsedTree = CKYHandler.parser.parse(sentence);
        var parsedTreeString = TreeParser.deparseTree(parsedTree);

        console.log("\n" + parsedTreeString + "\n");
    }
}