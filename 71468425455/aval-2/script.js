
const questions = [
  {
    category: "PROGRAMAÇÃO",
    icon: "</>",
    title: "Qual linguagem é utilizada para estruturar o conteúdo de uma página web?",
    hint: "Pense na base de sites, títulos, imagens e parágrafos.",
    options: ["Python", "HTML", "SQL", "C++"],
    answer: 1,
    explanation: "HTML organiza a estrutura e o conteúdo das páginas web."
  },
  {
    category: "HARDWARE",
    icon: "CPU",
    title: "Qual componente é conhecido como o cérebro do computador?",
    hint: "É responsável por executar instruções e realizar cálculos.",
    options: ["Monitor", "Teclado", "Processador", "Gabinete"],
    answer: 2,
    explanation: "A CPU executa instruções e processa dados."
  },
  {
    category: "SEGURANÇA DIGITAL",
    icon: "🔒",
    title: "Qual atitude ajuda a proteger suas contas na internet?",
    hint: "Uma camada extra de proteção faz diferença.",
    options: [
      "Usar a mesma senha em tudo",
      "Compartilhar senhas",
      "Desativar atualizações",
      "Ativar autenticação em dois fatores"
    ],
    answer: 3,
    explanation: "A autenticação em dois fatores adiciona uma camada de segurança."
  },
  {
    category: "REDES",
    icon: "NET",
    title: "Qual é a principal função de um endereço IP?",
    hint: "Os dispositivos precisam ser identificados em uma rede.",
    options: [
      "Identificar um dispositivo na rede",
      "Aumentar a memória RAM",
      "Criar imagens",
      "Editar documentos"
    ],
    answer: 0,
    explanation: "O endereço IP identifica uma interface de rede para permitir a comunicação."
  },
  {
    category: "DESENVOLVIMENTO WEB",
    icon: "CSS",
    title: "Para que serve o CSS?",
    hint: "Ele controla cores, fontes, espaçamentos e layout.",
    options: [
      "Armazenar senhas",
      "Montar circuitos",
      "Estilizar páginas web",
      "Gerenciar arquivos do sistema"
    ],
    answer: 2,
    explanation: "CSS define a aparência visual e o layout das páginas."
  },
  {
    category: "BANCO DE DADOS",
    icon: "SQL",
    title: "Qual linguagem é muito utilizada para consultar bancos de dados relacionais?",
    hint: "É possível usá-la para selecionar, inserir e atualizar registros.",
    options: ["HTML", "SQL", "CSS", "PNG"],
    answer: 1,
    explanation: "SQL é usada para consultar e manipular dados em bancos relacionais."
  },
  {
    category: "INTELIGÊNCIA ARTIFICIAL",
    icon: "AI",
    title: "O que caracteriza o aprendizado de máquina?",
    hint: "Os sistemas identificam padrões a partir de dados.",
    options: [
      "Aumentar fisicamente o computador",
      "Substituir todos os programas por imagens",
      "Desligar redes automaticamente",
      "Aprender padrões a partir de dados"
    ],
    answer: 3,
    explanation: "O aprendizado de máquina utiliza dados para identificar padrões e produzir previsões ou decisões."
  },
  {
    category: "LÓGICA DE PROGRAMAÇÃO",
    icon: "{ }",
    title: "Qual estrutura permite executar instruções repetidamente?",
    hint: "Em JavaScript, exemplos são for e while.",
    options: ["Laço de repetição", "Comentário", "Variável constante", "Título HTML"],
    answer: 0,
    explanation: "Laços como for e while repetem instruções conforme uma condição."
  },
  {
    category: "SISTEMAS OPERACIONAIS",
    icon: "OS",
    title: "Qual é a função de um sistema operacional?",
    hint: "Ele gerencia os recursos do computador e permite executar aplicativos.",
    options: [
      "Apenas criar apresentações",
      "Somente conectar impressoras",
      "Gerenciar hardware e programas",
      "Substituir o processador"
    ],
    answer: 2,
    explanation: "O sistema operacional gerencia recursos, arquivos, processos e dispositivos."
  },
  {
    category: "MEMÓRIA",
    icon: "RAM",
    title: "O que acontece normalmente com os dados armazenados na RAM quando o computador é desligado?",
    hint: "Pense em uma memória temporária.",
    options: [
      "São enviados para a internet",
      "São perdidos",
      "Viraram arquivos PDF",
      "São gravados automaticamente no SSD"
    ],
    answer: 1,
    explanation: "A RAM é volátil: perde seu conteúdo quando deixa de receber energia."
  },
  {
    category: "INTERNET",
    icon: "WWW",
    title: "Qual protocolo protege a comunicação entre navegador e site com criptografia?",
    hint: "Você costuma vê-lo no começo dos endereços de sites seguros.",
    options: ["FTP sem criptografia", "HTTP simples", "SMTP", "HTTPS"],
    answer: 3,
    explanation: "HTTPS utiliza TLS para proteger a comunicação entre o navegador e o servidor."
  },
  {
    category: "JAVASCRIPT",
    icon: "JS",
    title: "O que o JavaScript pode fazer em uma página web?",
    hint: "É a linguagem que permite adicionar interatividade.",
    options: [
      "Responder a cliques e atualizar conteúdo",
      "Substituir fisicamente a memória RAM",
      "Aumentar a resolução do monitor sozinho",
      "Eliminar a necessidade de todo HTML e CSS"
    ],
    answer: 0,
    explanation: "JavaScript pode responder a eventos, validar formulários e atualizar elementos da página."
  }
];

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const homeButton = document.getElementById("homeButton");

const missionTitle = document.getElementById("missionTitle");
const levelNumber = document.getElementById("levelNumber");
const scoreValue = document.getElementById("scoreValue");
const xpValue = document.getElementById("xpValue");
const livesValue = document.getElementById("livesValue");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const categoryTag = document.getElementById("categoryTag");
const questionNumber = document.getElementById("questionNumber");
const questionIcon = document.getElementById("questionIcon");
const questionText = document.getElementById("questionText");
const questionHint = document.getElementById("questionHint");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;
let xp = 0;
let lives = 3;
let correctCount = 0;
let answered = false;
let gameQuestions = [];

const missions = [
  "NÚCLEO DIGITAL",
  "SISTEMAS & HARDWARE",
  "DEFESA CIBERNÉTICA",
  "CONEXÃO GLOBAL",
  "CÓDIGO AVANÇADO",
  "INTELIGÊNCIA DIGITAL"
];

function showScreen(screen) {
  [startScreen, gameScreen, resultScreen].forEach(item => {
    item.classList.remove("active");
  });

  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame() {
  currentQuestion = 0;
  score = 0;
  xp = 0;
  lives = 3;
  correctCount = 0;
  answered = false;

  // Embaralha as perguntas a cada partida.
  gameQuestions = [...questions];

  for (let i = gameQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameQuestions[i], gameQuestions[j]] =
      [gameQuestions[j], gameQuestions[i]];
  }

  showScreen(gameScreen);
  renderQuestion();
}

function renderQuestion() {
  if (currentQuestion >= gameQuestions.length || lives <= 0) {
    finishGame();
    return;
  }

  answered = false;

  const question = gameQuestions[currentQuestion];

  const phase = Math.min(
    missions.length - 1,
    Math.floor(currentQuestion / 2)
  );

  missionTitle.textContent = missions[phase];
  levelNumber.textContent = String(currentQuestion + 1).padStart(2, "0");

  scoreValue.textContent = String(score).padStart(4, "0");
  xpValue.textContent = String(xp).padStart(3, "0");
  livesValue.textContent = "♥ ".repeat(lives).trim();

  progressText.textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} / ${gameQuestions.length}`;

  progressFill.style.width =
    `${(currentQuestion / gameQuestions.length) * 100}%`;

  categoryTag.textContent = question.category;
  questionNumber.textContent =
    `DESAFIO ${String(currentQuestion + 1).padStart(2, "0")}`;

  questionIcon.textContent = question.icon;
  questionText.textContent = question.title;
  questionHint.textContent = question.hint;

  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.classList.add("hidden");

  answersContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = option;

    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index));

    answersContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = gameQuestions[currentQuestion];
  const buttons = answersContainer.querySelectorAll(".answer-button");
  const isCorrect = selectedIndex === question.answer;

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    score += 100;
    xp += 25;
    correctCount++;

    feedback.textContent = `✓ RESPOSTA CORRETA! +100 PONTOS. ${question.explanation}`;
    feedback.classList.add("success");
  } else {
    lives--;

    feedback.textContent = `✕ RESPOSTA INCORRETA. ${question.explanation}`;
    feedback.classList.add("error");
  }

  scoreValue.textContent = String(score).padStart(4, "0");
  xpValue.textContent = String(xp).padStart(3, "0");
  livesValue.textContent = lives > 0
    ? "♥ ".repeat(lives).trim()
    : "0 VIDAS";

  nextButton.textContent =
    lives <= 0
      ? "VER RESULTADO →"
      : currentQuestion === gameQuestions.length - 1
        ? "FINALIZAR MISSÃO →"
        : "PRÓXIMO DESAFIO →";

  nextButton.classList.remove("hidden");
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion >= gameQuestions.length || lives <= 0) {
    finishGame();
    return;
  }

  renderQuestion();
}

function finishGame() {
  showScreen(resultScreen);

  const total = gameQuestions.length;
  const accuracy = total
    ? Math.round((correctCount / total) * 100)
    : 0;

  let rank;
  let title;
  let description;
  let symbol;

  if (correctCount === total) {
    rank = "LENDA DA INFORMÁTICA";
    title = "PERFEITO.";
    description = "Incrível! Você dominou todos os desafios e demonstrou conhecimento excepcional.";
    symbol = "✦";
  } else if (accuracy >= 75) {
    rank = "HACKER DO CONHECIMENTO";
    title = "MISSÃO CUMPRIDA.";
    description = "Excelente trabalho! Você está preparado para explorar novos desafios digitais.";
    symbol = "⌘";
  } else if (accuracy >= 45) {
    rank = "AGENTE DIGITAL";
    title = "BOA JORNADA.";
    description = "Você avançou no sistema! Continue aprendendo para desbloquear todo o seu potencial.";
    symbol = "⚡";
  } else {
    rank = "RECRUTA TECH";
    title = "MISSÃO ENCERRADA.";
    description = "Todo especialista começa aprendendo. Estude os conceitos e tente novamente!";
    symbol = "◇";
  }

  document.getElementById("resultSymbol").textContent = symbol;
  document.getElementById("resultTitle").innerHTML =
    `${title.split(" ")[0]} <span>${title.split(" ").slice(1).join(" ")}</span>`;

  document.getElementById("resultDescription").textContent = description;
  document.getElementById("finalScore").textContent =
    String(score).padStart(4, "0");
  document.getElementById("rankText").textContent = rank;
  document.getElementById("correctAnswers").textContent =
    `${correctCount}/${total}`;
  document.getElementById("accuracy").textContent = `${accuracy}%`;
  document.getElementById("finalXP").textContent = xp;

  progressFill.style.width =
    `${(currentQuestion / total) * 100}%`;
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startGame);

homeButton.addEventListener("click", () => {
  showScreen(startScreen);
});
