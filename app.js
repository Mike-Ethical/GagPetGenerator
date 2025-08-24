let realUser = null;
let pets = ["🪰 Dragonfly", "🦝 Raccoon", "👑🐝 Queen Bee", "🐙 Mimic Octopus", "🦊 Kitsune"];

function submitUsername() {
  const username = document.getElementById("username").value.trim();
  const userStatus = document.getElementById("user-status");

  if (username === "") {
    userStatus.innerText = "❌ Please enter a username.";
    return;
  }

  // Fake "search" — always finds user if input not empty
  realUser = username;
  userStatus.innerText = `✅ Username found: ${realUser}, you can generate your pet.`;
  document.querySelector(".generator").style.display = "block";
}

function generatePet() {
  if (!realUser) {
    alert("Enter a username first!");
    return;
  }

  const petResult = document.getElementById("pet-result");
  const joinSection = document.getElementById("join-section");

  petResult.innerHTML = `<div class="loading">✨ Generating your pet...</div>`;
  joinSection.style.display = "none";

  setTimeout(() => {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    petResult.innerHTML = `🎉 ${realUser}, you generated: <strong>${randomPet}</strong>`;
    joinSection.style.display = "block";
  }, 2000);
}
