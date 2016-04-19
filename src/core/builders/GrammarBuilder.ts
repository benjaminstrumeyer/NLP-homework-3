import {FileWorker} from "../FileWorker";
import {PCFG} from "../grammar/PCFG";
import {GrammarRule} from "../models/GrammarRule";

export class GrammarBuilder
{
    public static buildGrammar():PCFG
    {
        // Try to read from file, otherwise build from training data
        var grammar = GrammarBuilder.buildGrammarFromFile();
        if (!grammar)
        {
            // Build from training data
            grammar = GrammarBuilder.buildGrammarFromTrainingData();
        }

        return grammar;
    }

    public static buildGrammarFromTrainingData():PCFG
    {
        // Get training data
        var trainingData = FileWorker.getTrainingTrees();

        // Train language model with training data
        var grammar = new PCFG();
        grammar.train(trainingData);

        // Write the built model to file
        FileWorker.writeGrammarFile(grammar);

        console.log("\nGrammar built and written to file!\n");

        return grammar;
    }

    public static buildGrammarFromFile():PCFG
    {
        // Try to read from the language model file, return null if file not found
        var grammar = FileWorker.readGrammarFile();
        if (!grammar)
        {
            return null;
        }

        var newGrammar = new PCFG();
        Object.assign(newGrammar, grammar);

        for (let i = 0; i < newGrammar.rules.length; i++)
        {
            let rule = newGrammar.rules[i];

            let newRule = new GrammarRule(rule.left, rule.right);
            Object.assign(newRule, rule);

            newGrammar.rules[i] = newRule;
        }

        console.log("\nGrammar successfully read from file!\n");

        return newGrammar;
    }
}