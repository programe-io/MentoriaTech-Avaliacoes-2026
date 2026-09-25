const perguntas = [
    {
        pergunta: "O que a Psicologia estuda principalmente?",
        alternativas: [
            "Apenas o cérebro humano",
            "O comportamento e os processos mentais",
            "Somente as doenças físicas",
            "Apenas os sonhos"
        ],
        correta: 1
    },

    {
        pergunta: "Qual profissional é formado em Psicologia?",
        alternativas: [
            "Psicólogo",
            "Engenheiro",
            "Arquiteto",
            "Farmacêutico"
        ],
        correta: 0
    },

    {
        pergunta: "Qual destes é um processo psicológico?",
        alternativas: [
            "Memória",
            "Digestão",
            "Circulação sanguínea",
            "Respiração"
        ],
        correta: 0
    },

    {
        pergunta: "O que é memória?",
        alternativas: [
            "A capacidade de armazenar e recuperar informações",
            "A capacidade de correr",
            "Um tipo de músculo",
            "Um órgão do corpo"
        ],
        correta: 0
    },

    {
        pergunta: "Qual é uma área de atuação da Psicologia?",
        alternativas: [
            "Psicologia escolar",
            "Engenharia civil",
            "Astronomia",
            "Geologia"
        ],
        correta: 0
    },

    {
        pergunta: "O que significa empatia?",
        alternativas: [
            "Ignorar os sentimentos dos outros",
            "Tentar compreender os sentimentos e perspectivas de outra pessoa",
            "Evitar qualquer conversa",
            "Sempre concordar com alguém"
        ],
        correta: 1
    },

    {
        pergunta: "Qual destes pode influenciar o comportamento humano?",
        alternativas: [
            "Experiências de vida",
            "Apenas a idade",
            "Somente a altura",
            "Apenas a cor dos olhos"
        ],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const botaoProximo = document.getElementById("proximo");
const contador = document.getElementById("contador");

const quizBox = document.getElementById("quiz-box");
const resultado = document.getElementById("resultado");
const pontuacao = document.getElementById("pontuacao");

function mostrarPergunta() {
    respondeu = false;
    botaoProximo.disabled = true;

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent =
        `${perguntaAtual + 1}. ${pergunta.pergunta}`;

    contador.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    alternativasElemento.innerHTML = "";

    pergunta.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        botao.addEventListener("click", () => {
            verificarResposta(botao, indice);
        });

        alternativasElemento.appendChild(botao);
    });
}

function verificarResposta(botao, indice) {

    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach((b, i) => {
        b.disabled = true;

        if (i === pergunta.correta) {
            b.classList.add("correta");
        }
    });

    if (indice === pergunta.correta) {
        pontos++;
    } else {
        botao.classList.add("errada");
    }

    botaoProximo.disabled = false;
}

botaoProximo.addEventListener("click", () => {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
});

function finalizarQuiz() {

    quizBox.classList.add("escondido");
    resultado.classList.remove("escondido");

    pontuacao.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
}

function reiniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;

    resultado.classList.add("escondido");
    quizBox.classList.remove("escondido");

    mostrarPergunta();
}

mostrarPergunta();