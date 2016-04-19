import fs = require("fs");
import path = require("path");
import jsonfile = require("jsonfile");
import {PCFG} from "./grammar/PCFG";

export class FileWorker
{
    private static _grammarFile = "./output/grammar.json";
    private static _rulesFile = "./output/rules.txt";

    public static getTestTrees():string
    {
        return fs.readFileSync("./data/test.trees").toString();
    }

    public static getTrainingTrees():string
    {
        return fs.readFileSync("./data/train.trees").toString();
    }

    public static readGrammarFile():PCFG
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

    public static writeGrammarFile(grammar:PCFG)
    {
        try
        {
            var dir = path.parse(FileWorker._grammarFile).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        // Write the grammar to the grammar file
        jsonfile.writeFileSync(FileWorker._grammarFile, grammar);

        // Write a readable version of the rules to the rules filethis.rules
        var rulesText = grammar.rules
            .sort((x, y) =>
            {
                if (x.left < y.left) return -1;
                if (x.left > y.left) return 1;
                return 0;
            })
            .map(x => x.toString())
            .reduce((x, y) => x + "\n" + y);

        FileWorker.writeTextFile(FileWorker._rulesFile, rulesText);
    }

    public static readTextFile(filename:string):string
    {
        return fs.readFileSync(filename).toString();
    }

    public static writeTextFile(filename:string, data:string)
    {
        try
        {
            var dir = path.parse(filename).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        fs.writeFileSync(filename, data);
    }

    public static writeJsonFile(filename:string, data:any)
    {
        try
        {
            var dir = path.parse(filename).dir;
            fs.mkdirSync(dir);
        }
        catch (e)
        {
            if (e.code !== "EEXIST") throw e;
        }

        jsonfile.writeFileSync(filename, data);
    }
}