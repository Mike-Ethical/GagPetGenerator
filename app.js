/* ========= Data ========= */
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

// Real Roblox users (IDs exist)
const fakeUsers = [
  { name: "Builderman", id: 156 },
  { name: "Shedletsky", id: 261 },
  { name: "stickmasterluke", id: 145 },
  { name: "roblox", id: 1 },
  { name: "Merely", id: 33947 },
  { name: "ReeseMcBlox", id: 20 },
  { name: "tarabyte", id: 1639 },
  { name: "CloneTrooper1019", id: 12886 },
  { name: "Defaultio", id: 6730574 }
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
    }, 2000);
  };

  profileDiv.appendChild(document.createElement("br"));
  profileDiv.appendChild(generateBtn);
}

/* ========= Live Activity ========= */
async function addActivityLine(user, pet) {
  const feed = document.getElementById("activityFeed");

  const line = document.createElement("div");
  line.className = "activity-line";

  // Get avatar via Roblox Thumbnails API
  try {
    const res = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=48x48&format=Png&isCircular=true`
    );
    const data = await res.json();
    const avatarUrl = data.data[0]?.imageUrl || "";

    const avatar = document.createElement("img");
    avatar.src = avatarUrl;
    avatar.alt = user.name;

    const text = document.createElement("span");
    text.textContent = `${user.name} generated a ${pet.name}`;

    line.appendChild(avatar);
    line.appendChild(text);
  } catch (err) {
    console.error("Avatar fetch failed:", err);
    line.textContent = `${user.name} generated a ${pet.name}`;
  }

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

/* ========= Init ========= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkBtn").addEventListener("click", startGenerator);

  for (let i = 0; i < 3; i++) randomActivity();
  setInterval(randomActivity, 3000);
});
