// https://meme-api.com/gimme/thalaForAReason/10
let meCon = document.querySelector(".meme-container");
let header = document.querySelector(".header");
const apiUrl = "https://meme-api.com/gimme/thalaForAReason/20";
let finalData;

function checkInput() {
  var input = document.getElementById("userInput").value;
  if (isNaN(input)) {
    var inSum = input.length;
    if (inSum === 7) {
      playVideo();
      console.log("THALA FOR A REASON");
    } else {
      playNoThalaVideo();
      console.log("NO THALA FOR A REASON");
    }
  } else {
    let digitArray = input.split("").map(Number);

    let sum = digitArray.reduce((acc, digit) => acc + digit, 0);

    if (sum == 7) {
      playVideo();
    } else {
      playNoThalaVideo();
    }
  }
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
  await fetch("https://meme-api.com/gimme/thalaForAReason/20")
    .then((response) => response.json())
    .then((data) => {
      memes(data);
    });
};

fetdata();
