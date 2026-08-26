window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderBars = document.querySelector('.loader-bars');
    if (loaderBars) {
        for (let i = 0; i < 5; i++) {
            loaderBars.appendChild(document.createElement('span'));
        }
    }
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 500);
});

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
    const viewButtons = document.querySelectorAll('.view-btn');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const speedSlider = document.getElementById('speed-slider');

    let currentAlgorithm = 'Bubble Sort';
    let currentLang = 'javascript';
    let currentView = 'bars';
    let animationSpeed = 30;
    let sketch;

    function updateCodeView() {
        const algo = algorithms[currentAlgorithm];
        if (algo && algo.code[currentLang]) {
            codeBlock.textContent = algo.code[currentLang];
            codeBlock.className = `language-${currentLang}`;
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

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentView = btn.dataset.view;
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (sketch) sketch.reset();
        });
    });

    speedSlider.addEventListener('input', (e) => {
        animationSpeed = e.target.value;
        if (sketch) sketch.frameRate(parseInt(animationSpeed));
    });

    const s = (p) => {
        let values = [];
        let states = [];
        let sorter;

        p.setup = () => {
            const container = document.getElementById('visualization-container');
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('visualization-container');
            p.frameRate(animationSpeed);
            p.reset();
        };

        p.draw = () => {
            p.background('#1E1E1E');
            if (sorter) {
                let result = sorter.next();
                if (result.done) {
                    p.noLoop();
                }
            }
            if (currentView === 'bars') {
                drawBars();
            } else {
                drawArray();
            }
        };

        function drawBars() {
            let w = p.width / values.length;
            for (let i = 0; i < values.length; i++) {
                p.noStroke();
                p.fill(getColor(states[i]));
                p.rect(i * w, p.height - values[i], w, values[i]);
            }
        }

        function drawArray() {
            let n = values.length;
            let boxSize = p.min(p.width / (n + 1), 60);
            let startX = (p.width - n * boxSize - (n - 1) * 5) / 2;
            let y = p.height / 2;

            for (let i = 0; i < n; i++) {
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
            if (state === 0) return '#00A99D';
            if (state === 1) return '#FFC107';
            if (state === 2) return '#2E7D32';
            if (state === 3) return '#C51162';
            return '#424242'; // Darker default for borders
        }

        p.reset = () => {
            p.noLoop();
            let numElements = currentView === 'bars' ? 40 : 10;
            values = Array.from({ length: numElements }, () => p.random(1, 100));
            if (currentView === 'bars') {
                values = values.map(v => p.map(v, 1, 100, 15, p.height - 20));
            }
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
            for(let i=0; i<states.length; i++) {
                states[i] = 2;
                if(i % 5 === 0) yield;
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

    setupSidebar();
    updateCodeView();
    sketch = new p5(s);

    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());
});
// timing delay adjustment
