// Criando os elementos
const card = document.createElement("div");
card.className = "card";

const titulo = document.createElement("h1");
titulo.textContent = "Olá, meu nome é Erinaldo";

const curso = document.createElement("p");
curso.textContent = "Sou estudante do curso de Desenvolvimento de Sistemas";

const escola = document.createElement("p");
escola.textContent = "Estudo no CETI Francisca Trindade";

// Adicionando os elementos ao card
card.appendChild(titulo);
card.appendChild(curso);
card.appendChild(escola);

// Adicionando o card ao body
document.body.appendChild(card);

// Evento ao clicar no card
card.addEventListener("click", function() {
    alert("Bem-vindo! Eu sou Erinaldo 🚀");
});