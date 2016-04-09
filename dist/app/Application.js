"use strict";
const readlineSync = require("readline-sync");
const CommandLineHandler_1 = require("./handlers/CommandLineHandler");
const TestHandler_1 = require("./handlers/TestHandler");
class Application {
    static run() {
        var readline = readlineSync;
        CommandLineHandler_1.CommandLineHandler.printWelcomeText();
        CommandLineHandler_1.CommandLineHandler.printHelpText();
        readline.promptCLLoop({
            help: CommandLineHandler_1.CommandLineHandler.printHelpText,
            test: TestHandler_1.TestHandler.testTreePrint,
            exit: Application.exit
        });
    }
    static exit() {
        console.log("\nGoodbye!\n");
        return true;
    }
}
exports.Application = Application;
