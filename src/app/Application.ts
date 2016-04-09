import readlineSync = require("readline-sync");

import {CommandLineHandler} from "./handlers/CommandLineHandler";
import {LanguageModelHandler} from "./handlers/LanguageModelHandler";

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

                exit: Application.exit
            });
    }

    private static exit()
    {
        console.log("\nGoodbye!\n");
        return true;
    }
}