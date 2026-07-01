// ========== DADOS DOS FILMES ==========
const movies = [
  {
    title: "Homem-Aranha (2002)",
    year: "2002",
    desc: "O clássico que iniciou a trilogia de Sam Raimi com Tobey Maguire.",
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
    alt: "Poster do filme Homem-Aranha 2002",
  },
  {
    title: "O Espetacular Homem-Aranha",
    year: "2012",
    desc: "A versão de Marc Webb estrelada por Andrew Garfield.",
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fSbJuN9kURJQsMSiByFoWjDZKt3.jpg",
    alt: "Poster do filme O Espetacular Homem-Aranha",
  },
  {
    title: "De Volta ao Lar",
    year: "2017",
    desc: "Tom Holland estreia no MCU como o cabeça de teia.",
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iS4fW0EjZ2UGCJUGllrQVYgb6Iq.jpg",
    alt: "Poster do filme Homem-Aranha: De Volta ao Lar",
  },
  {
    title: "Através do Aranhaverso",
    year: "2023",
    desc: "Miles Morales retorna em uma aventura multiversal animada.",
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    alt: "Poster do filme Homem-Aranha: Através do Aranhaverso",
  },
  {
    title: "Sem Volta Para Casa",
    year: "2021",
    desc: "O multiverso se abre e os três Homens-Aranha se encontram.",
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
    alt: "Poster do filme Homem-Aranha: Sem Volta Para Casa",
  },
];

// ========== DADOS DO QUIZ ==========
const questions = [
  {
    question: "Quem criou o Homem-Aranha?",
    options: ["Stan Lee e Steve Ditko", "Bob Kane", "Jack Kirby", "Alan Moore"],
    answer: 0,
  },
  {
    question: "Qual o nome verdadeiro do Homem-Aranha?",
    options: ["Miles Morales", "Peter Parker", "Ben Reilly", "Miguel O'Hara"],
    answer: 1,
  },
  {
    question: "Qual o famoso lema do Homem-Aranha?",
    options: [
      "Com grandes poderes vêm grandes responsabilidades",
      "Eu sou o justiceiro",
      "Sempre em frente",
      "A vingança nunca é plena",
    ],
    answer: 0,
  },
  {
    question: "Em que cidade o Homem-Aranha atua?",
    options: ["Gotham", "Metrópolis", "Nova York", "Chicago"],
    answer: 2,
  },
  {
    question: "Qual material as teias do Homem-Aranha são feitas?",
    options: ["Seda natural", "Nano-tubos", "Um polímero sintético", "Aço"],
    answer: 2,
  },
];

// ========== ESTADO DO QUIZ ==========
let currentQuestion = 0;
let score = 0;
let answered = false;

// ========== DOM ELEMENTOS ==========
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const galleryContainer = document.getElementById("galleryContainer");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizProgress = document.getElementById("quizProgress");
const quizScore = document.getElementById("quizScore");
const quizNext = document.getElementById("quizNext");
const quizResult = document.getElementById("quizResult");

// ========== MENU MOBILE ==========
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("header__menu--open");
});

// Fecha o menu ao clicar em um link
document.querySelectorAll(".header__menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("header__menu--open");
  });
});

// ========== GALERIA DE FILMES ==========
function renderGallery() {
  galleryContainer.innerHTML = movies
    .map(
      (movie) => `
        <div class="gallery__item">
          <img
            src="${movie.img}"
            alt="${movie.alt}"
            loading="lazy"
            onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22450%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22450%22/><text x=%22150%22 y=%22225%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2216%22>${movie.title}</text></svg>'"
          />
          <div class="gallery__item-info">
            <h3>${movie.title}</h3>
            <p>${movie.year} — ${movie.desc}</p>
          </div>
        </div>
      `
    )
    .join("");
}

// ========== QUIZ ==========
function loadQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  quizQuestion.textContent = q.question;
  quizProgress.textContent = `Questão ${currentQuestion + 1} de ${questions.length}`;
  quizScore.textContent = `Acertos: ${score}`;
  quizNext.style.display = "none";
  quizResult.innerHTML = "";

  quizOptions.innerHTML = q.options
    .map(
      (opt, i) =>
        `<button class="quiz__option" data-index="${i}">${opt}</button>`
    )
    .join("");

  document.querySelectorAll(".quiz__option").forEach((btn) => {
    btn.addEventListener("click", handleAnswer);
  });
}

function handleAnswer(e) {
  if (answered) return;
  answered = true;

  const selected = e.currentTarget;
  const index = parseInt(selected.dataset.index);
  const correct = questions[currentQuestion].answer;

  // Desabilita todos os botões
  document.querySelectorAll(".quiz__option").forEach((btn) => {
    btn.disabled = true;
  });

  // Marca o correto e o errado
  document.querySelectorAll(".quiz__option").forEach((btn, i) => {
    if (i === correct) {
      btn.classList.add("quiz__option--correct");
    } else if (i === index && index !== correct) {
      btn.classList.add("quiz__option--wrong");
    }
  });

  if (index === correct) {
    score++;
    quizScore.textContent = `Acertos: ${score}`;
  }

  quizNext.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizQuestion.textContent = "";
  quizOptions.innerHTML = "";
  quizNext.style.display = "none";
  quizProgress.textContent = "Quiz concluído!";
  quizScore.textContent = `Acertos: ${score} de ${questions.length}`;

  const percent = (score / questions.length) * 100;
  let message, emoji;

  if (percent === 100) {
    message = "Você é um verdadeiro fã! Conhece tudo sobre o cabeça de teia!";
    emoji = "🏆";
  } else if (percent >= 60) {
    message = "Mandou bem! Você conhece bem o Homem-Aranha.";
    emoji = "🕷️";
  } else if (percent >= 40) {
    message = "Não foi mal, mas pode melhorar. Hora de maratonar os filmes!";
    emoji = "📺";
  } else {
    message = "Precisa estudar mais sobre o amigão da vizinhança!";
    emoji = "📚";
  }

  quizResult.innerHTML = `
    <h3>${emoji} Resultado Final</h3>
    <p>${message}</p>
    <button class="btn btn--primary" id="quizRestart">Tentar Novamente</button>
  `;

  document.getElementById("quizRestart").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  quizResult.innerHTML = "";
  loadQuestion();
}

quizNext.addEventListener("click", nextQuestion);

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  loadQuestion();
});
