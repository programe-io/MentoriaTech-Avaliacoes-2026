
/* Navegação entre as seções */
document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const section = document.getElementById(button.dataset.target);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    document.querySelectorAll('nav button').forEach(item => {
      item.classList.toggle(
        'active',
        item.dataset.target === button.dataset.target
      );
    });
  });
});

/* Pontuação e progresso */
let xp = 0;
let completedMissions = 0;
let correctAnswers = 0;
let answeredQuestions = 0;

const missionChecks = document.querySelectorAll('#missionList input');

function updateStats() {
  document.getElementById('xp').textContent = xp + ' XP';
  document.getElementById('level').textContent =
    'Nível ' + (Math.floor(xp / 100) + 1);
  document.getElementById('completed').textContent = completedMissions;

  const accuracy = answeredQuestions
    ? Math.round((correctAnswers / answeredQuestions) * 100)
    : 0;

  document.getElementById('accuracy').textContent = accuracy + '%';
}

missionChecks.forEach(check => {
  check.addEventListener('change', () => {
    const mission = check.closest('.mission');

    if (check.checked) {
      xp += 20;
      completedMissions++;
      mission.classList.add('done');
    } else {
      xp = Math.max(0, xp - 20);
      completedMissions--;
      mission.classList.remove('done');
    }

    const total = missionChecks.length;

    document.getElementById('missionProgress').style.width =
      (completedMissions / total * 100) + '%';

    document.getElementById('missionStatus').textContent =
      `${completedMissions} de ${total} missões concluídas.`;

    updateStats();
  });
});

/* Cronômetro de 25 minutos */
let remaining = 25 * 60;
let timerInterval = null;

function displayTimer() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  document.getElementById('timer').textContent =
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');
}

document.getElementById('startTimer').addEventListener('click', () => {
  if (timerInterval !== null || remaining <= 0) return;

  document.getElementById('timerStatus').textContent =
    'Hora de focar! 💪';

  timerInterval = setInterval(() => {
    remaining--;
    displayTimer();

    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      document.getElementById('timerStatus').textContent =
        'Parabéns! Você concluiu sua sessão de foco. 🎉';
    }
  }, 1000);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;

  document.getElementById('timerStatus').textContent =
    'Cronômetro pausado.';
});

document.getElementById('resetTimer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  remaining = 25 * 60;

  displayTimer();
  document.getElementById('timerStatus').textContent = '';
});

/* Resumidor simples de texto */
document.getElementById('summarize').addEventListener('click', () => {
  const text = document.getElementById('sourceText').value.trim();
  const output = document.getElementById('summary');

  if (!text) {
    output.value = 'Cole um texto antes de gerar o resumo.';
    return;
  }

  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const cleaned = sentences.map(sentence => sentence.trim()).filter(Boolean);
  const amount = Math.max(1, Math.ceil(cleaned.length * 0.4));

  output.value = cleaned.slice(0, amount).join(' ').trim();
});

/* Perguntas do quiz */
const questions = [
  {
    text: 'Qual é o resultado de 8 × 7?',
    options: ['54', '56', '64', '48'],
    correct: 1,
    explanation: '8 multiplicado por 7 é igual a 56.'
  },
  {
    text: 'Qual é o sujeito da frase "Os alunos estudaram bastante"?',
    options: [
      'Estudaram',
      'Bastante',
      'Os alunos',
      'A frase não tem sujeito'
    ],
    correct: 2,
    explanation: '"Os alunos" é quem pratica a ação de estudar.'
  },
  {
    text: 'Qual é o planeta conhecido como Planeta Vermelho?',
    options: ['Vênus', 'Júpiter', 'Marte', 'Saturno'],
    correct: 2,
    explanation:
      'Marte tem aparência avermelhada por causa dos óxidos de ferro na superfície.'
  },
  {
    text: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Brasília', 'Rio de Janeiro', 'Salvador'],
    correct: 1,
    explanation: 'Brasília é a capital federal do Brasil desde 1960.'
  },
  {
    text: 'Qual processo as plantas usam para produzir seu alimento?',
    options: ['Respiração', 'Evaporação', 'Fotossíntese', 'Digestão'],
    correct: 2,
    explanation:
      'Na fotossíntese, as plantas usam luz, água e gás carbônico para produzir açúcares.'
  }
];

let questionIndex = 0;
let answeredCurrent = false;

function renderQuestion() {
  const question = questions[questionIndex];
  answeredCurrent = false;

  document.getElementById('quizNumber').textContent =
    `QUESTÃO ${questionIndex + 1} DE ${questions.length}`;

  document.getElementById('question').textContent = question.text;
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('nextQuestion').classList.add('hidden');

  const answers = document.getElementById('answers');
  answers.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement('button');

    button.className = 'answer';
    button.textContent = String.fromCharCode(65 + index) + ') ' + option;

    button.addEventListener('click', () => {
      chooseAnswer(index, button);
    });

    answers.appendChild(button);
  });
}

function chooseAnswer(index, chosenButton) {
  if (answeredCurrent) return;

  answeredCurrent = true;

  const question = questions[questionIndex];
  const buttons = document.querySelectorAll('.answer');

  buttons.forEach(button => {
    button.disabled = true;
  });

  answeredQuestions++;

  const feedback = document.getElementById('quizFeedback');

  if (index === question.correct) {
    correctAnswers++;
    xp += 10;
    chosenButton.classList.add('correct');

    feedback.textContent = 'Resposta correta! +10 XP 🎉 ' +
      question.explanation;
    feedback.className = 'feedback green';
  } else {
    chosenButton.classList.add('wrong');
    buttons[question.correct].classList.add('correct');

    feedback.textContent = 'Ainda não! ' + question.explanation;
    feedback.className = 'feedback pink';
  }

  document.getElementById('quizScore').textContent =
    `Pontuação: ${correctAnswers} acerto(s) de ${answeredQuestions} questão(ões).`;

  document.getElementById('nextQuestion').textContent =
    questionIndex === questions.length - 1
      ? 'Recomeçar quiz ↻'
      : 'Próxima questão →';

  document.getElementById('nextQuestion').classList.remove('hidden');

  updateStats();
}

document.getElementById('nextQuestion').addEventListener('click', () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
  } else {
    questionIndex = 0;
    correctAnswers = 0;
    answeredQuestions = 0;

    document.getElementById('quizScore').textContent =
      'Pontuação: 0 acertos';

    updateStats();
  }

  renderQuestion();
});

/* Inicialização */
renderQuestion();
displayTimer();
updateStats();
