
function mostrarMensagem() {
    const mensagens = [
        "Nunca desista dos seus sonhos!",
        "Aprender algo novo é sempre importante!",
        "O futuro começa com as escolhas de hoje!",
        "Obrigado por visitar meu blog!"
    ];

    const indice = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").textContent =
        mensagens[indice];
}
