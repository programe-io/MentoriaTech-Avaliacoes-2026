// Banco de dados das perguntas do Quiz
const questions = [
    {
        question: "Qual tag HTML é usada para criar um link?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1 // Índice da resposta correta (<a>)
    },
    {
        question: "Qual propriedade CSS muda a cor do texto?",
        options: ["text-color", "background-color", "font-style", "color"],
        answer: 3 // Índice da resposta correta (color)
    },
    {
        question: "Como declaramos uma variável que não pode ser alterada em JavaScript?",
        options: ["let", "var", "const", "static"],
        answer: 2 // Índice da resposta correta (const)
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Mapeamento dos elementos do DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const questionBox = document.getElementById("question-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");

// Inicia o Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hide");
    questionBox.classList.remove("hide");
    nextButton.classList.add("hide");
    showQuestion();
}

// Exibe a pergunta atual
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    
    // Atualiza o progresso e o texto da pergunta
    progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    questionText.innerText = currentQuestion.question;

    // Cria os botões de opção dinamicamente
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// Limpa as opções anteriores
function resetState() {
    nextButton.classList.add("hide");
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Processa a escolha do usuário
function selectOption(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Verifica se acertou
    if (selectedIndex === currentQuestion.answer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        // Mostra qual era a correta para o usuário saber
        allButtons[currentQuestion.answer].classList.add("correct");
    }

    // Desabilita todos os botões após a escolha
    allButtons.forEach(button => button.disabled = true);

    // Mostra o botão de avançar
    nextButton.classList.remove("hide");
}

// Avança ou finaliza o quiz
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Mostra a tela final com os resultados
function showResults() {
    questionBox.classList.add("hide");
    nextButton.classList.add("hide");
    resultBox.classList.remove("hide");
    progressText.innerText = "Quiz Concluído!";
    scoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
}

// Configura o botão de reiniciar
restartButton.addEventListener("click", startQuiz);

// Executa o quiz pela primeira vez assim que a página carrega
startQuiz();