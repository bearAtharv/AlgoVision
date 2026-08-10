document.addEventListener('DOMContentLoaded', () => {
    const algorithms = {
        'Bubble Sort': {
            code: {
                javascript: "// Bubble Sort Algorithm in JavaScript\nasync function bubbleSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      // Highlight elements being compared\n      if (arr[j] > arr[j + 1]) {\n        // Swap elements\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n}",
                python: "# Bubble Sort Algorithm in Python\ndef bubble_sort(arr):\n  n = len(arr)\n  for i in range(n):\n    for j in range(0, n-i-1):\n      if arr[j] > arr[j+1]:\n        arr[j], arr[j+1] = arr[j+1], arr[j]",
                cpp: "// Bubble Sort Algorithm in C++\n#include <iostream>\nvoid bubbleSort(int arr[], int n) {\n  for (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-i-1; j++) {\n      if (arr[j] > arr[j+1]) {\n        std::swap(arr[j], arr[j+1]);\n      }\n    }\n  }\n}"
            }
        },
        'Selection Sort': {
            code: {
                javascript: "// Selection Sort Algorithm in JavaScript\nasync function selectionSort(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    let min_idx = i;\n    for (let j = i + 1; j < n; j++) {\n      if (arr[j] < arr[min_idx]) {\n        min_idx = j;\n      }\n    }\n    // Swap the found minimum element with the first element\n    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n  }\n}",
                python: "# Selection Sort Algorithm in Python\ndef selection_sort(arr):\n  for i in range(len(arr)):\n    min_idx = i\n    for j in range(i+1, len(arr)):\n      if arr[min_idx] > arr[j]:\n        min_idx = j\n    arr[i], arr[min_idx] = arr[min_idx], arr[i]",
                cpp: "// Selection Sort Algorithm in C++\n#include <iostream>\nvoid selectionSort(int arr[], int n) {\n  int i, j, min_idx;\n  for (i = 0; i < n-1; i++) {\n    min_idx = i;\n    for (j = i+1; j < n; j++) {\n      if (arr[j] < arr[min_idx]) {\n        min_idx = j;\n      }\n    }\n    std::swap(arr[min_idx], arr[i]);\n  }\n}"
            }
        },
        // ... Add other algorithms here
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
        codeBlock.textContent = algorithms[currentAlgorithm].code[currentLang];
        codeBlock.className = `language-${currentLang}`;
        Prism.highlightAll();
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
                sketch.reset();
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

        p.setup = () => {
            const container = document.getElementById('visualization-container');
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('visualization-container');
            p.reset();
        };

        p.draw = () => {
            p.background('#1E1E1E');
            let w = p.width / values.length;

            for (let i = 0; i < values.length; i++) {
                p.noStroke();
                if (states[i] === 2) {
                    p.fill('#2E7D32'); // Green for sorted
                } else if (states[i] === 0) {
                    p.fill('#00A99D'); // Teal for comparing
                } else if (states[i] === 1) {
                    p.fill('#FFC107'); // Yellow for swapping
                } else {
                    p.fill('#E0E0E0'); // Default light gray
                }
                p.rect(i * w, p.height - values[i], w, values[i]);
                
                p.fill(0);
                p.textAlign(p.CENTER, p.CENTER);
                if(w > 20) {
                    p.text(Math.floor(values[i]), i * w + w / 2, p.height - values[i] - 10);
                }
            }
            // Sorting logic will be placed here in a step-by-step manner
        };

        p.reset = () => {
            values = Array.from({ length: 30 }, () => p.random(5, p.height - 20));
            states = new Array(values.length).fill(-1);
            // Reset sorting algorithm state here
            p.redraw();
            p.noLoop();
        };
    };

    sketch = new p5(s);

    playBtn.addEventListener('click', () => sketch.loop());
    pauseBtn.addEventListener('click', () => sketch.noLoop());
    resetBtn.addEventListener('click', () => sketch.reset());

    setupSidebar();
    updateCodeView();
});
