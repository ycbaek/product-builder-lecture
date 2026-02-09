const lottoContainer = document.getElementById('lotto-container');
const generateButton = document.getElementById('generate-button');
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Theme switching logic
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = 'Switch to Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeToggleButton.textContent = 'Switch to Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggleButton.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});


function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getNumberColor(number) {
    if (number <= 10) return '#f44336'; // Red
    if (number <= 20) return '#ff9800'; // Orange
    if (number <= 30) return '#ffeb3b'; // Yellow (use a darker text for this)
    if (number <= 40) return '#2196f3'; // Blue
    return '#4caf50'; // Green
}

function displayNumbers(numbers) {
    lottoContainer.innerHTML = '';
    numbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('lotto-number');
        numberElement.textContent = number;
        const backgroundColor = getNumberColor(number);
        numberElement.style.backgroundColor = backgroundColor;
        if (backgroundColor === '#ffeb3b') { // If yellow, use dark text
            numberElement.style.color = '#333';
        }
        lottoContainer.appendChild(numberElement);
    });
}

function handleGenerateClick() {
    const numbers = generateNumbers();
    displayNumbers(numbers);
}

generateButton.addEventListener('click', handleGenerateClick);

// Initial generation
handleGenerateClick();

