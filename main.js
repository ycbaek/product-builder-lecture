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
    "Pizza": "http://www.public-domain-image.com/public-domain-images-pictures-free-stock-photos/food-and-drink-public-domain-images-pictures/pizza-public-domain-images-pictures/pizza.jpg",
    "Hamburger": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='brown' width='96px' height='96px'%3E%3Cpath d='M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C12.34 12.84 14 11.12 14 9V2h-2v7zm5-3v8h2V6h-2zm-2-4h2V2h-2v1.99zm0 10.01h2V12h-2v1.99zm0 2h2v-2h-2v2zm0 2h2v-2h-2v2zm0 2h2v-2h-2v2z'/%3E%3C/svg%3E",
    "Sushi": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red' width='96px' height='96px'%3E%3Cpath d='M18 10h-1c0-.7-.3-1.3-.8-1.7l-1.3-1.3C14.1 6.5 13.1 6 12 6c-.9 0-1.7.3-2.3.8L8.4 8.3c-.5.4-.8 1-.8 1.7H7c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1c0 .7.3 1.3.8 1.7l1.3 1.3c.6.5 1.4.8 2.3.8s1.7-.3 2.3-.8l1.3-1.3c.5-.4.8-1 .8-1.7h1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm-5 7.41V19c-.43 0-.85-.09-1.25-.26-.8-.32-1.44-.92-1.84-1.67-.3-.57-.41-1.22-.3-1.87l.45-2.73 2.45 2.45c.44.44 1.15.44 1.59 0l1.41-1.41.01.01c.54.54.89 1.25 1.01 2.05.13.91-.07 1.83-.58 2.6L13 17.41zm3.87-2.83l-1.41-1.41c-.39-.39-1.02-.39-1.41 0L12 14.59l-1.02-1.02c-.39-.39-1.02-.39-1.41 0l-1.41 1.41-1.41-1.41-.01-.01c-.54-.54-.89-1.25-1.01-2.05-.13-.91.07-1.83.58-2.6l1.41-1.41c.39-.39 1.02-.39 1.41 0L12 9.41l1.02 1.02c.39.39 1.02.39 1.41 0l1.41-1.41c.54-.54.89-1.25 1.01-2.05.13-.91-.07-1.83-.58-2.6L16.41 6l1.41 1.41c.39.39 1.02.39 1.41 0l1.41-1.41.01-.01c.54-.54.89-1.25 1.01-2.05.13-.91-.07-1.83-.58-2.6L19 4.59l-1.41 1.41zM7 10h1v4H7v-4zm8 0h1v4h-1v-4z'/%3E%3C/svg%3E",
    "Pasta": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='purple' width='96px' height='96px'%3E%3Cpath d='M19 8H5c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3v-4c0-1.66-1.34-3-3-3zm-2 4h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H7v-2h2v2zM5 6h14v2H5V6z'/%3E%3C/svg%3E",
    "Taco": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='green' width='96px' height='96px'%3E%3Cpath d='M22 6c-1.1 0-2 .9-2 2v3H4V8c0-1.1-.9-2-2-2H0v12h2v-3h18v3h2V8c0-1.1-.9-2-2-2zM4 9h16v2H4V9z'/%3E%3C/svg%3E",
    "Steak": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='darkred' width='96px' height='96px'%3E%3Cpath d='M19 13H5v-2h14v2zm0-4H5V7h14v2zm0 8H5v-2h14v2z'/%3E%3C/svg%3E",
    "Fried Chicken": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='goldenrod' width='96px' height='96px'%3E%3Cpath d='M17 11v-1c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h7c.55 0 1-.45 1-1zM7 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm10-5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-5-3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'/%3E%3C/svg%3E",
    "Kimchi Jjigae": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='crimson' width='96px' height='96px'%3E%3Cpath d='M12 2c-3.31 0-6 2.69-6 6v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm0 14c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4s4 1.79 4 4v4c0 2.21-1.79 4-4 4zM4 20h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E",
    "Bibimbap": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='olive' width='96px' height='96px'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E",
    "Ramen": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='lightcoral' width='96px' height='96px'%3E%3Cpath d='M12 2c-3.31 0-6 2.69-6 6v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm0 14c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4s4 1.79 4 4v4c0 2.21-1.79 4-4 4zM4 20h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E",
    "Pho": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='saddlebrown' width='96px' height='96px'%3E%3Cpath d='M12 2c-3.31 0-6 2.69-6 6v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm0 14c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4s4 1.79 4 4v4c0 2.21-1.79 4-4 4zM4 20h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E",
    "Pad Thai": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='peru' width='96px' height='96px'%3E%3Cpath d='M12 2c-3.31 0-6 2.69-6 6v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm0 14c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4s4 1.79 4 4v4c0 2.21-1.79 4-4 4zM4 20h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E",
    "Curry": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='darkgoldenrod' width='96px' height='96px'%3E%3Cpath d='M12 2c-3.31 0-6 2.69-6 6v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm0 14c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4s4 1.79 4 4v4c0 2.21-1.79 4-4 4zM4 20h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E",
    "Burrito": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='olivedrab' width='96px' height='96px'%3E%3Cpath d='M22 6c-1.1 0-2 .9-2 2v3H4V8c0-1.1-.9-2-2-2H0v12h2v-3h18v3h2V8c0-1.1-.9-2-2-2zM4 9h16v2H4V9z'/%3E%3C/svg%3E",
    "Salad": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='forestgreen' width='96px' height='96px'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z'/%3E%3C/svg%3E"
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


