import {FileWorker} from "../../core/FileWorker";
import {Preprocess} from "../../core/Preprocess";
import {_HandlerBase} from "./_HandlerBase";
import {CKYParser} from "../../core/parsers/CKYParser";

export class TestHandler
{
    public static test()
    {
        var grammar = _HandlerBase.grammar;

        console.log(grammar.rules.filter(x => x.isUnary()).length);
        console.log(grammar.rules.filter(x => x.isBinary()).length);
    }
}