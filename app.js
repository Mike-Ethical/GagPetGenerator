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
    joinBtn.style.display = "block";
    addActivity(`${realUser} generated a ${pet}!`);
  }, 2000);
}
