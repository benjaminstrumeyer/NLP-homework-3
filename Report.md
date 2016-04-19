## 

---

## Evaluator

* We did not know how to use the evaluator. 

---

## Top 10 Frequent Rules

PUNC => .
TO => to
PP => IN NP_NNP
IN => from
PP => IN NP
PP => TO NP_NNP
NNS => flights
NP => NNP NNP
PUNC => ? 
DT => the


## Examples of Errors:

* When using parse-single to run the CYK algorithm on a single sentence, sometimes it'll return a null. This does not mean our algorithm doesn't work. It means that the grammar we developed using our test trees file did not give us proper rules for possibly unknown words in the sentence string. For example, if a word in our sentence is "gfdgfd", then we most likely won't have a nonterminal relating to "gfdgfd" in our grammar.

* 