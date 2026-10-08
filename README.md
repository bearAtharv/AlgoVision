# AlgoVision 🚀

An interactive, visual algorithm learning platform built for visualizing, analyzing, and exploring computer science algorithms in real time.

AlgoVision provides intuitive, high-performance step-by-step visual demonstrations for sorting, searching, and graph pathfinding algorithms, paired with multi-language code snippets and an interactive custom algorithm runner.

---

## ✨ Features

- **Sorting Visualizer**: Bubble Sort, Selection Sort, Insertion Sort, Shell Sort, Merge Sort, Quick Sort, and Heap Sort with speed controls and bar/dot views.
- **Searching Visualizer**: Interactive Linear Search and Binary Search with dynamic target inputs and pointer indicators.
- **Graph Algorithms**: Breadth-First Search (BFS), Depth-First Search (DFS), and Dijkstra's Shortest Path on weighted graph topologies.
- **Code Viewer**: Real-time syntax-highlighted implementations in **JavaScript**, **Python**, **C++**, and **Java** via Prism and CodeMirror.
- **Web Worker Architecture**: Heavy sorting operations and custom code generation run off-thread in a Web Worker for 60fps animations.
- **Custom Algorithm Sandbox**: Code and test your own sorting routines directly inside the built-in generator-based sandbox.
- **Interactive Learn Mode**: Deep dive into time & space complexity, step pseudocode, and algorithm design patterns.
- **Project Presentation Decks**: Full interactive slide decks (`ppt.html` and `ppt1.html`) showcasing architecture, design choices, and benchmarks.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5 Canvas, CSS3 Glassmorphism
- **Visualization Engines**: HTML5 Canvas, p5.js
- **Concurrency**: HTML5 Web Worker (`worker.js`)
- **Code & Syntax**: CodeMirror, Prism.js
- **Typography & Icons**: Inter Font, Font Awesome

---

## 🚀 Getting Started

AlgoVision is completely client-side and requires no build tools or package managers to run:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:bearAtharv/AlgoVision.git
   cd AlgoVision
   ```

2. **Run locally**:
   - Open `index.html` directly in any modern web browser, or
   - Serve using VS Code Live Server or Python HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
   - Navigate to `http://localhost:8000`

---

## 📂 Project Structure

```
AlgoVision/
├── index.html       # Main application layout and UI
├── script.js        # Core visualizer engine, controls, and animations
├── style.css        # Modern dark theme & responsive UI styles
├── worker.js        # Web Worker for off-thread algorithm execution
├── ppt.html         # Interactive project presentation deck
├── ppt1.html        # Comprehensive project showcase slides
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

---

## 👨‍💻 Author

- **Atharv** ([@bearAtharv](https://github.com/bearAtharv)) - *atharvs0077@gmail.com*
