import {WordTagPair} from "../models/TreeNode";

export class Analyzer
{
    public static computeConfusionMatrix(originalPairs:WordTagPair[], predictedPairs:WordTagPair[])
    {
        var matrixMap = Analyzer.getConfusionMatrixMap(originalPairs, predictedPairs);

        var tagsArray = Analyzer.getTopTags(matrixMap, 10);

        var confusionMatrix = Analyzer.generateMatrix(matrixMap, tagsArray);

        return confusionMatrix;
    }

    private static generateMatrix(matrixMap, topTags)
    {
        var tags = topTags.map(x => x.tag);

        var matrix = [];

        for (let i = 0; i < tags.length; i++)
        {
            matrix[i] = [];

            for (let j = 0; j < tags.length; j++)
            {
                let tag1 = tags[i];
                let tag2 = tags[j];

                matrix[i][j] = matrixMap[tag1][tag2] || 0;
            }
        }

        return {matrix, tags};
    }

    private static getTopTags(matrixMap, count)
    {
        var tagsArray = [];

        for (let key1 in matrixMap)
        {
            if (!matrixMap.hasOwnProperty(key1))
                continue;

            var tuple = {
                tag: key1,
                count: 0
            };

            for (let key2 in matrixMap[key1])
            {
                if (!matrixMap[key1].hasOwnProperty(key2))
                    continue;

                tuple.count += matrixMap[key1][key2];
            }

            tagsArray.push(tuple);
        }

        tagsArray.sort((l, r) =>
        {
            return r.count - l.count;
        });

        return tagsArray.slice(0, 10);
    }

    private static getConfusionMatrixMap(originalPairs:WordTagPair[], predictedPairs:WordTagPair[])
    {
        // matrix[tag][tag] = value
        var matrixMap = {};

        for (let i = 0; i < originalPairs.length; i++)
        {
            let originalTag = originalPairs[i].tag;
            let predictedTag = predictedPairs[i].tag;

            if (!matrixMap[originalTag])
                matrixMap[originalTag] = {};

            if (!matrixMap[originalTag][predictedTag])
                matrixMap[originalTag][predictedTag] = 0;

            matrixMap[originalTag][predictedTag]++;
        }

        return matrixMap;
    }
}