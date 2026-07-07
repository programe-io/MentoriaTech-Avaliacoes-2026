// Seleciona os elementos da página
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

// Adiciona um evento de clique ao botão
botao.addEventListener("click", function () {
    mensagem.textContent = "Olá! Você clicou no botão. 🎉";
    mensagem.style.color = "#28a745";
    mensagem.style.fontSize = "20px";
    mensagem.style.fontWeight = "bold";
});