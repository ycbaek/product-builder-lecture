const menuContainer = document.getElementById('menu-container');
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

const dinnerMenus = [
    "Pizza", "Hamburger", "Sushi", "Pasta", "Taco",
    "Steak", "Fried Chicken", "Kimchi Jjigae", "Bibimbap", "Ramen",
    "Pho", "Pad Thai", "Curry", "Burrito", "Salad"
];

function generateMenu() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    return dinnerMenus[randomIndex];
}

function displayMenu(menu) {
    menuContainer.innerHTML = '';
    const menuElement = document.createElement('div');
    menuElement.classList.add('menu-item');
    menuElement.textContent = menu;
    menuContainer.appendChild(menuElement);
}

function handleGenerateClick() {
    const menu = generateMenu();
    displayMenu(menu);
}

generateButton.addEventListener('click', handleGenerateClick);

// Initial generation
handleGenerateClick();

