// Database simulation for Notícias
const noticiasData = [
    {
        id: 1,
        title: "MATEUS SPORTS Revela: Os Bastidores da Maior Transferência do Futebol Europeu",
        category: "Mercado",
        team: "Real Madrid",
        date: "13 de Outubro, 2026",
        author: "Mateus Silva",
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
        snippet: "Especulações ganham força após reunião secreta entre dirigentes de gigantes internacionais e representantes de jovens craques mundiais.",
        content: "Após meses de negociações intensas e disputa acirrada com clubes da Premier League, o Real Madrid finalizou os detalhes da contratação do jovem atacante prodígio. A transferência gira em torno de 85 milhões de euros. O atleta assinará contrato de 6 temporadas e se apresentará após o fim do campeonato nacional."
    },
    {
        id: 2,
        title: "Barcelona anuncia reestruturação financeira e confirma novo Camp Nou",
        category: "Espanha",
        team: "Barcelona",
        date: "12 de Outubro, 2026",
        author: "Carlos Eduardo",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        snippet: "Diretoria blaugrana apresenta balanço positivo e data oficial para inauguração total da nova casa catalã.",
        content: "O FC Barcelona divulgou excelentes notícias aos seus sócios e torcedores nesta semana. Com a redução significativa da folha salarial e novos patrocínios globais, o clube está plenamente apto a retornar à regra 1:1 no fair play financeiro."
    },
    {
        id: 3,
        title: "Flamengo investe pesado em reforços para a disputa da Libertadores",
        category: "Brasil",
        team: "Flamengo",
        date: "11 de Outubro, 2026",
        author: "Matheus Sport",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        snippet: "Diretoria rubro-negra acerta a chegada de dois atletas de peso que atuavam no futebol europeu.",
        content: "Com foco total na conquista continental, o Flamengo confirmou a contratação de um volante experiente com passagens pela Seleção Brasileira e um ponta velocíssimo. A torcida já esgotou os primeiros lotes de camisas com os novos nomes."
    },
    {
        id: 4,
        title: "Manchester City atropela rival com atuação de gala na Premier League",
        category: "Inglaterra",
        team: "Manchester City",
        date: "10 de Outubro, 2026",
        author: "John Smith",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
        snippet: "Com hat-trick do artilheiro, os Citizens mantêm a liderança isolada do campeonato inglês.",
        content: "Em uma exibição impecável de toque de bola e intensidade sob o comando de Pep Guardiola, o Manchester City dominou o confronto e venceu por 3 a 0, consolidando ainda mais sua superioridade na temporada."
    },
    {
        id: 5,
        title: "Craque brasileiro brilha na Itália e desperta interesse da Premier League",
        category: "Mercado",
        team: "Todos",
        date: "09 de Outubro, 2026",
        author: "Mateus Silva",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
        snippet: "Atacante decisivo marca dois gols de fora da área e garante vitória heroica fora de casa no Calcio.",
        content: "O atacante brasileiro vem sendo o principal destaque da Série A italiana nesta temporada. Olheiros de clubes ingleses já marcaram presença no estádio para observar de perto o atleta."
    },
    {
        id: 6,
        title: "Seleção Brasileira convoca novos nomes para as Eliminatórias da Copa",
        category: "Brasil",
        team: "Todos",
        date: "08 de Outubro, 2026",
        author: "Ana Beatriz",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
        snippet: "Comissão técnica surpreende com três estreias na lista para os duelos decisivos.",
        content: "A comissão técnica da Seleção Brasileira divulgou a lista de 26 convocados para a próxima data FIFA. A grande surpresa ficou por conta da inclusão de jovens promessas."
    }
];

// Database simulation for Transferências (Mercado da Bola)
const transferenciasData = [
    { player: "Kylian Mbappé", pos: "Atacante", from: "Paris Saint-Germain", to: "Real Madrid", fee: "€ 180M", status: "Fechado", team: "Real Madrid", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
    { player: "Florian Wirtz", pos: "Meia", from: "Bayer Leverkusen", to: "Liverpool", fee: "€ 120M", status: "Em andamento", team: "Todos", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
    { player: "Viktor Gyökeres", pos: "Atacante", from: "Sporting CP", to: "Arsenal", fee: "€ 85M", status: "Rumor", team: "Todos", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
    { player: "Gabigol", pos: "Atacante", from: "Flamengo", to: "Cruzeiro", fee: "Livre", status: "Fechado", team: "Flamengo", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80" },
    { player: "João Neves", pos: "Volante", from: "Benfica", to: "Paris Saint-Germain", fee: "€ 60M", status: "Fechado", team: "Todos", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80" },
    { player: "Alphonso Davies", pos: "Lateral", from: "Bayern de Munique", to: "Real Madrid", fee: "Livre", status: "Em andamento", team: "Real Madrid", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80" }
];

// Database simulation for Lesões (Boletim Médico)
const lesoesData = [
    { player: "Neymar Jr", team: "Al-Hilal", injury: "Lesão muscular na coxa", severity: "Moderada", returnDate: "Nov/2026", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" },
    { player: "Rodri", team: "Manchester City", injury: "Ruptura de Ligamento Cruzado (LCA)", severity: "Grave", returnDate: "Abr/2027", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80" },
    { player: "Vinicius Jr", team: "Real Madrid", injury: "Sobrecarga na panturrilha", severity: "Leve", returnDate: "Out/2026", clubFilter: "Real Madrid", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80" },
    { player: "Gavi", team: "Barcelona", injury: "Entorse no joelho esquerdo", severity: "Leve", returnDate: "Out/2026", clubFilter: "Barcelona", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" },
    { player: "Pedro", team: "Flamengo", injury: "Ruptura do Ligamento Cruzado", severity: "Grave", returnDate: "Mai/2027", clubFilter: "Flamengo", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80" }
];

// Database simulation for Rumores
const rumoresData = [
    { title: "Manchester United prepara oferta astronômica por joia sul-americana", source: "The Athletic (Inglaterra)", credibility: "Alta (85%)", desc: "Clube inglês monitora o desempenho do jovem meia e planeja proposta histórica na próxima janela." },
    { title: "Técnico renomado pode assumir comando de seleção europeia", source: "Gazzetta dello Sport (Itália)", credibility: "Média (60%)", desc: "Conversas informais já teriam ocorrido entre federação e agentes do treinador bicampeão nacional." },
    { title: "Atacante veterano avalia proposta para encerrar carreira na MLS", source: "ESPN Global", credibility: "Alta (90%)", desc: "Com contrato terminando no fim da temporada europeia, estrela pensa em nova aventura nos Estados Unidos." },
    { title: "Gigante italiano monitora situação de lateral campeão da Champions", source: "AS (Espanha)", credibility: "Baixa (40%)", desc: "Negociação é considerada complexa devido aos altos valores salariais exigidos pelo estafe do atleta." }
];

let currentFavoriteTeam = "Todos";

// Render Notícias
function renderNoticias(data = noticiasData) {
    const grid = document.getElementById('noticias-grid');
    const filtered = currentFavoriteTeam === 'Todos' ? data : data.filter(n => n.team === currentFavoriteTeam || n.team === 'Todos');

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">Nenhuma notícia encontrada para este filtro.</div>`;
        return;
    }

    grid.innerHTML = filtered.map((n, idx) => `
        <div onclick="openNewsModal(${n.id - 1})" class="bg-sportdark-900 border border-sportdark-700/80 rounded-3xl overflow-hidden shadow-xl hover:border-neon-green transition cursor-pointer flex flex-col group">
            <div class="relative overflow-hidden h-52">
                <img src="${n.image}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-4 left-4 bg-sportdark-950/90 text-neon-green font-bold text-xs uppercase px-3.5 py-1 rounded-full backdrop-blur-md border border-neon-green/30">${n.category}</span>
            </div>
            <div class="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div class="space-y-2">
                    <div class="flex items-center text-xs text-gray-400 space-x-3">
                        <span class="text-neon-blue"><i data-lucide="calendar" class="w-3.5 h-3.5 inline mr-1 text-neon-blue"></i>${n.date}</span>
                        <span><i data-lucide="user" class="w-3.5 h-3.5 inline mr-1 text-neon-green"></i>${n.author}</span>
                    </div>
                    <h3 class="text-lg font-bold text-white group-hover:text-neon-green transition line-clamp-2">${n.title}</h3>
                    <p class="text-sm text-gray-400 line-clamp-2">${n.snippet}</p>
                </div>
                <div class="pt-4 border-t border-sportdark-700 flex items-center justify-between text-neon-green text-sm font-bold">
                    <span>Ler matéria completa</span>
                    <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition"></i>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Render Transferências
function renderTransferencias(data = transferenciasData) {
    const tbody = document.getElementById('transfer-table-body');
    const filtered = currentFavoriteTeam === 'Todos' ? data : data.filter(t => t.team === currentFavoriteTeam || t.team === 'Todos');

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-gray-400">Nenhuma transferência encontrada.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(t => {
        let badgeColor = "bg-neon-green/10 text-neon-green border-neon-green/30";
        if (t.status === "Em andamento") badgeColor = "bg-neon-amber/10 text-neon-amber border-neon-amber/30";
        if (t.status === "Rumor") badgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/30";

        return `
            <tr class="hover:bg-sportdark-800/60 transition">
                <td class="py-4 px-6 flex items-center space-x-3">
                    <img src="${t.avatar}" alt="${t.player}" class="w-10 h-10 rounded-full object-cover border border-sportdark-700">
                    <div>
                        <div class="font-bold text-white">${t.player}</div>
                        <div class="text-xs text-neon-blue font-semibold">${t.pos}</div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <div class="text-gray-300 font-medium">${t.from} <span class="text-neon-green">&rarr;</span> ${t.to}</div>
                </td>
                <td class="py-4 px-6 font-mono font-bold text-neon-green">${t.fee}</td>
                <td class="py-4 px-6">
                    <span class="px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}">${t.status}</span>
                </td>
                <td class="py-4 px-6 text-right">
                    <button onclick="alert('Detalhes da negociação de ${t.player}')" class="p-2 bg-sportdark-800 hover:bg-sportdark-700 rounded-xl text-gray-300 hover:text-white transition border border-sportdark-700">
                        <i data-lucide="eye" class="w-4 h-4 text-neon-blue"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    lucide.createIcons();
}

// Render Lesões
function renderLesoes(data = lesoesData) {
    const grid = document.getElementById('injury-grid');
    const filtered = currentFavoriteTeam === 'Todos' ? data : data.filter(l => l.clubFilter === currentFavoriteTeam || l.team === currentFavoriteTeam || currentFavoriteTeam === 'Todos');

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">Nenhum jogador no departamento médico para este filtro.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(l => {
        let sevColor = "bg-neon-green/10 text-neon-green border-neon-green/30";
        if (l.severity === "Moderada") sevColor = "bg-neon-amber/10 text-neon-amber border-neon-amber/30";
        if (l.severity === "Grave") sevColor = "bg-neon-pink/10 text-neon-pink border-neon-pink/30";

        return `
            <div class="bg-sportdark-900 border border-sportdark-700/80 rounded-3xl p-6 shadow-xl space-y-4 hover:border-neon-pink transition">
                <div class="flex items-center space-x-4">
                    <img src="${l.avatar}" alt="${l.player}" class="w-14 h-14 rounded-2xl object-cover border border-sportdark-700">
                    <div>
                        <h3 class="text-lg font-bold text-white">${l.player}</h3>
                        <p class="text-xs text-neon-blue font-bold">${l.team}</p>
                    </div>
                </div>
                <div class="bg-sportdark-950 rounded-2xl p-4 space-y-2 border border-sportdark-700/60">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-400">Tipo de Lesão:</span>
                        <span class="text-white font-semibold">${l.injury}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-400">Gravidade:</span>
                        <span class="px-2.5 py-0.5 rounded-md font-bold border ${sevColor}">${l.severity}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-400">Retorno Previsto:</span>
                        <span class="text-neon-green font-mono font-bold">${l.returnDate}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

// Render Rumores
function renderRumores(data = rumoresData) {
    const grid = document.getElementById('rumors-grid');
    grid.innerHTML = data.map(r => `
        <div class="bg-sportdark-900 border border-sportdark-700/80 rounded-3xl p-6 shadow-xl space-y-3 hover:border-neon-amber transition">
            <div class="flex items-center justify-between">
                <span class="text-xs uppercase font-extrabold text-neon-amber bg-neon-amber/10 border border-neon-amber/20 px-3 py-1 rounded-full">${r.source}</span>
                <span class="text-xs font-mono font-bold text-neon-blue">Confiabilidade: ${r.credibility}</span>
            </div>
            <h3 class="text-lg font-bold text-white">${r.title}</h3>
            <p class="text-sm text-gray-300 font-medium">${r.desc}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

// Tab Switching Logic
function switchTab(tabId) {
    const tabs = ['inicio', 'noticias', 'transferencias', 'lesoes', 'rumores'];
    tabs.forEach(t => {
        const el = document.getElementById(`section-${t}`);
        const btn = document.getElementById(`tab-${t}`);
        if (el) el.classList.add('hidden');
        if (btn) {
            btn.classList.remove('bg-gradient-to-r', 'from-neon-green', 'to-emerald-600', 'text-sportdark-950', 'shadow-lg', 'shadow-neon-green/25');
            btn.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-sportdark-800');
        }
    });

    const activeEl = document.getElementById(`section-${tabId}`);
    const activeBtn = document.getElementById(`tab-${tabId}`);
    if (activeEl) activeEl.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-sportdark-800');
        activeBtn.classList.add('bg-gradient-to-r', 'from-neon-green', 'to-emerald-600', 'text-sportdark-950', 'shadow-lg', 'shadow-neon-green/25');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Favorite Team Selection
function selectFavoriteTeam(team) {
    currentFavoriteTeam = team;
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-neon-green', 'to-emerald-500', 'text-sportdark-950', 'shadow-lg');
        btn.classList.add('bg-sportdark-950', 'text-gray-300');
    });
    const selectedBtn = document.getElementById(`team-${team}`);
    if (selectedBtn) {
        selectedBtn.classList.remove('bg-sportdark-950', 'text-gray-300');
        selectedBtn.classList.add('bg-gradient-to-r', 'from-neon-green', 'to-emerald-500', 'text-sportdark-950', 'shadow-lg');
    }
    renderNoticias();
    renderTransferencias();
    renderLesoes();
}

// Filters
function filterNewsCategory(cat) {
    if (cat === 'todos') {
        renderNoticias(noticiasData);
    } else {
        renderNoticias(noticiasData.filter(n => n.category === cat));
    }
}

function filterTransfers(status) {
    if (status === 'todos') {
        renderTransferencias(transferenciasData);
    } else {
        renderTransferencias(transferenciasData.filter(t => t.status === status));
    }
}

function filterInjuries(sev) {
    if (sev === 'todos') {
        renderLesoes(lesoesData);
    } else {
        renderLesoes(lesoesData.filter(l => l.severity === sev));
    }
}

// Search Functionality
function handleSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderNoticias(noticiasData);
        renderTransferencias(transferenciasData);
        renderLesoes(lesoesData);
        return;
    }

    const filteredNews = noticiasData.filter(n => n.title.toLowerCase().includes(q) || n.snippet.toLowerCase().includes(q));
    const filteredTransfers = transferenciasData.filter(t => t.player.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q));
    const filteredInjuries = lesoesData.filter(l => l.player.toLowerCase().includes(q) || l.injury.toLowerCase().includes(q) || l.team.toLowerCase().includes(q));

    renderNoticias(filteredNews);
    renderTransferencias(filteredTransfers);
    renderLesoes(filteredInjuries);

    const activeSec = document.querySelector('main > section:not(.hidden)');
    if (activeSec && activeSec.id === 'section-inicio') {
        switchTab('noticias');
    }
}

// Modal Reader Logic
function openNewsModal(index) {
    const n = noticiasData[index];
    if (!n) return;

    document.getElementById('modal-img').src = n.image;
    document.getElementById('modal-category').innerText = n.category;
    document.getElementById('modal-date').innerHTML = `<i data-lucide="calendar" class="w-4 h-4 mr-1.5 text-neon-blue"></i>${n.date}`;
    document.getElementById('modal-author').innerHTML = `<i data-lucide="user" class="w-4 h-4 mr-1.5 text-neon-green"></i>${n.author}`;
    document.getElementById('modal-title').innerText = n.title;
    document.getElementById('modal-body').innerHTML = `<p>${n.content}</p><p>Acompanhe todas as atualizações em tempo real aqui no <strong>MATEUS SPORTS</strong>.</p>`;

    const modal = document.getElementById('news-modal');
    const box = document.getElementById('modal-content-box');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }, 10);
    lucide.createIcons();
}

function closeNewsModal() {
    const modal = document.getElementById('news-modal');
    const box = document.getElementById('modal-content-box');
    modal.classList.add('opacity-0');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function shareArticle() {
    alert("Link da matéria copiado para a área de transferência!");
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderNoticias();
    renderTransferencias();
    renderLesoes();
    renderRumores();
    lucide.createIcons();
});