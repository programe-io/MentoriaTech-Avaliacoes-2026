// Executado quando a página termina de carregar
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");

    const botao = document.getElementById("meuBotao");
    const mensagem = document.getElementById("mensagem");

    botao.addEventListener("click", () => {
        mensagem.textContent = "Você clicou no botão!";
        mensagem.style.color = "green";
    });
});