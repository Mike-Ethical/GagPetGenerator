/* ========= Pets ========= */
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

/* ========= Fake Users (will load from API) ========= */
let fakeUsers = [];

/* ========= Load Random Roblox Users ========= */
async function loadRandomUsers() {
  try {
    const res = await fetch("https://users.roblox.com/v1/users/random?limit=10");
    const data = await res.json();

    fakeUsers = data.data.map(user => ({
      name: user.name,
      id: user.id,
      total: Math.floor(Math.random() * 20) // start them with some pets
    }));

    updateLeaderboard();
  } catch (err) {
    console.error("Failed to load random Roblox users:", err);
    // fallback users if API fails
    fakeUsers = [
      { name: "RobloxUser1", id: 1, total: 5 },
      { name: "RobloxUser2", id: 2, total: 8 },
      { name: "RobloxUser3", id: 3, total: 3 }
    ];
    updateLeaderboard();
  }
}

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
  if (fakeUsers.length === 0) return; // wait until users load

  const feed = document.getElementById("activity-feed");
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];

  user.total++;

  const activity = document.createElement("div");
  activity.className = "activity";
  activity.innerHTML = `
    <img src="https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=48&height=48&format=png" alt="avatar">
    <span><strong>${user.name}</strong> generated a <strong>${pet.name}</strong>!</span>
  `;

  feed.prepend(activity);

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
    row.innerHTML = `
      <img src="https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=48&height=48&format=png" alt="avatar">
      <span>${user.name}</span>
      <span class="score">${user.total} pets</span>
    `;
    leaderboard.appendChild(row);
  });
}

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  loadRandomUsers();              // fetch users first
  setInterval(randomActivity, 4000); // start fake feed
});
  }

  profileDiv.textContent = `✅ Username "${username}" found. You can generate your pet.`;

  const generateBtn = document.createElement("button");
  generateBtn.textContent = "Generate Pet";
  generateBtn.onclick = () => {
    resultDiv.innerHTML = `<div class="spinner"></div> <p>Generating your pet...</p>`;
    serverBtnDiv.textContent = "";

    setTimeout(() => {
      const pet = pets[Math.floor(Math.random() * pets.length)];
      resultDiv.textContent = `🎉 You generated a ${pet.name}!`;

      const serverBtn = document.createElement("a");
      serverBtn.href = "https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483";
      serverBtn.textContent = "⬇️ Join Private Server to Claim";
      serverBtn.className = "server-link";
      serverBtn.target = "_blank";

      serverBtnDiv.innerHTML = "";
      serverBtnDiv.appendChild(serverBtn);
    }, 2000);
  };

  profileDiv.appendChild(document.createElement("br"));
  profileDiv.appendChild(generateBtn);
}

/* ========= Live Activity ========= */
function addActivityLine(user, pet) {
  const feed = document.getElementById("activityFeed");

  const line = document.createElement("div");
  line.className = "activity-line";

  const avatar = document.createElement("img");
  avatar.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=48&height=48&format=png`;
  avatar.alt = user.name;

  const text = document.createElement("span");
  text.textContent = `${user.name} generated a ${pet.name}`;

  line.appendChild(avatar);
  line.appendChild(text);

  feed.appendChild(line);

  if (feed.children.length > 7) {
    feed.removeChild(feed.firstChild);
  }
}

function randomActivity() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  addActivityLine(user, pet);
}

/* ========= Leaderboard ========= */
function buildLeaderboard() {
  const board = document.getElementById("leaderboard");
  board.innerHTML = "";

  fakeUsers.sort((a, b) => b.total - a.total).forEach(user => {
    const card = document.createElement("div");
    card.className = "leader-card";

    const avatar = document.createElement("img");
    avatar.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=50&height=50&format=png`;

    const info = document.createElement("div");
    info.className = "leader-info";
    info.innerHTML = `<strong>${user.name}</strong><br>Pets Generated: ${user.total}`;

    card.appendChild(avatar);
    card.appendChild(info);
    board.appendChild(card);
  });
}

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkBtn").addEventListener("click", startGenerator);

  // Live Activity
  for (let i = 0; i < 3; i++) randomActivity();
  setInterval(randomActivity, 4000);

  // Leaderboard
  buildLeaderboard();
});
