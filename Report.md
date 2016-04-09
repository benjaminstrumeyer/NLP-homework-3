##Assumptions

* While parsing the corpuses, I assumed that each sequence began with an arbtrary number, and was delimited by a `\n`.
* I ignored the arbitrary line numbers at the beginning of each sequence in both the training and test corpus.
* While parsing the tags for each word, I assumed that each token was in the format of `{word}/{tag}`.
* I added the start token/tag pair (`<s>/<s>`) in front of each sequence in each corpus while processing the respective corpuses, but disregarded them while generating any report such as accuracy / precision / confusion matrix etc. 

---

##Accuracy
####Frequency Based Tagger: 75.49%
####HMM Tagger: 62.76%

---

##Confusion Matrices
####Frequency Based Tagger:

|            | NN  | NNP | IN  | DT  | -NONE- | NNS | JJ  | ,   | .   | VBD |
|------------|-----|-----|-----|-----|--------|-----|-----|-----|-----|-----|
| **NN**     | 652 | 3   | 0   | 0   | 0      | 2   | 7   | 0   | 0   | 1   |
| **NNP**    | 276 | 267 | 0   | 0   | 0      | 0   | 4   | 0   | 0   | 0   |
| **IN**     | 1   | 0   | 537 | 0   | 0      | 0   | 1   | 0   | 0   | 0   |
| **DT**     | 2   | 0   | 2   | 431 | 0      | 0   | 0   | 0   | 0   | 0   |
| **-NONE-** | 40  | 0   | 0   | 0   | 303    | 0   | 0   | 0   | 0   | 0   |
| **NNS**    | 129 | 0   | 0   | 0   | 0      | 209 | 0   | 0   | 0   | 0   |
| **JJ**     | 154 | 1   | 0   | 1   | 0      | 0   | 148 | 0   | 0   | 0   |
| **,**      | 0   | 0   | 0   | 0   | 0      | 0   | 0   | 235 | 0   | 0   |
| **.**      | 0   | 0   | 0   | 0   | 0      | 0   | 0   | 0   | 198 | 0   |
| **VBD**    | 62  | 0   | 0   | 0   | 0      | 0   | 0   | 0   | 0   | 112 |

####HMM Tagger:

|            | NN  | NNP | IN  | DT  | -NONE- | NNS | JJ  | ,   | .   | VBD |
|------------|-----|-----|-----|-----|--------|-----|-----|-----|-----|-----|
| **NN**     | 497 | 62  | 19  | 45  | 7      | 5   | 25  | 0   | 1   | 0   |
| **NNP**    | 83  | 345 | 17  | 60  | 3      | 4   | 31  | 0   | 0   | 0   |
| **IN**     | 7   | 8   | 478 | 15  | 6      | 1   | 1   | 5   | 0   | 2   |
| **DT**     | 2   | 11  | 22  | 394 | 2      | 0   | 1   | 0   | 0   | 0   |
| **-NONE-** | 31  | 22  | 13  | 11  | 256    | 2   | 4   | 0   | 0   | 2   |
| **NNS**    | 130 | 28  | 17  | 30  | 7      | 102 | 17  | 0   | 0   | 1   |
| **JJ**     | 31  | 32  | 17  | 75  | 12     | 1   | 133 | 1   | 1   | 1   |
| **,**      | 1   | 2   | 15  | 0   | 0      | 0   | 0   | 213 | 0   | 1   |
| **.**      | 0   | 0   | 0   | 0   | 0      | 0   | 0   | 0   | 198 | 0   |
| **VBD**    | 19  | 16  | 23  | 7   | 1      | 0   | 1   | 0   | 0   | 100 |