/* ========= Data ========= */
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

const fakeUsers = [
  { name: "RobloxUser277", id: 1 },
  { name: "CoolKid442", id: 2 },
  { name: "xXDragonMasterXx", id: 3 },
  { name: "NoobSlayer99", id: 4 },
  { name: "GardenQueen", id: 5 },
  { name: "BeeLover101", id: 6 },
  { name: "EpicRaccoonGuy", id: 7 },
  { name: "PetHunterX", id: 8 },
  { name: "ShadowKitsune", id: 9 },
  { name: "OctoMaster22", id: 10 }
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
    // Show spinner
    resultDiv.innerHTML = `<div class="spinner"></div> Generating your pet...`;
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
    }, 2000); // 2s fake loading
  };

  profileDiv.appendChild(document.createElement("br"));
  profileDiv.appendChild(generateBtn);
}

/* ========= Live Activity ========= */
function addActivityLine(user, pet) {
  const feed = document.getElementById("activityFeed");

  const line = document.createElement("div");
  line.className = "activity-line";

  // Fake Roblox avatar (headshot)
  const avatar = document.createElement("img");
  avatar.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=48&height=48&format=png`;

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

/* ========= Event Listeners ========= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkBtn").addEventListener("click", startGenerator);

  // Start feed
  for (let i = 0; i < 3; i++) randomActivity();
  setInterval(randomActivity, 3000);
});
