// ===== DADOS DOS PERSONAGENS =====
const personagens = [
    {
        nome: 'O Professor',
        ator: 'Álvaro Morte',
        descricao: 'O gênio por trás do plano. Meticuloso, calmo e sempre um passo à frente.',
        emoji: '🧠',
    },
    {
        nome: 'Tóquio',
        ator: 'Úrsula Corberó',
        descricao: 'Narradora impulsiva. Corajosa, explosiva e movida por paixão.',
        emoji: '🔥',
    },
    {
        nome: 'Berlim',
        ator: 'Pedro Alonso',
        descricao: 'Carismático e cruel. Líder dentro da Casa da Moeda, com seu próprio código.',
        emoji: '👑',
    },
    {
        nome: 'Nairobi',
        ator: 'Alba Flores',
        descricao: 'A especialista em falsificação. Forte, leal e materna com o grupo.',
        emoji: '💪',
    },
    {
        nome: 'Rio',
        ator: 'Miguel Herrán',
        descricao: 'O hacker jovem. Talentoso, sensível e apaixonado por Tóquio.',
        emoji: '💻',
    },
    {
        nome: 'Denver',
        ator: 'Jaime Lorente',
        descricao: 'Filho de Moscou. Brigão, leal e de coração mole.',
        emoji: '🥊',
    },
    {
        nome: 'Moscou',
        ator: 'Paco Tous',
        descricao: 'O minerador. Experiente, protetor e pai de Denver.',
        emoji: '⛏️',
    },
    {
        nome: 'Helsinque',
        ator: 'Darko Perić',
        descricao: 'O gigante gentil. Força bruta e um coração enorme.',
        emoji: '💪',
    },
    {
        nome: 'Estocolmo',
        ator: 'Esther Acebo',
        descricao: 'De refém a ladra. Inteligente, adaptável e surpreendente.',
        emoji: '🔄',
    },
    {
        nome: 'Lisboa',
        ator: 'Itziar Ituño',
        descricao: 'A inspetora que virou aliada. Determinada e brilhante.',
        emoji: '🕵️',
    },
    {
        nome: 'Palermo',
        ator: 'Rodrigo de la Serna',
        descricao: 'Engenheiro do Banco da Espanha. Amargo, genial e imprevisível.',
        emoji: '⚙️',
    },
    {
        nome: 'Marseille',
        ator: 'Luka Peroš',
        descricao: 'O braço direito do Professor. Discreto e extremamente capaz.',
        emoji: '🤫',
    },
];

// ===== RENDERIZAR PERSONAGENS =====
function renderizarPersonagens() {
    const grid = document.getElementById('personagensGrid');

    personagens.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'personagem-card';

        card.innerHTML = `
            <div class="personagem-avatar">${p.emoji}</div>
            <h3>${p.nome}</h3>
            <p class="personagem-actor">${p.ator}</p>
            <p class="personagem-desc">${p.descricao}</p>
        `;

        grid.appendChild(card);
    });
}

// ===== QUIZ =====
const personagensQuiz = [
    {
        nome: 'O Professor',
        desc: 'Você é estrategista, calmo e adora planejar cada detalhe antes de agir.',
    },
    {
        nome: 'Tóquio',
        desc: 'Você é impulsivo, corajoso e vive intensamente cada momento.',
    },
    {
        nome: 'Berlim',
        desc: 'Você é elegante, confiante e gosta de fazer as coisas do seu jeito.',
    },
    {
        nome: 'Nairobi',
        desc: 'Você é forte, generoso e une as pessoas ao seu redor.',
    },
    {
        nome: 'Denver',
        desc: 'Você é leal, brigão mas tem um coração gigante.',
    },
    {
        nome: 'Palermo',
        desc: 'Você é genial, sarcástico e não tem medo de causar caos.',
    },
];

function sortearPersonagem() {
    const idx = Math.floor(Math.random() * personagensQuiz.length);
    return personagensQuiz[idx];
}

document.getElementById('btnQuiz').addEventListener('click', () => {
    const p = sortearPersonagem();
    const resultado = document.getElementById('quizResultado');

    resultado.style.opacity = '0';
    resultado.style.transform = 'scale(0.8)';

    setTimeout(() => {
        resultado.innerHTML = `🎭 ${p.nome}<br><span style="font-size:0.9rem;display:block;margin-top:8px;color:#ddd;font-family:Segoe UI,Arial,sans-serif;text-shadow:none;font-weight:normal;">${p.desc}</span>`;
        resultado.style.opacity = '1';
        resultado.style.transform = 'scale(1)';
    }, 150);
});

// ===== ANIMAÇÃO SIMPLES NOS STATS =====
const stats = document.querySelectorAll('.stat-num');

function animarStats() {
    stats.forEach((el) => {
        const final = el.textContent;
        el.textContent = '0';
        let count = 0;
        const max = parseInt(final) || 0;
        if (max === 0) return;

        const interval = setInterval(() => {
            count++;
            el.textContent = count;
            if (count >= max) {
                clearInterval(interval);
                el.textContent = final;
            }
        }, 40);
    });
}

// Dispara animação ao rolar até a seção "sobre"
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animarStats();
                observer.disconnect();
            }
        });
    },
    { threshold: 0.5 }
);

const sobreSection = document.querySelector('.sobre');
if (sobreSection) observer.observe(sobreSection);

// ===== INICIAR =====
document.addEventListener('DOMContentLoaded', () => {
    renderizarPersonagens();

    // Animação de fade-in nas seções
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});
