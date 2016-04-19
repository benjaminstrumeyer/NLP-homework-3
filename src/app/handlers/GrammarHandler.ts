import {GrammarBuilder} from "../../core/builders/GrammarBuilder";
import {_HandlerBase} from "./_HandlerBase";

export class GrammarHandler
{
    public static rebuild()
    {
        _HandlerBase.grammar = GrammarBuilder.buildGrammarFromTrainingData();
    }

    public static getTop(count:number)
    {
        var grammar = _HandlerBase.grammar;

        var top = grammar.rules
            .sort((x, y) => y.observationCount - x.observationCount)
            .slice(0, count || 10)
            .map(rule => rule.toString())
            .reduce((x, y) => x + "\n" + y);

        console.log("\n" + top + "\n");
    }
}