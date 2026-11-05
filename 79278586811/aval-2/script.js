
let perguntas = [
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        resposta: "jupiter"
    },
    {
        pergunta: "Quantos continentes existem?",
        resposta: "7"
    },
    {
        pergunta: "Qual linguagem é usada para estruturar páginas web?",
        resposta: "html"
    },
    {
        pergunta: "Quanto é 10 x 5?",
        resposta: "50"
    },
    {
        pergunta: "Qual é a capital do Brasil?",
        resposta: "brasilia"
    }
];

let pontos = 0;

alert("Bem-vindo ao Quiz Inteligente!");

for (let i = 0; i < perguntas.length; i++) {

    let respostaUsuario = prompt(perguntas[i].pergunta);

    if (
        respostaUsuario &&
        respostaUsuario.trim().toLowerCase() === perguntas[i].resposta
    ) {
        alert("Resposta correta!");
        pontos++;
    } else {
        alert("Resposta incorreta!");
    }
}

alert(
    "Quiz finalizado!\n" +
    "Sua pontuação foi: " + pontos +
    " de " + perguntas.length
);

if (pontos === perguntas.length) {
    alert("Parabéns! Você acertou todas!");
} else if (pontos >= 3) {
    alert("Muito bem! Você conhece bastante!");
} else {
    alert("Continue estudando e tente novamente!");
}
