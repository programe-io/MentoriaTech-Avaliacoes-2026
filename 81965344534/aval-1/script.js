const piadas = [
    {
        pergunta: "Por que o livro de matemática ficou triste?",
        resposta: "Porque tinha muitos problemas!",
        emoji: "📚"
    },
    {
        pergunta: "O que o zero disse para o oito?",
        resposta: "Que cinto bonito!",
        emoji: "🤣"
    },
    {
        pergunta: "Por que o computador foi ao médico?",
        resposta: "Porque estava com um vírus!",
        emoji: "💻"
    },
    {
        pergunta: "Qual é o café mais perigoso do mundo?",
        resposta: "O ex-presso! ☕",
        emoji: "😆"
    },
    {
        pergunta: "Por que o esqueleto não brigou com ninguém?",
        resposta: "Porque não tinha estômago para isso!",
        emoji: "💀"
    },
    {
        pergunta: "O que a impressora disse para a outra?",
        resposta: "Essa folha é sua ou é impressão minha?",
        emoji: "🖨️"
    },
    {
        pergunta: "Por que o celular usava óculos?",
        resposta: "Porque perdeu os contatos!",
        emoji: "📱"
    },
    {
        pergunta: "Qual é o animal mais antigo?",
        resposta: "A zebra, porque é em preto e branco!",
        emoji: "🦓"
    }
];

const botao = document.getElementById("botao-piada");
const textoPiada = document.getElementById("texto-piada");
const respostaPiada = document.getElementById("resposta-piada");
const emoji = document.getElementById("emoji");

let ultimaPiada = -1;

botao.addEventListener("click", function () {
    let indice;

    // Evita repetir a piada que acabou de aparecer
    do {
        indice = Math.floor(Math.random() * piadas.length);
    } while (indice === ultimaPiada);

    ultimaPiada = indice;

    const piada = piadas[indice];

    textoPiada.textContent = piada.pergunta;
    respostaPiada.textContent = piada.resposta;
    emoji.textContent = piada.emoji;
});