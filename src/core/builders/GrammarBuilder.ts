import {FileWorker} from "../FileWorker";
import {PCFG} from "../grammar/PCFG";

export class GrammarBuilder
{
    public static buildGrammar():PCFG
    {
        // Try to read from file, otherwise build from training data
        var languageModel = GrammarBuilder.buildGrammarFromFile();
        if (!languageModel)
        {
            // Build from training data
            languageModel = GrammarBuilder.buildGrammarFromTrainingData();
        }

        return languageModel;
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

        console.log("\nGrammar successfully read from file!\n");

        return grammar;
    }
}