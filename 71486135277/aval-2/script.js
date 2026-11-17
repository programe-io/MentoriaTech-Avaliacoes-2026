
// Lista de mensagens motivacionais

const mensagens = [

    "Cuide do seu corpo, ele é sua casa! 💙",

    "Sua saúde deve ser sempre uma prioridade!",

    "Pequenos hábitos podem transformar sua vida!",

    "Movimente-se, hidrate-se e cuide de você!",

    "Uma vida saudável começa com pequenas escolhas!",

    "Seu corpo merece carinho, cuidado e atenção!",

    "Não busque a perfeição, busque o equilíbrio!"

];

// Função para gerar uma nova mensagem

function novaMensagem() {

    const frase = document.getElementById("frase");

    const indice = Math.floor(
        Math.random() * mensagens.length
    );

    frase.style.opacity = 0;

    setTimeout(function() {

        frase.textContent = mensagens[indice];

        frase.style.opacity = 1;

    }, 300);

}
