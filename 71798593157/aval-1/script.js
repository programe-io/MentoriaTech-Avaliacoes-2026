// Mensagem de boas-vindas
console.log("Bem-vindo à minha página!");

// Selecionar o botão
const botao = document.querySelector("button");

// Adicionar evento de clique
botao.addEventListener("click", function() {
    alert("Olá! Seja bem-vindo à minha página!");
});

// Selecionar o título principal
const titulo = document.querySelector("h1");

// Alterar o título ao clicar duas vezes
titulo.addEventListener("dblclick", function() {
    titulo.textContent = "Aprendendo JavaScript!";
});

// Mostrar mensagem no console
console.log("JavaScript funcionando corretamente!");