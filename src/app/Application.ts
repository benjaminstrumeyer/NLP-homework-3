import readlineSync = require("readline-sync");

import {CommandLineHandler} from "./handlers/CommandLineHandler";
import {LanguageModelHandler} from "./handlers/LanguageModelHandler";
import {EvaluatorHandler} from "./handlers/EvaluatorHandler";
import {AnalyzerHandler} from "./handlers/AnalyzerHandler";
import {OutputHandler} from "./handlers/OutputHandler";

export class Application
{
    public static run()
    {
        var readline = readlineSync as any;

        // Print welcome text
        CommandLineHandler.printWelcomeText();

        // Print help text
        CommandLineHandler.printHelpText();

        // Start shell
        readline.promptCLLoop(
            {
                help: CommandLineHandler.printHelpText,

                rebuild: LanguageModelHandler.rebuild,

                accuracy: EvaluatorHandler.evaluateAccuracy,
                precision: EvaluatorHandler.evaluatePrecision,
                recall: EvaluatorHandler.evaluateRecall,
                f1: EvaluatorHandler.evaluateF1,

                confusion: AnalyzerHandler.generateConfusionMatrix,

                output: OutputHandler.outputTaggedCorpus,

                exit: Application.exit
            });
    }

    private static exit()
    {
        console.log("\nGoodbye!\n");
        return true;
    }
}