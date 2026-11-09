// Aguarda o carregamento do documento
document.addEventListener("DOMContentLoaded", () => {
    const botaoAcao = document.getElementById("btn-acao");

    // Adiciona evento de clique interativo ao botão principal
    botaoAcao.addEventListener("click", () => {
        alert("Obrigado por clicar! Uma mensagem de boas-vindas foi enviada com sucesso para o console.");
        console.log("Interação do usuário detectada com sucesso!");
    });
});