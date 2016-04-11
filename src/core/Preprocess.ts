export class Preprocess
{
    public static tokenizeCorpus(corpus:string):string[]
    {
        var sentences = Preprocess.getSentences(corpus);

        var tokens = [];
        for (let sentence of sentences)
        {
            tokens = tokens.concat(Preprocess.tokenize(sentence));
        }

        return tokens;
    }

    public static getSentences(corpus:string):string[]
    {
        // Split into sentences
        var lines = corpus.split(/\n/g);

        var result = [];
 
        for (let line of lines)
        {
            let sentence = line.trim();

            // If line is just whitespace, move on
            if (!sentence)
                continue;

            // Strip line numbers
            sentence = sentence.replace(/^(\d+\s)/g, "");

            result.push("<s>/<s> " + sentence);
        }

        return result;
    }

    public static tokenize(sentence:string):string[]
    {
        return sentence.split(/\s+/g);
    }
}