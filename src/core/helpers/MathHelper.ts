export class MathHelper
{
    public static doLogSum(...args:number[]):number
    {
        var sum = 0;

        for (let arg of args)
        {
            sum += Math.log10(arg);
        }

        return Math.pow(10, sum);
    }
}