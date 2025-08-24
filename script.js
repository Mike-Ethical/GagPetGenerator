const searchBtn = document.getElementById('searchBtn');
const generateBox = document.getElementById('generateBox');
const userFoundText = document.getElementById('userFoundText');
const generateBtn = document.getElementById('generateBtn');
const petBox = document.getElementById('petBox');
const petNameText = document.getElementById('petNameText');
const joinServerBtn = document.getElementById('joinServerBtn');
const usernameInput = document.getElementById('username');

const pets = ["Raccoon", "Dragonfly", "Mimic Octopus", "Queen Bee"];

searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if(username) {
    userFoundText.textContent = `User "${username}" Found, Generate Pet`;
    generateBox.style.display = "block";
    petBox.style.display = "none";
  } else {
    alert("Please enter a username");
  }
});

generateBtn.addEventListener('click', () => {
  const randomPet = pets[Math.floor(Math.random() * pets.length)];
  petNameText.textContent = `Your Pet: ${randomPet}`;
  petBox.style.display = "block";
});

joinServerBtn.addEventListener('click', () => {
  window.location.href = "https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483";
});
