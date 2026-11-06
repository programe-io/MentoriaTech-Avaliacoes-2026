
const perguntas = [
    {
        pergunta: "Quantos jogadores cada equipe possui em quadra?",
        opcoes: ["5 jogadores", "6 jogadores", "7 jogadores"],
        correta: 1
    },
    {
        pergunta: "Qual fundamento é utilizado para receber o saque?",
        opcoes: ["Manchete", "Cortada", "Bloqueio"],
        correta: 0
    },
    {
        pergunta: "Qual é a função do levantador?",
        opcoes: [
            "Defender a quadra",
            "Organizar as jogadas",
            "Marcar o adversário"
        ],
        correta: 1
    },
    {
        pergunta: "Quantos toques uma equipe pode dar antes de devolver a bola?",
        opcoes: ["Dois", "Três", "Quatro"],
        correta: 1
    },
    {
        pergunta: "Qual jogador é especialista em defesa?",
        opcoes: ["Oposto", "Central", "Líbero"],
        correta: 2
    }
];

let atual = 0;
let pontos = 0;
let respondida = false;

function mostrarPergunta() {
    const pergunta = perguntas[atual];

    document.getElementById("pergunta").textContent =
        pergunta.pergunta;

    document.getElementById("resultado").textContent = "";

    const opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = "";

    respondida = false;

    pergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.onclick = () => verificarResposta(indice);

        opcoes.appendChild(botao);
    });

    document.getElementById("proximo").disabled = true;
}

function verificarResposta(escolha) {
    if (respondida) return;

    respondida = true;

    const correta = perguntas[atual].correta;
    const botoes = document.querySelectorAll("#opcoes button");

    if (escolha === correta) {
        pontos++;

        document.getElementById("resultado").textContent =
            "Muito bem! Resposta correta! 🏆";
    } else {
        document.getElementById("resultado").textContent =
            "Resposta incorreta! A resposta certa é: " +
            perguntas[atual].opcoes[correta];
    }

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    document.getElementById("proximo").disabled = false;
}

function proximaPergunta() {
    if (!respondida) return;

    atual++;

    if (atual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultadoFinal();
    }
}

function mostrarResultadoFinal() {
    document.getElementById("pergunta").textContent =
        "Quiz finalizado! 🏐";

    document.getElementById("opcoes").innerHTML = "";

    document.getElementById("resultado").textContent =
        "Você acertou " + pontos + " de " +
        perguntas.length + " perguntas!";

    const botao = document.getElementById("proximo");

    botao.textContent = "Jogar novamente";
    botao.disabled = false;
    botao.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
    atual = 0;
    pontos = 0;

    const botao = document.getElementById("proximo");

    botao.textContent = "Próxima pergunta";
    botao.onclick = proximaPergunta;

    mostrarPergunta();
}

mostrarPergunta();
