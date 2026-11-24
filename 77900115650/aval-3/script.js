const facts = [
  "Antes de atuar, ele trabalhou por anos como ginasta e dançarino profissional.",
  "Nasceu em Copenhague, na Dinamarca, em 22 de novembro de 1965.",
  "Também atuou no jogo eletrônico Death Stranding, dirigido por Hideo Kojima."
];

const factText = document.getElementById("factText");
const factBtn = document.getElementById("factBtn");

let currentIndex = 0;

factBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % facts.length;
  factText.textContent = facts[currentIndex];
});