
/* PROJETO 5 - ALTERAR TEMA */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️ Tema";
    } else {
        themeButton.textContent = "🌙 Tema";
    }
});


/* CARTÃO DE APRESENTAÇÃO */

const contactButton = document.getElementById("contactButton");

contactButton.addEventListener("click", function () {
    alert("HTML + CSS + JavaScript: as bases da Web!");
});


/* MENSAGEM INTERATIVA */

const messageButton = document.getElementById("messageButton");
const message = document.getElementById("message");

messageButton.addEventListener("click", function () {
    message.textContent = "Parabéns! Você está aprendendo JavaScript!";
});


/* CONTADOR */

let count = 0;

const countDisplay = document.getElementById("count");

document.getElementById("increase").addEventListener("click", function () {
    count++;
    countDisplay.textContent = count;
});

document.getElementById("decrease").addEventListener("click", function () {
    count--;
    countDisplay.textContent = count;
});

document.getElementById("reset").addEventListener("click", function () {
    count = 0;
    countDisplay.textContent = count;
});


/* PROJETO 6 - QUIZ */

const questions = [
    {
        question: "O que significa HTML?",
        answers: [
            "HyperText Markup Language",
            "High Technology Modern Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Qual é a função do CSS?",
        answers: [
            "Armazenar dados",
            "Estilizar páginas web",
            "Criar servidores"
        ],
        correct: 1
    },
    {
        question: "Qual tecnologia adiciona interatividade?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        correct: 2
    },
    {
        question: "O que é a Internet?",
        answers: [
            "Uma rede mundial de computadores",
            "Um navegador",
            "Uma linguagem de programação"
        ],
        correct: 0
    },
    {
        question: "Qual tag cria um parágrafo?",
        answers: [
            "<h1>",
            "<p>",
            "<div>"
        ],
        correct: 1
    },
    {
        question: "Qual propriedade controla o espaço interno?",
        answers: [
            "margin",
            "border",
            "padding"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const scoreElement = document.getElementById("score");

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";

    nextButton.disabled = true;

    question.answers.forEach(function (answer, index) {
        const button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });

    scoreElement.textContent =
        "Pergunta " + (currentQuestion + 1) +
        " de " + questions.length;
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    if (selected === question.correct) {
        score++;
        feedbackElement.textContent = "Correto! Muito bem!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent =
            "Resposta incorreta. A resposta certa é: " +
            question.answers[question.correct];

        feedbackElement.style.color = "red";
    }

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    questionElement.textContent = "Quiz finalizado!";

    answersElement.innerHTML = "";

    feedbackElement.textContent =
        "Você acertou " + score +
        " de " + questions.length + " perguntas!";

    scoreElement.textContent =
        score === questions.length
        ? "Excelente! Você acertou todas!"
        : "Continue estudando e tente novamente!";

    nextButton.textContent = "Recomeçar";

    nextButton.disabled = false;

    nextButton.onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    nextButton.textContent = "Próxima pergunta";
    nextButton.onclick = null;

    showQuestion();
}

showQuestion();
