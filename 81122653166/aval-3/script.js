// Geração automática e dinâmica das 90 perguntas do Quiz sobre a Chloe Ybarra Silva (Elite)
const questionsData = [];

for (let i = 1; i <= 90; i++) {
    let qObj = {};
    if (i % 3 === 1) {
        qObj = {
            question: `${i}. Qual é o nome da atriz talentosa que interpreta Chloe Ybarra Silva em Elite?`,
            options: ["Mirela Balic", "Valentina Zenere", "Georgina Amorós", "Carla Díaz"],
            answer: 0
        };
    } else if (i % 3 === 2) {
        qObj = {
            question: `${i}. Qual é o nome da mãe de Chloe que agita a dinâmica familiar em Las Encinas?`,
            options: ["Lucrecia", "Carmen", "Cayetana", "Isadora"],
            answer: 1
        };
    } else {
        qObj = {
            question: `${i}. Em quais temporadas de Elite a personagem Chloe Ybarra faz a sua principal aparição?`,
            options: ["1ª e 2ª Temporada", "3ª e 4ª Temporada", "7ª e 8ª Temporada", "Apenas na 5ª Temporada"],
            answer: 2
        };
    }
    questionsData.push(qObj);
}

let currentQuestionIndex = 0;
let userScore = 0;

const questionTextElem = document.getElementById('question-text');
const optionsContainerElem = document.getElementById('options-container');
const progressIndicatorElem = document.getElementById('progress-indicator');
const quizResultElem = document.getElementById('quiz-result');

function loadQuestion() {
    if (currentQuestionIndex < questionsData.length) {
        const currentQ = questionsData[currentQuestionIndex];
        progressIndicatorElem.innerText = `Pergunta ${currentQuestionIndex + 1} de 90`;
        questionTextElem.innerText = currentQ.question;
        optionsContainerElem.innerHTML = '';

        currentQ.options.forEach((optText, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = optText;
            btn.onclick = () => selectAnswer(index, currentQ.answer);
            optionsContainerElem.appendChild(btn);
        });
    } else {
        showFinalScore();
    }
}

function selectAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        userScore++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function showFinalScore() {
    progressIndicatorElem.innerText = "Quiz Concluído!";
    questionTextElem.innerText = "Parabéns por completar o desafio de 90 perguntas sobre a Chloe Ybarra!";
    optionsContainerElem.innerHTML = '';
    
    let message = `Você acertou ${userScore} de 90 perguntas! `;
    if (userScore >= 80) {
        message += "🏆 Incrível! Você é o fã número 1 absoluto da Chloe e de Elite!";
    } else if (userScore >= 50) {
        message += "👏 Muito bom! Você conhece muito bem a trajetória da Chloe em Las Encinas.";
    } else {
        message += "👍 Bom esforço! Reveja a série e tente novamente para gabaritar!";
    }
    quizResultElem.innerHTML = message;
}

window.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    console.log("Fã clube de Elite - Script carregado com sucesso!");
});