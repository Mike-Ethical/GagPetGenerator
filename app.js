const pets = ["Dragonfly", "Raccoon", "Queen Bee", "Mimic Octopus", "Kitsune"];
let realUser = "";

// Handle username submission
async function submitUsername() {
  const username = document.getElementById("username").value.trim();
  const userStatus = document.getElementById("user-status");

  if (username === "") {
    userStatus.innerText = "❌ Please enter a username.";
    return;
  }

  try {
    // Call Roblox API to check username
    const response = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username] })
    });

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      realUser = data.data[0].name; // correct username (case-sensitive)
      userStatus.innerText = `✅ Username found: ${realUser}, you can generate your pet.`;
      document.querySelector(".generator").style.display = "block";
    } else {
      userStatus.innerText = "❌ Username not found.";
    }
  } catch (err) {
    console.error(err);
    userStatus.innerText = "⚠️ Error checking username. Try again later.";
  }
}

// Generate pet with loading + result
function generatePet() {
  const resultDiv = document.getElementById("result");
  const joinBtn = document.getElementById("join-btn");

  resultDiv.innerHTML = `<div class="loading">🔄 Generating your pet...</div>`;
  joinBtn.style.display = "none";

  setTimeout(() => {
    const pet = pets[Math.floor(Math.random() * pets.length)];
    resultDiv.innerHTML = `
      <div class="pet-card">
        🎉 ${realUser} generated: <strong>${pet}</strong>!
      </div>
      <p class="claim-text">👇 Join server below to claim your pet 👇</p>
    `;

    joinBtn.style.display = "inline-block";
    joinBtn.style.animation = "bounce-in 0.7s ease";

    addActivity(`${realUser} generated a ${pet}!`);
  }, 2000);
}

// Live activity feed
function addActivity(text) {
  const activityFeed = document.getElementById("activity-feed");
  const activity = document.createElement("div");
  activity.className = "activity";
  activity.innerText = text;

  activityFeed.prepend(activity);

  // Limit to 20 activities
  if (activityFeed.childNodes.length > 20) {
    activityFeed.removeChild(activityFeed.lastChild);
  }
}

// Fake usernames for live activity
const fakeUsers = [
  "Robloxian123", "EpicGamer456", "DragonSlayer99",
  "NoobMaster77", "PixelQueen", "ShadowNinja88",
  "PetHunterX", "GardenKing", "BeeLover", "KitsuneGod"
];

// Generate fake activity every 5s
setInterval(() => {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const pet = pets[Math.floor(Math.random() * pets.length)];
  addActivity(`${user} generated a ${pet}!`);
}, 5000);
