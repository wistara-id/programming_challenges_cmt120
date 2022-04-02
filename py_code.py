# Exercise 1 : Defying Gravity
#
# Return the value of distance if isD is True or time otherwise.
# The return value is rounded to the second decimal digit.
#
# Please see further comments for elaborations.
#
def freeFall(val,isD):

    # Return time
    if isD:
        return round((2 * val / 9.81) ** 0.5, 2)
    # Return distance
    else:
        return round(0.5 * 9.81 * (val ** 2), 2)


# Exercise 2 : Rock-Paper-Scissor
#
# Return string that always wins the Rock-Paper-Scissors game.
#
# Please see further comments for elaborations.
#
def RPS(s):

    result = ''

    # Ensure a winning string for every input string
    for i in range(0, len(s)):
        if s[i]=='P':
            result += 'S'
        elif s[i] == 'R':
            result += 'P'
        else:
            result += 'R'

    return result


# Exercise 3 : List to String
#
# Return string output that satisfies expected format, i.e.,
# list2str(['a',['b','c']]) should return '[a[bc]]'
#
# Please see further comments for elaborations.
#
def list2str(l):

    result = '['

    for i in range(0, len(l)):

        # Implement a recursive approach to achieve the desired output
        if isinstance(l[i], list):
            result += list2str(l[i])
        else:
            result += l[i]

    result += ']'

    return result


# Exercise 4 : Text Preprocessing
#
# Process a text in defined steps to result in a list of strings.
#
# Please see further comments for elaborations.
#
def textPreprocessing(text):

    # Removal of all punctuation marks
    # '’' is different from "'"
    puncs = ['.','?','!',',',':',';','-','[',']','{','}','(',')','’','"',"'"]
    clears = ''
    result = []

    for i in range(0,len(text)):
        if not(text[i] in puncs):
            clears += text[i]

    # Conversion of text to lower case
    clears = clears.lower()

    # Segmentation into a list of words
    clears = clears.split()

    # Removal of stopwords
    stopWords = ['i', 'a', 'about', 'am', 'an', 'are', 'as', 'at', 'be', 'by', 'for',
                 'from', 'how', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the',
                 'this', 'to', 'was', 'what', 'when', 'where', 'who', 'will', 'with']

    for i in clears:
        if not(i in stopWords):
            result.append(i)

    # Crude Stemming
    for i in range(0, len(result)):
        if result[i][-2:] == 'ed':
            result[i] = result[i][:-2]
        elif result[i][-3:] == 'ing':
            result[i] = result[i][:-3]
        elif result[i][-1:] == 's':
            result[i] = result[i][:-1]

    return result


# Exercise 5 : Dictionary Dominance
#
# Compare two dictionaries, i.e., dict1 and dict2.
# Return True if and only if dict1 is >= dict2 with respect to all keys and
# is strictly greater that dict2 in at least one key.
# If dict1 does not have a key# that dict2 has, dict1 is lower than dict2 with
# respect to that key, regardless of the value that the latter might have.
#
# Please see further comments for elaborations.
#
def isGreaterThan(dict1,dict2):

    switchOne = False;
    switchTwo = True;

    #  Check if dict1 is >= dict2 with respect to all keys and
    # is strictly greater that dict2 in at least one key.
    for key in dict1:
        if key in dict2:
            if dict1[key] >= dict2[key]:
                if dict1[key] > dict2[key]:
                    switchOne = True
            else:
                switchTwo = False

    # If dict1 does not have a key that dict2 has, dict1 is lower than dict2
    for key in dict2:
        if not(key in dict1):
            switchOne = False

    return switchOne and switchTwo


# Exercise 6 : Reading CSV Files
#
# This code implements a simple header check based on the first element of the first line in the CSV file.
# If it is not a number, then header exist. If the file header is in number formatting, this code will fail.
# However, the assignment stated that inputs are provided in the appropriate format and type, so it can be
# assumed that this simple check is sufficient.
#
# Please see further comments for elaborations.
#
def CSVsum(filename):

    with open(filename) as f:
        lines = f.read().splitlines()

    # Simple header check, i.e., check if the first element in CSV file is not a number
    if lines[0][0] not in '.-0123456789':
        del lines[0]

    for i in range(0, len(lines)):
        lines[i] = [float(x) for x in lines[i].split(',')]

    result = [sum(x) for x in zip(*lines)]

    return result


# Exercise 7 : String to List
#
# Return string output that satisfies expected format, i.e.,
# str2list('[abc]') should return ['a','b','c']
# 
# Please see further comments for elaborations.
#
def str2list(s):

    s = s[1:-1]

    # Implement recursive approach to achieve the desired output using iterator
    def str2list_helper():
        try:
            token = next(tokens)
        except StopIteration:
            return []
        if token == ']':
            return []
        elif token == '[':
            return [str2list_helper()] + str2list_helper()
        else:
            return [token] + str2list_helper()

    tokens = iter(s)

    return str2list_helper()


# Exercise 8 : Spacemon Competition
#
# Simulate the fictious Spacemon competition.
#
# Please see further comments for elaborations.
#
def spacemonSim(roster1,roster2):

    lstRoster1 = [list(x) for x in roster1]
    lstRoster2 = [list (x) for x in roster2]

    planet = {'mercury' : 0, 'venus' : 1, 'earth' : 2, 'mars' : 3}

    multiplier = [
        [1, 2, 1, 0.5],
        [0.5, 1, 2, 1],
        [1, 0.5, 1, 2],
        [2, 1, 0.5, 1]
    ];

    # Apply energy substraction based on multiplier effect of power for every match in the roster
    for spacemonAttack in lstRoster1:
        for spacemonDefend in lstRoster2:
            damageAttack = multiplier[planet[spacemonAttack[0].lower()]][planet[spacemonDefend[0].lower()]] * spacemonAttack[2]
            damageDefend = multiplier[planet[spacemonDefend[0].lower()]][planet[spacemonAttack[0].lower()]] * spacemonDefend[2]

            # Continue match until one roster is defeated
            while True:
                spacemonDefend[1] = spacemonDefend[1] - damageAttack
                if spacemonDefend[1] <= 0:
                    result = True
                    break
                spacemonAttack[1] = spacemonAttack[1] - damageDefend
                if spacemonAttack[1] <= 0:
                    result = False
                    break

    return result


# Exercise 9 : 2D Most Rewarding Shortest Path
#
# This code was adapted from Stack Overflow answer by akurtser 19-03-2019
# accessed 07-12-2021
# https://stackoverflow.com/questions/55239386/finding-shortest-path-in-two-dimensional-array-javascript
#
# The adapted code is based on BFS (Breadth-first search) on an unweighted graph. BFS has a simple FIFO 
# (first in, first out) queue, so the BFS in the adapted code will only find the shortest path and ignore
# the reward. However, exercise 9 requires choosing the most rewarding path by prioritizing possible
# 'R' cells in the traversal path. The queue mechanism in the adapted code is modified so that the 'R' cells
# will always be prioritized over 'O' cells when choosing the shortest path.
#
# Please see further comments for adaptions.
#

def rewardShortPath(env):

    def successors(root, env):

        connectedCells = [
          [root[0] - 1, root[1]],
          [root[0], root[1] - 1],
          [root[0] + 1, root[1]],
          [root[0], root[1] + 1]
        ]

        validCells = []

        for cell in connectedCells:
            if cell[0] >= 0 and cell[0] < len(env) and cell[1] >= 0 and cell[1] < len(env[0]):
                validCells.append(cell)

        successors = []

        for cell in validCells:
            if env[cell[0]][cell[1]].upper() != 'X':
                successors.append(cell)

        envValues = {}

        for cell in successors:
            envValues[str(cell)] = env[cell[0]][cell[1]]
        #
        # The successors (next elements) for the queue is sorted, so that the 'R' cells will
        # always be the last to be out from the queue.Since it is safe to assume that the weight
        # for R is always 1 (reward for R is 1), the sorted BFS queue will always return
        # traversal path that includes all possible 'R' cells (the most rewarding path).
        #
        sortedEnvValues = {k: v for k, v in sorted(envValues.items(), key=lambda item: item[1], reverse=False)}

        successors_1 = []
        for cellu in sortedEnvValues:
            successors_1.append(list(map(int, cellu[1:-1].split(','))))

        return successors_1

    def buildPath(traversalTree, IndexTo, IndexFrom):
        path = [IndexTo]
        parent = traversalTree[str(IndexTo)]
        rewardTotal = 0
        parentExist = True

        while parentExist:
            if env[parent[0]][parent[1]].upper() == 'R':
                rewardTotal += 1
            path.append(parent)
            if not str(parent) == str(IndexFrom):
                parent = traversalTree[str(parent)]
            else:
                parentExist = False

        return ((len(path) - 1),rewardTotal)

    def bfs(theIndex):

        indexFrom = theIndex[0]
        indexTo = theIndex[1]
        traversalTree = {}
        visited = set()
        queue = []
        queue.append(indexFrom)

        while len(queue):
            subtreeRoot = queue[0]
            del queue[0]
            visited.add(str(subtreeRoot))

            if str(subtreeRoot) == str(indexTo):
                return buildPath(traversalTree, indexTo, indexFrom)

            for child in successors(subtreeRoot, env):
                if str(child) not in visited:
                    #
                    # In here, the sorted successors' queue will ensure that all possible 'R' cells are always placed
                    # in the traversal tree by overwriting the 'O' cell if previously existed in the traversal path
                    # since the 'R' cell will always be the last to be out from the queue.
                    #
                    traversalTree[str(child)] = subtreeRoot
                    queue.append(child)

    def getIndex():

        indexFrom = []
        indexTo = []

        for i in range(0, len(env)):
            for j in range(0, len(env[i])):
                if env[i][j].upper() == 'B':
                    indexTo.append(i)
                    indexTo.append(j)
                elif env[i][j].upper() == 'A':
                    indexFrom.append(i)
                    indexFrom.append(j)

        return [indexFrom, indexTo]

    result = bfs(getIndex())

    return result


# Exercise 10 : Social Network Analysis
#
# This code implementation is based on the ideas that:
# 1. Two distinct vertices/nodes in a clique are adjacent/connected.
# 2. A maximal clique cannot be extended by including one more adjacent vertex.
#
# Please see further comments for elaborations.
#
def cliqueCounter(network):

    node = {}
    dictAdjMat = []
    result = []

    # Return maximal clique for each node
    def getMaxClique(currentNodeDict):

        maxClique = 0
        tempClique = []
        neighbours = node[currentNodeDict]
        unique = False

        # Get list of neighbours from the adjacency matrix dictionary
        for x in neighbours:
            if x != currentNodeDict:
                if sorted(node[x]) not in tempClique:
                    tempClique.append(sorted(node[x]))

        # A maximal clique can be counted by iterating each neighbours elements (connected element)
        # and by checking whether an element is a subset of other elements (distinct) to ensure
        # that duplicated subset is only counted once.
        for i in range(0, len(tempClique)):
            for j in range(0, len(tempClique)):
                if i != j:
                    check =  all(item in tempClique[i] for item in tempClique[j])
                    if check:
                        unique = False
                        break
                    else:
                        unique = True

            if unique:
                maxClique += 1

        return maxClique

    # Create a dictionary to represent nodes from the adjacency matrix
    # Node is ranged from 0 to the n length of the network, i.e., 0, 1, 2, ..., n
    for i in range(0, len(network)):
        for j in range(0,len(network)):
            if network[i][j] == 1:
                dictAdjMat.append(j)
        # Need to append key (i) into the end of each node, for easier processing later
        dictAdjMat.append(i)
        node[i] = dictAdjMat
        dictAdjMat = []

    # Now using the dictionary of adjacency matrix, get maximal clique for each node
    for nodeDict in range(0, len(network)):
        result.append(getMaxClique(nodeDict))

    return result
