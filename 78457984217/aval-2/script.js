
const botao = document.getElementById("botaoMissao");
const missao = document.getElementById("missao");

const missoes = [
  "🐉 Derrote o dragão que ameaça o reino!",
  "⚔️ Encontre a espada lendária perdida.",
  "💎 Descubra o tesouro escondido na montanha.",
  "🧙 Encontre o mago desaparecido.",
  "🏰 Defenda o castelo de uma invasão!",
  "🛡️ Recupere o escudo dos antigos reis.",
  "🌲 Explore a floresta encantada."
];

botao.addEventListener("click", () => {
  const numero = Math.floor(Math.random() * missoes.length);

  missao.textContent = missoes[numero];

  botao.textContent = "NOVA MISSÃO";
});

function criarParticula() {
  const particula = document.createElement("div");

  particula.classList.add("particula");

  particula.style.left = Math.random() * 100 + "vw";
  particula.style.top = Math.random() * 100 + "vh";

  document.getElementById("particulas").appendChild(particula);
}

for (let i = 0; i < 50; i++) {
  criarParticula();
}
