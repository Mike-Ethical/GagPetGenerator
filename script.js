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
    // Get UserId from username
    const userRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
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

    // Get profile picture
    const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`);
    const thumbData = await thumbRes.json();

    const avatar = thumbData.data[0].imageUrl;

    document.getElementById("profile").innerHTML = `
      <div>
        <h3>👤 ${username}</h3>
        <img src="${avatar}" alt="${username}">
      </div>
      <br>
      <button onclick="generatePet()">✨ Generate Pet</button>
    `;

  } catch (err) {
    document.getElementById("profile").innerHTML = "⚠️ Error fetching user!";
  }
}

// Step 2: Generate pet with suspense animation
function generatePet() {
  document.getElementById("loading").innerHTML = `
    <div class="loader">
      <div class="loader-icon">🌸</div>
      <div class="loader-text">Generating your pet...</div>
    </div>
  `;
  document.getElementById("result").innerHTML = "";
  document.getElementById("serverButton").innerHTML = "";

  setTimeout(() => {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    document.getElementById("loading").innerHTML = "";
    document.getElementById("result").innerHTML = `
      You generated: <br>
      <span style="color:#ff00ff">${randomPet.name}</span> ✨
      <div class="rarity">🌟 DIVINE 🌟</div>
    `;

    // Private server join section
    document.getElementById("serverButton").innerHTML = `
      <div class="server-section">
        🔑 Join private server to claim your pet:
        <br>
        <a href="https://roblox.com.ge/games/126884695634066/Grow-a-Garden?privateServerLinkCode=98362791523092484699268245505483" target="_blank" class="server-link">Join</a>
      </div>
    `;

    // Launch confetti 🎉
    startConfetti();
  }, 3000); // suspense for 3 seconds
}

// Simple confetti effect 🎉
function startConfetti() {
  const duration = 3 * 1000; // 3 seconds
  const end = Date.now() + duration;

  (function frame() {
    const confetti = document.createElement("div");
    confetti.innerHTML = "✨";
    confetti.style.position = "fixed";
    confetti.style.top = "-10px";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.fontSize = Math.random() * 20 + 15 + "px";
    confetti.style.color = ["#ff00ff","#ff66ff","#ffffff","#ffd700"][Math.floor(Math.random()*4)];
    confetti.style.animation = "fall 3s linear forwards";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}