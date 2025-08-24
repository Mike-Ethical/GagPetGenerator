const searchBtn = document.getElementById('searchBtn');
const generateBox = document.getElementById('generateBox');
const userFoundText = document.getElementById('userFoundText');
const generateBtn = document.getElementById('generateBtn');
const loadingBox = document.getElementById('loadingBox');
const petBox = document.getElementById('petBox');
const petNameText = document.getElementById('petNameText');
const joinServerBtn = document.getElementById('joinServerBtn');
const usernameInput = document.getElementById('username');
const findingBox = document.getElementById('findingBox');
const liveActivity = document.getElementById('liveActivity');

const pets = ["Raccoon", "Dragonfly", "Mimic Octopus", "Queen Bee"];

// Add activity entry
function addActivity(text) {
  const entry = document.createElement('div');
  entry.className = 'activity-entry';
  entry.textContent = text;
  liveActivity.prepend(entry); // newest on top
}

// Step 1: Search username
searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter a username");
    return;
  }

  // Show finding animation
  generateBox.style.display = "none";
  petBox.style.display = "none";
  findingBox.style.display = "block";

  addActivity(`Searching for username: ${username}`);

  setTimeout(() => {
    findingBox.style.display = "none";
    userFoundText.textContent = `User "${username}" Found, Generate Pet`;
    generateBox.style.display = "block";

    addActivity(`User found: ${username}`);
  }, 2000);
});

// Step 2: Generate pet
generateBtn.addEventListener('click', () => {
  generateBox.style.display = "none";
  loadingBox.style.display = "block";

  setTimeout(() => {
    loadingBox.style.display = "none";
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    petNameText.textContent = `Your Pet: ${randomPet}`;
    petBox.style.display = "block";

    addActivity(`Generated pet: ${randomPet}`);
  }, 2000);
});

// Step 3: Join server
joinServerBtn.addEventListener('click', () => {
  addActivity(`User clicked Join Private Server`);
  window.location.href = "https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483";
});
