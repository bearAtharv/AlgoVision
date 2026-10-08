window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderBars = document.querySelector('.loader-bars');
    if (loaderBars) {
        for (let i = 0; i < 5; i++) loaderBars.appendChild(document.createElement('span'));
    }
    setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('hidden');
    }, 1500);
});

document.addEventListener('DOMContentLoaded', () => {
    const algorithmList = document.getElementById('algorithm-list');
    const searchInputContainer = document.getElementById('search-input-container');
    const searchInput = document.getElementById('search-input');
    const timeComplexityEl = document.getElementById('time-complexity');
    const spaceComplexityEl = document.getElementById('space-complexity');
    const codeBlock = document.getElementById('code-block');
    const langButtons = document.querySelectorAll('.lang-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const speedSlider = document.getElementById('speed-slider');
    const customAlgoBtn = document.getElementById('custom-algo-btn');
    const learnBtn = document.getElementById('learn-btn');
    const languageSelector = document.getElementById('language-selector');
    const complexityInfo = document.getElementById('complexity-info');
    const codeContainer = document.getElementById('code-container');
    const customCodeContainer = document.getElementById('custom-code-container');
    const customCodeEditor = CodeMirror.fromTextArea(document.getElementById('custom-code-editor'), {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'javascript'
    });
    const explanationContainer = document.getElementById('explanation-container');
    const explanation = document.getElementById('explanation');
    const visualizeCustomCodeBtn = document.getElementById('visualize-custom-code-btn');

    let currentAlgorithm = 'Bubble Sort';
    let currentCategory = 'sorting';
    let currentLang = 'javascript';
    let currentView = 'bars';
    let animationSpeed = 45;
    let sketch;
    let worker;

    const algorithms = {
        sorting: {
            'Bubble Sort': {
                complexity: { time: 'O(n²)', space: 'O(1)' },
                code: {
                    javascript: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j+1];\n        arr[j+1] = temp;\n      }\n    }\n  }\n  return arr;\n}`,
                    python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`,
                    cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1])\n                swap(arr[j], arr[j+1]);\n}`,
                    java: `class BubbleSort {\n    void bubbleSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++)\n            for (int j = 0; j < n-i-1; j++)\n                if (arr[j] > arr[j+1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j+1];\n                    arr[j+1] = temp;\n                }\n    }\n}`
                }
            },
            'Selection Sort': {
                complexity: { time: 'O(n²)', space: 'O(1)' },
                code: {
                    javascript: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}`,
                    python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
                    cpp: `void selectionSort(int arr[], int n) {\n    int i, j, min_idx;\n    for (i = 0; i < n-1; i++) {\n        min_idx = i;\n        for (j = i+1; j < n; j++)\n          if (arr[j] < arr[min_idx])\n            min_idx = j;\n        swap(arr[min_idx], arr[i]);\n    }\n}`,
                    java: `class SelectionSort {\n    void sort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            int min_idx = i;\n            for (int j = i+1; j < n; j++)\n                if (arr[j] < arr[min_idx])\n                    min_idx = j;\n            int temp = arr[min_idx];\n            arr[min_idx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}`
                }
            },
            'Insertion Sort': {
                complexity: { time: 'O(n²)', space: 'O(1)' },
                code: {
                    javascript: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let current = arr[i];\n    let j = i - 1;\n    while ((j > -1) && (current < arr[j])) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = current;\n  }\n  return arr;\n}`,
                    python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i-1\n        while j >= 0 and key < arr[j] :\n                arr[j + 1] = arr[j]\n                j -= 1\n        arr[j + 1] = key`,
                    cpp: `void insertionSort(int arr[], int n) {\n    int i, key, j;\n    for (i = 1; i < n; i++) {\n        key = arr[i];\n        j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}`,
                    java: `class InsertionSort {\n    void sort(int arr[]) {\n        int n = arr.length;\n        for (int i = 1; i < n; ++i) {\n            int key = arr[i];\n            int j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j = j - 1;\n            }\n            arr[j + 1] = key;\n        }\n    }\n}`
                }
            },
            'Shell Sort': {
                complexity: { time: 'O(n log² n)', space: 'O(1)' },
                code: {
                    javascript: `function shellSort(arr) {\n  let n = arr.length;\n  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {\n    for (let i = gap; i < n; i += 1) {\n      let temp = arr[i];\n      let j;\n      for (j = i; j >= gap && arr[j-gap] > temp; j-=gap) {\n        arr[j] = arr[j-gap];\n      }\n      arr[j] = temp;\n    }\n  }\n  return arr;\n}`,
                    python: `def shell_sort(arr):\n    n = len(arr)\n    gap = n//2\n    while gap > 0:\n        for i in range(gap,n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j-gap] > temp:\n                arr[j] = arr[j-gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2`,
                    cpp: `int shellSort(int arr[], int n) {\n    for (int gap = n/2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i += 1) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n            arr[j] = temp;\n        }\n    }\n    return 0;\n}`,
                    java: `class ShellSort {\n    int sort(int arr[]) {\n        int n = arr.length;\n        for (int gap = n/2; gap > 0; gap /= 2) {\n            for (int i = gap; i < n; i += 1) {\n                int temp = arr[i];\n                int j;\n                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                    arr[j] = arr[j - gap];\n                arr[j] = temp;\n            }\n        }\n        return 0;\n    }\n}`
                }
            },
            'Merge Sort': {
                complexity: { time: 'O(n log n)', space: 'O(n)' },
                code: {
                    javascript: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n\n  let i = 0, j = 0, k = 0;\n  const result = [];\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) {\n      result[k++] = left[i++];\n    } else {\n      result[k++] = right[j++];\n    }\n  }\n  while (i < left.length) result[k++] = left[i++];\n  while (j < right.length) result[k++] = right[j++];\n  return result;\n}`,
                    python: `def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr)//2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1`,
                    cpp: `void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`,
                    java: `class MergeSort {\n    void merge(int arr[], int l, int m, int r) {\n        int n1 = m - l + 1;\n        int n2 = r - m;\n        int L[] = new int[n1];\n        int R[] = new int[n2];\n        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];\n        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];\n        int i = 0, j = 0, k = l;\n        while (i < n1 && j < n2) {\n            if (L[i] <= R[j]) arr[k++] = L[i++];\n            else arr[k++] = R[j++];\n        }\n        while (i < n1) arr[k++] = L[i++];\n        while (j < n2) arr[k++] = R[j++];\n    }\n\n    void sort(int arr[], int l, int r) {\n        if (l < r) {\n            int m = (l + r) / 2;\n            sort(arr, l, m);\n            sort(arr, m + 1, r);\n            merge(arr, l, m, r);\n        }\n    }\n}`
                }
            },
            'Quick Sort': {
                complexity: { time: 'O(n log n)', space: 'O(log n)' },
                code: {
                    javascript: `function quickSort(arr, low, high) {\n  if (low < high) {\n    let pi = partition(arr, low, high);\n    quickSort(arr, low, pi - 1);\n    quickSort(arr, pi + 1, high);\n  }\n  return arr;\n}\n\nfunction partition(arr, low, high) {\n  let pivot = arr[high];\n  let i = low - 1;\n  for (let j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n  return i + 1;\n}`,
                    python: `def partition(arr, low, high):\n    i = (low-1)\n    pivot = arr[high]\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i = i+1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i+1], arr[high] = arr[high], arr[i+1]\n    return (i+1)\n\ndef quick_sort(arr, low, high):\n    if len(arr) == 1:\n        return arr\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi-1)\n        quick_sort(arr, pi + 1, high)`,
                    cpp: `void swap(int* a, int* b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint partition (int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
                    java: `class QuickSort {\n    int partition(int arr[], int low, int high) {\n        int pivot = arr[high];\n        int i = (low-1);\n        for (int j=low; j<high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i+1];\n        arr[i+1] = arr[high];\n        arr[high] = temp;\n        return i+1;\n    }\n\n    void sort(int arr[], int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            sort(arr, low, pi-1);\n            sort(arr, pi+1, high);\n        }\n    }\n}`
                }
            },
        },
        searching: {
            'Linear Search': {
                complexity: { time: 'O(n)', space: 'O(1)' },
                code: {
                    javascript: `function linearSearch(arr, key) {\n  for(let i = 0; i < arr.length; i++){\n    if(arr[i] === key) return i;\n  }\n  return -1;\n}`,
                    python: `def linear_search(arr, x):\n    for i in range(len(arr)):\n        if arr[i] == x:\n            return i\n    return -1`,
                    cpp: `int linearSearch(int arr[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == x)\n            return i;\n    return -1;\n}`,
                    java: `class LinearSearch {\n    public static int linearSearch(int arr[], int x) {\n        int n = arr.length;\n        for(int i = 0; i < n; i++) {\n            if(arr[i] == x)\n                return i;\n        }\n        return -1;\n    }\n}`
                }
            },
            'Binary Search': {
                complexity: { time: 'O(log n)', space: 'O(1)' },
                code: {
                    javascript: `function binarySearch(arr, key) {\n  let start = 0, end = arr.length - 1;\n  while (start <= end) {\n    let mid = Math.floor((start + end) / 2);\n    if (arr[mid] === key) return mid;\n    else if (arr[mid] < key) start = mid + 1;\n    else end = mid - 1;\n  }\n  return -1;\n}`,
                    python: `def binary_search(arr, low, high, x):\n    if high >= low:\n        mid = (high + low) // 2\n        if arr[mid] == x:\n            return mid\n        elif arr[mid] > x:\n            return binary_search(arr, low, mid - 1, x)\n        else:\n            return binary_search(arr, mid + 1, high, x)\n    else:\n        return -1`,
                    cpp: `int binarySearch(int arr[], int l, int r, int x) {\n    if (r >= l) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);\n        return binarySearch(arr, mid + 1, r, x);\n    }\n    return -1;\n}`,
                    java: `class BinarySearch {\n    int binarySearch(int arr[], int l, int r, int x) {\n        if (r >= l) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == x) return mid;\n            if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);\n            return binarySearch(arr, mid + 1, r, x);\n        }\n        return -1;\n    }\n}`
                }
            },
        },
        string: {
            'Palindrome': {
                complexity: { time: 'O(n)', space: 'O(1)' },
                code: {
                    javascript: `function isPalindrome(str) {\n  const len = str.length;\n  for (let i = 0; i < len / 2; i++) {\n    if (str[i] !== str[len - 1 - i]) {\n      return false;\n    }\n  }\n  return true;\n}`,
                    python: `def is_palindrome(s):\n    return s == s[::-1]`,
                    cpp: `bool isPalindrome(string S) {\n    string P = S;\n    reverse(P.begin(), P.end());\n    if (S == P) {\n        return true;\n    }\n    else {\n        return false;\n    }\n}`,
                    java: `class Palindrome {\n    boolean isPalindrome(String str) {\n        int i = 0, j = str.length() - 1;\n        while (i < j) {\n            if (str.charAt(i) != str.charAt(j))\n                return false;\n            i++;\n            j--;\n        }\n        return true;\n    }\n}`
                }
            }
        },
        graph: {
            'Dijkstra': {
                complexity: { time: 'O(E log V)', space: 'O(V)' },
                code: {
                    javascript: `function dijkstra(graph, startNode) {\n  let distances = {};\n  let prev = {};\n  let pq = new PriorityQueue();\n\n  distances[startNode] = 0;\n  pq.enqueue(startNode, 0);\n\n  for (let vertex in graph) {\n    if (vertex !== startNode) {\n      distances[vertex] = Infinity;\n    }\n    prev[vertex] = null;\n  }\n\n  while (!pq.isEmpty()) {\n    let minNode = pq.dequeue().element;\n\n    for (let neighbor in graph[minNode]) {\n      let newDist = distances[minNode] + graph[minNode][neighbor];\n\n      if (newDist < distances[neighbor]) {\n        distances[neighbor] = newDist;\n        prev[neighbor] = minNode;\n        pq.enqueue(neighbor, newDist);\n      }\n    }\n  }\n\n  return { distances, prev };\n}`,
                    python: `# Python code for Dijkstra's algorithm will go here`,
                    cpp: `// C++ code for Dijkstra's algorithm will go here`,
                    java: `// Java code for Dijkstra's algorithm will go here`
                }
            },
            'BFS': {
                complexity: { time: 'O(V + E)', space: 'O(V)' },
                code: {
                    javascript: `function bfs(graph, startNode) {\n  let visited = {};\n  let queue = [];\n\n  visited[startNode] = true;\n  queue.push(startNode);\n\n  while (queue.length > 0) {\n    let currentNode = queue.shift();\n\n    for (let neighbor of graph[currentNode]) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        queue.push(neighbor);\n      }\n    }\n  }\n}`,
                    python: `# Python code for BFS algorithm will go here`,
                    cpp: `// C++ code for BFS algorithm will go here`,
                    java: `// Java code for BFS algorithm will go here`
                }
            },
            'DFS': {
                complexity: { time: 'O(V + E)', space: 'O(V)' },
                code: {
                    javascript: `function dfs(graph, startNode) {\n  let visited = {};\n\n  function traverse(vertex) {\n    if (!vertex) return;\n\n    visited[vertex] = true;\n\n    for (let neighbor of graph[vertex]) {\n      if (!visited[neighbor]) {\n        traverse(neighbor);\n      }\n    }\n  }\n\n  traverse(startNode);\n}`,
                    python: `# Python code for DFS algorithm will go here`,
                    cpp: `// C++ code for DFS algorithm will go here`,
                    java: `// Java code for DFS algorithm will go here`
                }
            }
        }
    };

    const learnContent = {
        'Palindrome': {
            explanation: 'A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward, such as "madam" or "racecar".',
            howItWorks: 'The most common way to check for a palindrome is to compare the characters from the start and the end of the string, moving inwards. If all characters match, it\'s a palindrome.',
            code: `function isPalindrome(str) {\n  const len = str.length;\n  for (let i = 0; i < len / 2; i++) {\n    if (str[i] !== str[len - 1 - i]) {\n      return false;\n    }\n  }\n  return true;\n}`
        }
        // Add more explanations here
    };

    function getAlgoData(category, name) { return algorithms[category] ? algorithms[category][name] : undefined; }

    function updateUIForAlgorithm() {
        languageSelector.style.display = 'flex';
        complexityInfo.style.display = 'flex';
        explanationContainer.style.display = 'none';
        codeContainer.style.display = 'flex';
        customCodeContainer.style.display = 'none';
        guideBtn.style.display = 'none';
        viewButtons.forEach(btn => btn.style.display = currentCategory === 'graph' ? 'none' : 'inline-block');


        const algoData = getAlgoData(currentCategory, currentAlgorithm);
        if (algoData) {
            timeComplexityEl.textContent = algoData.complexity.time;
            spaceComplexityEl.textContent = algoData.complexity.space;
        }
        searchInputContainer.style.display = currentCategory === 'searching' || currentCategory === 'string' ? 'none' : 'flex';
        updateCodeView();
        if (sketch) sketch.reset();
    }


    function updateCodeView() {
        const algo = getAlgoData(currentCategory, currentAlgorithm);
        codeBlock.textContent = (algo && algo.code && algo.code[currentLang]) ? algo.code[currentLang] : '// Code not available for this language.';
        codeBlock.className = `language-${currentLang}`;
        Prism.highlightAll();
    }

    function setupSidebar() {
        algorithmList.innerHTML = '';
        Object.keys(algorithms).forEach(category => {
            const header = document.createElement('li');
            header.className = 'algo-subheader';
            header.textContent = category;
            algorithmList.appendChild(header);
            Object.keys(algorithms[category]).forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                li.dataset.alg = name;
                li.dataset.cat = category;
                li.addEventListener('click', () => {
                    currentAlgorithm = name;
                    currentCategory = category;
                    document.querySelectorAll('#algorithm-list li.active').forEach(item => item.classList.remove('active'));
                    li.classList.add('active');
                    updateUIForAlgorithm();
                });
                algorithmList.appendChild(li);
            });
        });
        const firstAlgo = algorithmList.querySelector('li[data-alg]');
        firstAlgo.classList.add('active');
        currentAlgorithm = firstAlgo.dataset.alg;
        currentCategory = firstAlgo.dataset.cat;
        updateUIForAlgorithm();
    }



    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateCodeView();
        });
    });

    const guideBtn = document.getElementById('guide-btn');
    const guideModal = document.getElementById('guide-modal');
    const learnModal = document.getElementById('learn-modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    guideBtn.addEventListener('click', () => {
        guideModal.style.display = 'block';
    });

    learnBtn.addEventListener('click', () => {
        const content = learnContent[currentAlgorithm];
        if (content) {
            document.getElementById('learn-title').textContent = currentAlgorithm;
            document.getElementById('learn-explanation').textContent = content.explanation;
            document.getElementById('learn-how-it-works').textContent = content.howItWorks;
            document.getElementById('learn-code').textContent = content.code;
            Prism.highlightAll();
            learnModal.style.display = 'block';
        } else {
            alert('Learning content for this algorithm is not available yet.');
        }
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            guideModal.style.display = 'none';
            learnModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == guideModal) {
            guideModal.style.display = 'none';
        }
        if (event.target == learnModal) {
            learnModal.style.display = 'none';
        }
    });

    customAlgoBtn.addEventListener('click', () => {
        currentAlgorithm = 'Custom';
        document.querySelectorAll('#algorithm-list li.active').forEach(item => item.classList.remove('active'));
        languageSelector.style.display = 'none';
        complexityInfo.style.display = 'none';
        explanationContainer.style.display = 'none';
        codeContainer.style.display = 'none';
        customCodeContainer.style.display = 'flex';
        guideBtn.style.display = 'block';

        if (!customCodeEditor.getValue()) {
            customCodeEditor.setValue(`function* isPalindrome(str) {\n  const len = str.length;\n  for (let i = 0; i < len / 2; i++) {\n    // Highlight the characters being compared\n    states[i] = 0;\n    states[len - 1 - i] = 0;\n    yield;\n\n    if (str[i] !== str[len - 1 - i]) {\n      // Not a palindrome, highlight the mismatched characters in red\n      states[i] = 1;\n      states[len - 1 - i] = 1;\n      yield;\n      return false;\n    }\n\n    // Characters match, highlight them in green\n    states[i] = 2;\n    states[len - 1 - i] = 2;\n    yield;\n  }\n\n  return true;\n}`);
        }
        if (sketch) sketch.reset();
    });

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentView = btn.dataset.view;
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (sketch) sketch.reset();
        });
    });

    speedSlider.addEventListener('input', e => {
        animationSpeed = e.target.value;
        if (sketch) sketch.frameRate(parseInt(animationSpeed));
    });

    visualizeCustomCodeBtn.addEventListener('click', () => {
        if (worker) {
            worker.terminate();
        }
        worker = new Worker('worker.js');
        worker.postMessage({ code: customCodeEditor.getValue(), values });
        visualizeCustomCodeBtn.innerText = 'Analyzing...';
        worker.onmessage = function(event) {
            if (event.data.error) {
                alert(event.data.error);
                visualizeCustomCodeBtn.innerText = 'Visualize';
                return;
            }
            const { time, space, explanation, steps } = event.data;
            timeComplexityEl.textContent = time;
            spaceComplexityEl.textContent = space;
            explanation.textContent = explanation;
            complexityInfo.style.display = 'flex';
            explanationContainer.style.display = 'flex';
            visualizeCustomCodeBtn.innerText = 'Visualize';
            sorter = (function*() {
                for (const step of steps) {
                    states = step;
                    yield;
                }
            })();
            sketch.loop();
        };
    });

    const s = (p) => {
        let values = [], states = [], sorter, graph;

        p.setup = () => {
            const container = document.getElementById('visualization-container');
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('visualization-container');
            p.frameRate(animationSpeed);
        };

        p.draw = () => {
            p.background('#1E1E1E');
            if (sorter) {
                let result = sorter.next();
                if (result.done) {
                    sorter = null;
                    p.noLoop();
                }
            }
            if (currentCategory === 'string') {
                drawString();
            } else if (currentCategory === 'graph') {
                drawGraph();
            } else {
                if (currentView === 'bars') drawBars(); else drawArray();
            }
        };

        function drawString() {
            let n = values.length;
            let boxSize = p.min(p.width / (n + 1), 60);
            let startX = (p.width - n * boxSize - (n - 1) * 5) / 2;
            let y = p.height / 2;
            for (let i = 0; i < n; i++) {
                if (values[i] === undefined) continue;
                p.stroke(getColor(states[i]));
                p.strokeWeight(3);
                p.fill('#2a2a2a');
                p.rect(startX + i * (boxSize + 5), y - boxSize / 2, boxSize, boxSize, 8);
                p.noStroke();
                p.fill('#E0E0E0');
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(boxSize * 0.5);
                p.text(values[i], startX + i * (boxSize + 5) + boxSize / 2, y);
            }
        }

        function drawBars() {
            let w = p.width / values.length;
            p.noStroke();
            for (let i = 0; i < values.length; i++) {
                if (values[i] === undefined) continue;
                let grad = p.drawingContext.createLinearGradient(i * w, p.height, i * w, p.height - values[i]);
                const baseColor = p.color(getColor(states[i]));
                grad.addColorStop(0, baseColor);
                grad.addColorStop(1, p.lerpColor(baseColor, p.color('#fff'), 0.3));
                p.drawingContext.fillStyle = grad;
                p.rect(i * w, p.height - values[i], w, values[i], 5, 5, 0, 0);
            }
        }

        function drawArray() {
            let n = values.length;
            let boxSize = p.min(p.width / (n + 1), 60);
            let startX = (p.width - n * boxSize - (n - 1) * 5) / 2;
            let y = p.height / 2;
            for (let i = 0; i < n; i++) {
                if (values[i] === undefined) continue;
                p.stroke(getColor(states[i]));
                p.strokeWeight(3);
                p.fill('#2a2a2a');
                p.rect(startX + i * (boxSize + 5), y - boxSize / 2, boxSize, boxSize, 8);
                p.noStroke();
                p.fill('#E0E0E0');
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(boxSize * 0.5);
                p.text(Math.floor(values[i]), startX + i * (boxSize + 5) + boxSize / 2, y);
            }
        }

        function drawGraph() {
            if (!graph) return;
            // Draw edges
            p.stroke('#888');
            p.strokeWeight(2);
            for (let i = 0; i < graph.nodes.length; i++) {
                for (let j = 0; j < graph.adj[i].length; j++) {
                    let u = graph.nodes[i];
                    let v = graph.nodes[graph.adj[i][j]];
                    p.line(u.x, u.y, v.x, v.y);
                }
            }

            // Draw nodes
            for (let i = 0; i < graph.nodes.length; i++) {
                let node = graph.nodes[i];
                p.stroke(getColor(states[i]));
                p.strokeWeight(3);
                p.fill('#2a2a2a');
                p.ellipse(node.x, node.y, 40, 40);
                p.noStroke();
                p.fill('#E0E0E0');
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(16);
                p.text(i, node.x, node.y);
            }
        }

        function getColor(state) {
            if (state === 0) return '#00A99D'; // Comparing
            if (state === 1) return '#FFC107'; // Swapping
            if (state === 2) return '#2E7D32'; // Sorted
            if (state === 3) return '#C51162'; // Pivot/Special
            return '#424242';
        }

                p.reset = () => {
                    p.noLoop();
                    if (currentCategory === 'string') {
                        values = 'level'.split('');
                        states = new Array(values.length).fill(-1);
                    } else if (currentCategory === 'graph') {
                        setupGraph();
                        states = new Array(graph.nodes.length).fill(-1);
                    } else {
                        let numElements = currentView === 'bars' ? 50 : 12;
                        values = Array.from({ length: numElements }, () => p.floor(p.random(1, 100)));
                        if (currentView === 'bars' && p.height > 0) {
                            values = values.map(v => p.map(v, 1, 100, 15, p.height - 20));
                        }
                        states = new Array(values.length).fill(-1);
                        if (currentCategory === 'searching') {
                            values.sort((a, b) => a - b);
                            const targetValue = values[p.floor(p.random(values.length))];
                            searchInput.value = Math.floor(targetValue);
                        }
                    }
                    sorter = getSorter();
                    p.redraw();
                };

                function setupGraph() {
                    graph = new Graph(6);
                    graph.addEdge(0, 1);
                    graph.addEdge(0, 2);
                    graph.addEdge(1, 3);
                    graph.addEdge(1, 4);
                    graph.addEdge(2, 4);
                    graph.addEdge(3, 4);
                    graph.addEdge(3, 5);
                    graph.addEdge(4, 5);
                    graph.positionNodes(p.width, p.height);
                }

                class Graph {
                    constructor(numNodes) {
                        this.nodes = [];
                        this.adj = [];
                        for (let i = 0; i < numNodes; i++) {
                            this.nodes.push({ x: 0, y: 0 });
                            this.adj.push([]);
                        }
                    }

                    addEdge(u, v) {
                        this.adj[u].push(v);
                        this.adj[v].push(u);
                    }

                    positionNodes(width, height) {
                        for (let i = 0; i < this.nodes.length; i++) {
                            this.nodes[i].x = p.random(50, width - 50);
                            this.nodes[i].y = p.random(50, height - 50);
                        }
                    }
                }
        
                function getSorter() {
                    if (currentAlgorithm === 'Custom') {
                        try {
                            const userCode = customCodeEditor.getValue();
                            const customAlgorithm = eval(`(${userCode})`);
                            return customAlgorithm(values, states);
                        } catch (e) {
                            console.error("Error in custom algorithm:", e);
                            alert("Error in your custom algorithm. Check the console for details.");
                            return null;
                        }
                    }
                    let target = parseInt(searchInput.value);
                    switch (currentAlgorithm) {
                        case 'Bubble Sort': return bubbleSort(values, states);
                        case 'Selection Sort': return selectionSort(values, states);
                        case 'Insertion Sort': return insertionSort(values, states);
                        case 'Shell Sort': return shellSort(values, states);
                        case 'Merge Sort': return mergeSort(values, 0, values.length - 1, states);
                        case 'Quick Sort': return quickSort(values, 0, values.length - 1, states);
                        case 'Linear Search': return linearSearch(values, states, target);
                        case 'Binary Search': return binarySearch(values, states, target);
                        case 'Palindrome': return isPalindrome(values, states);
                        case 'Dijkstra': return dijkstra(graph, 0, states);
                        case 'BFS': return bfs(graph, 0, states);
                        case 'DFS': return dfs(graph, 0, states);
                    }
                }
        function* bubbleSort(arr, states) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length - i - 1; j++) {
                    states[j] = 0; states[j + 1] = 0;
                    yield;
                    if (arr[j] > arr[j + 1]) {
                        states[j] = 1; states[j + 1] = 1;
                        yield;
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        yield;
                    }
                    states[j] = -1; states[j + 1] = -1;
                }
                states[arr.length - 1 - i] = 2;
            }
        }

        function* selectionSort(arr, states) {
            for (let i = 0; i < arr.length - 1; i++) {
                let min_idx = i;
                states[i] = 3;
                for (let j = i + 1; j < arr.length; j++) {
                    states[j] = 0;
                    yield;
                    if (arr[j] < arr[min_idx]) {
                        if(min_idx !== i) states[min_idx] = -1;
                        min_idx = j;
                        states[min_idx] = 3;
                    }
                    if(j !== min_idx) states[j] = -1;
                }
                states[i] = 1; states[min_idx] = 1;
                yield;
                [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
                states[min_idx] = -1;
                states[i] = 2;
                yield;
            }
            states[arr.length - 1] = 2;
        }

        function* insertionSort(arr, states) {
            states[0] = 2;
            for (let i = 1; i < arr.length; i++) {
                let key = arr[i];
                let j = i - 1;
                states[i] = 3;
                yield;
                while (j >= 0 && arr[j] > key) {
                    states[j] = 0;
                    yield;
                    states[j + 1] = 1;
                    arr[j + 1] = arr[j];
                    states[j] = 1;
                    yield;
                    states[j + 1] = 2;
                    states[j] = 2;
                    j--;
                }
                arr[j + 1] = key;
                states[i] = -1;
                for(let k=0; k<=i; k++) states[k] = 2;
                yield;
            }
            for(let k=0; k<arr.length; k++) states[k] = 2;
        }

        function* shellSort(arr, states) {
            let n = arr.length;
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i += 1) {
                    let temp = arr[i];
                    states[i] = 3;
                    let j;
                    for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                        states[j] = 0; states[j - gap] = 0;
                        yield;
                        arr[j] = arr[j - gap];
                        states[j] = 1; states[j-gap] = 1;
                        yield;
                        states[j] = -1; states[j-gap] = -1;
                    }
                    arr[j] = temp;
                    states[i] = -1;
                    yield;
                }
            }
            for(let i=0; i<n; i++) { states[i] = 2; if(i%5===0) yield; }
        }

        function* mergeSort(arr, l, r, states) {
            if (l >= r) return;
            const m = Math.floor((l + r) / 2);
            yield* mergeSort(arr, l, m, states);
            yield* mergeSort(arr, m + 1, r, states);
            yield* merge(arr, l, m, r, states);
        }

        function* merge(arr, l, m, r, states) {
            let n1 = m - l + 1;
            let n2 = r - m;
            let L = new Array(n1);
            let R = new Array(n2);

            for (let i = 0; i < n1; i++) L[i] = arr[l + i];
            for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

            let i = 0, j = 0, k = l;

            while (i < n1 && j < n2) {
                states[l + i] = 0;
                states[m + 1 + j] = 0;
                yield;
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    states[k] = 1;
                    i++;
                } else {
                    arr[k] = R[j];
                    states[k] = 1;
                    j++;
                }
                yield;
                states[k] = -1;
                k++;
            }

            while (i < n1) {
                arr[k] = L[i];
                states[k] = 1;
                yield;
                states[k] = -1;
                i++;
                k++;
            }

            while (j < n2) {
                arr[k] = R[j];
                states[k] = 1;
                yield;
                states[k] = -1;
                j++;
                k++;
            }
            for(let i = l; i <=r; i++) states[i] = 2;
            yield;
        }

        function* quickSort(arr, low, high, states) {
            if (low < high) {
                let pi = yield* partition(arr, low, high, states);
                yield* quickSort(arr, low, pi - 1, states);
                yield* quickSort(arr, pi + 1, high, states);
            }
            if(low >=0 && low < arr.length) states[low] = 2;
            if(high >=0 && high < arr.length) states[high] = 2;
        }

        function* partition(arr, low, high, states) {
            let pivot = arr[high];
            states[high] = 3;
            let i = low - 1;
            for (let j = low; j < high; j++) {
                states[j] = 0;
                yield;
                if (arr[j] < pivot) {
                    i++;
                    states[i] = 1; states[j] = 1;
                    yield;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    yield;
                    states[i] = -1; states[j] = -1;
                }
                states[j] = -1;
            }
            states[i + 1] = 1; states[high] = 1;
            yield;
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            yield;
            states[i + 1] = -1; states[high] = -1;
            states[i+1] = 2;
            return i + 1;
        }

        function* linearSearch(arr, states, target) {
            for (let i = 0; i < arr.length; i++) {
                states[i] = 0;
                yield;
                if (Math.floor(arr[i]) === Math.floor(target)) {
                    states[i] = 2;
                    return;
                }
                states[i] = -1;
            }
        }

        function* binarySearch(arr, states, target) {
            let low = 0, high = arr.length - 1;
            while(low <= high) {
                for(let i=0; i<arr.length; i++) states[i] = (i >= low && i <= high) ? 0 : -1;
                yield;
                let mid = Math.floor((low + high) / 2);
                states[mid] = 3;
                yield;
                if(Math.floor(arr[mid]) === Math.floor(target)) {
                    states[mid] = 2;
                    return;
                } else if (arr[mid] < target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        function* isPalindrome(str, states) {
            const len = str.length;
            for (let i = 0; i < len / 2; i++) {
                states[i] = 0;
                states[len - 1 - i] = 0;
                yield;

                if (str[i] !== str[len - 1 - i]) {
                    states[i] = 1;
                    states[len - 1 - i] = 1;
                    yield;
                    return false;
                }

                states[i] = 2;
                states[len - 1 - i] = 2;
                yield;
            }

            return true;
        }
        
        function* dijkstra(graph, startNode, states) {
            let dist = new Array(graph.nodes.length).fill(Infinity);
            dist[startNode] = 0;
            let pq = [startNode];
            states[startNode] = 3;
            yield;

            while (pq.length > 0) {
                let u = pq.shift();
                states[u] = 2;
                yield;

                for (let v of graph.adj[u]) {
                    states[v] = 0;
                    yield;
                    if (dist[v] > dist[u] + 1) { // Assuming edge weight of 1 for simplicity
                        dist[v] = dist[u] + 1;
                        pq.push(v);
                        pq.sort((a, b) => dist[a] - dist[b]);
                        states[v] = 1;
                        yield;
                    }
                    states[v] = -1;
                }
            }
        }

        function* bfs(graph, startNode, states) {
            let visited = new Array(graph.nodes.length).fill(false);
            let queue = [startNode];
            visited[startNode] = true;
            states[startNode] = 3;
            yield;

            while (queue.length > 0) {
                let u = queue.shift();
                states[u] = 2;
                yield;

                for (let v of graph.adj[u]) {
                    if (!visited[v]) {
                        visited[v] = true;
                        queue.push(v);
                        states[v] = 1;
                        yield;
                    }
                }
            }
        }

        function* dfs(graph, startNode, states) {
            let visited = new Array(graph.nodes.length).fill(false);
            let stack = [startNode];

            while (stack.length > 0) {
                let u = stack.pop();

                if (!visited[u]) {
                    visited[u] = true;
                    states[u] = 2;
                    yield;

                    for (let v of graph.adj[u]) {
                        if (!visited[v]) {
                            stack.push(v);
                            states[v] = 1;
                            yield;
                        }
                    }
                }
            }
        }
    };

    sketch = new p5(s);
    setupSidebar();

    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());
});
// AlgoVision v2.0 - Verified & Ready
