const numberButtons = document.querySelectorAll(".number");
const feedback = document.querySelector("#feedback");
const winsDisplay = document.querySelector("#wins");
const attemptsDisplay = document.querySelector("#attempts");
const recordDisplay = document.querySelector("#record");
const resetButton = document.querySelector("#reset");

let secretNumber;
let wins = 0;
let attempts = 0;
let record = 0;
let finished = false;

function newChallenge() {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  finished = false;

  numberButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });

  feedback.textContent = "Selecione um número para começar!";
  feedback.className = "feedback";
}

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (finished) return;

    const chosen = Number(button.dataset.number);
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (chosen === secretNumber) {
      wins++;
      record = Math.max(record, wins);

      winsDisplay.textContent = wins;
      recordDisplay.textContent = record;

      button.classList.add("correct");
      feedback.textContent = `🎉 Acertou! O número era ${secretNumber}.`;
      feedback.className = "feedback success";

      finished = true;
      numberButtons.forEach(item => item.disabled = true);
    } else {
      button.classList.add("wrong");
      button.disabled = true;

      feedback.textContent = chosen < secretNumber
        ? "Não foi dessa vez! Tente um número maior."
        : "Quase! Tente um número menor.";

      feedback.className = "feedback error";
    }
  });
});

resetButton.addEventListener("click", newChallenge);

document.querySelector("#year").textContent = new Date().getFullYear();

newChallenge();