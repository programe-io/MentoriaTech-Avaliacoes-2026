
/* EXEMPLO DE INTERATIVIDADE */

const exampleButton = document.getElementById("example-button");
const exampleTitle = document.getElementById("example-title");
const exampleText = document.getElementById("example-text");

exampleButton.addEventListener("click", function() {
    exampleTitle.textContent = "JavaScript funcionando!";
    exampleText.textContent =
        "Parabéns! Você acabou de executar uma ação com JavaScript.";

    exampleButton.textContent = "Funcionou!";
});

/* ANO AUTOMÁTICO NO RODAPÉ */

document.getElementById("year").textContent =
    new Date().getFullYear();

/* QUIZ */

const questions = [
    {
        question: "1. O que é a Internet?",
        answers: [
            "Uma linguagem de programação",
            "Uma rede mundial de computadores",
            "Um navegador",
            "Um sistema operacional"
        ],
        correct: 1
    },
    {
        question: "2. Qual é a função do HTML?",
        answers: [
            "Criar a estrutura da página",
            "Criar o banco de dados",
            "Definir apenas as cores",
            "Hospedar sites"
        ],
        correct: 0
    },
    {
        question: "3. Para que serve o CSS?",
        answers: [
            "Armazenar arquivos",
            "Conectar computadores",
            "Estilizar páginas web",
            "Criar servidores"
        ],
        correct: 2
    },
    {
        question: "4. Qual tecnologia adiciona interatividade?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "HTTP"
        ],
        correct: 2
    },
    {
        question: "5. Qual tag representa o conteúdo principal?",
        answers: [
            "<footer>",
            "<main>",
            "<head>",
            "<title>"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const scoreDisplay = document.getElementById("score");

function showQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    questionTitle.textContent = current.question;

    answersContainer.innerHTML = "";
    feedback.textContent = "";
    nextButton.disabled = true;

    current.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.classList.add("answer");
        button.textContent = answer;

        button.addEventListener("click", function() {
            checkAnswer(index, button);
        });

        answersContainer.appendChild(button);
    });
}

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;
    const buttons = answersContainer.querySelectorAll(".answer");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    if (selected === correctAnswer) {

        score++;

        selectedButton.classList.add("correct");
        feedback.textContent = "Muito bem! Resposta correta!";

    } else {

        selectedButton.classList.add("wrong");
        buttons[correctAnswer].classList.add("correct");

        feedback.textContent =
            "Resposta incorreta! Veja a alternativa em verde.";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }
});

function finishQuiz() {

    questionNumber.textContent = "Quiz finalizado!";

    questionTitle.textContent =
        "Parabéns por concluir o desafio!";

    answersContainer.innerHTML = "";

    feedback.textContent = "Você concluiu todas as perguntas.";

    nextButton.textContent = "Refazer quiz";
    nextButton.disabled = false;

    scoreDisplay.textContent =
        `Sua pontuação: ${score} de ${questions.length}`;

    nextButton.onclick = function() {
        currentQuestion = 0;
        score = 0;

        nextButton.textContent = "Próxima pergunta";
        nextButton.onclick = null;

        scoreDisplay.textContent = "";

        showQuestion();
    };
}

/* INICIAR QUIZ */

showQuestion();
