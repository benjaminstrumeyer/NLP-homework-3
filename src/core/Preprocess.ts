export class Preprocess
{
    public static getLines(text:string):string[]
    {
        var lines = text.split(/\n/g);

        var result = [];

        for (let line of lines)
        {
            // If line is null or white space, then skip
            if(line && !(/^\s+$/g).test(line))
                result.push(line);
        }

        return result;
    }
}