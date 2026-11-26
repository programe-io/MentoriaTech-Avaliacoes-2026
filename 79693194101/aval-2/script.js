// =========================================================
// 1. SAUDAÇÃO DE ACORDO COM A HORA DO DIA
// =========================================================
const hora = new Date().getHours();
const saudacao = document.getElementById("saudacao");

if (hora < 12) {
  saudacao.textContent = "☀️ Bom dia! Eu sou";
} else if (hora < 18) {
  saudacao.textContent = "🌤️ Boa tarde! Eu sou";
} else {
  saudacao.textContent = "🌙 Boa noite! Eu sou";
}

// =========================================================
// 2. SE A FOTO NÃO CARREGAR, MOSTRA AS INICIAIS
// =========================================================
const foto = document.getElementById("foto");
const iniciais = document.getElementById("iniciais");

foto.addEventListener("error", function () {
  foto.style.display = "none";
  iniciais.style.display = "flex";
});

// =========================================================
// 3. BOTÃO DE TEMA CLARO / ESCURO
// =========================================================
const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("escuro");

  if (document.body.classList.contains("escuro")) {
    botaoTema.textContent = "☀️";
  } else {
    botaoTema.textContent = "🌙";
  }
});

// =========================================================
// 4. CURIOSIDADES ALEATÓRIAS
// ✏️ ALTERE AQUI: escreva curiosidades sobre você
// =========================================================
const curiosidades = [
  "Eu gosto muito de estudar programação 💻",
  "Eu gosto de treinar 🏋️",
  "Eu gosto de sair com meus amigos 👥",
  "Meu sonho e trabalhar com programação e me formar na faculdade 🚀",
  "Eu fiz meu primeiro site sozinho no VS Code!",
  "Eu moro em Lagoa de Sao Francisco - PI"
];

const botaoCuriosidade = document.getElementById("botao-curiosidade");
const textoCuriosidade = document.getElementById("texto-curiosidade");

botaoCuriosidade.addEventListener("click", function () {
  const sorteio = Math.floor(Math.random() * curiosidades.length);
  textoCuriosidade.textContent = curiosidades[sorteio];
});

// =========================================================
// 5. ANIMAÇÃO DAS BARRAS DE HABILIDADE
// Lê o número de data-nivel e preenche a barra
// =========================================================
const barras = document.querySelectorAll(".progresso");

setTimeout(function () {
  barras.forEach(function (barra) {
    barra.style.width = barra.dataset.nivel + "%";
  });
}, 300);

// =========================================================
// 6. ANO ATUAL NO RODAPÉ
// =========================================================
document.getElementById("ano").textContent = new Date().getFullYear();