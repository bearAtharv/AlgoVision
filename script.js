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
        }
    };

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

    let currentAlgorithm = 'Bubble Sort';
    let currentCategory = 'sorting';
    let currentLang = 'javascript';
    let currentView = 'bars';
    let animationSpeed = 45;
    let sketch;

    function getAlgoData(category, name) { return algorithms[category][name]; }

    function updateUIForAlgorithm() {
        const algoData = getAlgoData(currentCategory, currentAlgorithm);
        timeComplexityEl.textContent = algoData.complexity.time;
        spaceComplexityEl.textContent = algoData.complexity.space;
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

    const s = (p) => {
        let values = [], states = [], sorter;

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
            if (currentView === 'bars') drawBars(); else drawArray();
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

        function getColor(state) {
            if (state === 0) return '#00A99D'; // Comparing
            if (state === 1) return '#FFC107'; // Swapping
            if (state === 2) return '#2E7D32'; // Sorted
            if (state === 3) return '#C51162'; // Pivot/Special
            return '#424242';
        }

        p.reset = () => {
            p.noLoop();
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
            sorter = getSorter();
            p.redraw();
        };

        function getSorter() {
            let target = parseInt(searchInput.value);
            switch (currentAlgorithm) {
                case 'Bubble Sort': return bubbleSort(values, states);
                case 'Selection Sort': return selectionSort(values, states);
                case 'Insertion Sort': return insertionSort(values, states);
                case 'Shell Sort': return shellSort(values, states);
                case 'Linear Search': return linearSearch(values, states, target);
                case 'Binary Search': return binarySearch(values, states, target);
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
    };

    sketch = new p5(s);
    setupSidebar();

    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());
});
