"use strict";
const readlineSync = require("readline-sync");
const CommandLineHandler_1 = require("./handlers/CommandLineHandler");
const GrammarHandler_1 = require("./handlers/GrammarHandler");
const TestHandler_1 = require("./handlers/TestHandler");
const CKYHandler_1 = require("./handlers/CKYHandler");
class Application {
    static run() {
        var readline = readlineSync;
        CommandLineHandler_1.CommandLineHandler.printWelcomeText();
        CommandLineHandler_1.CommandLineHandler.printHelpText();
        readline.promptCLLoop({
            help: CommandLineHandler_1.CommandLineHandler.printHelpText,
            test: TestHandler_1.TestHandler.test,
            rebuild: GrammarHandler_1.GrammarHandler.rebuild,
            top: GrammarHandler_1.GrammarHandler.getTop,
            parse: CKYHandler_1.CKYHandler.parseTestText,
            "parse-single": CKYHandler_1.CKYHandler.parseSingleSentence,
            exit: Application.exit
        });
    }
    static exit() {
        console.log("\nGoodbye!\n");
        return true;
    }
}
exports.Application = Application;
