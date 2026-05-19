// script.js
const watchBtn = document.getElementById("watchBtn");
watchBtn.addEventListener("click", () => {
alert("Reproduzindo série...");
});
const infoButtons = document.querySelectorAll(".infoBtn");
infoButtons.forEach((button) => {
button.addEventListener("click", () => {
const movieName =
button.parentElement.querySelector("h2").innerText;
alert(`Abrindo informações de ${movieName}`);});
});