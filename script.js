const barContainer = document.getElementById('bar-container');
let array = [];

function generateBars() {
    barContainer.innerHTML = '';
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i]}px`;
        barContainer.appendChild(bar);
    }
}

window.onload = generateBars;
