
const botao = document.getElementById("explorar");
const mensagem = document.getElementById("mensagem");
const area = document.getElementById("bolhas");

const descobertas = [
  "🐠 Você encontrou um peixe-palhaço!",
  "🦈 Um tubarão apareceu nas profundezas!",
  "🐢 Uma tartaruga marinha está nadando!",
  "🐙 Você descobriu um polvo misterioso!",
  "🪸 Um lindo recife de coral foi encontrado!"
];

botao.addEventListener("click", () => {
  const indice = Math.floor(Math.random() * descobertas.length);
  mensagem.textContent = descobertas[indice];
});

function criarBolha() {
  const bolha = document.createElement("div");

  bolha.classList.add("bolha");

  const tamanho = Math.random() * 25 + 10;

  bolha.style.width = tamanho + "px";
  bolha.style.height = tamanho + "px";
  bolha.style.left = Math.random() * 100 + "vw";
  bolha.style.animationDuration = (Math.random() * 5 + 4) + "s";

  area.appendChild(bolha);

  setTimeout(() => {
    bolha.remove();
  }, 9000);
}

setInterval(criarBolha, 400);
