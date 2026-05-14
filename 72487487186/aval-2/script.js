function mudar() {
  const cores = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#1a535c", "#ff9f1c"];
  const cor = cores[Math.floor(Math.random() * cores.length)];

  document.body.style.background = cor;
  document.getElementById("titulo").innerText = "Cor alterada!";
}