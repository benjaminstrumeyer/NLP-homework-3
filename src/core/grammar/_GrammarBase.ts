import {GrammarRule} from "../models/GrammarRule";
import {TreeParser} from "../parsers/TreeParser";
import {PCFGTree} from "../models/PCFGTree";
import {TreeNode} from "../models/TreeNode";
import {Preprocess} from "../Preprocess";

export abstract class _GrammarBase
{
    public rules:GrammarRule[];

    public train(unparsedTrees:string)
    {
        var treeLines = Preprocess.getTreeLines(unparsedTrees);

        for (let tree of treeLines)
        {
            let parsedTree = TreeParser.parseTree(tree);
            let rules = this.convertTreeToRules(parsedTree);

            this.rules = (this.rules || []).concat(rules);
        }

        console.log(this.rules.map(x => x.toString()));
    }

    private convertTreeToRules(tree:PCFGTree):GrammarRule[]
    {
        var root = tree.root;

        return this.parseTreeNodes(root);
    }

    private parseTreeNodes(node:TreeNode):GrammarRule[]
    {
        if(node.isTerminal())
            return [];

        var rules:GrammarRule[] = [];

        var left = node.data;
        var right = node.children.map(child => child.data);

        rules.push(new GrammarRule(left, right));

        var childrenRules = node.children
            .map(child => this.parseTreeNodes(child))
            .reduce((left, right) => left.concat(right));

        return rules.concat(childrenRules);
    }
}