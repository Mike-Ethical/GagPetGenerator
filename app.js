/* ========= Pets ========= */
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

/* ========= Fake Users ========= */
const fakeUsers = [
  { name: "Builderman", id: 156, total: 48 },
  { name: "Shedletsky", id: 261, total: 42 },
  { name: "stickmasterluke", id: 145, total: 37 },
  { name: "roblox", id: 1, total: 35 },
  { name: "Merely", id: 33947, total: 29 },
  { name: "ReeseMcBlox", id: 20, total: 22 },
  { name: "tarabyte", id: 1639, total: 18 },
  { name: "CloneTrooper1019", id: 12886, total: 15 }
];

/* ========= Username + Generator ========= */
function startGenerator() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const profileDiv = document.getElementById("profile");
  const resultDiv = document.getElementById("result");
  const serverBtnDiv = document.getElementById("serverButton");

  profileDiv.textContent = "";
  resultDiv.textContent = "";
  serverBtnDiv.textContent = "";

  if (!username) {
    profileDiv.textContent = "❌ Please enter a username.";
    return;
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
