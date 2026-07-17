const barContainer = document.getElementById('bar-container');
const sortBtn = document.getElementById('sortBtn');
const resetBtn = document.getElementById('resetBtn');

let array = [];

function generateBars() {
    barContainer.innerHTML = '';
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 150) + 10);
    }

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i]}px`;
        barContainer.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await sleep(50);

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = 'dodgerblue';
            bars[j + 1].style.backgroundColor = 'dodgerblue';
        }
        bars[array.length - 1 - i].style.backgroundColor = 'lightgreen';
    }
    bars[0].style.backgroundColor = 'lightgreen';
}


sortBtn.addEventListener('click', bubbleSort);
resetBtn.addEventListener('click', generateBars);

window.onload = generateBars;
