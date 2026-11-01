// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");

  menuToggle.textContent = nav.classList.contains("active")
    ? "✕"
    : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});


// ARTIGOS

const articles = [
  {
    title: "O que o Jiu-Jitsu ensina além do tatame?",
    text: `O Jiu-Jitsu é uma modalidade que ultrapassa os limites
do combate físico.

Durante os treinos, os praticantes desenvolvem disciplina,
paciência, respeito e capacidade de lidar com desafios.

A evolução acontece gradualmente. Cada treino representa
uma oportunidade de aprender, reconhecer dificuldades
e aperfeiçoar habilidades.

Esses ensinamentos podem ser aplicados também na vida
cotidiana, dentro e fora do tatame.`
  },

  {
    title: "A evolução do Jiu-Jitsu Brasileiro",
    text: `O Jiu-Jitsu Brasileiro, conhecido como Brazilian
Jiu-Jitsu, desenvolveu-se a partir de influências de
artes marciais japonesas, especialmente o judô e o
jiu-jitsu japonês.

Ao longo do tempo, a modalidade ganhou características
próprias, com destaque para o combate no solo,
as posições de controle e as finalizações.

Atualmente, o BJJ é praticado em diversos países e
possui competições em diferentes níveis.`
  },

  {
    title: "A importância dos fundamentos",
    text: `Os fundamentos são a base do aprendizado no
Jiu-Jitsu.

Movimentação, equilíbrio, postura, controle e defesa
são elementos essenciais para compreender o esporte.

Antes de buscar movimentos complexos, é importante
desenvolver uma boa compreensão das posições básicas.

A consistência nos treinos e a orientação de professores
qualificados contribuem para uma evolução mais segura.`
  }
];

function openArticle(index) {
  const modal = document.getElementById("articleModal");

  document.getElementById("modalTitle").textContent =
    articles[index].title;

  document.getElementById("modalText").textContent =
    articles[index].text;

  modal.classList.add("active");
}

function closeArticle() {
  document.getElementById("articleModal").classList.remove("active");
}

// FECHAR MODAL AO CLICAR FORA DO TEXTO

document.getElementById("articleModal").addEventListener("click", event => {
  if (event.target.id === "articleModal") {
    closeArticle();
  }
});

// FECHAR MODAL COM ESC

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeArticle();
  }
});