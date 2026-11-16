javascript

// Quando a página carregar
document.addEventListener("DOMContentLoaded", () => {

    console.log("Site carregado com sucesso!");

    // Mensagem de boas-vindas
    alert("Bem-vindo ao meu site!");

    // Botão interativo
    const botao = document.querySelector("button");

    if (botao) {
        botao.addEventListener("click", () => {
            alert("Você clicou no botão!");
        });
    }

    // Relógio em tempo real
    function atualizarRelogio() {
        const agora = new Date();

        const horario = agora.toLocaleTimeString("pt-BR");

        const relogio = document.querySelector("#relogio");