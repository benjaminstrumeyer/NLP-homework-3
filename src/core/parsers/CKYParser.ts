
import {PCFG} from "../grammar/PCFG";
import {NonTerminalTuple} from "../models/NonTerminalTuple";


export class CKYParser {

    private grammar: PCFG;
    private table:NonTerminalTuple[][][];


    constructor(grammar:PCFG) {
        this.grammar = grammar;
    }

    public parse(sequence: string) {
        var words = sequence.split(/\s+/g);

        //This is the diagonal initializing loop
        for (let i = 0; i < words.length; i++) {

            // Find all the rules that have the right hand side as the word i.
            let word = words[i];

            // Find all the rules in the grammar with word on the right side.
            let tuples = this.findLHSForNonTerminal(word);

            this.table[i][i] = tuples;
        }


    }

    private findLHSForNonTerminal(word:string):NonTerminalTuple[] {
        var rules = this.grammar.rules;

        var matchingLefts = rules
            .filter(rule => rule.isUnary() && rule.right[0] === word);

        var tuples = matchingLefts
            .map(x =>
            {
                let t = new NonTerminalTuple();
                t.nonTerminal = x;
                return t;
            });

        return tuples;
    }
}