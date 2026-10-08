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
    const comparisonsEl = document.getElementById('metric-comparisons');
    const swapsEl = document.getElementById('metric-swaps');
    const stepsEl = document.getElementById('metric-steps');

    const metrics = { steps: 0, comparisons: 0, swaps: 0 };
    function updateMetricsDisplay() {
        if (comparisonsEl) comparisonsEl.textContent = metrics.comparisons;
        if (swapsEl) swapsEl.textContent = metrics.swaps;
        if (stepsEl) stepsEl.textContent = metrics.steps;
    }
    function resetMetrics() {
        metrics.steps = 0;
        metrics.comparisons = 0;
        metrics.swaps = 0;
        updateMetricsDisplay();
    }
    const codeBlock = document.getElementById('code-block');
    const langButtons = document.querySelectorAll('.lang-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const speedSlider = document.getElementById('speed-slider');
    const customAlgoBtn = document.getElementById('custom-algo-btn');
    const learnBtn = document.getElementById('learn-btn');
    const guideBtn = document.getElementById('guide-btn');
    const guideModal = document.getElementById('guide-modal');
    const learnModal = document.getElementById('learn-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
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
    const explanationEl = document.getElementById('explanation');
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
                    javascript: `function dijkstra(graph, startNode) {\n  let distances = {};\n  let prev = {};\n  let pq = new PriorityQueue();\n\n  distances[startNode] = 0;\n  pq.enqueue(startNode, 0);\n\n  for (let vertex in graph) {\n    if (vertex !== startNode) distances[vertex] = Infinity;\n    prev[vertex] = null;\n  }\n\n  while (!pq.isEmpty()) {\n    let minNode = pq.dequeue().element;\n    for (let neighbor in graph[minNode]) {\n      let newDist = distances[minNode] + graph[minNode][neighbor];\n      if (newDist < distances[neighbor]) {\n        distances[neighbor] = newDist;\n        prev[neighbor] = minNode;\n        pq.enqueue(neighbor, newDist);\n      }\n    }\n  }\n  return { distances, prev };\n}`,
                    python: `import heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    while pq:\n        curr_dist, u = heapq.heappop(pq)\n        if curr_dist > distances[u]:\n            continue\n        for v, weight in graph[u].items():\n            dist = curr_dist + weight\n            if dist < distances[v]:\n                distances[v] = dist\n                heapq.heappush(pq, (dist, v))\n    return distances`,
                    cpp: `#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int S) {\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;\n    vector<int> dist(V, 1e9);\n    dist[S] = 0;\n    pq.push({0, S});\n    while (!pq.empty()) {\n        int u = pq.top().second;\n        pq.pop();\n        for (auto& edge : adj[u]) {\n            int v = edge.first, w = edge.second;\n            if (dist[v] > dist[u] + w) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}`,
                    java: `import java.util.*;\n\nclass Dijkstra {\n    public int[] dijkstra(int V, List<List<int[]>> adj, int S) {\n        int[] dist = new int[V];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n        dist[S] = 0;\n        pq.offer(new int[]{S, 0});\n        while (!pq.isEmpty()) {\n            int[] curr = pq.poll();\n            int u = curr[0];\n            for (int[] edge : adj.get(u)) {\n                int v = edge[0], w = edge[1];\n                if (dist[v] > dist[u] + w) {\n                    dist[v] = dist[u] + w;\n                    pq.offer(new int[]{v, dist[v]});\n                }\n            }\n        }\n        return dist;\n    }\n}`
                }
            },
            'BFS': {
                complexity: { time: 'O(V + E)', space: 'O(V)' },
                code: {
                    javascript: `function bfs(graph, startNode) {\n  let visited = {};\n  let queue = [];\n\n  visited[startNode] = true;\n  queue.push(startNode);\n\n  while (queue.length > 0) {\n    let currentNode = queue.shift();\n    for (let neighbor of graph[currentNode]) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        queue.push(neighbor);\n      }\n    }\n  }\n}`,
                    python: `from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    traversal = []\n    while queue:\n        node = queue.popleft()\n        traversal.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return traversal`,
                    cpp: `#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> bfsOfGraph(int V, vector<int> adj[], int startNode) {\n    vector<int> bfs;\n    vector<bool> vis(V, false);\n    queue<int> q;\n    q.push(startNode);\n    vis[startNode] = true;\n    while (!q.empty()) {\n        int node = q.front();\n        q.pop();\n        bfs.push_back(node);\n        for (int neighbor : adj[node]) {\n            if (!vis[neighbor]) {\n                vis[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n    return bfs;\n}`,
                    java: `import java.util.*;\n\nclass BFS {\n    public List<Integer> bfs(int V, List<List<Integer>> adj, int start) {\n        List<Integer> order = new ArrayList<>();\n        boolean[] visited = new boolean[V];\n        Queue<Integer> queue = new LinkedList<>();\n        visited[start] = true;\n        queue.offer(start);\n        while (!queue.isEmpty()) {\n            int node = queue.poll();\n            order.add(node);\n            for (int neighbor : adj.get(node)) {\n                if (!visited[neighbor]) {\n                    visited[neighbor] = true;\n                    queue.offer(neighbor);\n                }\n            }\n        }\n        return order;\n    }\n}`
                }
            },
            'DFS': {
                complexity: { time: 'O(V + E)', space: 'O(V)' },
                code: {
                    javascript: `function dfs(graph, startNode) {\n  let visited = {};\n  function traverse(vertex) {\n    if (!vertex) return;\n    visited[vertex] = true;\n    for (let neighbor of graph[vertex]) {\n      if (!visited[neighbor]) traverse(neighbor);\n    }\n  }\n  traverse(startNode);\n}`,
                    python: `def dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    traversal = [start]\n    for neighbor in graph.get(start, []):\n        if neighbor not in visited:\n            traversal.extend(dfs(graph, neighbor, visited))\n    return traversal`,
                    cpp: `#include <vector>\nusing namespace std;\n\nvoid dfsHelper(int node, vector<int> adj[], vector<bool>& vis, vector<int>& res) {\n    vis[node] = true;\n    res.push_back(node);\n    for (int neighbor : adj[node]) {\n        if (!vis[neighbor]) dfsHelper(neighbor, adj, vis, res);\n    }\n}\n\nvector<int> dfsOfGraph(int V, vector<int> adj[], int startNode) {\n    vector<bool> vis(V, false);\n    vector<int> res;\n    dfsHelper(startNode, adj, vis, res);\n    return res;\n}`,
                    java: `import java.util.*;\n\nclass DFS {\n    private void dfsUtil(int node, List<List<Integer>> adj, boolean[] visited, List<Integer> res) {\n        visited[node] = true;\n        res.add(node);\n        for (int neighbor : adj.get(node)) {\n            if (!visited[neighbor]) dfsUtil(neighbor, adj, visited, res);\n        }\n    }\n    public List<Integer> dfs(int V, List<List<Integer>> adj, int start) {\n        boolean[] visited = new boolean[V];\n        List<Integer> res = new ArrayList<>();\n        dfsUtil(start, adj, visited, res);\n        return res;\n    }\n}`
                }
            }
        }
    };

    const learnContent = {
        'Bubble Sort': {
            explanation: 'Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. With each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array.',
            howItWorks: '1. Traverse the array from the first element.\n2. Compare each pair of adjacent elements: if arr[j] > arr[j + 1], swap them.\n3. Repeat for n passes until no swaps are needed.',
            code: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`
        },
        'Selection Sort': {
            explanation: 'Selection Sort segments the list into sorted and unsorted regions. In each iteration, it searches the unsorted region for the minimum element and places it at the boundary.',
            howItWorks: '1. Find the smallest element in the unsorted portion of the array.\n2. Swap it with the element at the beginning of the unsorted segment.\n3. Advance the sorted partition by one and repeat.',
            code: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}`
        },
        'Insertion Sort': {
            explanation: 'Insertion Sort builds the sorted array one element at a time by picking the next element and inserting it into its correct position relative to the already sorted prefix.',
            howItWorks: '1. Start with the second element (index 1) as the key.\n2. Compare key with elements to its left, shifting larger elements one position to the right.\n3. Place the key into its correct sorted slot.',
            code: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i], j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`
        },
        'Shell Sort': {
            explanation: 'Shell Sort is a generalized version of insertion sort that permits exchanging elements that are far apart. Using a diminishing gap sequence, it achieves faster average-case convergence.',
            howItWorks: '1. Initialize gap size to floor(n / 2).\n2. Perform gapped insertion sort across all sub-sequences.\n3. Halve the gap size each pass until gap is 1, finishing with a final insertion sort pass.',
            code: `function shellSort(arr) {\n  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {\n    for (let i = gap; i < arr.length; i++) {\n      let temp = arr[i], j;\n      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {\n        arr[j] = arr[j - gap];\n      }\n      arr[j] = temp;\n    }\n  }\n  return arr;\n}`
        },
        'Merge Sort': {
            explanation: 'Merge Sort is a divide-and-conquer algorithm that recursively splits the input array into halves until subproblems contain 1 element, then merges the sorted halves together.',
            howItWorks: '1. Divide the array into left and right halves.\n2. Recursively sort both halves.\n3. Merge the two sorted subarrays in linear time using two pointers.',
            code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}`
        },
        'Quick Sort': {
            explanation: 'Quick Sort is a highly efficient divide-and-conquer algorithm that selects a pivot element and partitions the array such that elements smaller than the pivot appear before it and larger elements appear after it.',
            howItWorks: '1. Select a pivot element (e.g. the last element).\n2. Partition: rearrange array so elements < pivot are left and elements > pivot are right.\n3. Recursively apply Quick Sort to sub-arrays before and after pivot.',
            code: `function quickSort(arr, low = 0, high = arr.length - 1) {\n  if (low < high) {\n    let pi = partition(arr, low, high);\n    quickSort(arr, low, pi - 1);\n    quickSort(arr, pi + 1, high);\n  }\n  return arr;\n}`
        },
        'Linear Search': {
            explanation: 'Linear Search sequentially checks each element in the list starting from index 0 until the desired target value is found or the end of the array is reached.',
            howItWorks: '1. Iterate through elements from index 0 to n - 1.\n2. Compare current element with the target value.\n3. If a match is found, return the index. If traversal finishes without match, return -1.',
            code: `function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}`
        },
        'Binary Search': {
            explanation: 'Binary Search is an optimal searching algorithm for sorted arrays that repeatedly bisects the search space in half, achieving logarithmic O(log n) performance.',
            howItWorks: '1. Set low = 0 and high = length - 1.\n2. Calculate mid = floor((low + high) / 2).\n3. If arr[mid] == target, return mid.\n4. If arr[mid] < target, search right half (low = mid + 1). Else search left half (high = mid - 1).',
            code: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return -1;\n}`
        },
        'Palindrome': {
            explanation: 'A palindrome is a sequence of characters that reads the exact same forward and backward, such as "racecar" or "level".',
            howItWorks: '1. Initialize two pointers at start and end of string.\n2. Compare characters: if any mismatch occurs, it is not a palindrome.\n3. Move pointers inward until they meet in the middle.',
            code: `function isPalindrome(str) {\n  const len = str.length;\n  for (let i = 0; i < len / 2; i++) {\n    if (str[i] !== str[len - 1 - i]) return false;\n  }\n  return true;\n}`
        },
        'Dijkstra': {
            explanation: 'Dijkstra\'s algorithm computes the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.',
            howItWorks: '1. Set distance to source as 0 and all other distances to Infinity.\n2. Greedily extract the unvisited node with minimum distance.\n3. Relax each adjacent edge: if dist[u] + weight < dist[v], update dist[v] and push to priority queue.',
            code: `function dijkstra(graph, start) {\n  let dist = {}, pq = new PriorityQueue();\n  dist[start] = 0; pq.enqueue(start, 0);\n  while (!pq.isEmpty()) {\n    let u = pq.dequeue();\n    for (let [v, w] of graph[u]) {\n      if (dist[u] + w < (dist[v] || Infinity)) {\n        dist[v] = dist[u] + w;\n        pq.enqueue(v, dist[v]);\n      }\n    }\n  }\n  return dist;\n}`
        },
        'BFS': {
            explanation: 'Breadth-First Search explores graph vertices level by level, visiting all direct neighbors of a vertex before traversing deeper into the graph.',
            howItWorks: '1. Enqueue source node and mark it as visited.\n2. Dequeue front node from FIFO queue.\n3. Inspect all unvisited neighbors, mark them as visited, and enqueue them.\n4. Repeat until queue is empty.',
            code: `function bfs(graph, start) {\n  let visited = new Set([start]), queue = [start], order = [];\n  while (queue.length > 0) {\n    let u = queue.shift();\n    order.push(u);\n    for (let v of graph[u]) {\n      if (!visited.has(v)) {\n        visited.add(v);\n        queue.push(v);\n      }\n    }\n  }\n  return order;\n}`
        },
        'DFS': {
            explanation: 'Depth-First Search traverses deeply along each exploration branch as far as possible before backtracking to unvisited branch points.',
            howItWorks: '1. Mark current node as visited and record it.\n2. For each neighbor not yet visited, recursively traverse that neighbor.\n3. Backtrack when current path hits a dead end.',
            code: `function dfs(graph, start, visited = new Set(), order = []) {\n  visited.add(start);\n  order.push(start);\n  for (let neighbor of graph[start]) {\n    if (!visited.has(neighbor)) {\n      dfs(graph, neighbor, visited, order);\n    }\n  }\n  return order;\n}`
        }
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
        searchInputContainer.style.display = currentCategory === 'searching' ? 'flex' : 'none';
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
        const currentValues = sketch ? sketch.getValues() : [];
        worker.postMessage({ code: customCodeEditor.getValue(), values: currentValues });
        visualizeCustomCodeBtn.innerText = 'Analyzing...';
        worker.onmessage = function(event) {
            if (event.data.error) {
                alert(event.data.error);
                visualizeCustomCodeBtn.innerText = 'Visualize';
                return;
            }
            const { time, space, explanation: explanationText, steps } = event.data;
            timeComplexityEl.textContent = time;
            spaceComplexityEl.textContent = space;
            if (explanationEl) explanationEl.textContent = explanationText;
            complexityInfo.style.display = 'flex';
            explanationContainer.style.display = 'flex';
            visualizeCustomCodeBtn.innerText = 'Visualize';
            if (sketch) {
                sketch.setSorter((function*() {
                    for (const step of steps) {
                        sketch.setStates(step);
                        yield;
                    }
                })());
                sketch.loop();
            }
        };
    });

    const s = (p) => {
        let values = [], states = [], sorter, graph;

        p.getValues = () => values;
        p.setValues = (newVals) => { values = newVals; };
        p.getStates = () => states;
        p.setStates = (newStates) => { states = newStates; };
        p.setSorter = (newSorter) => { sorter = newSorter; };

        p.setup = () => {
            const container = document.getElementById('visualization-container');
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('visualization-container');
            p.frameRate(animationSpeed);
        };

        p.windowResized = () => {
            const container = document.getElementById('visualization-container');
            if (container && (p.width !== container.offsetWidth || p.height !== container.offsetHeight)) {
                p.resizeCanvas(container.offsetWidth, container.offsetHeight);
                p.reset();
            }
        };

        p.draw = () => {
            p.background('#1E1E1E');
            if (sorter) {
                let result = sorter.next();
                if (!result.done) {
                    metrics.steps++;
                    if (states.includes(0)) metrics.comparisons++;
                    if (states.includes(1)) metrics.swaps++;
                    updateMetricsDisplay();
                } else {
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
            p.stroke('#666');
            p.strokeWeight(2);
            for (let i = 0; i < graph.nodes.length; i++) {
                for (let j = 0; j < graph.adj[i].length; j++) {
                    let neighbor = graph.adj[i][j];
                    if (i < neighbor) {
                        let u = graph.nodes[i];
                        let v = graph.nodes[neighbor];
                        p.line(u.x, u.y, v.x, v.y);
                    }
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
                    resetMetrics();
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
                        const centerX = width / 2;
                        const centerY = height / 2;
                        const radius = Math.min(width, height) * 0.35;
                        for (let i = 0; i < this.nodes.length; i++) {
                            const angle = (i * 2 * Math.PI / this.nodes.length) - Math.PI / 2;
                            this.nodes[i].x = centerX + radius * Math.cos(angle);
                            this.nodes[i].y = centerY + radius * Math.sin(angle);
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
                    let target = parseInt(searchInput.value, 10);
                    if (isNaN(target)) target = 0;
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
    searchInput.addEventListener('input', () => {
        if (sketch && currentCategory === 'searching') {
            sketch.reset();
        }
    });
});
// AlgoVision v2.0 - Verified & Ready
