/* ===== Dados ===== */

const teams = [
    { name: 'Brasil', flag: '🇧🇷', continent: 'america-sul' },
    { name: 'Argentina', flag: '🇦🇷', continent: 'america-sul' },
    { name: 'Uruguai', flag: '🇺🇾', continent: 'america-sul' },
    { name: 'Colômbia', flag: '🇨🇴', continent: 'america-sul' },
    { name: 'Equador', flag: '🇪🇨', continent: 'america-sul' },
    { name: 'Peru', flag: '🇵🇪', continent: 'america-sul' },
    { name: 'Chile', flag: '🇨🇱', continent: 'america-sul' },
    { name: 'Alemanha', flag: '🇩🇪', continent: 'europa' },
    { name: 'França', flag: '🇫🇷', continent: 'europa' },
    { name: 'Espanha', flag: '🇪🇸', continent: 'europa' },
    { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', continent: 'europa' },
    { name: 'Itália', flag: '🇮🇹', continent: 'europa' },
    { name: 'Portugal', flag: '🇵🇹', continent: 'europa' },
    { name: 'Países Baixos', flag: '🇳🇱', continent: 'europa' },
    { name: 'Bélgica', flag: '🇧🇪', continent: 'europa' },
    { name: 'Croácia', flag: '🇭🇷', continent: 'europa' },
    { name: 'Dinamarca', flag: '🇩🇰', continent: 'europa' },
    { name: 'Suíça', flag: '🇨🇭', continent: 'europa' },
    { name: 'Sérvia', flag: '🇷🇸', continent: 'europa' },
    { name: 'Polônia', flag: '🇵🇱', continent: 'europa' },
    { name: 'EUA', flag: '🇺🇸', continent: 'america-norte' },
    { name: 'México', flag: '🇲🇽', continent: 'america-norte' },
    { name: 'Canadá', flag: '🇨🇦', continent: 'america-norte' },
    { name: 'Costa Rica', flag: '🇨🇷', continent: 'america-norte' },
    { name: 'Nigéria', flag: '🇳🇬', continent: 'africa' },
    { name: 'Senegal', flag: '🇸🇳', continent: 'africa' },
    { name: 'Marrocos', flag: '🇲🇦', continent: 'africa' },
    { name: 'Egito', flag: '🇪🇬', continent: 'africa' },
    { name: 'Gana', flag: '🇬🇭', continent: 'africa' },
    { name: 'Japão', flag: '🇯🇵', continent: 'asia' },
    { name: 'Coreia do Sul', flag: '🇰🇷', continent: 'asia' },
    { name: 'Arábia Saudita', flag: '🇸🇦', continent: 'asia' },
    { name: 'Austrália', flag: '🇦🇺', continent: 'asia' },
];

const championsData = [
    { year: 1930, host: 'Uruguai', champion: 'Uruguai', runnerUp: 'Argentina', score: '4–2' },
    { year: 1934, host: 'Itália', champion: 'Itália', runnerUp: 'Tchecoslováquia', score: '2–1' },
    { year: 1938, host: 'França', champion: 'Itália', runnerUp: 'Hungria', score: '4–2' },
    { year: 1950, host: 'Brasil', champion: 'Uruguai', runnerUp: 'Brasil', score: '2–1' },
    { year: 1954, host: 'Suíça', champion: 'Alemanha Ocidental', runnerUp: 'Hungria', score: '3–2' },
    { year: 1958, host: 'Suécia', champion: 'Brasil', runnerUp: 'Suécia', score: '5–2' },
    { year: 1962, host: 'Chile', champion: 'Brasil', runnerUp: 'Tchecoslováquia', score: '3–1' },
    { year: 1966, host: 'Inglaterra', champion: 'Inglaterra', runnerUp: 'Alemanha Ocidental', score: '4–2' },
    { year: 1970, host: 'México', champion: 'Brasil', runnerUp: 'Itália', score: '4–1' },
    { year: 1974, host: 'Alemanha Ocidental', champion: 'Alemanha Ocidental', runnerUp: 'Países Baixos', score: '2–1' },
    { year: 1978, host: 'Argentina', champion: 'Argentina', runnerUp: 'Países Baixos', score: '3–1' },
    { year: 1982, host: 'Espanha', champion: 'Itália', runnerUp: 'Alemanha Ocidental', score: '3–1' },
    { year: 1986, host: 'México', champion: 'Argentina', runnerUp: 'Alemanha Ocidental', score: '3–2' },
    { year: 1990, host: 'Itália', champion: 'Alemanha Ocidental', runnerUp: 'Argentina', score: '1–0' },
    { year: 1994, host: 'EUA', champion: 'Brasil', runnerUp: 'Itália', score: '0–0 (3–2 p)' },
    { year: 1998, host: 'França', champion: 'França', runnerUp: 'Brasil', score: '3–0' },
    { year: 2002, host: 'Coreia/ Japão', champion: 'Brasil', runnerUp: 'Alemanha', score: '2–0' },
    { year: 2006, host: 'Alemanha', champion: 'Itália', runnerUp: 'França', score: '1–1 (5–3 p)' },
    { year: 2010, host: 'África do Sul', champion: 'Espanha', runnerUp: 'Países Baixos', score: '1–0' },
    { year: 2014, host: 'Brasil', champion: 'Alemanha', runnerUp: 'Argentina', score: '1–0' },
    { year: 2018, host: 'Rússia', champion: 'França', runnerUp: 'Croácia', score: '4–2' },
    { year: 2022, host: 'Catar', champion: 'Argentina', runnerUp: 'França', score: '3–3 (4–2 p)' },
];

const flagMap = {
    'Uruguai': '🇺🇾',
    'Argentina': '🇦🇷',
    'Itália': '🇮🇹',
    'Brasil': '🇧🇷',
    'Alemanha Ocidental': '🇩🇪',
    'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Alemanha': '🇩🇪',
    'França': '🇫🇷',
    'Espanha': '🇪🇸',
    'Tchecoslováquia': '🇨🇿',
    'Hungria': '🇭🇺',
    'Suécia': '🇸🇪',
    'Países Baixos': '🇳🇱',
    'Croácia': '🇭🇷',
};

const quizQuestions = [
    {
        question: 'Qual país venceu a primeira Copa do Mundo em 1930?',
        options: ['Argentina', 'Uruguai', 'Brasil', 'Itália'],
        correct: 1,
    },
    {
        question: 'Qual seleção tem mais títulos de Copa do Mundo?',
        options: ['Alemanha', 'Itália', 'Argentina', 'Brasil'],
        correct: 3,
    },
    {
        question: 'Em que ano o Brasil venceu a Copa do Mundo pela primeira vez?',
        options: ['1950', '1954', '1958', '1962'],
        correct: 2,
    },
    {
        question: 'Qual jogador tem mais gols em Copas do Mundo?',
        options: ['Ronaldo Nazário', 'Pelé', 'Miroslav Klose', 'Lionel Messi'],
        correct: 2,
    },
    {
        question: 'Em que ano a França venceu sua primeira Copa do Mundo?',
        options: ['1994', '1998', '2002', '2006'],
        correct: 1,
    },
    {
        question: 'Qual país sediou a Copa do Mundo de 2014?',
        options: ['Argentina', 'Espanha', 'África do Sul', 'Brasil'],
        correct: 3,
    },
    {
        question: 'Quantas seleções participam da Copa do Mundo desde 1998?',
        options: ['24', '16', '32', '48'],
        correct: 2,
    },
    {
        question: 'Qual foi o placar da final da Copa de 2022 (Argentina x França)?',
        options: ['2–1', '3–3 (4–2 p)', '1–0', '3–0'],
        correct: 1,
    },
    {
        question: 'Qual seleção venceu a Copa do Mundo de 2010?',
        options: ['Países Baixos', 'Alemanha', 'Espanha', 'Itália'],
        correct: 2,
    },
    {
        question: 'Em que país será realizada a Copa do Mundo de 2026?',
        options: ['Catar', 'Rússia', 'EUA, Canadá e México', 'Alemanha'],
        correct: 2,
    },
];

/* ===== Countdown Timer ===== */
function updateCountdown() {
    const target = new Date('June 11, 2026 00:00:00 GMT-3');
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ===== Render Teams ===== */
const teamsGrid = document.getElementById('teamsGrid');

function renderTeams(filter) {
    teamsGrid.innerHTML = '';
    const filtered = filter === 'all' ? teams : teams.filter(t => t.continent === filter);

    filtered.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <span class="flag">${team.flag}</span>
            <div class="name">${team.name}</div>
            <div class="continent">${getContinentName(team.continent)}</div>
        `;
        teamsGrid.appendChild(card);
    });
}

function getContinentName(key) {
    const map = {
        'europa': 'Europa',
        'america-sul': 'América do Sul',
        'america-norte': 'América do Norte',
        'africa': 'África',
        'asia': 'Ásia',
    };
    return map[key] || key;
}

/* ===== Filter Buttons ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderTeams(this.dataset.filter);
    });
});

renderTeams('all');

/* ===== Champions Table ===== */
const championsBody = document.getElementById('championsBody');

championsData.forEach(ch => {
    const tr = document.createElement('tr');
    const championFlag = flagMap[ch.champion] || '';
    const runnerFlag = flagMap[ch.runnerUp] || '';
    tr.innerHTML = `
        <td><strong>${ch.year}</strong></td>
        <td>${ch.host}</td>
        <td><span class="flag-icon">${championFlag}</span> ${ch.champion}</td>
        <td><span class="flag-icon">${runnerFlag}</span> ${ch.runnerUp}</td>
        <td>${ch.score}</td>
    `;
    championsBody.appendChild(tr);
});

/* ===== Quiz ===== */
let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('questionText');
const quizOptions = document.getElementById('quizOptions');
const nextBtn = document.getElementById('nextBtn');
const questionCount = document.getElementById('questionCount');
const quizScore = document.getElementById('quizScore');
const quizProgressBar = document.getElementById('quizProgressBar');
const quizResult = document.getElementById('quizResult');
const finalScore = document.getElementById('finalScore');
const resultStars = document.getElementById('resultStars');

function loadQuestion() {
    answered = false;
    nextBtn.disabled = true;
    quizOptions.innerHTML = '';

    const q = quizQuestions[currentQuestion];
    questionText.textContent = q.question;
    questionCount.textContent = `${currentQuestion + 1} / ${quizQuestions.length}`;
    quizProgressBar.style.width = `${((currentQuestion) / quizQuestions.length) * 100}%`;

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.innerHTML = `<span class="option-letter">${letters[i]}</span> ${opt}`;
        div.dataset.index = i;
        div.addEventListener('click', () => selectOption(i));
        quizOptions.appendChild(div);
    });
}

function selectOption(index) {
    if (answered) return;
    answered = true;

    const options = quizOptions.querySelectorAll('.quiz-option');
    const correct = quizQuestions[currentQuestion].correct;

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === correct) opt.classList.add('correct');
        if (i === index && i !== correct) opt.classList.add('incorrect');
    });

    if (index === correct) score++;
    quizScore.textContent = score;
    nextBtn.disabled = false;
}

function showResult() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.querySelector('.quiz-footer').style.display = 'none';
    quizResult.classList.remove('hidden');

    finalScore.textContent = score;

    const stars = score >= 9 ? '⭐⭐⭐⭐⭐' : score >= 7 ? '⭐⭐⭐⭐' : score >= 5 ? '⭐⭐⭐' : score >= 3 ? '⭐⭐' : '⭐';
    resultStars.textContent = stars;

    quizProgressBar.style.width = '100%';
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

document.getElementById('restartQuizBtn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizScore.textContent = '0';
    quizResult.classList.add('hidden');
    document.getElementById('quizQuestion').style.display = 'block';
    document.querySelector('.quiz-footer').style.display = 'flex';
    loadQuestion();
});

loadQuestion();

/* ===== Mobile Menu Toggle ===== */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
