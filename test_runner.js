// Self-check test runner for AlgoVision PR 1 fixes
const assert = require('assert');
const fs = require('fs');

global.self = global;

console.log('Running AlgoVision PR 1 Verification Tests...');

// Test 1: Worker function execution and state recording
const workerSource = fs.readFileSync('worker.js', 'utf8');
const analyzeAndExecute = new Function(`${workerSource}; return analyzeAndExecute;`)();

const testAlgo = `function* testBubble(arr, states) {
    for (let i = 0; i < arr.length; i++) {
        states[i] = 0;
        yield;
        states[i] = 2;
        yield;
    }
}`;

const result = analyzeAndExecute(testAlgo, [5, 2, 8]);
assert(result.steps.length > 0, 'Steps must be recorded');
assert.strictEqual(result.steps[0].length, 3, 'Each step must record states for all elements');
assert.strictEqual(result.steps[0][0], 0, 'First step should mark element 0 as comparing (0)');
assert.strictEqual(result.steps[1][0], 2, 'Second step should mark element 0 as sorted (2)');
assert(result.time.includes('O('), 'Time complexity must be valid Big-O string');
console.log('✓ Test 1: Worker step serialization & execution verified');

// Test 2: Infinite loop guard in worker
const infiniteAlgo = `function* badAlgo(arr, states) {
    while (true) {
        states[0] = 1;
        yield;
    }
}`;
const cappedResult = analyzeAndExecute(infiniteAlgo, [1, 2]);
assert.strictEqual(cappedResult.steps.length, 5000, 'Infinite loop must be safely capped at 5000 steps');
console.log('✓ Test 2: Worker infinite loop guard verified');

// Test 3: Check that script.js does not contain TDZ access before guideBtn declaration
const scriptSource = fs.readFileSync('script.js', 'utf8');
const guideBtnDeclIndex = scriptSource.indexOf("const guideBtn = document.getElementById('guide-btn')");
const guideBtnUsageIndex = scriptSource.indexOf("guideBtn.style.display = 'none'");
assert(guideBtnDeclIndex !== -1, 'guideBtn must be declared');
assert(guideBtnUsageIndex !== -1, 'guideBtn.style.display must exist');
assert(guideBtnDeclIndex < guideBtnUsageIndex, 'guideBtn must be declared before any usage (no TDZ)');
console.log('✓ Test 3: Lexical declaration order (TDZ fix) verified');

// Test 4: Check search input visibility condition
assert(scriptSource.includes("searchInputContainer.style.display = currentCategory === 'searching' ? 'flex' : 'none'"),
    'Search input must only be displayed for searching category');
console.log('✓ Test 4: Search input display condition verified');

// Test 5: Check sketch windowResized and getters/setters exist
assert(scriptSource.includes('p.windowResized = () =>'), 'p.windowResized must be defined');
assert(scriptSource.includes('p.getValues = () => values'), 'p.getValues must be exposed');
assert(scriptSource.includes('sketch.getValues()'), 'worker call must use sketch.getValues()');
console.log('✓ Test 5: Responsive canvas and state getters verified');

console.log('\nAll 5 verification checks passed successfully!');
