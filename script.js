document.addEventListener('DOMContentLoaded', () => {
    const algorithms = {
        'Bubble Sort': {
            code: {
                javascript: `async function bubbleSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n}`,
                python: `def bubble_sort(arr):\n  n = len(arr)\n  for i in range(n):\n    for j in range(0, n-i-1):\n      if arr[j] > arr[j+1]:\n        arr[j], arr[j+1] = arr[j+1], arr[j]`,
                cpp: `void bubbleSort(int arr[], int n) {\n  for (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-i-1; j++) {\n      if (arr[j] > arr[j+1]) {\n        std::swap(arr[j], arr[j+1]);\n      }\n    }\n  }\n}`
            }
        },
        'Selection Sort': {
            code: {
                javascript: `async function selectionSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    let min_idx = i;\n    for (let j = i + 1; j < n; j++) {\n      if (arr[j] < arr[min_idx]) {\n        min_idx = j;\n      }\n    }\n    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n  }\n}`,
                python: `def selection_sort(arr):\n  for i in range(len(arr)):\n    min_idx = i\n    for j in range(i+1, len(arr)):\n      if arr[min_idx] > arr[j]:\n        min_idx = j\n    arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
                cpp: `void selectionSort(int arr[], int n) {\n  int i, j, min_idx;\n  for (i = 0; i < n-1; i++) {\n    min_idx = i;\n    for (j = i+1; j < n; j++) {\n      if (arr[j] < arr[min_idx]) min_idx = j;\n    }\n    std::swap(arr[min_idx], arr[i]);\n  }\n}`
            }
        },
        'Insertion Sort': {
            code: {
                javascript: `async function insertionSort(arr) {\n  let n = arr.length;\n  for (let i = 1; i < n; i++) {\n    let key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j = j - 1;\n    }\n    arr[j + 1] = key;\n  }\n}`,
                python: `def insertion_sort(arr):\n  for i in range(1, len(arr)):\n    key = arr[i]\n    j = i-1\n    while j >=0 and key < arr[j] :\n      arr[j+1] = arr[j]\n      j -= 1\n    arr[j+1] = key`,
                cpp: `void insertionSort(int arr[], int n) {\n  int i, key, j;\n  for (i = 1; i < n; i++) {\n    key = arr[i];\n    j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j = j - 1;\n    }\n    arr[j + 1] = key;\n  }\n}`
            }
        },
        'Binary Search': {
            code: {
                javascript: `async function binarySearch(arr, x) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    let m = l + Math.floor((r - l) / 2);\n    if (arr[m] == x) return m;\n    if (arr[m] < x) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n}`,
                python: `def binary_search(arr, low, high, x):\n  if high >= low:\n    mid = (high + low) // 2\n    if arr[mid] == x: return mid\n    elif arr[mid] > x: return binary_search(arr, low, mid - 1, x)\n    else: return binary_search(arr, mid + 1, high, x)\n  else: return -1`,
                cpp: `int binarySearch(int arr[], int l, int r, int x) {\n  if (r >= l) {\n    int mid = l + (r - l) / 2;\n    if (arr[mid] == x) return mid;\n    if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);\n    return binarySearch(arr, mid + 1, r, x);\n  }\n  return -1;\n}`
            }
        }
    };

    const algorithmList = document.getElementById('algorithm-list');
    const codeBlock = document.getElementById('code-block');
    const langButtons = document.querySelectorAll('.lang-btn');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let currentAlgorithm = 'Bubble Sort';
    let currentLang = 'javascript';
    let sketch;

    function updateCodeView() {
        const lang = currentLang;
        const algo = algorithms[currentAlgorithm];
        if (algo && algo.code[lang]) {
            codeBlock.textContent = algo.code[lang];
            codeBlock.className = `language-${lang}`;
            Prism.highlightAll();
        } 
    }

    function setupSidebar() {
        Object.keys(algorithms).forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            li.dataset.alg = name;
            li.addEventListener('click', () => {
                currentAlgorithm = name;
                document.querySelectorAll('#algorithm-list li').forEach(item => item.classList.remove('active'));
                li.classList.add('active');
                updateCodeView();
                if (sketch) sketch.reset();
            });
            algorithmList.appendChild(li);
        });
        algorithmList.firstChild.classList.add('active');
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateCodeView();
        });
    });

    const s = (p) => {
        let values = [];
        let states = []; // -1: default, 0: comparing, 1: swapping, 2: sorted
        let sorter;

        p.setup = () => {
            const container = document.getElementById('visualization-container');
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('visualization-container');
            p.reset();
        };

        p.draw = () => {
            p.background('#1E1E1E');
            if (sorter) {
                sorter.next();
            }
            let w = p.width / values.length;
            for (let i = 0; i < values.length; i++) {
                p.noStroke();
                let color = '#E0E0E0'; // Default
                if (states[i] === 0) color = '#00A99D'; // Comparing (Teal)
                else if (states[i] === 1) color = '#FFC107'; // Swapping (Yellow)
                else if (states[i] === 2) color = '#2E7D32'; // Sorted (Green)
                else if (states[i] === 3) color = '#C51162'; // Pivot (Magenta)
                p.fill(color);
                p.rect(i * w, p.height - values[i], w, values[i]);
            }
        };

        p.reset = () => {
            p.noLoop();
            values = Array.from({ length: 40 }, () => p.random(15, p.height - 20));
            states = new Array(values.length).fill(-1);
            if (currentAlgorithm.includes('Search')) {
                values.sort((a, b) => a - b);
            }
            sorter = getSorter(currentAlgorithm, values, states);
            p.redraw();
        };

        function* getSorter(name, arr, states) {
            switch (name) {
                case 'Bubble Sort': yield* bubbleSort(arr, states); break;
                case 'Selection Sort': yield* selectionSort(arr, states); break;
                case 'Insertion Sort': yield* insertionSort(arr, states); break;
                case 'Binary Search': yield* binarySearch(arr, states, arr[Math.floor(p.random(arr.length))]); break;
            }
            // Final pass to mark all as sorted
            for(let i=0; i<states.length; i++) {
                states[i] = 2;
                yield;
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
                    }
                    states[j] = -1; states[j + 1] = -1;
                }
                states[arr.length - 1 - i] = 2;
            }
        }

        function* selectionSort(arr, states) {
            for (let i = 0; i < arr.length - 1; i++) {
                let min_idx = i;
                states[i] = 3; // Pivot color for current minimum
                for (let j = i + 1; j < arr.length; j++) {
                    states[j] = 0;
                    yield;
                    if (arr[j] < arr[min_idx]) {
                        states[min_idx] = -1;
                        min_idx = j;
                        states[min_idx] = 3;
                    }
                    states[j] = -1;
                }
                states[i] = 1; states[min_idx] = 1;
                yield;
                [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
                states[min_idx] = -1;
                states[i] = 2;
            }
            states[arr.length - 1] = 2;
        }

        function* insertionSort(arr, states) {
            for (let i = 1; i < arr.length; i++) {
                let key = arr[i];
                let j = i - 1;
                states[i] = 3;
                yield;
                while (j >= 0 && arr[j] > key) {
                    states[j] = 1;
                    arr[j + 1] = arr[j];
                    yield;
                    states[j] = -1;
                    j--;
                }
                arr[j + 1] = key;
                for(let k=0; k<=i; k++) states[k] = 2;
            }
        }

        function* binarySearch(arr, states, target) {
            let low = 0, high = arr.length - 1;
            while(low <= high) {
                for(let i=low; i<=high; i++) states[i] = 0;
                yield;
                let mid = Math.floor((low + high) / 2);
                states[mid] = 3;
                yield;
                if(arr[mid] === target) {
                    states[mid] = 2;
                    return;
                } else if (arr[mid] < target) {
                    for(let i=low; i<=mid; i++) states[i] = -1;
                    low = mid + 1;
                } else {
                    for(let i=mid; i<=high; i++) states[i] = -1;
                    high = mid - 1;
                }
            }
        }
    };

    sketch = new p5(s);

    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());

    setupSidebar();
    updateCodeView();
});
