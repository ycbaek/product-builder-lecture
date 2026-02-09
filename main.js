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

const menuImages = {
    "Pizza": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='orange' width='96px' height='96px'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.47-7-7.43 0-4.08 3.05-7.44 7-7.93V19.93zm1-15.93c-.34.03-.68.06-1 .1v15.8c.32.04.66.07 1 .1V4zm2 15.93c3.95-.49 7-3.47 7-7.43s-3.05-7.44-7-7.93v15.93z'/%3E%3C/svg%3E"
    // Add more menu images here if needed
};

function generateMenu() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    return dinnerMenus[randomIndex];
}

function displayMenu(menu) {
    menuContainer.innerHTML = '';
    const menuElement = document.createElement('div');
    menuElement.classList.add('menu-item');

    if (menuImages[menu]) {
        const menuImage = document.createElement('img');
        menuImage.src = menuImages[menu];
        menuImage.alt = menu;
        menuImage.style.width = '100px'; // Adjust size as needed
        menuImage.style.height = '100px'; // Adjust size as needed
        menuImage.style.marginBottom = '10px'; // Spacing
        menuElement.appendChild(menuImage);
    }

    const menuText = document.createElement('span');
    menuText.textContent = menu;
    menuElement.appendChild(menuText);
    
    menuContainer.appendChild(menuElement);
}

function handleGenerateClick() {
    const menu = generateMenu();
    displayMenu(menu);
}

generateButton.addEventListener('click', handleGenerateClick);

// Initial generation
handleGenerateClick();


