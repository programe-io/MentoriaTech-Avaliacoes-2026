let gols = 0;
let chutes = 0;

function chutar(direcao) {
  if (chutes >= 5) {
    document.getElementById("resultado").textContent =
      "Fim de jogo! Clique em Reiniciar.";
    return;
  }

  chutes++;

  const direcoes = ["esquerda", "meio", "direita"];
  const defesa = direcoes[Math.floor(Math.random() * 3)];

  const bola = document.querySelector(".ball");
  const goleiro = document.querySelector(".keeper");

  if (direcao === "esquerda") {
    bola.style.left = "10%";
  } else if (direcao === "direita") {
    bola.style.left = "82%";
  } else {
    bola.style.left = "46%";
  }

  if (defesa === "esquerda") {
    goleiro.style.left = "5%";
  } else if (defesa === "direita") {
    goleiro.style.left = "80%";
  } else {
    goleiro.style.left = "43%";
  }

  setTimeout(() => {
    if (direcao === defesa) {
      document.getElementById("resultado").textContent =
        "🧤 DEFENDEU!";
    } else {
      gols++;
      document.getElementById("resultado").textContent =
        "⚽ GOOOOOL!";
    }

    document.getElementById("gols").textContent = gols;
    document.getElementById("chutes").textContent = chutes;

    if (chutes === 5) {
      setTimeout(() => {
        document.getElementById("resultado").textContent =
          `🏆 Fim! Você fez ${gols} gol(s) de 5!`;
      }, 700);
    }
  }, 500);
}

function reiniciar() {
  gols = 0;
  chutes = 0;

  document.getElementById("gols").textContent = "0";
  document.getElementById("chutes").textContent = "0";
  document.getElementById("resultado").textContent = "Boa sorte!";

  document.querySelector(".ball").style.left = "46%";
  document.querySelector(".keeper").style.left = "43%";
}