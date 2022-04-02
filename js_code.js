const fs = require('fs');

module.exports = {

/* Exercise 1 : Defying Gravity
*
* Return the value of distance if isD is True or time otherwise.
* The return value is rounded to the second decimal digit.
*
* Please see further comments for elaborations.
*/
    freefall: (val, isD) => {

        let result = (() => {

            if (isD) {
                // Return time
                return (2 * val / 9.81) ** 0.5;
            } else {
                // Return distance
                return 0.5 * 9.81 * (val ** 2);
            };

        })();

        return parseFloat(result).toFixed(2);
    },


/* Exercise 2 : Rock-Paper-Scissor
*
* Return string that always wins the Rock-Paper-Scissors game.
*
* Please see further comments for elaborations.
*/
    RPS: (play) => {

        let result = "";

        // Ensure a winning string for every input string
        for (let i = 0; i < play.length; i++) {
            if (play[i]=='P') {
                result += 'S';
            } else if (play[i] == 'R') {
                result += 'P';
            } else {
                result += 'R';
            };
        };

        return result;
    },


/* Exercise 3 : List to String
*
* Return string output that satisfies expected format, i.e.,
* list2str(['a',['b','c']]) should return '[a[bc]]'
*
* Please see further comments for elaborations.
*/
    list2str: (l) => {

        let result = '[';

        for (let i = 0; i < l.length; i++) {

            // Implement a recursive approach to achieve the desired output
            if (l[i].constructor === Array) {
                result += module.exports.list2str(l[i]);
            } else {
                result += l[i];
            };

        };

        return result += ']';
    },


/* Exercise 4 : Text Preprocessing
*
* Process a text in defined steps to result in an array of strings.
*
* Please see further comments for elaborations.
*/
    textPreprocessing: (text) => {

        var result = [];

        // Removal of all punctuation marks
        // '’' is different from "'"
        var clears = text.replace(/[.?!,:;\-\[\]{}()’'"]/g,"");
        // Just in case double spaces exist - not needed in the defined steps
        clears = clears.replace(/\s{2,}/g," ");

        // Conversion of text to lower case
        clears = clears.toLowerCase();

        // Segmentation into a list of words
        clears = clears.split(' ');

        // Removal of stopwords
        const stopWords = ["i", "a", "about", "am", "an", "are", "as", "at", "be", "by", "for", 
                           "from", "how", "in", "is", "it", "of", "on", "or", "that", "the", 
                           "this", "to", "was", "what", "when", "where", "who", "will", "with"];

        clears.forEach((element) => {

            if (!stopWords.includes(element)) {
                result.push(element);
            };

        });

        // Crude Stemming
        result.forEach((element) => {

            if (element.slice(-2) == "ed") {
                result[result.indexOf(element)] = element.slice(0,-2);
            } else if (element.slice(-3) == "ing") {
                result[result.indexOf(element)] = element.slice(0,-3);
            } else if (element.slice(-1) == "s") {
                result[result.indexOf(element)] = element.slice(0,-1);
            }

        });

        return result;
    },


/* Exercise 5 : Dictionary Dominance
*
* Compare two dictionaries, i.e., dict1 and dict2.
* Return True if and only if dict1 is >= dict2 with respect to all keys and
* is strictly greater that dict2 in at least one key.
* If dict1 does not have a key* that dict2 has, dict1 is lower than dict2 with
* respect to that key, regardless of the value that the latter might have.
*
* Please see further comments for elaborations.
*/
    isGreaterThan: (dict1, dict2) => {

        let switchOne = false;
        let switchTwo = true;

        // Check if dict1 is >= dict2 with respect to all keys and
        // is strictly greater that dict2 in at least one key.
        Object.keys(dict1).forEach(function(key) {
            if (key in dict2) {
                if (dict1[key] >= dict2[key]) {
                    if (dict1[key] > dict2[key]) {
                        switchOne = true;
                    };
                } else {
                    switchTwo = false;
                };
            };
        });

        // If dict1 does not have a key that dict2 has, dict1 is lower than dict2
        Object.keys(dict2).forEach(function(key) {
            if (!(key in dict1)) {
                switchOne = false;
            };
        });

        return (switchOne && switchTwo);
    },


/* Exercise 6 : Reading CSV Files
*
* This code implements a simple header check based on the first element of the first line in the CSV file.
* If it is not a number, then header exist. If the file header is in number formatting, this code will fail.
* However, the assignment stated that inputs are provided in the appropriate format and type, so it can be
* assumed that this simple check is sufficient.
*
* Please see further comments for elaborations.
*/
    CSVsum: (filename) => {

        var content = fs.readFileSync(filename);
        content = content.toString();

        var headers = content.slice(0, content.indexOf("\n")).split(',');
        var rows = content.slice(content.indexOf("\n") + 1).split("\n");

        // Simple header check, i.e., check if the first element in CSV file is not a number
        if (!(isNaN(headers[0]))) {
            rows = content.slice(0, content.indexOf("\n")).split("\n");
            for (var key in content.slice(content.indexOf("\n") + 1).split("\n")) {
                rows.push(content.slice(content.indexOf("\n") + 1).split("\n")[key]);
            };
            for (let index = 0; index < headers.length; index++) {
                headers[index] = 'var' + index;
            };
        };

        const arr = rows.map(function (row) {
            const values = row.split(',');
            const el = headers.reduce(function (object, header, index) {
              object[header] = values[index];
              return object;
            }, {});
            return el;
        });

        var result = [];
        var sum = 0;

        for (var key in headers) {
            for (var keyss in arr) {
                if (!(isNaN(parseFloat(arr[keyss][headers[key]])))) {
                    sum += parseFloat(arr[keyss][headers[key]]);
                };
            };

            result.push(sum);
            sum = 0;
        };

        return result;
    },


/* Exercise 7 : String to List
*
* Return string output that satisfies expected format, i.e.,
* str2list('[abc]') should return ['a','b','c']
* 
* Please see further comments for elaborations.
*/
    str2list: (s) => {

        // Use regex to get the desired output
        let json = s.replace(/\w/g, '"$&"').replace(/""+/g, '","')
                    .replace(/\]\[+/g, '],[').replace(/\"\[+/g,'",[')
                    .replace(/\]\"+/g,'],"');

        let result = JSON.parse(json);

        return result;

    },


/* Exercise 8 : Spacemon Competition
*
* Simulate the fictious Spacemon competition.
*
* Please see further comments for elaborations.
*/
    spacemonSim: (roster1, roster2) => {

        var planet = {'mercury' : 0, 'venus' : 1, 'earth' : 2, 'mars' : 3};

        var result = undefined;

        const multiplier = [
            [1, 2, 1, 0.5],
            [0.5, 1, 2, 1],
            [1, 0.5, 1, 2],
            [2, 1, 0.5, 1]
        ];

        // Apply energy substraction based on multiplier effect of power for every match in the roster
        roster1.forEach((spacemonAttack) => {

            roster2.forEach((spacemonDefend) => {

                let damageAttack = multiplier[planet[spacemonAttack[0].toLowerCase()]]
                                             [planet[spacemonDefend[0].toLowerCase()]]
                                   * spacemonAttack[2];

                let damageDefend = multiplier[planet[spacemonDefend[0].toLowerCase()]]
                                             [planet[spacemonAttack[0].toLowerCase()]]
                                   * spacemonDefend[2];

                // Continue match until one roster is defeated
                while (true) {
                    spacemonDefend[1] = spacemonDefend[1] - damageAttack;
                    if (spacemonDefend[1] <= 0) {
                        result = true;
                        break;
                    }
                    spacemonAttack[1] = spacemonAttack[1] - damageDefend;
                    if (spacemonAttack[1] <= 0) {
                        result = false;
                        break;
                    }
                };
            });
        });

        return result;

    },


/* Exercise 9 : 2D Most Rewarding Shortest Path
*
* This code was adapted from Stack Overflow answer by akurtser 19-03-2019
* accessed 07-12-2021
* https://stackoverflow.com/questions/55239386/finding-shortest-path-in-two-dimensional-array-javascript
* 
* The adapted code is based on BFS (Breadth-first search) on an unweighted graph. BFS has a simple FIFO 
* (first in, first out) queue, so the BFS in the adapted code will only find the shortest path and ignore
* the reward. However, exercise 9 requires choosing the most rewarding path by prioritizing possible
* 'R' cells in the traversal path. The queue mechanism in the adapted code is modified so that the 'R' cells
* will always be prioritized over 'O' cells when choosing the shortest path.
* 
* Please see further comments for adaptions.
*/
    rewardShortPath: (env) => {

        const successors = (root, env) => {
            let connectedCells = [
            [root[0] - 1, root[1]],
            [root[0], root[1] - 1],
            [root[0] + 1, root[1]],
            [root[0], root[1] + 1]
            ]

            const validCells = connectedCells.filter(
            (cell) => (
                cell[0] >= 0 && cell[0] < env.length 
                && cell[1] >= 0 && cell[1] < env[0].length)
            )

            const successors = validCells.filter(
            (cell) => ((env[cell[0]][cell[1]]).toUpperCase() !== 'X')
            )

            let envValues = {}
            successors.forEach((cell) => {
                envValues[cell] = env[cell[0]][cell[1]]
            })

            let arrEnvValues = []

            for (var key in envValues) {
                arrEnvValues.push([ key, envValues[key] ])
            }

            /* 
            * The successors (next elements) for the queue is sorted, so that the 'R' cells will
            * always be the last to be out from the queue.Since it is safe to assume that the weight
            * for R is always 1 (reward for R is 1), the sorted BFS queue will always return
            * traversal path that includes all possible 'R' cells (the most rewarding path).
            */
            arrEnvValues.sort(function compare(kv1, kv2) {
                if (kv1[1].toUpperCase() > kv2[1].toUpperCase()){ return 1 }
                else if (kv1[1].toUpperCase() < kv2[1].toUpperCase()){ return -1 }
                else { return 0 }
            })

            let successors_1 = []

            arrEnvValues.forEach((cell) => {
                successors_1.push(cell[0].split(',').map(Number))
            })

            return successors_1
        };

        const buildPath = (traversalTree, to) => {
            let path = [to]
            let parent = traversalTree[to]
            let rewardTotal = 0
            while (parent) {
                if ((env[parent[0]][parent[1]]).toUpperCase() === 'R') {
                    rewardTotal += 1
                }
                path.push(parent)
                parent = traversalTree[parent]
            }
            return [(path.reverse().length - 1),rewardTotal]
        }

        const bfs = (theIndex) => {
            from = theIndex[0]
            to = theIndex[1]
            let traversalTree = []
            let visited = new Set
            let queue = []
            queue.push(from)
        
            while (queue.length) {
                let subtreeRoot = queue.shift()
                visited.add(subtreeRoot.toString())

                if (subtreeRoot.toString() == to.toString()) return buildPath(traversalTree, to)

                for (child of successors(subtreeRoot, env)) {
                    if (!visited.has(child.toString())){
                        /*
                        * In here, the sorted successors' queue will ensure that all possible 'R' cells are always placed
                        * in the traversal tree by overwriting the 'O' cell if previously existed in the traversal path
                        * since the 'R' cell will always be the last to be out from the queue.
                        */
                        traversalTree[child] = subtreeRoot
                        queue.push(child)
                    }
                }
            }
        }

        const getIndex = () => {
            let indexFrom = []
            let indexTo = []

            for (let i=0; i<env.length; i++)
            {
                for (let j=0; j<env[i].length;j++)
                {
                    if ((env[i][j]).toUpperCase() === 'B'){
                        indexTo.push(i,j)
                    }
                    else if ((env[i][j]).toUpperCase() === 'A'){
                        indexFrom.push(i,j)
                    }
                }
            }

            return [indexFrom, indexTo]
        }

        let result = bfs(getIndex())

        return result

    },


/* Exercise 10 : Social Network Analysis
*
* This code implementation is based on the ideas that:
* 1. Two distinct vertices/nodes in a clique are adjacent/connected.
* 2. A maximal clique cannot be extended by including one more adjacent vertex.
*
* Please see further comments for elaborations.
*/
    cliqueCounter: (network) => {

        let node = new Set
        let dictAdjMat = []
        let result = []

        // Return maximal clique for each node
        const getMaxClique = (currentNodeDict) => {

            let maxClique = 0
            let tempClique = []
            let neighbours = node[currentNodeDict]
            let unique = false

            neighbours = node[currentNodeDict].split(',').map(Number).sort()

            neighbours.forEach((elements) => {
                if (elements !== currentNodeDict) {
                    let a = JSON.stringify(tempClique)
                    let b = JSON.stringify(node[elements].split(',').map(Number).sort())
                    let c = a.indexOf(b)
                    if (c == -1) {
                        tempClique.push(node[elements].split(',').map(Number).sort())
                    }
                }
            })

            /*
            * A maximal clique can be counted by iterating each neighbours elements (connected element)
            * and by checking whether an element is a subset of other elements (distinct) to ensure
            * that duplicated subset is only counted once.
            */
            for (let i=0; i<tempClique.length; i++) {
                for(let j=0; j<tempClique.length; j++) {
                    if (i !== j) {
                        let check = tempClique[j].every(r=> tempClique[i].includes(r))
                        if (check) {
                            unique = false
                            break
                        }
                        else {
                            unique = true
                        }
                    }
                }
                if (unique) {
                    maxClique += 1
                }
            }

            return maxClique
        }

        // Create a dictionary to represent nodes from the adjacency matrix
        // Node is ranged from 0 to the n length of the network, i.e., 0, 1, 2, ..., n
        for (let i=0; i<network.length; i++) {
            for (let j=0; j<network.length; j++) {
                if (network[i][j] == 1){
                    dictAdjMat.push(j)
                }
            }
            //Need to append key (i) into the end of each node, for easier processing later
            dictAdjMat.push(i)
            node[i] = dictAdjMat.join()
            dictAdjMat = []
        }

        // Now using the dictionary of adjacency matrix, get maximal clique for each node
        for (let nodeDict=0; nodeDict<network.length; nodeDict++)
        {
            result.push(getMaxClique(nodeDict))
        }

        return result;
    }
}
