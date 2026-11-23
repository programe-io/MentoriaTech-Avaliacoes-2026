
let pontos = 0;
let perguntaAtual = 0;

const perguntas = [
    {
        pergunta: "Como se diz Casa em inglês?",
        resposta: "House",
        opcoes: ["Car", "House", "Water"]
    },
    {
        pergunta: "Como se diz Cachorro em inglês?",
        resposta: "Dog",
        opcoes: ["Cat", "Dog", "Bird"]
    },
    {
        pergunta: "Como se diz Água em inglês?",
        resposta: "Water",
        opcoes: ["Water", "Book", "Apple"]
    },
    {
        pergunta: "Como se diz Livro em inglês?",
        resposta: "Book",
        opcoes: ["School", "Book", "Food"]
    }
];

function carregarPergunta() {
    let p = perguntas[perguntaAtual];

    document.getElementById("pergunta").innerText = p.pergunta;

    let botoes = document.querySelectorAll(".opcoes button");

    botoes.forEach((botao, i) => {
        botao.innerText = p.opcoes[i];
        botao.disabled = false;
    });

    document.getElementById("resultado").innerText = "";
}

function responder(resposta) {
    let correta = perguntas[perguntaAtual].resposta;

    if (resposta === correta) {
        pontos++;
        document.getElementById("resultado").innerText =
            "Parabéns! Resposta correta!";
    } else {
        document.getElementById("resultado").innerText =
            "Resposta errada! Tente novamente na próxima.";
    }

    document.getElementById("pontos").innerText =
        "Pontos: " + pontos;

    document.querySelectorAll(".opcoes button")
        .forEach(botao => botao.disabled = true);
}

function proxima() {
    perguntaAtual++;

    if (perguntaAtual >= perguntas.length) {
        alert("Fim do quiz! Você fez " + pontos + " pontos.");
        perguntaAtual = 0;
        pontos = 0;
        document.getElementById("pontos").innerText = "Pontos: 0";
    }

    carregarPergunta();
}

carregarPergunta();
