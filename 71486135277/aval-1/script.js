
// Mensagens de incentivo

const mensagens = [
    "Você é importante e merece ser feliz! 💛",

    "Não tenha medo de falar sobre seus sentimentos.",

    "Pedir ajuda é um ato de coragem!",

    "Seus dias difíceis não definem sua história.",

    "Você não precisa enfrentar tudo sozinho(a).",

    "Sua vida tem valor. Cuide de você!",

    "Sempre existe alguém disposto a ouvir você."
];

// Função para trocar as mensagens

function novaMensagem() {

    const frase = document.getElementById("frase");

    const indice = Math.floor(
        Math.random() * mensagens.length
    );

    frase.style.opacity = 0;

    setTimeout(() => {
        frase.textContent = mensagens[indice];
        frase.style.opacity = 1;
    }, 300);

}
