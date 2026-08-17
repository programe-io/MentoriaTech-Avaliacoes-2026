const botaoTema = document.getElementById("botaoTema");
botaoTema.addEventListener("click", function() {
    document.body.classList.toggle("modo-escuro");
});

const botaoMensagem = document.getElementById("botaoMensagem");
const mensagem = document.getElementById("mensagem");
botaoMensagem.addEventListener("click", function() {
    mensagem.textContent = "Olá! Você está visitando o blog de Wémerson Rodrigues!";
});

const anoAtual = document.getElementById("anoAtual");
anoAtual.textContent = new Date().getFullYear();