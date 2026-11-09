
/* MODO ESCURO */

const tema = document.getElementById("tema");

tema.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        tema.textContent = "☀️ Modo claro";
    } else {
        tema.textContent = "🌙 Modo escuro";
    }
});


/* MENSAGEM INTERATIVA */

const mensagemBtn = document.getElementById("mensagemBtn");

mensagemBtn.addEventListener("click", function() {
    document.getElementById("mensagem").textContent =
        "Parabéns! Você está aprendendo JavaScript!";
});


/* CONTADOR */

let numero = 0;

const contador = document.getElementById("contador");

document.getElementById("adicionar").addEventListener("click", function() {
    numero++;
    contador.textContent = numero;
});

document.getElementById("diminuir").addEventListener("click", function() {
    numero--;
    contador.textContent = numero;
});

document.getElementById("zerar").addEventListener("click", function() {
    numero = 0;
    contador.textContent = numero;
});


/* QUIZ */

const perguntas = [
    {
        pergunta: "O que é a Internet?",
        alternativas: [
            "Uma rede mundial de computadores",
            "Um navegador",
            "Uma linguagem de programação"
        ],
        correta: 0
    },
    {
        pergunta: "Quem criou a World Wide Web?",
        alternativas: [
            "Bill Gates",
            "Tim Berners-Lee",
            "Steve Jobs"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a função do HTML?",
        alternativas: [
            "Estruturar o conteúdo",
            "Criar banco de dados",
            "Editar imagens"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a função do CSS?",
        alternativas: [
            "Criar servidores",
            "Estilizar páginas",
            "Armazenar arquivos"
        ],
        correta: 1
    },
    {
        pergunta: "Qual tecnologia adiciona interatividade?",
        alternativas: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        correta: 2
    },
    {
        pergunta: "O que significa padding?",
        alternativas: [
            "Espaço externo",
            "Espaço interno",
            "Borda"
        ],
        correta: 1
    },
    {
        pergunta: "Qual tag representa um parágrafo?",
        alternativas: [
            "<h1>",
            "<p>",
            "<div>"
        ],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const resultado = document.getElementById("resultado");
const proxima = document.getElementById("proxima");

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[perguntaAtual];

    pergunta.textContent = atual.pergunta;
    alternativas.innerHTML = "";
    resultado.textContent = "";

    proxima.disabled = true;

    atual.alternativas.forEach(function(opcao, indice) {
        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.addEventListener("click", function() {
            verificarResposta(indice);
        });

        alternativas.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[perguntaAtual].correta;
    const botoes = alternativas.querySelectorAll("button");

    if (escolha === correta) {
        pontos++;
        resultado.textContent = "Resposta correta!";
        resultado.style.color = "green";
    } else {
        resultado.textContent =
            "Resposta incorreta! Resposta certa: " +
            perguntas[perguntaAtual].alternativas[correta];

        resultado.style.color = "red";
    }

    botoes.forEach(function(botao) {
        botao.disabled = true;
    });

    proxima.disabled = false;
}

proxima.addEventListener("click", function() {
    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
});

function finalizarQuiz() {
    pergunta.textContent = "Quiz finalizado!";
    alternativas.innerHTML = "";

    resultado.textContent =
        "Você acertou " + pontos +
        " de " + perguntas.length + " perguntas!";

    proxima.textContent = "Recomeçar";
    proxima.disabled = false;

    proxima.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;

    proxima.textContent = "Próxima pergunta";
    proxima.onclick = null;

    mostrarPergunta();
}

mostrarPergunta();
