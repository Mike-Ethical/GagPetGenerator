const liveActivity = document.getElementById('liveActivity');
const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('username');

// Function to add a live activity entry
function addActivity(message) {
  const entry = document.createElement('div');
  entry.classList.add('activity-entry');
  entry.textContent = message;
  liveActivity.prepend(entry); // Newest on top
}

// Simulate live update every few seconds
function simulateLiveUpdates(username) {
  const activities = [
    `Fetched pet stats for ${username}.`,
    `${username}'s divine pet level increased!`,
    `New achievement unlocked for ${username}.`,
    `${username} collected a rare item!`
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index >= activities.length) {
      clearInterval(interval);
    } else {
      addActivity(activities[index]);
      index++;
    }
  }, 2000);
}

// Button click event
searchBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    addActivity(`Searching activity for: ${username}...`);
    simulateLiveUpdates(username);
  } else {
    addActivity(`Please enter a username.`);
  }
});
