
const mensagens = [
    "💜 Você merece cuidado, carinho e respeito!",
    "🌸 Sua saúde deve ser uma prioridade!",
    "✨ Pequenas atitudes fazem grandes diferenças!",
    "💜 Nunca se esqueça de cuidar de você!",
    "🌷 Seu bem-estar é muito importante!"
];

function mensagem() {
    const sorteio = Math.floor(
        Math.random() * mensagens.length
    );

    document.getElementById("mensagem").textContent =
        mensagens[sorteio];
}
