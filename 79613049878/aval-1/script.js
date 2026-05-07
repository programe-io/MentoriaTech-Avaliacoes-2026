// script.js
const botao = document.getElementById("botao");

botao.addEventListener("click", () => {
  const cores = ["#ffadad", "#ffd6a5", "#caffbf", "#9bf6ff", "#bdb2ff"];
    
      const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

        document.body.style.background = corAleatoria;
        });