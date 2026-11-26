// MATEMÁTICA & HISTÓRIA
// JavaScript completo com perfis, favoritos, filtros, linha do tempo e quiz.

const people = [
  {
    id: 1,
    name: "Pitágoras",
    years: "c. 570 a.C. – c. 495 a.C.",
    period: "antiguidade",
    label: "Antiguidade",
    initials: "P",
    bio: "Filósofo e matemático grego associado à escola pitagórica. Seus seguidores estudavam relações numéricas, geometria, música e a ideia de que os números ajudam a compreender o mundo.",
    contribution: "O teorema de Pitágoras relaciona os lados de um triângulo retângulo: a² + b² = c². A relação já era conhecida por povos anteriores, mas ganhou destaque na tradição pitagórica."
  },
  {
    id: 2,
    name: "Euclides",
    years: "c. 300 a.C.",
    period: "antiguidade",
    label: "Antiguidade",
    initials: "E",
    bio: "Matemático que viveu em Alexandria, no Egito. É frequentemente chamado de pai da geometria por organizar conhecimentos matemáticos de forma lógica e sistemática.",
    contribution: "Sua obra Elementos reuniu definições, postulados e demonstrações que influenciaram o ensino da geometria por muitos séculos."
  },
  {
    id: 3,
    name: "Arquimedes",
    years: "c. 287 a.C. – 212 a.C.",
    period: "antiguidade",
    label: "Antiguidade",
    initials: "A",
    bio: "Matemático, físico e inventor da Grécia Antiga. Estudou áreas, volumes, equilíbrio e o comportamento dos corpos.",
    contribution: "Desenvolveu métodos para calcular áreas e volumes, fez aproximações de π e formulou o princípio de Arquimedes, importante para a hidrostática."
  },
  {
    id: 4,
    name: "Hipátia de Alexandria",
    years: "c. 355 – 415",
    period: "antiguidade",
    label: "Antiguidade",
    initials: "H",
    bio: "Filósofa, astrônoma e matemática que ensinou em Alexandria. É uma das mulheres mais conhecidas da história da ciência antiga.",
    contribution: "Comentou e ensinou obras matemáticas e astronômicas da Antiguidade, contribuindo para a preservação e transmissão desse conhecimento."
  },
  {
    id: 5,
    name: "Al-Khwarizmi",
    years: "c. 780 – c. 850",
    period: "medieval",
    label: "Idade Média",
    initials: "K",
    bio: "Matemático persa que trabalhou em Bagdá. Seus livros ajudaram a difundir métodos de cálculo no mundo islâmico e, posteriormente, na Europa.",
    contribution: "Sua obra sobre equações ajudou a estabelecer a álgebra como área de estudo. A palavra algoritmo deriva da forma latinizada de seu nome."
  },
  {
    id: 6,
    name: "Fibonacci",
    years: "c. 1170 – c. 1250",
    period: "medieval",
    label: "Idade Média",
    initials: "F",
    bio: "Leonardo de Pisa, conhecido como Fibonacci, foi um matemático italiano que conheceu sistemas de numeração usados em diferentes regiões.",
    contribution: "Seu livro Liber Abaci contribuiu para a divulgação na Europa do sistema de numeração indo-arábico. Também ficou associado à sequência de Fibonacci."
  },
  {
    id: 7,
    name: "Madhava de Sangamagrama",
    years: "c. 1340 – c. 1425",
    period: "medieval",
    label: "Idade Média",
    initials: "M",
    bio: "Matemático indiano associado à escola de Kerala. Seus trabalhos envolveram séries infinitas e aproximações de funções trigonométricas.",
    contribution: "É reconhecido por resultados pioneiros envolvendo séries para seno, cosseno e π, anteriores a desenvolvimentos europeus semelhantes."
  },
  {
    id: 8,
    name: "René Descartes",
    years: "1596 – 1650",
    period: "moderna",
    label: "Idade Moderna",
    initials: "D",
    bio: "Filósofo e matemático francês que buscou unir a álgebra à geometria. Sua abordagem permitiu representar relações geométricas por meio de equações.",
    contribution: "Contribuiu para o desenvolvimento da geometria analítica, que relaciona pontos e figuras a coordenadas e equações. O plano cartesiano leva seu nome."
  },
  {
    id: 9,
    name: "Pierre de Fermat",
    years: "1607 – 1665",
    period: "moderna",
    label: "Idade Moderna",
    initials: "F",
    bio: "Matemático francês que trabalhou em teoria dos números, probabilidade e geometria. Embora tivesse outra profissão, realizou contribuições matemáticas importantes.",
    contribution: "Formulou o famoso Último Teorema de Fermat e contribuiu para o desenvolvimento inicial da teoria das probabilidades."
  },
  {
    id: 10,
    name: "Isaac Newton",
    years: "1643 – 1727",
    period: "moderna",
    label: "Idade Moderna",
    initials: "N",
    bio: "Cientista inglês que fez contribuições fundamentais à física e à matemática. Seus estudos procuravam descrever movimentos e mudanças na natureza.",
    contribution: "Desenvolveu, independentemente de Leibniz, métodos do cálculo diferencial e integral, ferramentas essenciais para estudar variações e acumulações."
  },
  {
    id: 11,
    name: "Leonhard Euler",
    years: "1707 – 1783",
    period: "moderna",
    label: "Idade Moderna",
    initials: "E",
    bio: "Matemático suíço extremamente produtivo, com trabalhos em análise, teoria dos números, mecânica e grafos.",
    contribution: "Ajudou a desenvolver a notação matemática moderna e apresentou resultados fundamentais em diversas áreas, incluindo a relação de Euler."
  },
  {
    id: 12,
    name: "Ada Lovelace",
    years: "1815 – 1852",
    period: "contemporanea",
    label: "Época Contemporânea",
    initials: "L",
    bio: "Matemática e escritora britânica que estudou a Máquina Analítica de Charles Babbage. Percebeu que uma máquina poderia manipular símbolos além de números.",
    contribution: "Escreveu um algoritmo destinado à Máquina Analítica e é frequentemente lembrada como pioneira da programação."
  },
  {
    id: 13,
    name: "Emmy Noether",
    years: "1882 – 1935",
    period: "contemporanea",
    label: "Época Contemporânea",
    initials: "N",
    bio: "Matemática alemã que transformou a álgebra abstrata e fez contribuições profundas à física teórica.",
    contribution: "O teorema de Noether relaciona simetrias de sistemas físicos a leis de conservação e é fundamental na física moderna."
  },
  {
    id: 14,
    name: "Katherine Johnson",
    years: "1918 – 2020",
    period: "contemporanea",
    label: "Época Contemporânea",
    initials: "K",
    bio: "Matemática norte-americana cujos cálculos foram importantes para missões espaciais da NASA, incluindo trajetórias de voos tripulados.",
    contribution: "Realizou cálculos de trajetória e verificação matemática que apoiaram missões espaciais, contribuindo para a exploração humana do espaço."
  }
];

const events = [
  {
    year: "c. 300 a.C.",
    era: "antiguidade",
    title: "Euclides organiza a geometria",
    desc: "A obra Elementos apresenta definições, postulados e demonstrações."
  },
  {
    year: "c. 250 a.C.",
    era: "antiguidade",
    title: "Arquimedes amplia os estudos de áreas e volumes",
    desc: "Seus métodos aproximam a matemática de problemas físicos e geométricos."
  },
  {
    year: "Século IV–V",
    era: "antiguidade",
    title: "Hipátia ensina matemática em Alexandria",
    desc: "Seus comentários e aulas ajudam a transmitir conhecimentos antigos."
  },
  {
    year: "Século IX",
    era: "medieval",
    title: "A álgebra ganha novos caminhos",
    desc: "Al-Khwarizmi sistematiza métodos para resolver equações."
  },
  {
    year: "Século XIII",
    era: "medieval",
    title: "Liber Abaci é publicado",
    desc: "Fibonacci ajuda a divulgar o sistema de numeração indo-arábico na Europa."
  },
  {
    year: "Séculos XIV–XV",
    era: "medieval",
    title: "A escola de Kerala desenvolve séries",
    desc: "Madhava e estudiosos associados avançam em resultados de análise matemática."
  },
  {
    year: "Século XVII",
    era: "moderna",
    title: "A geometria encontra a álgebra",
    desc: "Descartes e Fermat contribuem para o desenvolvimento da geometria analítica."
  },
  {
    year: "Século XVII",
    era: "moderna",
    title: "O cálculo transforma a ciência",
    desc: "Newton e Leibniz desenvolvem métodos fundamentais do cálculo."
  },
  {
    year: "Século XVIII",
    era: "moderna",
    title: "Euler amplia diversas áreas",
    desc: "Seus trabalhos influenciam análise, teoria dos números e grafos."
  },
  {
    year: "Século XIX",
    era: "contemporanea",
    title: "Ada Lovelace escreve um algoritmo",
    desc: "Suas notas sobre a Máquina Analítica antecipam ideias da computação."
  },
  {
    year: "Século XX",
    era: "contemporanea",
    title: "Emmy Noether transforma a matemática e a física",
    desc: "Seu teorema estabelece uma ligação profunda entre simetrias e conservação."
  },
  {
    year: "Século XX",
    era: "contemporanea",
    title: "Katherine Johnson contribui para a exploração espacial",
    desc: "Seus cálculos apoiam trajetórias de missões espaciais."
  }
];

// BANCO DE PERGUNTAS DO QUIZ

const questionBank = [
  {
    q: "Qual matemático é tradicionalmente associado ao teorema dos triângulos retângulos?",
    a: ["Euclides", "Pitágoras", "Fibonacci", "Newton"],
    correct: 1,
    explain: "Pitágoras é tradicionalmente associado ao teorema a² + b² = c²."
  },
  {
    q: "Quem escreveu a obra Elementos, referência da geometria?",
    a: ["Arquimedes", "Ada Lovelace", "Euclides", "Descartes"],
    correct: 2,
    explain: "Euclides organizou conhecimentos geométricos na obra Elementos."
  },
  {
    q: "De qual matemático deriva a palavra algoritmo?",
    a: ["Al-Khwarizmi", "Newton", "Fibonacci", "Pitágoras"],
    correct: 0,
    explain: "A palavra algoritmo deriva da forma latinizada do nome Al-Khwarizmi."
  },
  {
    q: "Quem é frequentemente lembrada como pioneira da programação?",
    a: ["Ada Lovelace", "Euclides", "Descartes", "Arquimedes"],
    correct: 0,
    explain: "Ada Lovelace escreveu um algoritmo para a Máquina Analítica."
  },
  {
    q: "Quem desenvolveu métodos do cálculo independentemente de Leibniz?",
    a: ["Fibonacci", "Newton", "Euclides", "Al-Khwarizmi"],
    correct: 1,
    explain: "Isaac Newton desenvolveu métodos do cálculo, assim como Leibniz, de forma independente."
  },
  {
    q: "Qual matemática ensinou e estudou em Alexandria na Antiguidade?",
    a: ["Emmy Noether", "Hipátia", "Katherine Johnson", "Ada Lovelace"],
    correct: 1,
    explain: "Hipátia foi uma matemática e filósofa ligada à cidade de Alexandria."
  },
  {
    q: "Qual obra de Fibonacci ajudou a divulgar a numeração indo-arábica na Europa?",
    a: ["Elementos", "Principia", "Liber Abaci", "Almagesto"],
    correct: 2,
    explain: "Liber Abaci foi publicado por Fibonacci no início do século XIII."
  },
  {
    q: "O plano cartesiano está associado ao nome de qual pensador?",
    a: ["René Descartes", "Arquimedes", "Euler", "Fermat"],
    correct: 0,
    explain: "O plano cartesiano leva o nome de René Descartes."
  },
  {
    q: "Qual matemático é conhecido por contribuições à teoria dos números e ao Último Teorema?",
    a: ["Pierre de Fermat", "Euclides", "Madhava", "Newton"],
    correct: 0,
    explain: "Pierre de Fermat formulou o problema conhecido como Último Teorema de Fermat."
  },
  {
    q: "Qual matemático suíço contribuiu para a notação e a relação de Euler?",
    a: ["Fibonacci", "Leonhard Euler", "Pitágoras", "Al-Khwarizmi"],
    correct: 1,
    explain: "Leonhard Euler contribuiu para várias áreas e para a notação matemática."
  },
  {
    q: "O teorema de Noether conecta quais ideias?",
    a: ["Cores e formas", "Simetrias e leis de conservação", "Frações e porcentagens", "Ângulos e temperatura"],
    correct: 1,
    explain: "O teorema de Noether relaciona simetrias a leis de conservação na física."
  },
  {
    q: "Katherine Johnson ficou conhecida por seus cálculos ligados a qual área?",
    a: ["Navegação marítima antiga", "Missões espaciais", "Música barroca", "Arquitetura romana"],
    correct: 1,
    explain: "Seus cálculos contribuíram para trajetórias de missões espaciais da NASA."
  },
  {
    q: "Qual civilização é frequentemente associada ao desenvolvimento de conhecimentos geométricos usados em medições de terras?",
    a: ["Egípcia", "Viking", "Inca apenas", "Fenícia apenas"],
    correct: 0,
    explain: "No Egito antigo, conhecimentos geométricos eram usados em medições e construções."
  },
  {
    q: "Qual número é representado pela letra grega π?",
    a: ["A razão entre a circunferência e o diâmetro", "A raiz de 2", "O dobro de 10", "A soma dos ângulos de qualquer polígono"],
    correct: 0,
    explain: "π é a razão entre o comprimento de uma circunferência e seu diâmetro."
  },
  {
    q: "A sequência de Fibonacci começa tradicionalmente com quais números?",
    a: ["2 e 3", "1 e 1", "3 e 5", "0 e 2"],
    correct: 1,
    explain: "Uma forma comum da sequência começa com 1, 1, 2, 3, 5, 8..."
  },
  {
    q: "Qual área estuda as propriedades dos números inteiros?",
    a: ["Geometria", "Teoria dos números", "Trigonometria", "Estatística"],
    correct: 1,
    explain: "A teoria dos números investiga propriedades dos números inteiros."
  },
  {
    q: "Qual é o resultado de 9 × 8?",
    a: ["64", "72", "81", "98"],
    correct: 1,
    explain: "9 vezes 8 é igual a 72."
  },
  {
    q: "Quantos graus tem a soma dos ângulos internos de um triângulo plano?",
    a: ["90°", "180°", "270°", "360°"],
    correct: 1,
    explain: "A soma dos ângulos internos de um triângulo plano é 180°."
  },
  {
    q: "Qual matemático indiano é associado à escola de Kerala e a séries infinitas?",
    a: ["Madhava de Sangamagrama", "Euclides", "Descartes", "Fermat"],
    correct: 0,
    explain: "Madhava é associado a resultados pioneiros envolvendo séries infinitas."
  },
  {
    q: "Qual cientista formulou um princípio importante sobre o empuxo em fluidos?",
    a: ["Arquimedes", "Ada Lovelace", "Fibonacci", "Noether"],
    correct: 0,
    explain: "O princípio de Arquimedes descreve o empuxo exercido por um fluido."
  }
];

// ELEMENTOS DA PÁGINA

const $ = selector => document.querySelector(selector);

const grid = $("#peopleGrid");
const modal = $("#detailModal");

let favorites = new Set();
let currentPerson = null;
let showOnlyFavorites = false;

let quizQuestions = [];
let questionIndex = 0;
let score = 0;
let answered = false;

let lastFocusedElement = null;

// MOSTRAR OS MATEMÁTICOS

function renderPeople() {
  const term = $("#searchInput").value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const period = $("#periodFilter").value;

  const filtered = people.filter(person => {
    const matchesPeriod =
      period === "todos" || person.period === period;

    const matchesTerm = [
      person.name,
      person.years,
      person.bio,
      person.contribution,
      person.label
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(term);

    const matchesFavorite =
      !showOnlyFavorites || favorites.has(person.id);

    return matchesPeriod && matchesTerm && matchesFavorite;
  });

  grid.innerHTML = filtered.map(person => `
    <article class="person-card">

      <div class="avatar">${person.initials}</div>

      <h3>${person.name}</h3>

      <span class="years">${person.years}</span>

      <p>${person.contribution}</p>

      <div class="card-bottom">

        <span class="period-pill">${person.label}</span>

        <div>
          <button
            class="favorite-btn ${favorites.has(person.id) ? "saved" : ""}"
            data-fav="${person.id}"
            type="button"
            aria-label="Favoritar ${person.name}"
            aria-pressed="${favorites.has(person.id)}"
          >
            ${favorites.has(person.id) ? "★" : "☆"}
          </button>

          <button
            class="detail-btn"
            data-detail="${person.id}"
            type="button"
          >
            Ver perfil →
          </button>
        </div>

      </div>
    </article>
  `).join("");

  $("#resultCount").textContent =
    `${filtered.length} ${filtered.length === 1 ? "resultado" : "resultados"}`;

  $("#emptyMessage").hidden = filtered.length !== 0;

  $("#favoritesFilter").textContent =
    showOnlyFavorites ? "★ Ver todos" : "☆ Ver favoritos";

  $("#favoritesFilter").setAttribute(
    "aria-pressed",
    String(showOnlyFavorites)
  );
}

// LINHA DO TEMPO

function renderTimeline(era = "todos") {
  const list = events.filter(event => {
    return era === "todos" || event.era === era;
  });

  $("#timelineItems").innerHTML = list.map(event => `
    <article class="timeline-item">
      <strong>${event.year}</strong>
      <h3>${event.title}</h3>
      <p>${event.desc}</p>
    </article>
  `).join("");

  document.querySelectorAll(".timeline-tab").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.era === era
    );

    button.setAttribute(
      "aria-pressed",
      String(button.dataset.era === era)
    );
  });
}

// FAVORITOS

function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }

  renderPeople();

  if (currentPerson === id) {
    updateFavoriteButton();
  }
}

function updateFavoriteButton() {
  const saved = favorites.has(currentPerson);

  $("#modalFavorite").textContent = saved
    ? "★ Remover dos favoritos"
    : "☆ Adicionar aos favoritos";

  $("#modalFavorite").setAttribute(
    "aria-pressed",
    String(saved)
  );
}

// ABRIR PERFIL DO MATEMÁTICO

function openDetails(id, trigger) {
  const person = people.find(item => item.id === id);

  if (!person) {
    console.error("Matemático não encontrado:", id);
    return;
  }

  currentPerson = id;
  lastFocusedElement = trigger || document.activeElement;

  // Preenche os dados do perfil.
  $("#modalName").textContent = person.name;
  $("#modalYears").textContent = person.years;
  $("#modalPeriod").textContent = person.label;
  $("#modalAvatar").textContent = person.initials;
  $("#modalBio").textContent = person.bio;
  $("#modalContribution").textContent = person.contribution;

  updateFavoriteButton();

  // Exibe a janela do perfil.
  modal.classList.add("open");
  modal.style.display = "grid";
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  $("#closeModal").focus();
}

// FECHAR PERFIL

function closeDetails() {
  if (!modal.classList.contains("open")) {
    return;
  }

  modal.classList.remove("open");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus === "function"
  ) {
    lastFocusedElement.focus();
  }
}

// EMBARALHAR PERGUNTAS E ALTERNATIVAS

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// INICIAR NOVO QUIZ

function startNewQuiz() {
  quizQuestions = shuffle(questionBank)
    .slice(0, 10)
    .map(question => {

      const options = question.a.map((text, index) => ({
        text: text,
        correct: index === question.correct
      }));

      const shuffledOptions = shuffle(options);

      return {
        ...question,
        shuffledOptions: shuffledOptions,
        correctIndex: shuffledOptions.findIndex(
          option => option.correct
        )
      };
    });

  questionIndex = 0;
  score = 0;
  answered = false;

  renderQuestion();
}

// MOSTRAR PERGUNTA

function renderQuestion() {
  const question = quizQuestions[questionIndex];

  answered = false;

  $("#questionProgress").textContent =
    `Pergunta ${questionIndex + 1} de ${quizQuestions.length}`;

  $("#scoreLabel").textContent = `Acertos: ${score}`;

  $("#progressBar").style.width =
    `${((questionIndex + 1) / quizQuestions.length) * 100}%`;

  $("#questionText").textContent = question.q;

  $("#feedback").textContent = "";

  $("#nextQuestion").disabled = true;

  $("#nextQuestion").textContent =
    questionIndex === quizQuestions.length - 1
      ? "Ver resultado →"
      : "Próxima pergunta →";

  $("#answers").innerHTML = question.shuffledOptions
    .map((option, index) => `
      <button
        class="answer-btn"
        type="button"
        data-answer="${index}"
      >
        ${String.fromCharCode(65 + index)}. ${option.text}
      </button>
    `)
    .join("");
}

// ESCOLHER RESPOSTA

function chooseAnswer(index) {
  if (answered) return;

  answered = true;

  const question = quizQuestions[questionIndex];

  const isCorrect = index === question.correctIndex;

  document.querySelectorAll(".answer-btn").forEach((button, i) => {
    button.disabled = true;

    if (i === question.correctIndex) {
      button.classList.add("correct");
    } else if (i === index) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    score++;

    $("#feedback").textContent =
      `Correto! ${question.explain}`;
  } else {
    $("#feedback").textContent =
      `Não foi dessa vez. ${question.explain}`;
  }

  $("#scoreLabel").textContent = `Acertos: ${score}`;

  $("#nextQuestion").disabled = false;
}

// PRÓXIMA PERGUNTA OU RESULTADO

function nextQuestion() {
  if (!answered) return;

  if (questionIndex < quizQuestions.length - 1) {
    questionIndex++;

    renderQuestion();

    return;
  }

  $("#questionProgress").textContent = "Quiz concluído";

  $("#progressBar").style.width = "100%";

  $("#questionText").textContent =
    `Você acertou ${score} de ${quizQuestions.length} perguntas!`;

  $("#answers").innerHTML = `
    <p>
      ${
        score === quizQuestions.length
          ? "Excelente! Você acertou todas!"
          : score >= 7
            ? "Muito bem! Você conhece bastante sobre matemática."
            : score >= 4
              ? "Bom trabalho! Continue aprendendo."
              : "Continue explorando os perfis e tente novamente!"
      }
    </p>
  `;

  $("#feedback").textContent =
    "Clique em “Novo quiz / sortear perguntas” para receber outra combinação.";

  $("#nextQuestion").disabled = true;
  $("#nextQuestion").textContent = "Quiz concluído";
}

// EVENTOS DOS BOTÕES DOS MATEMÁTICOS
// Delegação de eventos: funciona mesmo após pesquisar ou filtrar os cartões.

grid.addEventListener("click", event => {
  const detailButton = event.target.closest("[data-detail]");
  const favoriteButton = event.target.closest("[data-fav]");

  if (detailButton) {
    event.preventDefault();

    const id = Number(detailButton.dataset.detail);

    openDetails(id, detailButton);

    return;
  }

  if (favoriteButton) {
    event.preventDefault();

    const id = Number(favoriteButton.dataset.fav);

    toggleFavorite(id);
  }
});

// PESQUISA E FILTROS

$("#searchInput").addEventListener("input", renderPeople);

$("#periodFilter").addEventListener("change", renderPeople);

$("#favoritesFilter").addEventListener("click", () => {
  showOnlyFavorites = !showOnlyFavorites;

  renderPeople();
});

$("#clearFilters").addEventListener("click", () => {
  $("#searchInput").value = "";
  $("#periodFilter").value = "todos";

  showOnlyFavorites = false;

  renderPeople();
});

// FILTROS DA LINHA DO TEMPO

document.querySelectorAll(".timeline-tab").forEach(button => {
  button.addEventListener("click", () => {
    renderTimeline(button.dataset.era);
  });
});

// FECHAR A JANELA DO PERFIL

$("#closeModal").addEventListener("click", closeDetails);

modal.addEventListener("click", event => {
  if (event.target.closest("[data-close='true']")) {
    closeDetails();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeDetails();
  }
});

// FAVORITO DENTRO DO PERFIL

$("#modalFavorite").addEventListener("click", () => {
  if (currentPerson !== null) {
    toggleFavorite(currentPerson);
  }
});

// EVENTOS DO QUIZ

$("#answers").addEventListener("click", event => {
  const answerButton = event.target.closest("button[data-answer]");

  if (answerButton) {
    chooseAnswer(Number(answerButton.dataset.answer));
  }
});

$("#nextQuestion").addEventListener("click", nextQuestion);

$("#restartQuiz").addEventListener("click", startNewQuiz);

// ALTERNAR TEMA CLARO E ESCURO

$("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");

  $("#themeBtn").textContent = dark ? "☀" : "☾";

  $("#themeBtn").title = dark
    ? "Ativar tema claro"
    : "Ativar tema escuro";

  $("#themeBtn").setAttribute(
    "aria-label",
    dark ? "Ativar tema claro" : "Ativar tema escuro"
  );
});

// MENU PARA CELULAR

$("#menuBtn").addEventListener("click", () => {
  const isOpen = $("#navMenu").classList.toggle("open");

  $("#menuBtn").setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  $("#menuBtn").textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("#navMenu").classList.remove("open");

    $("#menuBtn").setAttribute("aria-expanded", "false");

    $("#menuBtn").textContent = "☰";
  });
});

// INICIALIZAÇÃO DO SITE

$("#peopleCount").textContent = people.length;

renderPeople();

renderTimeline();

startNewQuiz();