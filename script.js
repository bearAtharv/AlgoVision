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
    const algorithms = {
        sorting: {
            'Bubble Sort': {
                description: `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort.`,
                pseudocode: `1. Start at the beginning of the list.\n2. Compare the first two elements. If the first is greater than the second, swap them.\n3. Move to the next pair of elements, compare them, and swap if necessary.\n4. Continue this process until the end of the list. The largest element will now be at the end.\n5. Repeat the process for the entire list, excluding the last element (which is already in place).\n6. Continue repeating, reducing the list size by one each time, until the entire list is sorted.`,
                complexity: { time: 'O(n²)', space: 'O(1)' },
                code: {
                    javascript: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        let temp = arr[j];\n        arr[j] = arr[j+1];\n        arr[j+1] = temp;\n      }\n    }\n  }\n  return arr;\n}`,
                    python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`,
                    cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1])\n                swap(arr[j], arr[j+1]);\n}`,
                    java: `class BubbleSort {\n    void bubbleSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++)\n            for (int j = 0; j < n-i-1; j++)\n                if (arr[j] > arr[j+1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j+1];\n                    arr[j+1] = temp;\n                }\n    }\n}`
                }
            },
            'Selection Sort': {
                description: `Selection sort is an in-place comparison sorting algorithm. It has an O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort. Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.`,
                pseudocode: `1. Assume the first element is the smallest. This is your minimum.\n2. Iterate through the rest of the list and compare each element to the minimum.\n3. If you find an element smaller than the current minimum, set it as the new minimum.\n4. After checking all elements, if the minimum is not the element you started with, swap them.\n5. Move to the next element in the list and repeat the process, considering the unsorted part of the list.\n6. Continue until the entire list is sorted.`,
                complexity: { time: 'O(n²)', space: 'O(1)' },
                code: {
                    javascript: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}`,
                    python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
                    cpp: `void selectionSort(int arr[], int n) {\n    int i, j, min_idx;\n    for (i = 0; i < n-1; i++) {\n        min_idx = i;\n        for (j = i+1; j < n; j++)\n          if (arr[j] < arr[min_idx])\n            min_idx = j;\n        swap(arr[min_idx], arr[i]);\n    }\n}`,
                    java: `class SelectionSort {\n    void sort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            int min_idx = i;\n            for (int j = i+1; j < n; j++)\n                if (arr[j] < arr[min_idx])\n                    min_idx = j;\n            int temp = arr[min_idx];\n            arr[min_idx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}`
                }
            },
            'Insertion Sort': {
                description: `Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, insertion sort provides several advantages: simple implementation, efficient for (quite) small data sets, and more efficient in practice than most other simple quadratic (i.e., O(n²)) algorithms such as selection sort or bubble sort.`,
                pseudocode: `1. Start with the second element in the list. This is the key.\n2. Compare the key with the element before it (the first element).\n3. If the key is smaller, shift the previous element one position up.\n4. Continue this process, comparing the key with elements in the sorted portion of the list and shifting them up until you find the correct position for the key.\n5. Insert the key into its correct position.\n6. Move to the next element in the unsorted portion of the list and repeat until the entire list is sorted.`,
                complexity: { time: 'O(n²)', space: 'O(1)' },
                code: {
                    javascript: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let current = arr[i];\n    let j = i - 1;\n    while ((j > -1) && (current < arr[j])) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = current;\n  }\n  return arr;\n}`,
                    python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i-1\n        while j >= 0 and key < arr[j] :\n                arr[j + 1] = arr[j]\n                j -= 1\n        arr[j + 1] = key`,
                    cpp: `void insertionSort(int arr[], int n) {\n    int i, key, j;\n    for (i = 1; i < n; i++) {\n        key = arr[i];\n        j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}`,
                    java: `class InsertionSort {\n    void sort(int arr[]) {\n        int n = arr.length;\n        for (int i = 1; i < n; ++i) {\n            int key = arr[i];\n            int j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j = j - 1;\n            }\n            arr[j + 1] = key;\n        }\n    }\n}`
                }
            },
            'Shell Sort': {
                description: `Shell sort is a generalization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list of elements so that, starting anywhere, considering every nth element gives a sorted list. Such a list is said to be h-sorted. The method is also known as Shell's method, after its inventor, Donald Shell.`,
                pseudocode: `1. Start with a large gap (interval) between elements. A common starting gap is half the list size.\n2. Perform an insertion sort on elements that are separated by this gap. For example, if the gap is 5, you would sort elements at indices 0, 5, 10, etc., then 1, 6, 11, etc.\n3. Reduce the gap (e.g., divide by 2) and repeat the gapped insertion sort.\n4. Continue reducing the gap until it is 1.\n5. Finally, perform a standard insertion sort (gap of 1) on the nearly sorted list. This final pass is very efficient.`,
                complexity: { time: 'O(n log² n)', space: 'O(1)' },
                code: {
                    javascript: `function shellSort(arr) {\n  let n = arr.length;\n  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {\n    for (let i = gap; i < n; i += 1) {\n      let temp = arr[i];\n      let j;\n      for (j = i; j >= gap && arr[j-gap] > temp; j-=gap) {\n        arr[j] = arr[j-gap];\n      }\n      arr[j] = temp;\n    }\n  }\n  return arr;\n}`,
                    python: `def shell_sort(arr):\n    n = len(arr)\n    gap = n//2\n    while gap > 0:\n        for i in range(gap,n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j-gap] > temp:\n                arr[j] = arr[j-gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2`,
                    cpp: `int shellSort(int arr[], int n) {\n    for (int gap = n/2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i += 1) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n            arr[j] = temp;\n        }\n    }\n    return 0;\n}`,
                    java: `class ShellSort {\n    int sort(int arr[]) {\n        int n = arr.length;\n        for (int gap = n/2; gap > 0; gap /= 2) {\n            for (int i = gap; i < n; i += 1) {\n                int temp = arr[i];\n                int j;\n                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                    arr[j] = arr[j - gap];\n                arr[j] = temp;\n            }\n        }\n        return 0;\n    }\n}`
                }
            },
'Merge Sort': {
                description: `Merge sort is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.`,
                pseudocode: `1. Check if the list has more than one element. If not, it is already sorted.\n2. If the list has more than one element, divide it into two halves.\n3. Recursively call Merge Sort on each half. This will continue until each sublist has only one element.\n4. Once the sublists are sorted, merge them back together. To merge, compare the first elements of each sublist and add the smaller one to the new merged list.\n5. Repeat the comparison until one of the sublists is empty.\n6. Add the remaining elements from the non-empty sublist to the merged list. The result is a single, sorted list.`,
                complexity: { time: 'O(n log n)', space: 'O(n)' },
                code: {
                    javascript: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n\n  let i = 0, j = 0, k = 0;\n  const result = [];\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) {\n      result[k++] = left[i++];\n    } else {\n      result[k++] = right[j++];\n    }\n  }\n  while (i < left.length) result[k++] = left[i++];\n  while (j < right.length) result[k++] = right[j++];\n  return result;\n}`,
                    python: `def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr)//2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1`,
                    cpp: `void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}`,
                    java: `class MergeSort {\n    void merge(int arr[], int l, int m, int r) {\n        int n1 = m - l + 1;\n        int n2 = r - m;\n        int L[] = new int[n1];\n        int R[] = new int[n2];\n        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];\n        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];\n        int i = 0, j = 0, k = l;\n        while (i < n1 && j < n2) {\n            if (L[i] <= R[j]) arr[k++] = L[i++];\n            else arr[k++] = R[j++];\n        }\n        while (i < n1) arr[k++] = L[i++];\n        while (j < n2) arr[k++] = R[j++];\n    }\n\n    void sort(int arr[], int l, int r) {\n        if (l < r) {\n            int m = (l + r) / 2;\n            sort(arr, l, m);\n            sort(arr, m + 1, r);\n            merge(arr, l, m, r);\n        }\n    }\n}`
                }
            },
            'Quick Sort': {
                description: `Quicksort is an efficient sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting. When implemented well, it can be about two or three times faster than its main competitors, merge sort and heapsort.`,
                pseudocode: `1. Choose an element from the list to be the pivot. This can be any element, but often the last or a random one is chosen.\n2. Reorder the list so that all elements with values less than the pivot come before it, and all elements with values greater than the pivot come after it (equal values can go either way). This is called partitioning.\n3. After partitioning, the pivot is in its final sorted position.\n4. Recursively apply the above steps to the sub-list of elements with smaller values and separately to the sub-list of elements with greater values.\n5. The base case for the recursion is a list of zero or one element, which is already sorted.`,
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
                description: `Linear search or sequential search is a method for finding an element within a list. It sequentially checks each element of the list until a match is found or the whole list has been searched. A linear search runs in at worst linear time and makes at most n comparisons, where n is the length of the list.`,
                pseudocode: `1. Start from the first element in the list.\n2. Compare the current element with the target value you are searching for.\n3. If they are the same, the search is successful. Return the position of the element.\n4. If they are not the same, move to the next element in the list.\n5. Repeat steps 2-4 until you either find the target value or reach the end of the list.\n6. If you reach the end of the list without finding the value, the search is unsuccessful.`,
                complexity: { time: 'O(n)', space: 'O(1)' },
                code: {
                    javascript: `function linearSearch(arr, key) {\n  for(let i = 0; i < arr.length; i++){`,
                    python: `def linear_search(arr, x):\n    for i in range(len(arr)):\n        if arr[i] == x:\n            return i\n    return -1`,
                    cpp: `int linearSearch(int arr[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == x)\n            return i;\n    return -1;\n}`,
                    java: `class LinearSearch {\n    public static int linearSearch(int arr[], int x) {\n        int n = arr.length;\n        for(int i = 0; i < n; i++) {\n            if(arr[i] == x)\n                return i;\n        }\n        return -1;\n    }\n}`
                }
            },
            'Binary Search': {
                description: `Binary search, also known as half-interval search, logarithmic search, or binary chop, is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating this until the target value is found.`,
                pseudocode: `1. Ensure the list is sorted.\n2. Compare the target value to the middle element of the list.\n3. If the target value is equal to the middle element, the search is successful. Return its position.\n4. If the target value is less than the middle element, repeat the search on the lower half of the list.\n5. If the target value is greater than the middle element, repeat the search on the upper half of the list.\n6. Continue this process, halving the search space each time, until the value is found or the search space is empty.`,
                complexity: { time: 'O(log n)', space: 'O(1)' },
                code: {
                    javascript: `function binarySearch(arr, key) {\n  let start = 0, end = arr.length - 1;\n  while (start <= end) {\n    let mid = Math.floor((start + end) / 2);\n    if (arr[mid] === key) return mid;\n    else if (arr[mid] < key) start = mid + 1;\n    else end = mid - 1;\n  }\n  return -1;\n}`,
                    python: `def binary_search(arr, low, high, x):\n    if high >= low:\n        mid = (high + low) // 2\n        if arr[mid] == x:\n            return mid\n        elif arr[mid] > x:\n            return binary_search(arr, low, mid - 1, x)\n        else:\n            return binary_search(arr, mid + 1, high, x)\n    else:\n        return -1`,
                    cpp: `int binarySearch(int arr[], int l, int r, int x) {\n    if (r >= l) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);\n        return binarySearch(arr, mid + 1, r, x);\n    }\n    return -1;\n}`,
                    java: `class BinarySearch {\n    int binarySearch(int arr[], int l, int r, int x) {\n        if (r >= l) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == x) return mid;\n            if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);\n            return binarySearch(arr, mid + 1, r, x);\n        }\n        return -1;\n    }\n}`
                }
            },
        },
        graph: {
            'Dijkstra': {
                description: 'Dijkstra\'s algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.',
                pseudocode: `1. Set the distance to the starting node as 0 and all other nodes as infinity.\n2. Maintain a set of unvisited nodes, initially containing all nodes.\n3. While the unvisited set is not empty, select the node with the smallest known distance. This is the current node.\n4. For the current node, consider all of its unvisited neighbors.\n5. For each neighbor, calculate the distance from the start node through the current node.\n6. If this calculated distance is less than the known distance for that neighbor, update the neighbor\'s distance.\n7. Once all neighbors have been considered, mark the current node as visited and remove it from the unvisited set.\n8. Repeat until all nodes have been visited. The shortest path from the start node to all other nodes is now known.`,
                complexity: { time: 'O(E log V)', space: 'O(V)' },
                code: {
                    javascript: `function dijkstra(graph, startNode) {\n  let distances = {};\n  let prev = {};\n  let pq = new PriorityQueue();\n\n  distances[startNode] = 0;\n  pq.enqueue(startNode, 0);\n\n  for (let vertex in graph) {\n    if (vertex !== startNode) {\n      distances[vertex] = Infinity;\n    }\n    prev[vertex] = null;\n  }\n\n  while (!pq.isEmpty()) {\n    let minNode = pq.dequeue().element;\n\n    for (let neighbor in graph[minNode]) {\n      let newDist = distances[minNode] + graph[minNode][neighbor];\n\n      if (newDist < distances[neighbor]) {\n        distances[neighbor] = newDist;\n        prev[neighbor] = minNode;\n        pq.enqueue(neighbor, newDist);\n      }\n    }\n  }\n\n  return { distances, prev };\n}`,
                    python: `import heapq

def dijkstra(graph, start_node):
    distances = {node: float('infinity') for node in graph}
    distances[start_node] = 0
    priority_queue = [(0, start_node)]

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances`,
                    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>

const int INF = std::numeric_limits<int>::max();

struct Edge {
    int to;
    int weight;
    Edge(int t, int w) : to(t), weight(w) {}
};

std::vector<int> dijkstra(const std::vector<std::vector<Edge>>& graph, int V, int start_node) {
    std::vector<int> dist(V, INF);
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> pq;

    dist[start_node] = 0;
    pq.push({0, start_node});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) {
            continue;
        }

        for (const Edge& edge : graph[u]) {
            int v = edge.to;
            int weight = edge.weight;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }

    return dist;
}`,
                    java: `import java.util.*;

class Edge {
    Node target;
    int weight;

    public Edge(Node target, int weight) {
        this.target = target;
        this.weight = weight;
    }
}

class Node implements Comparable<Node> {
    String name;
    List<Edge> adjacencies;
    int distance;
    Node previous;

    public Node(String name) {
        this.name = name;
        this.adjacencies = new ArrayList<>();
        this.distance = Integer.MAX_VALUE;
        this.previous = null;
    }

    public void addEdge(Node target, int weight) {
        adjacencies.add(new Edge(target, weight));
    }

    @Override
    public int compareTo(Node other) {
        return Integer.compare(this.distance, other.distance);
    }
}

public class Dijkstra {

    public static void computeShortestPaths(Node source) {
        source.distance = 0;
        PriorityQueue<Node> priorityQueue = new PriorityQueue<>();
        priorityQueue.add(source);

        while (!priorityQueue.isEmpty()) {
            Node u = priorityQueue.poll();

            for (Edge edge : u.adjacencies) {
                Node v = edge.target;
                int weight = edge.weight;

                if (u.distance + weight < v.distance) {
                    priorityQueue.remove(v);
                    v.distance = u.distance + weight;
                    v.previous = u;
                    priorityQueue.add(v);
                }
            }
        }
    }
}`
                }
            },
            'BFS': {
                description: 'Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a \'search key\'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
                pseudocode: `1. Start with a queue and add the starting node to it.\n2. Mark the starting node as visited.\n3. While the queue is not empty, do the following:\n  a. Dequeue a node. This is the current node.\n  b. For each neighbor of the current node that has not been visited:\n    i. Mark the neighbor as visited.\n    ii. Enqueue the neighbor.\n4. The search is complete when the queue is empty. All reachable nodes have been visited.`,
                complexity: { time: 'O(V + E)', space: 'O(V)' },
                code: {
                    javascript: `function bfs(graph, startNode) {\n  let visited = {};\n  let queue = [];\n\n  visited[startNode] = true;\n  queue.push(startNode);\n\n  while (queue.length > 0) {\n    let currentNode = queue.shift();\n\n    for (let neighbor of graph[currentNode]) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        queue.push(neighbor);\n      }\n    }\n  }\n}`,
                    python: `from collections import deque

def bfs(graph, start_node):
    visited = set()
    queue = deque([start_node])
    visited_order = []

    visited.add(start_node)

    while queue:
        current_node = queue.popleft()
        visited_order.append(current_node)

        for neighbor in graph.get(current_node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited_order`,
                    cpp: `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> bfs(int num_nodes, const std::vector<std::vector<int>>& adj, int start_node) {
    std::vector<bool> visited(num_nodes, false);
    std::queue<int> q;
    std::vector<int> visited_order;

    visited[start_node] = true;
    q.push(start_node);

    while (!q.empty()) {
        int current_node = q.front();
        q.pop();
        visited_order.push_back(current_node);

        for (int neighbor : adj[current_node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return visited_order;
}`,
                    java: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.List;

public class BFS {

    public static List<Integer> bfs(int numNodes, ArrayList<ArrayList<Integer>> adj, int startNode) {
        boolean[] visited = new boolean[numNodes];
        Queue<Integer> queue = new LinkedList<>();
        List<Integer> visitedOrder = new ArrayList<>();

        visited[startNode] = true;
        queue.add(startNode);

        while (!queue.isEmpty()) {
            int currentNode = queue.poll();
            visitedOrder.add(currentNode);

            for (int neighbor : adj.get(currentNode)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        return visitedOrder;
    }
}`
                }
            },
            'DFS': {
                description: 'Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.',
                pseudocode: `1. Start with a stack and add the starting node to it.\n2. While the stack is not empty, do the following:\n  a. Pop a node from the stack. This is the current node.\n  b. If the current node has not been visited:\n    i. Mark it as visited.\n    ii. For each neighbor of the current node, push the neighbor onto the stack.\n3. The search is complete when the stack is empty. All reachable nodes have been visited.`,
                complexity: { time: 'O(V + E)', space: 'O(V)' },
                code: {
                    javascript: `function dfs(graph, startNode) {\n  let visited = {};\n\n  function traverse(vertex) {\n    if (!vertex) return;\n\n    visited[vertex] = true;\n\n    for (let neighbor of graph[vertex]) {\n      if (!visited[neighbor]) {\n        traverse(neighbor);\n      }\n    }\n  }\n\n  traverse(startNode);\n}`,
                    python: `def dfs(graph, start_node, visited=None):
    if visited is None:
        visited = set()
    visited.add(start_node)
    # Process node here

    for neighbor in graph.get(start_node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
                    cpp: `#include <iostream>
#include <vector>

void dfs(int node, const std::vector<std::vector<int>>& graph, std::vector<bool>& visited) {
    visited[node] = true;
    // Process node here

    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}`,
                    java: `import java.util.ArrayList;
import java.util.List;

public class DFS {

    public void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
        visited[node] = true;
        // Process node here

        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, graph, visited);
            }
        }
    }
}`
                }
            }
        }
    };

    const algorithmList = document.getElementById('algorithm-list');
    const algorithmDisplaySection = document.getElementById('algorithm-display-section');
    const codeExplanationSection = document.getElementById('code-explanation-section');

    const searchInputContainer = document.getElementById('search-input-container');
    const searchInput = document.getElementById('search-input');
    const timeComplexityEl = document.getElementById('time-complexity');
    const spaceComplexityEl = document.getElementById('space-complexity');
    const codeBlock = document.getElementById('code-block');
    const langButtons = document.querySelectorAll('.lang-btn');
    const viewButtons = document.querySelectorAll('.view-btn[data-view]');
    const stepsBtn = document.getElementById('steps-btn');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const speedSlider = document.getElementById('speed-slider');
    const customCodeInput = document.getElementById('custom-code-input');
    const explainBtn = document.getElementById('explain-btn');
    const explanationOutput = document.getElementById('explanation-output');

    const modal = document.getElementById('steps-modal');
    const closeButton = modal.querySelector('.close-button');

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    let currentAlgorithm = 'Bubble Sort';
    let currentCategory = 'sorting';
    let currentLang = 'javascript';
    let currentView = 'bars';
    let animationSpeed = 45;
    let sketch;

    function getAlgoData(category, name) { 
        if (category === 'explanation') return null; // No specific data for explanation section
        return algorithms[category][name]; 
    }

    function updateUIForAlgorithm() {
        if (currentCategory === 'explanation') {
            algorithmDisplaySection.style.display = 'none';
            codeExplanationSection.style.display = 'flex';
            document.querySelector('.main-content').classList.remove('graph-view-active');
        } else {
            algorithmDisplaySection.style.display = 'flex';
            codeExplanationSection.style.display = 'none';

            if (currentCategory === 'graph') {
                document.querySelector('.main-content').classList.add('graph-view-active');
            } else {
                document.querySelector('.main-content').classList.remove('graph-view-active');
            }

            const algoData = getAlgoData(currentCategory, currentAlgorithm);
            timeComplexityEl.textContent = algoData.complexity.time;
            spaceComplexityEl.textContent = algoData.complexity.space;
            searchInputContainer.style.display = currentCategory === 'searching' ? 'flex' : 'none';
            viewButtons.forEach(btn => btn.style.display = currentCategory === 'graph' ? 'none' : 'inline-block');
            updateCodeView();
            if (sketch) {
                sketch.reset();
                // Call resize after a short delay to allow the DOM to update
                setTimeout(() => sketch.resize(), 50);
            }
        }
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
                li.dataset.alg = name;
                li.dataset.cat = category;

                const algoName = document.createElement('span');
                algoName.textContent = name;
                li.appendChild(algoName);

                const infoIcon = document.createElement('i');
                infoIcon.className = 'fas fa-info-circle algo-info-icon';
                infoIcon.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent li click event
                    const algoData = getAlgoData(category, name);
                    const modal = document.getElementById('steps-modal');
                    const title = modal.querySelector('#modal-title');
                    const body = modal.querySelector('#modal-body');
                    title.textContent = `${name} - Description`;
                    body.innerHTML = marked.parse(algoData.description);
                    modal.style.display = 'block';
                });
                li.appendChild(infoIcon);

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
        // Add Code Explanation section
        const explanationHeader = document.createElement('li');
        explanationHeader.className = 'algo-subheader';
        explanationHeader.textContent = 'Code Explanation';
        algorithmList.appendChild(explanationHeader);

        const customCodeLi = document.createElement('li');
        customCodeLi.textContent = 'Explain Custom Code';
        customCodeLi.dataset.alg = 'Custom Code';
        customCodeLi.dataset.cat = 'explanation';
        customCodeLi.addEventListener('click', () => {
            currentAlgorithm = 'Custom Code';
            currentCategory = 'explanation';
            document.querySelectorAll('#algorithm-list li.active').forEach(item => item.classList.remove('active'));
            customCodeLi.classList.add('active');
            updateUIForAlgorithm();
        });
        algorithmList.appendChild(customCodeLi);

        // Set initial active algorithm
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

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentView = btn.dataset.view;
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (sketch) sketch.reset();
        });
    });

    stepsBtn.addEventListener('click', () => {
        const algoData = getAlgoData(currentCategory, currentAlgorithm);
        if (algoData && algoData.pseudocode) {
            const modal = document.getElementById('steps-modal');
            const title = modal.querySelector('#modal-title');
            const body = modal.querySelector('#modal-body');
            title.textContent = `${currentAlgorithm} - Pseudocode Steps`;
            body.innerHTML = algoData.pseudocode.replace(/\n/g, '<br>');
            modal.style.display = 'block';
        }
    });

    speedSlider.addEventListener('input', e => {
        animationSpeed = e.target.value;
        if (sketch) sketch.frameRate(parseInt(animationSpeed));
    });



    explainBtn.addEventListener('click', async () => {
        const code = customCodeInput.value.trim();
        if (!code) {
            explanationOutput.innerText = "Please enter some code first.";
            return;
        }
        explanationOutput.innerText = "Analyzing...";
        try {
            const response = await fetch("http://localhost:3000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            explanationOutput.innerHTML = marked.parse(data.summary);
        } catch (error) {
            explanationOutput.innerText = "Could not generate summary. Please try again.";
        }
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
            if (currentCategory === 'graph') {
                drawGraph();
            } else {
                if (currentView === 'bars') drawBars(); else drawArray();
            }
        };

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
            if (currentCategory === 'graph') {
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

    // Expose a resize handler on the sketch object
    sketch.resize = () => {
        const container = document.getElementById('visualization-container');
        sketch.resizeCanvas(container.offsetWidth, container.offsetHeight);
        if (currentCategory === 'graph' && graph) {
            graph.positionNodes(sketch.width, sketch.height);
        }
        sketch.redraw();
    }

    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());
});
