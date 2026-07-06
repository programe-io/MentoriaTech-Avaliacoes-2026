/* ===== DATA ===== */
const dragons = [
    { name: 'Vhagar', emoji: '🐲', desc: 'O maior dragão vivo, montado por Aemond Targaryen.', owner: 'Aemond Targaryen' },
    { name: 'Caraxes', emoji: '🐉', desc: 'O temido dragão do Príncipe Daemon.', owner: 'Daemon Targaryen' },
    { name: 'Syrax', emoji: '🦅', desc: 'A dragão dourado de Rhaenyra Targaryen.', owner: 'Rhaenyra Targaryen' },
    { name: 'Sunfyre', emoji: '🐲', desc: 'Dourado e majestoso, montado por Aegon II.', owner: 'Aegon II Targaryen' },
    { name: 'Meleys', emoji: '🐉', desc: 'A Rainha Vermelha, montada por Rhaenys.', owner: 'Rhaenys Targaryen' },
    { name: 'Vermithor', emoji: '🐲', desc: 'O Fogo da Primavera, antigo dragão de Jaehaerys.', owner: 'Hugh Hammer' },
];

const characters = [
    { name: 'Rhaenyra Targaryen', role: 'Herdeira do Trono', emoji: '👑', desc: 'Primogênita de Viserys I, reivindica o Trono de Ferro.' },
    { name: 'Daemon Targaryen', role: 'Príncipe', emoji: '⚔️', desc: 'Irmão de Viserys, guerreiro feroz e montador de Caraxes.' },
    { name: 'Alicent Hightower', role: 'Rainha', emoji: '🕊️', desc: 'Segunda esposa de Viserys, mãe de Aegon II.' },
    { name: 'Viserys I', role: 'Rei', emoji: '👑', desc: 'O rei que escolheu Rhaenyra como herdeira.' },
    { name: 'Aemond Targaryen', role: 'Príncipe', emoji: '🐲', desc: 'Segundo filho de Alicent, montador de Vhagar.' },
    { name: 'Corlys Velaryon', role: 'Senhor das Marés', emoji: '⚓', desc: 'Chefe da Casa Velaryon, o maior explorador.' },
    { name: 'Rhaenys Targaryen', role: 'A Rainha Que Nunca Foi', emoji: '🔥', desc: 'Montadora de Meleys, candidata ao trono ignorada.' },
    { name: 'Otto Hightower', role: 'Mão do Rei', emoji: '📜', desc: 'Pai de Alicent, principal conselheiro de Viserys.' },
    { name: 'Aegon II', role: 'Rei', emoji: '👑', desc: 'Filho mais velho de Viserys, coroado pelos Verdes.' },
    { name: 'Lucerys Velaryon', role: 'Príncipe', emoji: '🕊️', desc: 'Filho de Rhaenyra, montador de Arrax.' },
];

/* ===== DOM REFS ===== */
const navbar = document.getElementById('navbar');
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const dragonsGrid = document.getElementById('dragonsGrid');
const carousel = document.getElementById('carousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');

let autoScrollInterval = null;
let currentDotIndex = 0;
const cardsPerView = (() => {
    const w = window.innerWidth;
    if (w < 480) return 1;
    if (w < 768) return 2;
    return 3;
})();

/* ===== RENDER DRAGONS ===== */
dragons.forEach(d => {
    const card = document.createElement('div');
    card.className = 'dragon-card';
    card.innerHTML = `
        <div class="dragon-img">${d.emoji}</div>
        <h3>${d.name}</h3>
        <p class="dragon-desc">${d.desc}</p>
        <p class="dragon-owner">Montado por: ${d.owner}</p>
    `;
    dragonsGrid.appendChild(card);
});

/* ===== RENDER CHARACTERS ===== */
const totalCards = characters.length;
let visibleCards = Math.min(cardsPerView, totalCards);

characters.forEach(c => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.innerHTML = `
        <div class="char-avatar">${c.emoji}</div>
        <h3>${c.name}</h3>
        <p class="char-role">${c.role}</p>
        <p class="char-desc">${c.desc}</p>
    `;
    carousel.appendChild(card);
});

/* ===== RECALC VISIBLE CARDS ON RESIZE ===== */
function recalcVisible() {
    const w = window.innerWidth;
    let v;
    if (w < 480) v = 1;
    else if (w < 768) v = 2;
    else v = 3;
    visibleCards = Math.min(v, totalCards);
    initDots();
    scrollToDot(0);
}

/* ===== CAROUSEL DOTS ===== */
function initDots() {
    const totalDots = Math.max(1, totalCards - visibleCards + 1);
    carouselDots.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', () => scrollToDot(i));
        carouselDots.appendChild(dot);
    }
    currentDotIndex = 0;
}

function scrollToDot(index) {
    const cardWidth = carousel.children[0]?.offsetWidth + 20 || 260;
    const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    let target = index * cardWidth;
    if (target > maxScroll) target = maxScroll;
    carousel.scrollTo({ left: target, behavior: 'smooth' });
    currentDotIndex = index;
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

/* ===== CAROUSEL CONTROLS ===== */
carouselPrev.addEventListener('click', () => {
    const newIndex = Math.max(0, currentDotIndex - 1);
    scrollToDot(newIndex);
    resetAutoScroll();
});

carouselNext.addEventListener('click', () => {
    const maxDot = Math.max(0, totalCards - visibleCards);
    const newIndex = Math.min(maxDot, currentDotIndex + 1);
    scrollToDot(newIndex);
    resetAutoScroll();
});

/* ===== AUTO SCROLL ===== */
function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
        const maxDot = Math.max(0, totalCards - visibleCards);
        let next = currentDotIndex + 1;
        if (next > maxDot) next = 0;
        scrollToDot(next);
    }, 4000);
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function resetAutoScroll() {
    startAutoScroll();
}

carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);

/* ===== NAVBAR HAMBURGER ===== */
ham.addEventListener('click', () => {
    ham.classList.toggle('active');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        ham.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

/* ===== NAVBAR ACTIVE LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

/* ===== BACK TO TOP ===== */
function toggleBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== STAT COUNTER ANIMATION ===== */
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const current = parseInt(el.textContent, 10) || 0;
        if (current >= target) return;
        const increment = Math.ceil(target / 40);
        let count = current;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            el.textContent = count;
        }, 40);
    });
}

/* ===== SCROLL OBSERVER FOR COUNTERS ===== */
let countersAnimated = false;
const aboutSection = document.getElementById('about');

function checkCounters() {
    if (countersAnimated) return;
    if (!aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        countersAnimated = true;
        animateCounters();
    }
}

/* ===== SCROLL EVENT ===== */
window.addEventListener('scroll', () => {
    updateActiveLink();
    toggleBackToTop();
    checkCounters();
});

/* ===== RESIZE ===== */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(recalcVisible, 300);
});

/* ===== INIT ===== */
initDots();
startAutoScroll();
checkCounters(); // in case counters already visible on load
