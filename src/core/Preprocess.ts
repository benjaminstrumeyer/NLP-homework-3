export class Preprocess
{
    public static getTreeLines(trees:string):string[]
    {
        var treeLines = trees.split(/\n/g);

        var result = [];

        for (let treeLine of treeLines)
        {
            // If tree is null or white space, then can't parse it man
            if(treeLine && !(/^\s+$/g).test(treeLine))
                result.push(treeLine);
        }

        return result;
    }
}