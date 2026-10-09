self.onmessage = function(event) {
    const { code, values } = event.data;
    try {
        const { time, space, explanation, steps } = analyzeAndExecute(code, values);
        self.postMessage({ time, space, explanation, steps });
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};

function analyzeAndExecute(code, values) {
    let time = 0;
    let space = 0;
    const steps = [];

    // A simple heuristic for complexity analysis
    const lines = (code || '').split('\n');
    const loopRegex = /for|while/;
    const allocationRegex = /new|Array|Object/;

    lines.forEach(line => {
        if (loopRegex.test(line)) {
            time++;
        }
        if (allocationRegex.test(line)) {
            space++;
        }
    });

    const explanation = generateExplanation(code);

    const inputValues = Array.isArray(values) && values.length > 0 ? [...values] : [10, 20, 15, 30, 25];
    const states = new Array(inputValues.length).fill(-1);

    const customAlgorithm = new Function(`return (${code})`)();
    const sorter = customAlgorithm(inputValues, states);

    if (sorter && typeof sorter.next === 'function') {
        let result = sorter.next();
        let stepCount = 0;
        const maxSteps = 5000;
        while (!result.done && stepCount < maxSteps) {
            steps.push([...states]);
            result = sorter.next();
            stepCount++;
        }
    } else {
        throw new Error('Custom code must be a generator function (e.g. function* myAlgorithm(values, states) { ... })');
    }

    const timeComplexity = time > 0 ? (time === 1 ? 'O(n)' : `O(n^${time})`) : 'O(1)';
    const spaceComplexity = space > 0 ? 'O(n)' : 'O(1)';

    return { time: timeComplexity, space: spaceComplexity, explanation, steps };
}

function generateExplanation(code) {
    const lines = (code || '').split('\n');
    const explanation = [];

    lines.forEach(line => {
        if (line.includes('//')) {
            explanation.push(line.split('//')[1].trim());
        }
    });

    return explanation.join('\n');
}
