
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Mundo dos Bancos!");
});

// MOSTRAR MENSAGEM
function mensagemBanco() {
    alert(
        "🏦 Os bancos ajudam as pessoas a organizar e movimentar seu dinheiro!"
    );
}

// QUIZ SOBRE BANCOS
const perguntas = [
    {
        pergunta: "Qual sistema permite fazer pagamentos instantâneos no Brasil?",
        resposta: "pix"
    },
    {
        pergunta: "Qual instituição supervisiona o sistema financeiro brasileiro?",
        resposta: "banco central"
    },
    {
        pergunta: "Como se chama o serviço usado para guardar e movimentar dinheiro?",
        resposta: "conta bancária"
    }
];

let numeroPergunta = 0;

function iniciarQuiz() {

    const resposta = prompt(
        perguntas[numeroPergunta].pergunta
    );

    if (resposta === null) return;

    if (
        resposta.trim().toLowerCase() ===
        perguntas[numeroPergunta].resposta
    ) {
        alert("Parabéns! Você acertou! 🎉");
    } else {
        alert(
            "Resposta correta: " +
            perguntas[numeroPergunta].resposta
        );
    }

    numeroPergunta++;

    if (numeroPergunta >= perguntas.length) {
        numeroPergunta = 0;
        alert("Você terminou o quiz! 🏆");
    }
}
