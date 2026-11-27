
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
    mensagem.textContent = "Parabéns! Você conseguiu! JavaScript funcionando!";
    
    mensagem.style.color = "#2563eb";
    mensagem.style.fontWeight = "bold";

    console.log("Botão clicado com sucesso!");
});

