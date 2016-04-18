import {FileWorker} from "../../core/FileWorker";
import {Preprocess} from "../../core/Preprocess";
import {_HandlerBase} from "./_HandlerBase";
import {CKYParser} from "../../core/parsers/CKYParser";

export class TestHandler
{
    private static parser = new CKYParser(_HandlerBase.grammar);
    
    public static testTreePrint()
    {
        var testText = FileWorker.readTextFile("./data/test.txt");

        var lines = Preprocess.getLines(testText);

        var parsedTable = TestHandler.parser.parse(lines[0]);

        FileWorker.writeJsonFile("./output/table.json", parsedTable);
    }
}