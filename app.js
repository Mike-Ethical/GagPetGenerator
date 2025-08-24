/* ========= Data ========= */
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

const fakeUsers = [
  "RobloxUser277","CoolKid442","xXDragonMasterXx","NoobSlayer99",
  "GardenQueen","BeeLover101","EpicRaccoonGuy","PetHunterX",
  "ShadowKitsune","OctoMaster22","PixelPlanter","NebulaNinja",
  "AquaDragon","FrostByte","CosmicBee","RaccoonRider"
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

  // Fake "found"
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
    serverBtn.target = "_blank";
    serverBtnDiv.innerHTML = "";
    serverBtnDiv.appendChild(serverBtn);
  };

  profileDiv.appendChild(document.createElement("br"));
  profileDiv.appendChild(generateBtn);
}

/* ========= Live Activity ========= */
function addActivityLine(text) {
  const feed = document.getElementById("activityFeed");
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  feed.appendChild(line);

  if (feed.children.length > 7) {
    feed.removeChild(feed.firstChild);
  }
}

function randomActivity() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  addActivityLine(`${user} generated a ${pet.name}`);
}

/* ========= Event Listeners ========= */
document.addEventListener("DOMContentLoaded", () => {
  // Hook up button
  document.getElementById("checkBtn").addEventListener("click", startGenerator);

  // Seed activity + start interval
  for (let i = 0; i < 3; i++) randomActivity();
  setInterval(randomActivity, 3000);
});
