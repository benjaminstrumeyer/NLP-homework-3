import fs = require("fs");
import path = require("path");
import jsonfile = require("jsonfile");

export class FileWorker
{
    private static _grammarFile = "./output/grammar.json";

    public static getTestTrees():string
    {
        return fs.readFileSync("./data/test.trees").toString();
    }

    public static getTrainingTrees():string
    {
        return fs.readFileSync("./data/train.trees").toString();
    }

    public static readGrammarFile()
    {
        try
        {
            return jsonfile.readFileSync(FileWorker._grammarFile, {throws: false});
        }
        catch (e)
        {
            if (e.code !== "ENOENT") throw e;

            return null;
        }
    }

    public static writeGrammarFile(languageModel)
    {
        // Create directory for language model file
        try
        {
            var dir = path.parse(FileWorker._grammarFile).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        // Write the language model file
        jsonfile.writeFileSync(FileWorker._grammarFile, languageModel.corpus);
    }

    public static readTextFile(filename:string):string
    {
        return fs.readFileSync(filename).toString();
    }

    public static writeTextFile(filename:string, data:string)
    {
        // Create directory for the file
        try
        {
            var dir = path.parse(filename).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        // Write the language model file
        fs.writeFileSync(filename, data);
    }

    public static writeJsonFile(filename:string, data:string)
    {
        // Create directory for the file
        try
        {
            var dir = path.parse(filename).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        // Write the language model file
        jsonfile.writeFileSync(filename, data);
    }
}