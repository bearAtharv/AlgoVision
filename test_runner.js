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

// Test 6 (PR 2 TDD): Verify multi-language code snippets (JS, Python, C++, Java)
const cleanScript = scriptSource.replace(/\r\n/g, '\n');
const algoStart = cleanScript.indexOf('const algorithms = {');
const algoEnd = cleanScript.indexOf(';\n\n    const learnContent = {');
assert(algoStart !== -1 && algoEnd !== -1, 'algorithms object must be bounded in script.js');
const algorithms = new Function(`return ${cleanScript.slice(algoStart + 'const algorithms = '.length, algoEnd)}`)();

const requiredLangs = ['javascript', 'python', 'cpp', 'java'];
for (const [category, algos] of Object.entries(algorithms)) {
    for (const [name, algo] of Object.entries(algos)) {
        for (const lang of requiredLangs) {
            const code = algo.code && algo.code[lang];
            assert(code && code.trim().length > 30, `Algorithm "${name}" must have code for ${lang}`);
            assert(!code.includes('will go here'), `Algorithm "${name}" has placeholder comment for ${lang}`);
        }
    }
}
console.log('✓ Test 6: Multi-language code snippets verified for all algorithms');

// Test 7 (PR 2 TDD): Verify learnContent coverage for all algorithms
const learnStart = cleanScript.indexOf('const learnContent = {');
const learnEnd = cleanScript.indexOf(';\n\n    function getAlgoData(');
assert(learnStart !== -1 && learnEnd !== -1, 'learnContent object must be bounded in script.js');
const learnContent = new Function(`return ${cleanScript.slice(learnStart + 'const learnContent = '.length, learnEnd)}`)();

for (const [category, algos] of Object.entries(algorithms)) {
    for (const [name] of Object.entries(algos)) {
        const content = learnContent[name];
        assert(content, `learnContent must have an entry for "${name}"`);
        assert(content.explanation && content.explanation.length > 20, `"${name}" must have explanation`);
        assert(content.howItWorks && content.howItWorks.length > 20, `"${name}" must have howItWorks`);
        assert(content.code && content.code.length > 20, `"${name}" must have code`);
    }
}
console.log('✓ Test 7: Learn mode content coverage verified for all algorithms');

console.log('\nAll 7 verification checks passed successfully!');
