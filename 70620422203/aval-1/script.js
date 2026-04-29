v// Criando conteúdo dinâmico
const container = document.querySelector(".container");

const nome = document.createElement("h1");
nome.textContent = "Paulo Lucas";

const info1 = document.createElement("p");
info1.textContent = "Sou estudante do 2º ano de Desenvolvimento de Sistemas (DS).";

const info2 = document.createElement("p");
info2.textContent = "Estudo na Escola Francisca Trindade.";

// Botão interativo
const botao = document.createElement("button");
botao.textContent = "Clique aqui";

// Evento ao clicar
botao.addEventListener("click", () => {
    alert("Olá! Meu nome é Paulo Lucas e sou estudante de DS 🚀");
});

// Adicionando elementos na página
container.appendChild(nome);
container.appendChild(info1);
container.appendChild(info2);
container.appendChild(botao);