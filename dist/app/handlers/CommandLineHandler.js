"use strict";
class CommandLineHandler {
    static printWelcomeText() {
        console.log();
        console.log("Welcome to the Syntactic Parsing playground for CSE 390");
        console.log("---------------------------------------------------------");
    }
    static printHelpText() {
        console.log();
        console.log("Available commands:");
        console.log("---------------------------------------------------------");
        console.log(CommandLineHandler.writeHelpLine("help", "Print this help text"));
        console.log();
        console.log(CommandLineHandler.writeHelpLine("rebuild", "Rebuild the grammar file"));
        console.log(CommandLineHandler.writeHelpLine("parse", "Run the CKY Parser on test.txt"));
        console.log();
        console.log(CommandLineHandler.writeHelpLine("exit", "Exit Application"));
        console.log();
    }
    static writeHelpLine(command, text, tabs) {
        tabs = tabs || 4;
        var tabsString = (function () {
            var s = "";
            for (let i = 0; i < tabs; i++) {
                s += "\t";
            }
            return s;
        })();
        return command + tabsString + text;
    }
    ;
}
exports.CommandLineHandler = CommandLineHandler;
