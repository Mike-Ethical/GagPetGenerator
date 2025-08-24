/* ========= Pets ========= */
const pets = ["Dragonfly", "Raccoon", "Queen Bee", "Mimic Octopus", "Kitsune"];

/* ========= Fake Users ========= */
let fakeUsers = [
  "RobloxUser101", "CoolPlayer22", "EpicGamer77", 
  "GardenMaster", "BeeLover", "MysticFox", "DragonSlayer",
  "NightOwl", "PetHunter", "BlueWolf"
];

/* ========= Username + Generator ========= */
let realUser = null;

function startGenerator() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = `<p class="error">⚠️ Please enter a username!</p>`;
    return;
  }

  realUser = username;
  profileDiv.innerHTML = `<p class="success">✅ Username found: <strong>${username}</strong>. You can now generate your pet!</p>`;
  document.getElementById("generator-section").style.display = "block";
}

/* ========= Generate Pet ========= */
function generatePet() {
  const resultDiv = document.getElementById("result");
  const joinBtn = document.getElementById("join-btn");

  resultDiv.innerHTML = `<div class="loading">🔄 Generating your pet...</div>`;
  joinBtn.style.display = "none";

  setTimeout(() => {
    const pet = pets[Math.floor(Math.random() * pets.length)];
    resultDiv.innerHTML = `<div class="pet-card">🎉 ${realUser} generated: <strong>${pet}</strong>!</div>`;
    joinBtn.style.display = "block";
    addActivity(`${realUser} generated a ${pet}!`);
  }, 2000);
}

/* ========= Live Fake Activity ========= */
function randomActivity() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  addActivity(`${user} generated a ${pet}!`);
}

function addActivity(message) {
  const feed = document.getElementById("activity-feed");
  const activity = document.createElement("div");
  activity.className = "activity";
  activity.textContent = message;

  feed.appendChild(activity); // adds to bottom
  feed.scrollTop = feed.scrollHeight; // auto-scrolls down
}

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  setInterval(randomActivity, 3000); // every 3s new fake activity
});
