import fs = require("fs");
import path = require("path");
import jsonfile = require("jsonfile");

export class FileWorker
{
    private static _languageModelFile = "./output/language_model.json";

    public static getTestCorpus():string
    {
        return fs.readFileSync("./data/test.txt").toString();
    }

    public static getTrainingCorpus():string
    {
        return fs.readFileSync("./data/train.txt").toString();
    }

    public static readLanguageModelFile()
    {
        try
        {
            return jsonfile.readFileSync(FileWorker._languageModelFile, {throws: false});
        }
        catch (e)
        {
            if (e.code !== "ENOENT") throw e;

            return null;
        }
    }

    public static writeLanguageModelFile(languageModel)
    {
        // Create directory for language model file
        try
        {
            var dir = path.parse(FileWorker._languageModelFile).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        // Write the language model file
        jsonfile.writeFileSync(FileWorker._languageModelFile, languageModel.corpus);
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