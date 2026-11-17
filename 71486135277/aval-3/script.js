
// Lista de mensagens motivacionais

const mensagens = [

    "Você é única e especial! 💗",

    "Nunca deixe de reconhecer o seu próprio valor!",

    "Você merece amor, respeito e felicidade!",

    "Sua beleza vai muito além da aparência!",

    "Cuide de você com o mesmo carinho que oferece aos outros!",

    "Seja sua maior inspiração!",

    "Você não precisa ser perfeita para ser maravilhosa!",

    "Amar a si mesma é o começo de uma linda transformação!",

    "Sua autoestima merece florescer todos os dias! 🌷"

];

// Função para trocar as mensagens

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
