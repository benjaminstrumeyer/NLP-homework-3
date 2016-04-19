## Evaluator

The evaluator output:

* parsed.trees    386 brackets
* test.trees      406 brackets
* matching        334 brackets

#### Accuracy: 82.266009852%

---

## Top 10 Frequent Rules

1. PUNC => .
2. TO => to
3. PP => IN NP_NNP
4. IN => from
5. PP => IN NP
6. PP => TO NP_NNP
7. NNS => flightsw
8. NP => NNP NNP
9. PUNC => ? 
10. DT => the

#### Number of Unary Rules: 397
#### Number of Binary Rules: 393

---

## Examples of Errors:

* When using parse-single to run the CYK algorithm on a single sentence, sometimes it'll return a null. This does not mean our algorithm doesn't work. It means that the grammar we developed using our test trees file did not give us proper rules for possibly unknown words in the sentence string. For example, if a word in our sentence is "gfdgfd", then we most likely won't have a nonterminal relating to "gfdgfd" in our grammar.

* Two of the sentences in `test.txt` didn't parse and returned empty trees. So we had to replace those trees in the `parsed.trees` file with "()" to make the evaluator work. Otherwise it was throwing errors because the two lines were empty.