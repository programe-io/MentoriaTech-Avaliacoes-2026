const stages = [
  { name: "Nebulosa", class: "nebula" },
  { name: "Estrela", class: "star" },
  { name: "Gigante Vermelha", class: "red-giant" },
  { name: "Supernova", class: "supernova" },
  { name: "Buraco Negro", class: "black-hole" }
];

let current = 0;

function nextStage() {
  current = (current + 1) % stages.length;

  const star = document.getElementById("star");
  const stageText = document.getElementById("stage");

  star.className = stages[current].class;
  stageText.textContent = stages[current].name;
}