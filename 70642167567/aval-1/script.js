// Criando um container
const container = document.createElement("div");
container.className = "container";

// Criando os elementos com suas informações
const titulo = document.createElement("h1");
titulo.textContent = "Olá, eu sou Sóstenes 👋";

const info1 = document.createElement("p");
info1.textContent = "Sou estudante do segundo ano.";

const info2 = document.createElement("p");
info2.textContent = "Curso: Desenvolvimento de Sistemas (DS).";

const info3 = document.createElement("p");
info3.textContent = "Escola: Francisca Trindade.";

// Adicionando ao container
container.appendChild(titulo);
container.appendChild(info1);
container.appendChild(info2);
container.appendChild(info3);

// Adicionando o container ao corpo da página
document.body.appendChild(container);