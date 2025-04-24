// https://meme-api.com/gimme/thalaForAReason/10
let meCon = document.querySelector(".meme-container");
let header = document.querySelector(".header");
const apiUrl = "https://meme-api.com/gimme/thalaForAReason/20";
let finalData;
let lastResult = "";
let lastInput = "";

// DOM elements
const resultDisplay = document.getElementById('result-display');
const shareBtn = document.getElementById('shareBtn');

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.innerHTML = sunIcon;
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Save theme preference
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.innerHTML = sunIcon;
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.innerHTML = moonIcon;
  }
});

// Share result functionality
shareBtn.addEventListener('click', async () => {
  try {
    // Create share data
    const shareData = {
      title: 'Thala For A Reason',
      text: `I checked "${lastInput}" and ${lastResult} - Thala For A Reason!`,
      url: window.location.href
    };

    // Check if Web Share API is supported
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData.text);
      alert('Result copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
});

// Confetti animation function
function createConfetti() {
  const confettiCount = 150;
  const container = document.querySelector('body');

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    container.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Check input function with updated display
function checkInput() {
  var input = document.getElementById("userInput").value;
  lastInput = input;

  if (!input.trim()) {
    alert("Please enter something to check!");
    return;
  }

  if (isNaN(input)) {
    var inSum = input.length;
    if (inSum === 7) {
      playVideo();
      createConfetti();
      showResult(true, `"${input}" has 7 letters`);
      console.log("THALA FOR A REASON");
    } else {
      playNoThalaVideo();
      showResult(false, `"${input}" has ${inSum} letters, not 7`);
      console.log("NO THALA FOR A REASON");
    }
  } else {
    let digitArray = input.split("").map(Number);
    let sum = digitArray.reduce((acc, digit) => acc + digit, 0);

    if (sum == 7) {
      playVideo();
      createConfetti();
      showResult(true, `${input} digits sum to 7 (${digitArray.join(' + ')} = ${sum})`);
    } else {
      playNoThalaVideo();
      showResult(false, `${input} digits sum to ${sum}, not 7 (${digitArray.join(' + ')} = ${sum})`);
    }
  }
}

function showResult(isSuccess, message) {
  resultDisplay.textContent = message;
  resultDisplay.className = isSuccess ? 'success' : 'fail';

  // Show/hide share button
  shareBtn.style.display = isSuccess ? 'block' : 'none';

  // Store the result
  lastResult = isSuccess ? 'it is' : 'it is not';
}

function playVideo() {
  header.innerHTML = "Thala For A Reason 🤩🤩🤩";
  const video = document.createElement("video");
  video.classList.add("video-1");
  const video2 = document.createElement("video");
  video2.classList.add("video-2");
  video.src = "video/ms-dhoni-dhoni.mp4";
  video.autoplay = true;
  video.loop = true;
  video.style.filter = "brightness(50%)";
  video2.src = "video/ms-dhoni-dhoni.mp4";
  video2.autoplay = true;
  video2.loop = true;
  video2.style.filter = "brightness(50%)";
  let box = document.getElementById("box-container-id");
  box.appendChild(video);
  box.appendChild(video2);
  setTimeout(() => {
    video.remove();
    video2.remove();
    header.innerHTML = "Behind Every Thing There Is<br />A Reason";
  }, 4000);
}

function playNoThalaVideo() {
  header.innerHTML = "No Thala For A Reason";
  const video = document.createElement("video");
  video.classList.add("video-1");
  const video2 = document.createElement("video");
  video2.classList.add("video-2");
  video.src = "video/dhoni-trending.mp4";
  video.autoplay = true;
  video.loop = true;
  video.style.filter = "brightness(50%)";
  video2.src = "video/dhoni-trending.mp4";
  video2.autoplay = true;
  video2.loop = true;
  video2.style.filter = "brightness(50%)";
  let box = document.getElementById("box-container-id");
  box.appendChild(video);
  box.appendChild(video2);
  setTimeout(() => {
    video.remove();
    video2.remove();
    header.innerHTML = "Behind Every Thing There Is<br />A Reason";
  }, 5000);
}

const memes = async (data) => {
  data.memes.forEach((meme) => {
    const imgElement = document.createElement("img");
    const divElement = document.createElement("div");
    const pElement = document.createElement("p");

    imgElement.src = meme.url;
    pElement.innerText = meme.title;
    imgElement.alt = meme.title;

    divElement.classList.add("meme-container-wrapper");
    meCon.appendChild(divElement);
    divElement.appendChild(imgElement);
    divElement.appendChild(pElement);
  });
};

const fetdata = async () => {
  await fetch("https://meme-api.com/gimme/thalaForAReason/40")
    .then((response) => response.json())
    .then((data) => {
      memes(data);
    });
};

fetdata();

// Add event listener for Enter key
document.getElementById("userInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkInput();
  }
});
