// Pets
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

// Fake usernames for feed
const fakeUsers = [
  "RobloxUser277", "CoolKid442", "xXDragonMasterXx", "NoobSlayer99",
  "GardenQueen", "BeeLover101", "EpicRaccoonGuy", "PetHunterX",
  "ShadowKitsune", "OctoMaster22"
];

// Check username
function startGenerator() {
  const username = document.getElementById("username").value.trim();
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
    const pet = pets[Math.floor(Math.random() * pets.length)];
    resultDiv.textContent = `🎉 You generated a ${pet.name}!`;

    const serverBtn = document.createElement("a");
    serverBtn.href = "https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483";
    serverBtn.textContent = "Join Private Server to Claim";
    serverBtn.className = "server-link";
    serverBtnDiv.innerHTML = "";
    serverBtnDiv.appendChild(serverBtn);
  };

  profileDiv.appendChild(document.createElement("br"));
  profileDiv.appendChild(generateBtn);
}

// Ticker feed
function randomActivity() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  const feed = document.getElementById("activityFeed");

  const newLine = document.createElement("div");
  newLine.textContent = `${user} generated a ${pet.name}`;

  feed.appendChild(newLine);

  // Limit ticker to last 7 entries
  if (feed.children.length > 7) {
    feed.removeChild(feed.firstChild);
  }
}

// Start fake feed every 3.5s
setInterval(randomActivity, 3500);
  generateBtn.onclick = () => {
    const pet = pets[Math.floor(Math.random() * pets.length)];
    resultDiv.textContent = `🎉 You generated a ${pet.name}!`;

    const serverBtn = document.createElement("a");
    serverBtn.href = "https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483";
    serverBtn.textContent = "Join Private Server to Claim";
    serverBtn.className = "server-link";
    serverBtnDiv.innerHTML = "";
    serverBtnDiv.appendChild(serverBtn);
  };

  profileDiv.appendChild(document.createElement("br"));
  profileDiv.appendChild(generateBtn);
}

// Fake activity feed
function randomActivity() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  const feed = document.getElementById("activityFeed");

  const newLine = document.createElement("div");
  newLine.textContent = `${user} generated a ${pet.name}`;

  feed.prepend(newLine);

  // keep max 8 logs
  if (feed.children.length > 8) {
    feed.removeChild(feed.lastChild);
  }
}

// Start fake feed
setInterval(randomActivity, 4000); // every 4s
