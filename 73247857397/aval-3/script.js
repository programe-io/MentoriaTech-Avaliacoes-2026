// ==========================================
// 1. Canvas de Brasas Flutuantes (Ember Animation)
// ==========================================
const canvas = document.getElementById('ember-canvas');
const ctx = canvas.getContext('2d');

let embers = [];
const emberCount = 45;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Ember {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.radius = Math.random() * 2.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -(Math.random() * 1.2 + 0.4);
    this.alpha = Math.random() * 0.8 + 0.2;
    this.hue = Math.random() * 30 + 15; // Laranja/Dourado
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.002;

    if (this.y < -10 || this.alpha <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < emberCount; i++) {
  embers.push(new Ember());
}

function animateEmbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  embers.forEach(e => {
    e.update();
    e.draw();
  });
  requestAnimationFrame(animateEmbers);
}

animateEmbers();

// ==========================================
// 2. Base de Dados de Dragões & Codex
// ==========================================
const dragonsData = [
  {
    name: "Banguela",
    species: "Fúria da Noite",
    class: "Relâmpago",
    icon: "🐉",
    rarity: "Lendário",
    description: "O mais rápido e inteligente de todos os dragões. Capaz de disparar cargas de plasma de alta precisão."
  },
  {
    name: "Tempestade",
    species: "Nadder Mortal",
    class: "Rastreadora",
    icon: "🦅",
    rarity: "Raro",
    description: "Possui espinhos caudais afiados que pode lançar como projéteis e um sopro de fogo de magnésio intenso."
  },
  {
    name: "Dente de Anzóis",
    species: "Pesadelo Monstruoso",
    class: "Incendiária",
    icon: "🔥",
    rarity: "Raro",
    description: "Conhecido por se incendiar por completo durante o combate. Tem uma personalidade orgulhosa e agressiva."
  },
  {
    name: "Batatão",
    species: "Gronckle",
    class: "Rocha",
    icon: "🪨",
    rarity: "Comum",
    description: "Alimenta-se de pedras para fundir e expelir o lendário Ferro Gronckle. Extremamente dócil e leal."
  },
  {
    name: "Bafo e Eructo",
    species: "Zíper Arrepiante",
    class: "Mortal",
    icon: "🐍",
    rarity: "Raro",
    description: "Uma cabeça produz gás verde inflamável enquanto a outra solta a faísca para detoná-lo."
  },
  {
    name: "Transformassa",
    species: "Transformassa",
    class: "Mortal",
    icon: "🦎",
    rarity: "Épico",
    description: "Mestre da camuflagem. Capaz de mudar a cor da pele para se misturar a qualquer ambiente e cuspir ácido verde."
  },
  {
    name: "Tamboríovel",
    species: "Tamboríovel",
    class: "Marinha",
    icon: "🐋",
    rarity: "Épico",
    description: "Dragão aquático que dispara ondas de choque sônicas capazes de afundar navios de guerra inteiros."
  },
  {
    name: "Cortador de Chuva",
    species: "Cortador de Chuva",
    class: "Rastreadora",
    icon: "🌧️",
    rarity: "Comum",
    description: "Adora tempestades. Sua barbatana dorsal afiada permite cortar os ventos com extrema agilidade."
  }
];

const dragonGrid = document.getElementById('dragon-grid');
const searchInput = document.getElementById('search-input');
const filterTabs = document.querySelectorAll('.filter-tab');

let currentFilter = 'all';

function renderDragons() {
  dragonGrid.innerHTML = '';
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = dragonsData.filter(d => {
    const matchesFilter = currentFilter === 'all' || d.class === currentFilter;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm) || d.species.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    dragonGrid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">Nenhum dragão encontrado com esses critérios.</p>';
    return;
  }

  filtered.forEach(dragon => {
    const card = document.createElement('div');
    card.className = 'dragon-card';
    card.innerHTML = `
      <div>
        <div class="dragon-card-header">
          <span class="dragon-icon">${dragon.icon}</span>
          <span class="dragon-class">${dragon.class}</span>
        </div>
        <h3 class="dragon-name">${dragon.name}</h3>
        <p class="dragon-species">${dragon.species} (${dragon.rarity})</p>
      </div>
      <button class="card-btn" onclick="openDragonModal('${dragon.name}')">Ver Detalhes</button>
    `;
    dragonGrid.appendChild(card);
  });
}

searchInput.addEventListener('input', renderDragons);

filterTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    filterTabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.class;
    renderDragons();
  });
});

renderDragons();

// Modal de Detalhes
const modal = document.getElementById('dragon-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

window.openDragonModal = function(name) {
  const dragon = dragonsData.find(d => d.name === name);
  if (!dragon) return;

  modalBody.innerHTML = `
    <div style="font-size: 3rem; text-align: center; margin-bottom: 0.5rem;">${dragon.icon}</div>
    <h2 style="font-family: var(--font-header); color: var(--gold); text-align: center; font-size: 1.6rem;">${dragon.name}</h2>
    <p style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${dragon.species} &bull; ${dragon.rarity}</p>
    <p style="line-height: 1.6; color: var(--text-main);">${dragon.description}</p>
  `;
  modal.classList.remove('hidden');
};

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// ==========================================
// 3. Calculadora da Economia de Berk
// ==========================================
const woodDragons = document.getElementById('wood-dragons');
const woodAvgRate = document.getElementById('wood-avg-rate');
const fishDragons = document.getElementById('fish-dragons');
const fishAvgRate = document.getElementById('fish-avg-rate');
const collectionHours = document.getElementById('collection-hours');

const resWood = document.getElementById('res-wood');
const resFish = document.getElementById('res-fish');

function calculateResources() {
  const hours = parseFloat(collectionHours.value) || 0;
  
  const totalWood = (parseFloat(woodDragons.value) || 0) * (parseFloat(woodAvgRate.value) || 0) * hours;
  const totalFish = (parseFloat(fishDragons.value) || 0) * (parseFloat(fishAvgRate.value) || 0) * hours;

  resWood.textContent = totalWood.toLocaleString('pt-BR');
  resFish.textContent = totalFish.toLocaleString('pt-BR');
}

[woodDragons, woodAvgRate, fishDragons, fishAvgRate, collectionHours].forEach(input => {
  input.addEventListener('input', calculateResources);
});

calculateResources();

// ==========================================
// 4. Quiz Viking
// ==========================================
const quizQuestions = [
  {
    question: "Qual é a classe oficial do Fúria da Noite (Banguela)?",
    options: ["Rastreadora", "Relâmpago", "Incendiária", "Mortal"],
    correct: 1
  },
  {
    question: "Qual recurso é utilizado para alimentar e evoluir dragões no jogo?",
    options: ["Pedra de Ferro", "Madeira", "Peixe", "Âmbar Viking"],
    correct: 2
  },
  {
    question: "Qual dragão é famoso por fundir e produzir o Ferro Gronckle?",
    options: ["Batatão", "Tempestade", "Transformassa", "Dente de Anzóis"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;

const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizProgressEl = document.getElementById('quiz-progress');
const quizFeedbackEl = document.getElementById('quiz-feedback');

function renderQuiz() {
  quizFeedbackEl.classList.add('hidden');
  const q = quizQuestions[currentQuestion];
  quizProgressEl.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
  quizQuestionEl.textContent = q.question;
  quizOptionsEl.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(idx));
    quizOptionsEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const q = quizQuestions[currentQuestion];
  if (index === q.correct) {
    score++;
    quizFeedbackEl.textContent = "✅ Correto! Pelas barbas de Odin!";
    quizFeedbackEl.style.color = "#2ecc71";
  } else {
    quizFeedbackEl.textContent = `❌ Incorreto! A resposta certa era: ${q.options[q.correct]}`;
    quizFeedbackEl.style.color = "#e74c3c";
  }
  quizFeedbackEl.classList.remove('hidden');

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      renderQuiz();
    } else {
      showQuizResults();
    }
  }, 1800);
}

function showQuizResults() {
  quizProgressEl.textContent = "Teste Concluído!";
  quizQuestionEl.textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
  quizOptionsEl.innerHTML = `
    <button class="btn btn-primary" onclick="resetQuiz()">Tentar Novamente 🔄</button>
  `;
  quizFeedbackEl.classList.add('hidden');
}

window.resetQuiz = function() {
  currentQuestion = 0;
  score = 0;
  renderQuiz();
};

renderQuiz()