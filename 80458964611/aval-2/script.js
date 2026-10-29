/* ==========================================================================
   CR7 LEGACY — Main JavaScript File
   Lógica e Interatividade em JS Puro (Vanilla)
   ========================================================================== */

// Base de Dados dos Clubes
const clubData = {
    realmadrid: {
        title: "REAL MADRID C.F.",
        period: "2009 — 2018",
        stats: [
            { label: "Jogos", value: "438" },
            { label: "Gols", value: "450" },
            { label: "Assistências", value: "120" },
            { label: "Média/Jogo", value: "1.03" }
        ],
        text: "A era mais avassaladora da história do futebol moderno. Cristiano transformou-se no maior artilheiro da história do Real Madrid, superando Raúl González em um número consideravelmente menor de partidas.",
        achievements: [
            "4x UEFA Champions League (2014, 2016, 2017, 2018)",
            "2x La Liga Espanhola (2012, 2017)",
            "4x Bolas de Ouro FIFA/France Football como merengue",
            "3x Mundiais de Clubes da FIFA"
        ]
    },
    manutd: {
        title: "MANCHESTER UNITED",
        period: "2003 — 2009 | 2021 — 2022",
        stats: [
            { label: "Jogos Total", value: "346" },
            { label: "Gols Total", value: "145" },
            { label: "Assistências", value: "64" },
            { label: "Títulos", value: "10" }
        ],
        text: "Sob a tutoria paterna de Sir Alex Ferguson, o jovem habilidoso da Madeira transformou-se num atacante completo e letal, herdando a histórica camisa 7 de Eric Cantona e David Beckham.",
        achievements: [
            "1x UEFA Champions League (2008)",
            "3x Premier League (2007, 2008, 2009)",
            "1x Bola de Ouro FIFA (2008)",
            "1x Chuteira de Ouro Europeia (2008)"
        ]
    },
    juventus: {
        title: "JUVENTUS F.C.",
        period: "2018 — 2021",
        stats: [
            { label: "Jogos", value: "134" },
            { label: "Gols", value: "101" },
            { label: "Assistências", value: "22" },
            { label: "Média/Jogo", value: "0.75" }
        ],
        text: "Transferiu-se para Turim em 2018 como a maior contratação do futebol italiano. Manteve seu ritmo impressionante, alcançando a marca de 100 gols mais rápido do que qualquer outro jogador na história da Juve.",
        achievements: [
            "2x Serie A Italiana (2019, 2020)",
            "1x Coppa Italia (2021)",
            "2x Supercoppa Italiana",
            "Capocannoniere (Artilheiro da Serie A 2021)"
        ]
    },
    alnassr: {
        title: "AL-NASSR FC",
        period: "2023 — PRESENTE",
        stats: [
            { label: "Jogos", value: "70+" },
            { label: "Gols", value: "65+" },
            { label: "Assistências", value: "18+" },
            { label: "Gols em 2023", value: "54" }
        ],
        text: "Em janeiro de 2023, aceitou o desafio de expandir as fronteiras do futebol global ao assinar com o Al-Nassr na Arábia Saudita, impulsionando a migração de astros internacionais para a Liga Saudita.",
        achievements: [
            "1x Copa dos Campeões Clubes Árabes (2023)",
            "Artilheiro Mundial do Ano de 2023 (54 gols)",
            "Recorde de gols em uma única temporada da Saudi Pro League"
        ]
    },
    sporting: {
        title: "SPORTING CP",
        period: "2002 — 2003",
        stats: [
            { label: "Jogos", value: "31" },
            { label: "Gols", value: "5" },
            { label: "Assistências", value: "6" },
            { label: "Estreia", value: "17 anos" }
        ],
        text: "O berço de sua carreira. Formado na célebre Academia de Alcochete, demonstrou desde o primeiro momento uma velocidade espetacular e drible desconcertante que impressionou a Europa.",
        achievements: [
            "1x Supertaça Cândido de Oliveira (2002)",
            "Único atleta a atuar por 5 categorias na mesma época",
            "Inauguração do Estádio José Alvalade (2003)"
        ]
    }
};

// Base de Dados da Linha do Tempo
const timelineData = {
    '2002': {
        year: '2002',
        title: 'Estreia Profissional no Sporting CP',
        text: 'Em 7 de outubro de 2002, aos 17 anos, Cristiano Ronaldo estreou como titular pela equipe principal do Sporting CP contra o Moreirense. Marcou dois gols na vitória por 3-0, anunciando ao mundo o surgimento de um talento fora do comum.'
    },
    '2003': {
        year: '2003',
        title: 'A Noite Inesquecível em Alvalade',
        text: 'Em agosto de 2003, no jogo de inauguração do novo Estádio José Alvalade, o Sporting venceu o Manchester United por 3-1. A atuação desconcertante de Ronaldo fez com que os jogadores do United pedissem a Sir Alex Ferguson sua contratação imediata no voo de volta.'
    },
    '2008': {
        year: '2008',
        title: 'A Primeira Bola de Ouro',
        text: 'Uma temporada perfeita: 42 gols marcados, título da Premier League e conquista da UEFA Champions League em Moscou contra o Chelsea. Foi coroado com sua primeira Bola de Ouro da France Football e o prêmio de Melhor Jogador do Mundo pela FIFA.'
    },
    '2009': {
        year: '2009',
        title: 'A Maior Apresentação do Futebol',
        text: 'Transferiu-se para o Real Madrid pela quantia recorde de 94 milhões de euros. No dia 6 de julho de 2009, mais de 80.000 torcedores lotaram o Santiago Bernabéu para dar as boas-vindas ao novo camisa 9 (que mais tarde reassumiria o número 7).'
    },
    '2016': {
        year: '2016',
        title: 'A Glória Inédita por Portugal',
        text: 'Após anos de dedicação à seleção, liderou Portugal à conquista do seu primeiro título oficial: a UEFA EURO 2016. Mesmo lesionado durante a final contra a França, atuou como um verdadeiro treinador à beira do gramado incentivando seus companheiros.'
    },
    '2018': {
        year: '2018',
        title: 'Tricampeonato Europeu e transferência para a Itália',
        text: 'Conquistou sua quinta Champions League com uma vitória sobre o Liverpool em Kiev. Pouco tempo depois, anunciou sua transferência para a Juventus por 100 milhões de euros, iniciando uma vitoriosa etapa no futebol italiano.'
    },
    '2021': {
        year: '2021',
        title: 'O Maior Artilheiro por Seleções da História',
        text: 'Ao marcar dois gols contra a Irlanda em setembro de 2021, superou a marca do iraniano Ali Daei (109 gols) e tornou-se isoladamente o maior artilheiro de todas as seleções nacionais masculinas da história do futebol mundial.'
    },
    '2023': {
        year: '2023',
        title: 'Pioneirismo na Ásia e Artilheiro do Ano',
        text: 'Assinou com o Al-Nassr da Arábia Saudita, redefinindo o mapa do futebol mundial e atraindo dezenas de craques europeus para o Oriente Médio. Encerrou o ano civil de 2023 como o maior artilheiro do mundo com 54 gols marcados.'
    }
};

// Inicialização das funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });

        // Fechar menu mobile ao clicar num link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
            });
        });
    }

    // Carregar clube padrão no painel
    renderClubPanel('realmadrid');
});

// Função para renderizar as informações dos clubes
function selectClub(clubKey, buttonElement) {
    // Atualizar classe ativa nos botões
    document.querySelectorAll('.club-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    renderClubPanel(clubKey);
}

function renderClubPanel(clubKey) {
    const data = clubData[clubKey];
    const panel = document.getElementById('club-display-panel');
    
    if (!data || !panel) return;

    let statsHtml = data.stats.map(s => `
        <div class="club-stat-card">
            <div class="club-stat-value">${s.value}</div>
            <div class="club-stat-label">${s.label}</div>
        </div>
    `).join('');

    let achievementsHtml = data.achievements.map(a => `
        <li style="margin-bottom:0.5rem; color:var(--color-gray); font-size:0.9rem;">
            <i class="fa-solid fa-trophy text-gold" style="margin-right:0.5rem;"></i> ${a}
        </li>
    `).join('');

    panel.innerHTML = `
        <div class="club-panel-header">
            <div>
                <h3 class="club-panel-title">${data.title}</h3>
            </div>
            <span class="club-panel-period">${data.period}</span>
        </div>

        <div class="club-stats-grid">
            ${statsHtml}
        </div>

        <div style="display:grid; grid-template-columns: 1fr; gap: 1.5rem;">
            <div>
                <h4 style="font-family:var(--font-subheading); color:var(--color-gold); font-size:1.1rem; margin-bottom:0.5rem;">RESUMO DA PASSAGEM</h4>
                <p style="color:var(--color-gray); font-size:0.95rem; line-height:1.6;">${data.text}</p>
            </div>
            <div>
                <h4 style="font-family:var(--font-subheading); color:var(--color-gold); font-size:1.1rem; margin-bottom:0.5rem;">PRINCIPAIS TÍTULOS</h4>
                <ul style="list-style:none;">
                    ${achievementsHtml}
                </ul>
            </div>
        </div>
    `;
}

// Funções para abrir/fechar o modal da Linha do Tempo
function openTimelineModal(year) {
    const modal = document.getElementById('timeline-modal');
    const data = timelineData[year];

    if (!modal || !data) return;

    document.getElementById('modal-year').innerText = data.year;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-body').innerText = data.text;

    modal.classList.remove('hidden');
}

function closeTimelineModal() {
    const modal = document.getElementById('timeline-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Função para acionar/expandir cartões de Curiosidades
function toggleCuriosity(element) {
    element.classList.toggle('active');
}