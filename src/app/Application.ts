import readlineSync = require("readline-sync");

import {CommandLineHandler} from "./handlers/CommandLineHandler";
import {GrammarHandler} from "./handlers/GrammarHandler";
import {TestHandler} from "./handlers/TestHandler";
import {CKYHandler} from "./handlers/CKYHandler";

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

                test: TestHandler.test,
                rebuild: GrammarHandler.rebuild,

                parse: CKYHandler.parseTestText,

                exit: Application.exit
            });
    }

    private static exit()
    {
        console.log("\nGoodbye!\n");
        return true;
    }
}