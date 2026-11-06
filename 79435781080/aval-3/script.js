
function mostrarMensagem() {

    const mensagens = [
        "Você é importante. Nunca se esqueça disso! ❤️",
        "Respeite seu tempo e seus sentimentos.",
        "Pedir ajuda também é uma demonstração de força.",
        "Sua saúde mental merece atenção! 💙",
        "Um dia difícil não significa uma vida difícil."
    ];

    const sorteio = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").innerText =
        mensagens[sorteio];
}
