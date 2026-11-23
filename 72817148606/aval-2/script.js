
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pontosTexto = document.getElementById("pontos");
const recordeTexto = document.getElementById("recorde");

const tela = document.getElementById("telaInicial");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");

const tamanho = 20;
const total = 20;

let cobra;
let comida;
let direcao;
let pontos = 0;
let recorde = Number(localStorage.getItem("snakeRecorde")) || 0;

let rodando = false;
let pausado = false;
let intervalo = null;
let velocidade = 140;

recordeTexto.textContent = recorde;

function prepararJogo() {
  clearInterval(intervalo);

  cobra = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  direcao = { x: 1, y: 0 };

  pontos = 0;
  velocidade = 140;

  pontosTexto.textContent = pontos;

  gerarComida();
  desenhar();
}

function iniciarJogo() {
  prepararJogo();

  rodando = true;
  pausado = false;

  tela.classList.add("escondida");

  iniciarMovimento();
}

function iniciarMovimento() {
  clearInterval(intervalo);
  intervalo = setInterval(mover, velocidade);
}

function gerarComida() {
  do {
    comida = {
      x: Math.floor(Math.random() * total),
      y: Math.floor(Math.random() * total)
    };
  } while (
    cobra.some(p => p.x === comida.x && p.y === comida.y)
  );
}

function desenhar() {
  ctx.fillStyle = "#08130f";
  ctx.fillRect(0, 0, 400, 400);

  // Grade
  ctx.strokeStyle = "#173023";

  for (let i = 0; i <= 400; i += tamanho) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(400, i);
    ctx.stroke();
  }

  // Comida
  ctx.fillStyle = "#ff3333";
  ctx.beginPath();
  ctx.arc(
    comida.x * tamanho + 10,
    comida.y * tamanho + 10,
    8,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Cobra
  cobra.forEach((parte, i) => {
    ctx.fillStyle = i === 0 ? "#a4ff6b" : "#36d66b";

    ctx.fillRect(
      parte.x * tamanho + 2,
      parte.y * tamanho + 2,
      16,
      16
    );
  });
}

function mover() {
  if (!rodando || pausado) return;

  const cabeca = {
    x: cobra[0].x + direcao.x,
    y: cobra[0].y + direcao.y
  };

  const comeu =
    cabeca.x === comida.x &&
    cabeca.y === comida.y;

  // Colisão com parede
  if (
    cabeca.x < 0 ||
    cabeca.x >= total ||
    cabeca.y < 0 ||
    cabeca.y >= total
  ) {
    finalizar();
    return;
  }

  // Colisão com o próprio corpo
  const corpo = comeu ? cobra : cobra.slice(0, -1);

  if (corpo.some(p => p.x === cabeca.x && p.y === cabeca.y)) {
    finalizar();
    return;
  }

  cobra.unshift(cabeca);

  if (comeu) {
    pontos += 10;
    pontosTexto.textContent = pontos;

    gerarComida();

    velocidade = Math.max(60, velocidade - 4);
    iniciarMovimento();

    if (pontos > recorde) {
      recorde = pontos;
      localStorage.setItem("snakeRecorde", recorde);
      recordeTexto.textContent = recorde;
    }
  } else {
    cobra.pop();
  }

  desenhar();
}

function finalizar() {
  rodando = false;
  clearInterval(intervalo);

  titulo.textContent = "💀 GAME OVER";
  descricao.textContent = "Sua pontuação: " + pontos;

  document.getElementById("iniciar").textContent =
    "JOGAR NOVAMENTE";

  tela.classList.remove("escondida");
}

function pausar() {
  if (!rodando) return;

  pausado = !pausado;

  if (pausado) {
    clearInterval(intervalo);

    titulo.textContent = "⏸ PAUSADO";
    descricao.textContent = "Clique em continuar para jogar.";

    document.getElementById("iniciar").textContent = "CONTINUAR";

    tela.classList.remove("escondida");
  } else {
    tela.classList.add("escondida");
    iniciarMovimento();
  }
}

function mudarDirecao(nome) {
  const direcoes = {
    cima: { x: 0, y: -1 },
    baixo: { x: 0, y: 1 },
    esquerda: { x: -1, y: 0 },
    direita: { x: 1, y: 0 }
  };

  const nova = direcoes[nome];

  if (!nova || !rodando || pausado) return;

  if (
    nova.x === -direcao.x &&
    nova.y === -direcao.y
  ) return;

  direcao = nova;
}

// Teclado
document.addEventListener("keydown", e => {
  const teclas = {
    ArrowUp: "cima",
    ArrowDown: "baixo",
    ArrowLeft: "esquerda",
    ArrowRight: "direita"
  };

  if (teclas[e.key]) {
    e.preventDefault();
    mudarDirecao(teclas[e.key]);
  }

  if (e.code === "Space") {
    e.preventDefault();
    pausar();
  }
});

// Controles de celular
document.querySelectorAll("[data-dir]").forEach(botao => {
  botao.addEventListener("click", () => {
    mudarDirecao(botao.dataset.dir);
  });
});

// Botões principais
document.getElementById("iniciar").addEventListener("click", () => {
  if (rodando && pausado) {
    pausar();
  } else {
    iniciarJogo();
  }
});

document.getElementById("pausar").addEventListener("click", pausar);

document.getElementById("reiniciar").addEventListener("click", iniciarJogo);

// Preparar tela inicial
prepararJogo();
