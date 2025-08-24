/* ========= Pets ========= */
const pets = [
  { name: "Dragonfly" },
  { name: "Raccoon" },
  { name: "Queen Bee" },
  { name: "Mimic Octopus" },
  { name: "Kitsune" }
];

/* ========= Fake Users ========= */
let fakeUsers = [
  { name: "RobloxUser101", total: 5 },
  { name: "CoolPlayer22", total: 3 },
  { name: "EpicGamer77", total: 7 },
  { name: "GardenMaster", total: 2 },
  { name: "BeeLover", total: 4 },
  { name: "MysticFox", total: 6 }
];

/* ========= Username + Generator ========= */
function startGenerator() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = `<p class="error">⚠️ Please enter a username!</p>`;
    return;
  }

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
    resultDiv.innerHTML = `<div class="pet-card">🎉 You generated: <strong>${pet.name}</strong>!</div>`;
    joinBtn.style.display = "block";
  }, 2000);
}

/* ========= Live Fake Activity ========= */
function randomActivity() {
  const feed = document.getElementById("activity-feed");
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];

  // Increase count
  user.total++;

  const activity = document.createElement("div");
  activity.className = "activity";
  activity.textContent = `${user.name} generated a ${pet.name}!`;

  feed.prepend(activity);

  // Keep only latest 8
  if (feed.children.length > 8) {
    feed.removeChild(feed.lastChild);
  }

  updateLeaderboard();
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

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  updateLeaderboard();
  setInterval(randomActivity, 4000); // every 4s new activity
});
