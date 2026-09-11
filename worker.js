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
    const lines = code.split('\n');
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

    const customAlgorithm = new Function(`return ${code}`)();
    const sorter = customAlgorithm(values, []);
    let result = sorter.next();
    while (!result.done) {
        steps.push(JSON.parse(JSON.stringify(result.value)));
        result = sorter.next();
    }

    return { time: `O(n^${time})`, space: `O(${space > 0 ? 'n' : '1'})`, explanation, steps };
}

function generateExplanation(code) {
    // A simple heuristic for explanation generation
    const lines = code.split('\n');
    const explanation = [];

    lines.forEach(line => {
        if (line.includes('//')) {
            explanation.push(line.split('//')[1].trim());
        }
    });

    return explanation.join('\n');
}
