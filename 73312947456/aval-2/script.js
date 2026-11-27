
function alterarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "Parabéns! Você conseguiu executar o JavaScript!";

    mensagem.style.color = "#2563eb";
    mensagem.style.fontWeight = "bold";
}

// Seleciona o botão da página
const botao = document.querySelector("button");

// Adiciona um evento de clique
botao.addEventListener("click", function() {
    console.log("Botão clicado com sucesso!");
});
