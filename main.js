//cwcz
//tablica z potworami
const images = [...document.querySelectorAll("img")];
const gameSummary = {
  wins: 0,
  losses: 0,
  draws: 0,
  numbers: 0
};
const choice = {
  playerChoice: "",
  comChoice: ""
};

function monsterSelection() {
  choice.playerChoice = this.dataset.monster;
  images.forEach(image => (image.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 5px red";
}

function comChoice() {
  const comChoice =
    images[Math.floor(Math.random() * images.length)].dataset.monster;
  return comChoice;
}

function whoWins(gamer, com) {
  if (gamer == com) return "draw";
  if (
    (gamer == "smaug" && com == "strzyga") ||
    (gamer == "strzyga" && com == "utopiec") ||
    (gamer == "utopiec" && com == "smaug")
  )
    return "win";
  else return "loss";
}

function showResult(gamer, com, whoWins) {
  document.querySelector("span.numbers").textContent = ++gameSummary.numbers;
  document.querySelector('[data-summary="yourChoice"]').textContent = gamer;
  document.querySelector('[data-summary="aiChoice"]').textContent = com;

  if (whoWins == "draw") {
    document.querySelector("span.draws").textContent = ++gameSummary.draws;
    document.querySelector("[data-summary = result]").textContent = "Remis";
    document.querySelector("[data-summary = result]").style.color = "blue";
  } else if (whoWins == "win") {
    document.querySelector("span.wins").textContent = ++gameSummary.wins;
    document.querySelector("[data-summary = result]").textContent = "Wygrana";
    document.querySelector("[data-summary = result]").style.color = "green";
  } else {
    document.querySelector("span.draws").textContent = ++gameSummary.draws;
    document.querySelector("[data-summary = result]").textContent = "Przegrana";
    document.querySelector("[data-summary = result]").style.color = "red";
  }
}

function endGame() {
  document.querySelector(
    `[data-monster="${choice.playerChoice}"]`
  ).style.boxShadow = "";
  choice.playerChoice = "";
  choice.comChoice = "";
}

function letsGo() {
  if (!choice.playerChoice) return alert("Wybierz potwora draniu!");
  choice.comChoice = comChoice();
  const whoWinner = whoWins(choice.playerChoice, choice.comChoice);
  showResult(choice.playerChoice, choice.comChoice, whoWinner);
  endGame();
}
//wybranie danego monstera po kliknieciu i wywolanie monsterSelection
images.forEach(image => image.addEventListener("click", monsterSelection));

document.body.addEventListener("mousemove", event => {
  const div = document.querySelector("div.trapper");
  if (event.clientY > 0.95 * window.innerHeight) {
    div.classList.add("display");
  }
});

function karta() {
  const nowaKarta = document.createElement("div");
  nowaKarta.innerText = "KARTA PUŁAPKA";
  nowaKarta.setAttribute("class", "karta");
  document.body.appendChild(nowaKarta);
  document.querySelector("span.numbers").textContent = ++gameSummary.numbers;
  document.querySelector("span.wins").textContent = ++gameSummary.wins;
  document.querySelector("[data-summary = result]").textContent =
    "WYGRYWASZ WSZYSTKO";
  document.querySelector("[data-summary = result]").style.color = "red";
  document.querySelector("[data-summary = result]").style.fonstSize = "100px";
  document.querySelector('[data-summary="yourChoice"]').textContent =
    "Know-Hoł-Zagłady";
  document.querySelector('[data-summary="aiChoice"]').textContent = "NIEWAŻNE";
  const wroc = document.createElement("button");
  nowaKarta.appendChild(wroc);
  wroc.setAttribute("class", "wroc");
  setTimeout(function() {
    wroc.innerText = "Wróć do gry";
  }, 5000);
  document.querySelector("div.trapper").classList.remove("display");
  wroc.addEventListener("click", function() {
    nowaKarta.style.display = "none";
  });
}
document.querySelector(".graj").addEventListener("click", letsGo);
document.querySelector("button.trap").addEventListener("click", karta);
