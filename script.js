const searchBtn = document.getElementById('searchBtn');
const generateBox = document.getElementById('generateBox');
const userFoundText = document.getElementById('userFoundText');
const generateBtn = document.getElementById('generateBtn');
const loadingBox = document.getElementById('loadingBox');
const petBox = document.getElementById('petBox');
const petNameText = document.getElementById('petNameText');
const petIcon = document.getElementById('petIcon');
const joinServerBtn = document.getElementById('joinServerBtn');
const usernameInput = document.getElementById('username');

// Pet data with icons
const pets = [
  { name: "Raccoon", icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { name: "Dragonfly", icon: "https://cdn-icons-png.flaticon.com/512/616/616535.png" },
  { name: "Mimic Octopus", icon: "https://cdn-icons-png.flaticon.com/512/616/616563.png" },
  { name: "Queen Bee", icon: "https://cdn-icons-png.flaticon.com/512/616/616430.png" }
];

// Step 1: Search username
searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if(username) {
    userFoundText.textContent = `User "${username}" Found, Generate Pet`;
    generateBox.style.display = "block";
    petBox.style.display = "none";
    loadingBox.style.display = "none";
  } else {
    alert("Please enter a username");
  }
});

// Step 2: Generate pet
generateBtn.addEventListener('click', () => {
  generateBox.style.display = "none";
  loadingBox.style.display = "block";

  // Simulate loading
  setTimeout(() => {
    loadingBox.style.display = "none";
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    petNameText.textContent = `Your Pet: ${randomPet.name}`;
    petIcon.src = randomPet.icon;
    petBox.style.display = "block";
  }, 2000); // 2-second loading
});

// Step 3: Join server
joinServerBtn.addEventListener('click', () => {
  window.location.href = "https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483";
});
