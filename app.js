// Pets list 🌟
const pets = [
  { name: "🪰 Dragonfly" },
  { name: "🦝 Raccoon" },
  { name: "👑🐝 Queen Bee" },
  { name: "🐙 Mimic Octopus" },
  { name: "🦊 Kitsune" }
];

// Step 1: Ask for username
async function startGenerator() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a Roblox username!");
    return;
  }

  document.getElementById("profile").innerHTML = "🔍 Searching for user...";
  document.getElementById("loading").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("serverButton").innerHTML = "";

  try {
    // Use RoProxy to look up username -> ID
    const userRes = await fetch(`https://users.roproxy.com/v1/usernames/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username] })
    });
    const userData = await userRes.json();

    if (!userData.data || userData.data.length === 0) {
      document.getElementById("profile").innerHTML = "❌ User not found!";
      return;
    }

    const userId = userData.data[0].id;

    // ✅ Direct avatar URL — no JSON, just use <img>
    const avatar = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=180&height=180&format=png`;

    document.getElementById("profile").innerHTML = `
      <div>
        <h3>👤 ${username}</h3>
        <img src="${avatar}" alt="${username}" width="150" height="150">
      </div>
      <br>
      <button onclick="generatePet()">✨ Generate Pet</button>
    `;

  } catch (err) {
    document.getElementById("profile").innerHTML = "⚠️ Error fetching user!";
    console.error(err);
  }
}

// Step 2: Generate pet
function generatePet() {
  document.getElementById("loading").innerHTML = `
    <div class="loader-text">Generating your pet...</div>
  `;
  document.getElementById("result").innerHTML = "";
  document.getElementById("serverButton").innerHTML = "";

  setTimeout(() => {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    document.getElementById("loading").innerHTML = "";
    document.getElementById("result").innerHTML = `
      You generated: <br>
      <span style="color:#00e6ff">${randomPet.name}</span> ✨
      <div class="rarity">🌟 DIVINE 🌟</div>
    `;

    document.getElementById("serverButton").innerHTML = `
      <div class="server-section">
        🔑 Join private server to claim your pet:
        <br>
        <a href="https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483" 
           target="_blank" 
           class="server-link">Join</a>
      </div>
    `;

    startConfetti();
  }, 3000);
}

// Confetti 🎉
function startConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    const confetti = document.createElement("div");
    confetti.innerHTML = "✨";
    confetti.style.position = "fixed";
    confetti.style.top = "-10px";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.fontSize = Math.random() * 20 + 15 + "px";
    confetti.style.color = ["#00e6ff","#66ffff","#ffffff","#ffd700"][Math.floor(Math.random()*4)];
    confetti.style.animation = "fall 3s linear forwards";

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
