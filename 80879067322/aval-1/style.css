
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Desvie dos Blocos</title>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  text-align: center;
  background: #101827;
  color: white;
}

h1 {
  color: #38bdf8;
}

#jogo {
  width: 320px;
  height: 420px;
  max-width: 90vw;
  margin: 20px auto;
  background: #1e293b;
  border: 3px solid #38bdf8;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

#jogador {
  width: 40px;
  height: 40px;
  background: #22c55e;
  border-radius: 8px;
  position: absolute;
  bottom: 10px;
  left: 140px;
}

.inimigo {
  width: 35px;
  height: 35px;
  background: #ef4444;
  border-radius: 6px;
  position: absolute;
  top: -40px;
}

button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 5px;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
}

button:active {
  background: #0369a1;
}

#mensagem {
  font-size: 20px;
  color: #facc15;
}
</style>
</head>

<body>

<h1>🎮 Desvie dos Blocos</h1>
<p>Pontuação: <span id="pontos">0</span></p>

<div id="jogo">
  <div id="jogador"></div>
</div>

<p id="mensagem">Desvie dos blocos vermelhos!</p>

<button onclick="iniciar()">▶ Começar</button>
<br>
<button onclick="mover(-30)">⬅ Esquerda</button>
<button onclick="mover(30)">Direita ➡</button>

<script>
const jogo = document.getElementById("jogo");
const jogador = document.getElementById("jogador");
const pontosTexto = document.getElementById("pontos");
const mensagem = document.getElementById("mensagem");

let x = 140;
let pontos = 0;
let inimigos = [];
let rodando = false;
let quadro;
let ultimoBloco = 0;

function mover(direcao) {
  if (!rodando) return;
  x += direcao;
  x = Math.max(0, Math.min(jogo.clientWidth - 40, x));
  jogador.style.left = x + "px";
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft" || e.key === "a") mover(-20);
  if (e.key === "ArrowRight" || e.key === "d") mover(20);
});

function iniciar() {
  cancelAnimationFrame(quadro);
  inimigos.forEach(i => i.el.remove());
  inimigos = [];
  x = (jogo.clientWidth - 40) / 2;
  pontos = 0;
  ultimoBloco = 0;
  rodando = true;

  jogador.style.left = x + "px";
  pontosTexto.textContent = pontos;
  mensagem.textContent = "Boa sorte!";
  quadro = requestAnimationFrame(atualizar);
}

function criarInimigo() {
  const el = document.createElement("div");
  el.className = "inimigo";
  el.style.left = Math.random() *
    (jogo.clientWidth - 35) + "px";
  jogo.appendChild(el);

  inimigos.push({ el: el, y: -40 });
}

function atualizar(tempo) {
  if (!rodando) return;

  if (tempo - ultimoBloco > 650) {
    criarInimigo();
    ultimoBloco = tempo;
  }

  const j = jogador.getBoundingClientRect();

  for (let i = inimigos.length - 1; i >= 0; i--) {
    const b = inimigos[i];
    b.y += 3 + pontos * 0.04;
    b.el.style.top = b.y + "px";

    const r = b.el.getBoundingClientRect();

    if (
      j.left < r.right - 5 &&
      j.right > r.left + 5 &&
      j.top < r.bottom - 5 &&
      j.bottom > r.top + 5
    ) {
      fim();
      return;
    }

    if (b.y > jogo.clientHeight) {
      b.el.remove();
      inimigos.splice(i, 1);
      pontos++;
      pontosTexto.textContent = pontos;
    }
  }

  quadro = requestAnimationFrame(atualizar);
}

function fim() {
  rodando = false;
  mensagem.textContent = "💥 Fim de jogo! Pontos: " + pontos;
}

</script>

</body>
</html>
