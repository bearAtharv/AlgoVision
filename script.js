document.addEventListener('DOMContentLoaded', () => {
    const algorithms = {
        'Bubble Sort': {
            code: {
                javascript: `async function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n            }\n        }\n    }\n}`,
                python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]`,
                cpp: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                swap(arr[j], arr[j+1]);\n            }\n        }\n    }\n}`
            }
        },
        'Selection Sort': {
            code: {
                javascript: `async function selectionSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        let min_idx = i;\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n    }\n}`,
                python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[min_idx] > arr[j]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]`, 
                cpp: `void selectionSort(int arr[], int n) {\n    int i, j, min_idx;\n    for (i = 0; i < n-1; i++) {\n        min_idx = i;\n        for (j = i+1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        swap(arr[min_idx], arr[i]);\n    }\n}`
            }
        }
    };

    const algorithmList = document.getElementById('algorithm-list');
    const codeBlock = document.getElementById('code-block');
    const languageSelect = document.getElementById('language-select');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let currentAlgorithm = 'Bubble Sort';
    let sketch;

    function updateCodeView() {
        const lang = languageSelect.value;
        codeBlock.textContent = algorithms[currentAlgorithm].code[lang];
        codeBlock.className = `language-${lang}`;
        Prism.highlightAll();
    }

    function setupSidebar() {
        Object.keys(algorithms).forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            li.addEventListener('click', () => {
                currentAlgorithm = name;
                document.querySelectorAll('#algorithm-list li').forEach(item => item.classList.remove('active'));
                li.classList.add('active');
                updateCodeView();
                sketch.reset();
            });
            algorithmList.appendChild(li);
        });
        algorithmList.firstChild.classList.add('active');
    }

    const s = (p) => {
        let values = [];
        let i = 0, j = 0;
        let min_idx = 0;

        p.setup = () => {
            const container = document.getElementById('visualization-container');
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('visualization-container');
            p.reset();
        };

        p.draw = () => {
            p.background(26, 26, 26);
            let w = p.width / values.length;

            for (let k = 0; k < values.length; k++) {
                p.fill(255);
                if (currentAlgorithm === 'Bubble Sort') {
                    if (k === j || k === j + 1) p.fill(255, 0, 0);
                } else if (currentAlgorithm === 'Selection Sort') {
                    if (k === i) p.fill(0, 255, 0);
                    if (k === min_idx) p.fill(255, 0, 0);
                }
                p.rect(k * w, p.height - values[k], w, values[k]);
            }

            if (currentAlgorithm === 'Bubble Sort') {
                if (i < values.length) {
                    if (values[j] > values[j + 1]) {
                        [values[j], values[j + 1]] = [values[j + 1], values[j]];
                    }
                    j++;
                    if (j >= values.length - i - 1) {
                        j = 0;
                        i++;
                    }
                } else {
                    p.noLoop();
                }
            } else if (currentAlgorithm === 'Selection Sort') {
                if (i < values.length - 1) {
                    if (j < values.length) {
                        if (values[j] < values[min_idx]) {
                            min_idx = j;
                        }
                        j++;
                    } else {
                        [values[i], values[min_idx]] = [values[min_idx], values[i]];
                        i++;
                        min_idx = i;
                        j = i + 1;
                    }
                } else {
                    p.noLoop();
                }
            }
        };

        p.reset = () => {
            values = Array.from({ length: 40 }, () => p.random(p.height));
            i = 0;
            j = 0;
            min_idx = 0;
            p.redraw();
            p.noLoop();
        };
    };

    sketch = new p5(s);

    languageSelect.addEventListener('change', updateCodeView);
    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());

    setupSidebar();
    updateCodeView();
});
