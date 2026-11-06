// Alternância de Tema Claro/Escuro
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    body.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
}

// Navegação suave pelas seções
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Dados do Quiz Interativo
const quizData = [
    {
        question: "Qual projeto militar/acadêmico é considerado o ancestral da internet na década de 1960?",
        options: ["World Wide Web", "ARPANET", "CERN Network", "TCP/IP System"],
        correct: 1
    },
    {
        question: "Quem foi o criador da World Wide Web no final dos anos 1980?",
        options: ["Alan Turing", "Steve Jobs", "Tim Berners-Lee", "Vint Cerf"],
        correct: 2
    },
    {
        question: "Qual é a principal diferença entre Internet e Web?",
        options: [
            "São exatamente a mesma coisa.",
            "A Internet é a infraestrutura de rede e a Web é o sistema de páginas/documentos sobre ela.",
            "A Web é a infraestrutura física e a Internet são os sites.",
            "A Web só funciona via satélite, enquanto a internet usa cabos."
        ],
        correct: 1
    },
    {
        question: "Qual tecnologia é responsável por transportar a maior parte do tráfego internacional de dados pelos oceanos?",
        options: ["Satélites geoestacionários", "Cabos submarinos de fibra óptica", "Redes Wi-Fi de longo alcance", "Sinais de rádio frequência"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
    const q = quizData[currentQuestionIndex];
    document.getElementById("question-text").innerText = `Pergunta ${currentQuestionIndex + 1}: ${q.question}`;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.innerText = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
    document.getElementById("next-btn").style.display = "none";
}

function selectOption(selectedIndex, buttonElement) {
    const q = quizData[currentQuestionIndex];
    const options = document.querySelectorAll(".quiz-option");

    options.forEach((opt, index) => {
        opt.onclick = null; // Desativa cliques extras
        if (index === q.correct) {
            opt.classList.add("correct");
        } else if (index === selectedIndex) {
            opt.classList.add("incorrect");
        }
    });

    if (selectedIndex === q.correct) {
        score++;
    }

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById("quiz-container").innerHTML = `
            <h3>🎉 Quiz Finalizado!</h3>
            <p style="margin-top: 1rem; font-size: 1.1rem;">Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.</p>
            <button class="btn" style="margin-top: 1rem;" onclick="restartQuiz()">Reiniciar Quiz</button>
        `;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").innerHTML = `
        <div class="quiz-question" id="question-text">Carregando pergunta...</div>
        <div class="quiz-options" id="options-container"></div>
        <button class="btn" id="next-btn" style="display:none;" onclick="nextQuestion()">Próxima Pergunta</button>
    `;
    loadQuiz();
}

// Inicializar o quiz ao carregar a página
window.onload = loadQuiz;