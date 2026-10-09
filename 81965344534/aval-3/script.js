const mensagens = [
    {
        titulo: "Um amor especial",
        texto: "Se eu pudesse escolher novamente, ainda escolheria conhecer você.",
        emoji: "🌹"
    },
    {
        titulo: "Você é meu lugar favorito",
        texto: "Entre tantos lugares no mundo, é ao seu lado que meu coração encontra paz.",
        emoji: "🏡"
    },
    {
        titulo: "Pequenos momentos",
        texto: "Não preciso de dias perfeitos. Só quero momentos verdadeiros com você.",
        emoji: "🌷"
    },
    {
        titulo: "Meu pensamento favorito",
        texto: "No meio de um dia comum, pensar em você é sempre uma parte especial.",
        emoji: "💭"
    },
    {
        titulo: "Escolher você",
        texto: "Amar é encontrar mil motivos para ficar, mesmo quando o mundo fica difícil.",
        emoji: "❤️"
    },
    {
        titulo: "Nosso infinito",
        texto: "Se cada sorriso seu fosse uma estrela, eu teria um céu inteiro para admirar.",
        emoji: "✨"
    },
    {
        titulo: "Um abraço",
        texto: "Há abraços que dizem tudo aquilo que as palavras não conseguem explicar.",
        emoji: "🤗"
    },
    {
        titulo: "Você e eu",
        texto: "Não é sobre ser perfeito. É sobre construir algo bonito, com carinho e verdade.",
        emoji: "💑"
    }
];

const botao = document.getElementById("botao-mensagem");
const titulo = document.getElementById("titulo-mensagem");
const texto = document.getElementById("texto-mensagem");
const emoji = document.getElementById("emoji");

let ultimaMensagem = -1;

botao.addEventListener("click", function () {
    let indice;

    // Evita repetir a mensagem que acabou de aparecer
    do {
        indice = Math.floor(Math.random() * mensagens.length);
    } while (indice === ultimaMensagem);

    ultimaMensagem = indice;

    const mensagem = mensagens[indice];

    titulo.textContent = mensagem.titulo;
    texto.textContent = mensagem.texto;
    emoji.textContent = mensagem.emoji;
});