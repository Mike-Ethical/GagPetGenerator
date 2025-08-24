/* ========= Pets ========= */
const pets = ["Dragonfly", "Raccoon", "Queen Bee", "Mimic Octopus", "Kitsune"];

/* ========= Fake Users ========= */
let fakeUsers = [
  { name: "RobloxUser101", total: 5 },
  { name: "CoolPlayer22", total: 3 },
  { name: "EpicGamer77", total: 7 },
  { name: "GardenMaster", total: 2 },
  { name: "BeeLover", total: 4 },
  { name: "MysticFox", total: 6 }
];

let realUser = null;

/* ========= Username + Generator ========= */
function startGenerator() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = `<p class="error">⚠️ Please enter a username!</p>`;
    return;
  }

  realUser = { name: username, total: 0 };
  fakeUsers.push(realUser);

  profileDiv.innerHTML = `<p class="success">✅ Username found: <strong>${username}</strong>. You can now generate your pet!</p>`;
  document.getElementById("generator-section").style.display = "block";
  updateLeaderboard();
}

/* ========= Generate Pet ========= */
function generatePet() {
  const resultDiv = document.getElementById("result");
  const joinBtn = document.getElementById("join-btn");

  resultDiv.innerHTML = `<div class="loading">🔄 Generating your pet...</div>`;
  joinBtn.style.display = "none";

  setTimeout(() => {
    const pet = pets[Math.floor(Math.random() * pets.length)];
    resultDiv.innerHTML = `<div class="pet-card">🎉 You generated: <strong>${pet}</strong>!</div>`;
    joinBtn.style.display = "block";

    if (realUser) {
      realUser.total++;
      addBannerMessage(`${realUser.name} generated a ${pet}!`);
      addActivity(`${realUser.name} generated a ${pet}!`);
      updateLeaderboard();
    }
  }, 2000);
}

/* ========= Live Fake Activity ========= */
function randomActivity() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  user.total++;

  addActivity(`${user.name} generated a ${pet}!`);
  addBannerMessage(`${user.name} generated a ${pet}!`);
  updateLeaderboard();
}

function addActivity(message) {
  const feed = document.getElementById("activity-feed");
  const activity = document.createElement("div");
  activity.className = "activity";
  activity.textContent = message;

  feed.prepend(activity);

  if (feed.children.length > 8) {
    feed.removeChild(feed.lastChild);
  }
}

/* ========= Leaderboard ========= */
function updateLeaderboard() {
  const leaderboard = document.getElementById("leaderboard-list");
  leaderboard.innerHTML = "";

  const sorted = [...fakeUsers].sort((a, b) => b.total - a.total);

  sorted.forEach(user => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";
    row.textContent = `${user.name} — ${user.total} pets`;
    leaderboard.appendChild(row);
  });
}

/* ========= Banner ========= */
let bannerMessages = ["🐾 Welcome to the Roblox Pet Generator!"];
let bannerIndex = 0;

function addBannerMessage(message) {
  bannerMessages.push(message);
}

function cycleBanner() {
  const bannerText = document.getElementById("banner-text");
  if (bannerMessages.length > 0) {
    bannerText.textContent = bannerMessages[bannerIndex];
    bannerIndex = (bannerIndex + 1) % bannerMessages.length;
  }
}

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  updateLeaderboard();
  setInterval(randomActivity, 4000);
  setInterval(cycleBanner, 3000);
});
