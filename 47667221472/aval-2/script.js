const perguntas = [
    {
        pergunta: "Qual linguagem é usada para estruturar uma página web?",
        opcoes: ["CSS", "HTML", "JavaScript", "Python"],
        resposta: "HTML"
    },
    {
        pergunta: "Qual linguagem é usada para estilizar páginas?",
        opcoes: ["HTML", "JavaScript", "CSS", "C#"],
        resposta: "CSS"
    },
    {
        pergunta: "Qual linguagem adiciona interatividade às páginas?",
        opcoes: ["JavaScript", "HTML", "CSS", "SQL"],
        resposta: "JavaScript"
    },
    {
        pergunta: "Qual elemento HTML cria um título principal?",
        opcoes: ["<p>", "<h1>", "<img>", "<button>"],
        resposta: "<h1>"
    },
    {
        pergunta: "Qual comando JavaScript mostra uma mensagem no navegador?",
        opcoes: ["print()", "alert()", "message()", "show()"],
        resposta: "alert()"
    }
];

let perguntaAtual = 0;
let pontos = 0;

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const resultadoElemento = document.getElementById("resultado");
const quizElemento = document.getElementById("quiz");
const pontuacaoElemento = document.getElementById("pontuacao");

function carregarPergunta() {
    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;
    opcoesElemento.innerHTML = "";

    pergunta.opcoes.forEach(opcao => {

        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.classList.add("opcao");

        botao.onclick = function() {
            verificarResposta(botao, opcao);
        };

        opcoesElemento.appendChild(botao);
    });
}

function verificarResposta(botao, resposta) {

    const respostaCorreta = perguntas[perguntaAtual].resposta;

    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (resposta === respostaCorreta) {
        botao.classList.add("correta");
        pontos++;
    } else {
        botao.classList.add("errada");

        botoes.forEach(botao => {
            if (botao.textContent === respostaCorreta) {
                botao.classList.add("correta");
            }
        });
    }
}

function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {

    quizElemento.classList.add("oculto");
    resultadoElemento.classList.remove("oculto");

    pontuacaoElemento.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
}

function reiniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;

    resultadoElemento.classList.add("oculto");
    quizElemento.classList.remove("oculto");

    carregarPergunta();
}

carregarPergunta();