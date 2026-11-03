// Mensagem de boas-vindas
alert("Bem-vindo ao meu site!");

// Selecionar botão
const botao = document.querySelector("button");

// Ao clicar no botão
botao.addEventListener("click", function() {
    alert("Você clicou no botão!");

    document.body.style.background = "#1e40af";
\});

// Alterar o título
const titulo = document.querySelector("h1");

titulo.addEventListener("click", function() {
    titulo.textContent = "Olá! Você clicou no título!";
\});$0