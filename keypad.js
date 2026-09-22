// Navigation codes. Values can be site pages or full URLs.
const routes = {
  "271": "projects.html",
  "314": "about.html",
  "925": "music.html",
  "000": "https://www.instagram.com/fionha_doodles?stkn=MWc5NXNtMWtyeWYzMA%3D%3D&utm_source=qr",
  "567": "https://www.linkedin.com/in/fiona-daly-661304275",
  "943": "https://geekhistory.com/content/urban-legend-i-think-there-world-market-maybe-five-computers",
  "883": "https://thesituationist.wordpress.com/2009/04/15/the-situation-of-reason-2/",
};

const entry = [];

const keypadDialog = document.getElementById("keypad-modal");
const noteDialog = document.getElementById("note-modal");
const readout = document.getElementById("keypad-readout");

function renderReadout() {
  readout.textContent = entry.join("");
}

function clearEntry() {
  entry.length = 0;
  renderReadout();
}

function pressKey(key) {
  if (key === "*") {
    clearEntry();
    return;
  }

  if (key === "#") {
    return;
  }

  if (!/^[0-9]$/.test(key)) {
    return;
  }

  entry.push(key);
  const code = entry.join("");
  renderReadout();

  if (code.length < 3) {
    return;
  }

  if (routes[code]) {
    window.location.assign(routes[code]);
    return;
  }

  clearEntry();
}

function openDialog(dialog) {
  if (dialog === keypadDialog) {
    clearEntry();
  }
  dialog.showModal();
}

document.querySelectorAll("[data-open]").forEach(function (button) {
  button.addEventListener("click", function () {
    const dialog = document.getElementById(button.getAttribute("data-open"));
    if (dialog) {
      openDialog(dialog);
    }
  });
  button.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    button.click();
  });
});

document.querySelectorAll("[data-close]").forEach(function (button) {
  button.addEventListener("click", function () {
    const dialog = button.closest("dialog");
    if (dialog) {
      dialog.close();
    }
  });
});

[keypadDialog, noteDialog].forEach(function (dialog) {
  dialog.addEventListener("click", function (event) {
    const rect = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) {
      dialog.close();
    }
  });
});

keypadDialog.addEventListener("close", clearEntry);

document.querySelectorAll(".key").forEach(function (button) {
  button.addEventListener("click", function () {
    pressKey(button.getAttribute("data-key"));
  });
});

document.getElementById("keypad-clear").addEventListener("click", clearEntry);

const elevatorMusic = document.getElementById("elevator-music");
const musicSticker = document.getElementById("music-sticker");

elevatorMusic.volume = 0.5;

function setMusicPlaying(playing) {
  musicSticker.classList.toggle("is-playing", playing);
  musicSticker.setAttribute("aria-pressed", playing ? "true" : "false");
  musicSticker.setAttribute("aria-label", playing ? "Pause elevator music" : "Play elevator music");
}

musicSticker.addEventListener("click", function () {
  if (elevatorMusic.paused) {
    elevatorMusic.play().then(function () {
      setMusicPlaying(true);
    }).catch(function () {});
    return;
  }

  elevatorMusic.pause();
  setMusicPlaying(false);
});

musicSticker.addEventListener("keydown", function (event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  event.preventDefault();
  musicSticker.click();
});
