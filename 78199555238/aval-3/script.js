// Full multi-league database
const leaguesData = {
    brasileirao: {
        name: "Campeonato Brasileiro Série A",
        shortName: "Brasileirão",
        country: "Brasil",
        season: "Temporada 2026",
        bgIcon: "fa-shield-halved",
        matches: [
            { id: 1, home: "Flamengo", homeLogo: "🔴⚫", away: "Palmeiras", awayLogo: "🟢⚪", homeScore: 2, awayScore: 1, status: "AO VIVO", minute: "78'", isLive: true, venue: "Maracanã" },
            { id: 2, home: "São Paulo", homeLogo: "🔴⚪⚫", away: "Corinthians", awayLogo: "⚪⚫", homeScore: 1, awayScore: 1, status: "AO VIVO", minute: "62'", isLive: true, venue: "MorumBis" },
            { id: 3, home: "Atlético-MG", homeLogo: "⬛⬜", away: "Grêmio", awayLogo: "🔵⚫⚪", homeScore: 0, awayScore: 0, status: "INTERVALO", minute: "45'", isLive: true, venue: "Arena MRV" },
            { id: 4, home: "Botafogo", homeLogo: "⚪⚫", away: "Fluminense", awayLogo: "🟢⚪⚫", homeScore: 3, awayScore: 0, status: "ENCERRADO", minute: "90'", isLive: false, venue: "Nilton Santos" },
            { id: 5, home: "Internacional", homeLogo: "🔴⚪", away: "Bahia", awayLogo: "🔴🔵⚪", homeScore: 2, awayScore: 2, status: "ENCERRADO", minute: "90'", isLive: false, venue: "Beira-Rio" },
            { id: 6, home: "Cruzeiro", homeLogo: "🔵⚪", away: "Fortaleza", awayLogo: "🔴🔵⚪", homeScore: 1, awayScore: 0, status: "21:30", minute: "Hj", isLive: false, venue: "Mineirão" }
        ],
        standings: [
            { pos: 1, team: "Flamengo", logo: "🔴⚫", p: 51, j: 24, v: 15, e: 6, d: 3, gp: 44, gc: 20, form: ["v", "v", "e", "v", "v"], zone: "libertadores" },
            { pos: 2, team: "Palmeiras", logo: "🟢⚪", p: 48, j: 24, v: 14, e: 6, d: 4, gp: 40, gc: 18, form: ["v", "e", "v", "v", "d"], zone: "libertadores" },
            { pos: 3, team: "Botafogo", logo: "⚪⚫", p: 47, j: 24, v: 14, e: 5, d: 5, gp: 42, gc: 24, form: ["v", "v", "v", "d", "v"], zone: "libertadores" },
            { pos: 4, team: "São Paulo", logo: "🔴⚪⚫", p: 42, j: 24, v: 12, e: 6, d: 6, gp: 35, gc: 22, form: ["e", "v", "d", "v", "e"], zone: "libertadores" },
            { pos: 5, team: "Atlético-MG", logo: "⬛⬜", p: 39, j: 24, v: 10, e: 9, d: 5, gp: 33, gc: 25, form: ["e", "e", "v", "v", "e"], zone: "pre-libertadores" },
            { pos: 6, team: "Internacional", logo: "🔴⚪", p: 38, j: 24, v: 10, e: 8, d: 6, gp: 30, gc: 24, form: ["v", "d", "e", "v", "e"], zone: "pre-libertadores" },
            { pos: 7, team: "Cruzeiro", logo: "🔵⚪", p: 36, j: 23, v: 10, e: 6, d: 7, gp: 28, gc: 25, form: ["d", "v", "v", "d", "v"], zone: "sul-americana" },
            { pos: 8, team: "Bahia", logo: "🔴🔵⚪", p: 35, j: 24, v: 9, e: 8, d: 7, gp: 32, gc: 29, form: ["e", "v", "d", "e", "v"], zone: "sul-americana" },
            { pos: 9, team: "Fluminense", logo: "🟢⚪⚫", p: 33, j: 24, v: 9, e: 6, d: 9, gp: 27, gc: 30, form: ["v", "d", "v", "d", "d"], zone: "sul-americana" },
            { pos: 10, team: "Grêmio", logo: "🔵⚫⚪", p: 31, j: 24, v: 8, e: 7, d: 9, gp: 29, gc: 31, form: ["d", "e", "v", "d", "e"], zone: "sul-americana" },
            { pos: 11, team: "Fortaleza", logo: "🔴🔵⚪", p: 29, j: 23, v: 7, e: 8, d: 8, gp: 24, gc: 28, form: ["d", "d", "e", "v", "d"], zone: "none" },
            { pos: 12, team: "Corinthians", logo: "⚪⚫", p: 28, j: 24, v: 7, e: 7, d: 10, gp: 25, gc: 32, form: ["e", "d", "v", "d", "e"], zone: "none" },
            { pos: 13, team: "Vasco da Gama", logo: "⚪⚫", p: 27, j: 24, v: 7, e: 6, d: 11, gp: 26, gc: 38, form: ["v", "d", "d", "e", "v"], zone: "none" },
            { pos: 14, team: "Athletico-PR", logo: "🔴⚫", p: 26, j: 24, v: 6, e: 8, d: 10, gp: 22, gc: 30, form: ["d", "e", "d", "v", "d"], zone: "none" },
            { pos: 15, team: "Vitória", logo: "🔴⚫", p: 25, j: 24, v: 6, e: 7, d: 11, gp: 24, gc: 36, form: ["v", "v", "d", "d", "d"], zone: "none" },
            { pos: 16, team: "Cuiabá", logo: "🟢🟡", p: 23, j: 24, v: 5, e: 8, d: 11, gp: 20, gc: 33, form: ["d", "e", "e", "d", "v"], zone: "none" },
            { pos: 17, team: "Juventude", logo: "🟢⚪", p: 22, j: 24, v: 5, e: 7, d: 12, gp: 21, gc: 38, form: ["d", "d", "v", "e", "d"], zone: "rebaixamento" },
            { pos: 18, team: "Criciúma", logo: "🟡⚫", p: 21, j: 24, v: 5, e: 6, d: 13, gp: 23, gc: 40, form: ["d", "v", "d", "d", "e"], zone: "rebaixamento" },
            { pos: 19, team: "Atlético-GO", logo: "🔴⚫", p: 18, j: 24, v: 4, e: 6, d: 14, gp: 19, gc: 41, form: ["d", "d", "d", "v", "d"], zone: "rebaixamento" },
            { pos: 20, team: "Sport", logo: "🔴⚫", p: 15, j: 24, v: 3, e: 6, d: 15, gp: 18, gc: 45, form: ["d", "d", "d", "d", "d"], zone: "rebaixamento" }
        ],
        scorers: [
            { name: "Pedro", team: "Flamengo", goals: 16, assists: 5, photo: "https://placehold.co/120x120/1e293b/10b981?text=Pedro" },
            { name: "Flaco López", team: "Palmeiras", goals: 13, assists: 3, photo: "https://placehold.co/120x120/1e293b/10b981?text=Flaco" },
            { name: "Hulk", team: "Atlético-MG", goals: 12, assists: 7, photo: "https://placehold.co/120x120/1e293b/10b981?text=Hulk" },
            { name: "Yuri Alberto", team: "Corinthians", goals: 11, assists: 2, photo: "https://placehold.co/120x120/1e293b/10b981?text=Yuri" },
            { name: "Luciano", team: "São Paulo", goals: 10, assists: 4, photo: "https://placehold.co/120x120/1e293b/10b981?text=Luciano" },
            { name: "Pablo Vegetti", team: "Vasco da Gama", goals: 10, assists: 1, photo: "https://placehold.co/120x120/1e293b/10b981?text=Vegetti" }
        ]
    },
    premier: {
        name: "Premier League",
        shortName: "Premier League",
        country: "Inglaterra",
        season: "Temporada 2026/27",
        bgIcon: "fa-crown",
        matches: [
            { id: 101, home: "Manchester City", homeLogo: "🩵⚪", away: "Arsenal", awayLogo: "🔴⚪", homeScore: 1, awayScore: 1, status: "AO VIVO", minute: "81'", isLive: true, venue: "Etihad Stadium" },
            { id: 102, home: "Liverpool", homeLogo: "🔴", away: "Chelsea", awayLogo: "🔵", homeScore: 3, awayScore: 2, status: "ENCERRADO", minute: "90'", isLive: false, venue: "Anfield" },
            { id: 103, home: "Manchester United", homeLogo: "🔴⚪", away: "Tottenham", awayLogo: "⚪🔵", homeScore: 0, awayScore: 2, status: "ENCERRADO", minute: "90'", isLive: false, venue: "Old Trafford" }
        ],
        standings: [
            { pos: 1, team: "Manchester City", logo: "🩵⚪", p: 22, j: 9, v: 7, e: 1, d: 1, gp: 22, gc: 9, form: ["v", "v", "v", "e", "v"], zone: "libertadores" },
            { pos: 2, team: "Liverpool", logo: "🔴", p: 21, j: 9, v: 7, e: 0, d: 2, gp: 20, gc: 8, form: ["v", "d", "v", "v", "v"], zone: "libertadores" },
            { pos: 3, team: "Arsenal", logo: "🔴⚪", p: 20, j: 9, v: 6, e: 2, d: 1, gp: 18, gc: 7, form: ["v", "v", "e", "v", "e"], zone: "libertadores" },
            { pos: 4, team: "Chelsea", logo: "🔵", p: 17, j: 9, v: 5, e: 2, d: 2, gp: 19, gc: 12, form: ["v", "e", "v", "d", "v"], zone: "libertadores" },
            { pos: 5, team: "Tottenham", logo: "⚪🔵", p: 16, j: 9, v: 5, e: 1, d: 3, gp: 18, gc: 13, form: ["d", "v", "v", "v", "d"], zone: "pre-libertadores" }
        ],
        scorers: [
            { name: "Erling Haaland", team: "Manchester City", goals: 12, assists: 1, photo: "https://placehold.co/120x120/1e293b/10b981?text=Haaland" },
            { name: "Mohamed Salah", team: "Liverpool", goals: 9, assists: 6, photo: "https://placehold.co/120x120/1e293b/10b981?text=Salah" },
            { name: "Cole Palmer", team: "Chelsea", goals: 8, assists: 5, photo: "https://placehold.co/120x120/1e293b/10b981?text=Palmer" }
        ]
    },
    laliga: {
        name: "La Liga EA Sports",
        shortName: "La Liga",
        country: "Espanha",
        season: "Temporada 2026/27",
        bgIcon: "fa-futbol",
        matches: [
            { id: 201, home: "Real Madrid", homeLogo: "⚪", away: "Barcelona", awayLogo: "🔵🔴", homeScore: 2, awayScore: 2, status: "AO VIVO", minute: "75'", isLive: true, venue: "Santiago Bernabéu" },
            { id: 202, home: "Atlético de Madrid", homeLogo: "🔴⚪", away: "Villarreal", awayLogo: "🟡", homeScore: 1, awayScore: 0, status: "ENCERRADO", minute: "90'", isLive: false, venue: "Metropolitano" }
        ],
        standings: [
            { pos: 1, team: "Real Madrid", logo: "⚪", p: 25, j: 10, v: 8, e: 1, d: 1, gp: 24, gc: 8, form: ["v", "v", "v", "e", "v"], zone: "libertadores" },
            { pos: 2, team: "Barcelona", logo: "🔵🔴", p: 24, j: 10, v: 7, e: 3, d: 0, gp: 28, gc: 11, form: ["v", "e", "v", "v", "e"], zone: "libertadores" },
            { pos: 3, team: "Atlético de Madrid", logo: "🔴⚪", p: 21, j: 10, v: 6, e: 3, d: 1, gp: 18, gc: 7, form: ["v", "v", "e", "d", "v"], zone: "libertadores" }
        ],
        scorers: [
            { name: "Kylian Mbappé", team: "Real Madrid", goals: 11, assists: 2, photo: "https://placehold.co/120x120/1e293b/10b981?text=Mbappe" },
            { name: "Robert Lewandowski", team: "Barcelona", goals: 10, assists: 3, photo: "https://placehold.co/120x120/1e293b/10b981?text=Lewandowski" }
        ]
    },
    seriea: {
        name: "Serie A TIM",
        shortName: "Serie A",
        country: "Itália",
        season: "Temporada 2026/27",
        bgIcon: "fa-star",
        matches: [
            { id: 401, home: "Inter de Milão", homeLogo: "⚫🔵", away: "Juventus", awayLogo: "⚪⚫", homeScore: 1, awayScore: 0, status: "AO VIVO", minute: "65'", isLive: true, venue: "San Siro" },
            { id: 402, home: "AC Milan", homeLogo: "🔴⚫", away: "Napoli", awayLogo: "🔵⚪", homeScore: 2, awayScore: 2, status: "ENCERRADO", minute: "90'", isLive: false, venue: "San Siro" }
        ],
        standings: [
            { pos: 1, team: "Inter de Milão", logo: "⚫🔵", p: 22, j: 9, v: 7, e: 1, d: 1, gp: 21, gc: 7, form: ["v", "v", "e", "v", "v"], zone: "libertadores" },
            { pos: 2, team: "Juventus", logo: "⚪⚫", p: 20, j: 9, v: 6, e: 2, d: 1, gp: 17, gc: 6, form: ["v", "v", "v", "e", "d"], zone: "libertadores" },
            { pos: 3, team: "AC Milan", logo: "🔴⚫", p: 18, j: 9, v: 5, e: 3, d: 1, gp: 19, gc: 11, form: ["e", "v", "v", "e", "v"], zone: "libertadores" }
        ],
        scorers: [
            { name: "Lautaro Martínez", team: "Inter de Milão", goals: 10, assists: 2, photo: "https://placehold.co/120x120/1e293b/10b981?text=Lautaro" },
            { name: "Dusan Vlahovic", team: "Juventus", goals: 8, assists: 1, photo: "https://placehold.co/120x120/1e293b/10b981?text=Vlahovic" }
        ]
    },
    champions: {
        name: "UEFA Champions League",
        shortName: "Champions",
        country: "Europa",
        season: "Fase de Liga 2026/27",
        bgIcon: "fa-trophy",
        matches: [
            { id: 301, home: "Bayern Munique", homeLogo: "🔴⚪", away: "Inter de Milão", awayLogo: "⚫🔵", homeScore: 1, awayScore: 0, status: "AO VIVO", minute: "54'", isLive: true, venue: "Allianz Arena" },
            { id: 302, home: "Paris Saint-Germain", homeLogo: "🔵🔴", away: "AC Milan", awayLogo: "🔴⚫", homeScore: 2, awayScore: 2, status: "AO VIVO", minute: "68'", isLive: true, venue: "Parc des Princes" }
        ],
        standings: [
            { pos: 1, team: "Bayern Munique", logo: "🔴⚪", p: 9, j: 3, v: 3, e: 0, d: 0, gp: 11, gc: 2, form: ["v", "v", "v"], zone: "libertadores" },
            { pos: 2, team: "Paris Saint-Germain", logo: "🔵🔴", p: 7, j: 3, v: 2, e: 1, d: 0, gp: 8, gc: 4, form: ["v", "v", "e"], zone: "libertadores" },
            { pos: 3, team: "Inter de Milão", logo: "⚫🔵", p: 6, j: 3, v: 2, e: 0, d: 1, gp: 5, gc: 3, form: ["v", "d", "v"], zone: "libertadores" }
        ],
        scorers: [
            { name: "Harry Kane", team: "Bayern Munique", goals: 6, assists: 2, photo: "https://placehold.co/120x120/1e293b/10b981?text=Kane" },
            { name: "Vinícius Jr", team: "Real Madrid", goals: 5, assists: 4, photo: "https://placehold.co/120x120/1e293b/10b981?text=ViniJr" }
        ]
    }
};

let currentLeagueKey = 'brasileirao';
let currentTab = 'matches';

// Initialize App on Load
window.onload = function() {
    const savedTheme = localStorage.getItem('mateus_theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.getElementById('themeIcon').className = "fa-solid fa-sun text-amber-500 text-base";
    } else {
        document.documentElement.classList.add('dark');
        document.getElementById('themeIcon').className = "fa-solid fa-moon text-base";
    }
    renderCurrentLeague();
};

// Theme Toggle Function
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('mateus_theme', isDark ? 'dark' : 'light');
    const icon = document.getElementById('themeIcon');
    if (isDark) {
        icon.className = "fa-solid fa-moon text-base";
    } else {
        icon.className = "fa-solid fa-sun text-amber-500 text-base";
    }
}

// Switch League
function switchLeague(leagueKey) {
    currentLeagueKey = leagueKey;
    
    document.querySelectorAll('.league-btn').forEach(btn => {
        if (btn.getAttribute('data-league') === leagueKey) {
            btn.className = "league-btn whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 bg-emerald-600 text-white shadow-md shadow-emerald-900/20";
        } else {
            btn.className = "league-btn whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 bg-lightmode-card dark:bg-darkmode-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-lightmode-border dark:border-darkmode-border";
        }
    });

    renderCurrentLeague();
    showToast("Liga alterada", `Exibindo dados de ${leaguesData[leagueKey].name}`);
}

// Switch Tabs (Matches / Table / Scorers)
function switchTab(tabName) {
    currentTab = tabName;
    
    const btnMatches = document.getElementById('tabMatchesBtn');
    const btnTable = document.getElementById('tabTableBtn');
    const btnScorers = document.getElementById('tabScorersBtn');

    const secMatches = document.getElementById('sectionMatches');
    const secTable = document.getElementById('sectionTable');
    const secScorers = document.getElementById('sectionScorers');

    const activeClass = "flex-1 md:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-emerald-600 text-white shadow";
    const inactiveClass = "flex-1 md:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";

    btnMatches.className = inactiveClass;
    btnTable.className = inactiveClass;
    btnScorers.className = inactiveClass;

    secMatches.classList.add('hidden');
    secTable.classList.add('hidden');
    secScorers.classList.add('hidden');

    if (tabName === 'matches') {
        btnMatches.className = activeClass;
        secMatches.classList.remove('hidden');
    } else if (tabName === 'table') {
        btnTable.className = activeClass;
        secTable.classList.remove('hidden');
    } else if (tabName === 'scorers') {
        btnScorers.className = activeClass;
        secScorers.classList.remove('hidden');
    }
}

// Render League Data
function renderCurrentLeague() {
    const league = leaguesData[currentLeagueKey];

    document.getElementById('bannerCountry').innerText = league.country;
    document.getElementById('bannerSeason').innerText = league.season;
    document.getElementById('leagueTitle').innerText = league.name;
    document.getElementById('bannerBgIcon').className = `fa-solid ${league.bgIcon}`;

    renderMatches();
    renderStandings();
    renderScorers();
}

// Render Matches
function renderMatches() {
    const league = leaguesData[currentLeagueKey];
    const container = document.getElementById('matchesContainer');
    container.innerHTML = '';

    league.matches.forEach(m => {
        let statusBadge = '';
        if (m.isLive) {
            statusBadge = `<span class="bg-red-500/10 text-red-500 border border-red-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5">
                <span class="w-2 h-2 rounded-full bg-red-500 pulse-live"></span>
                <span>${m.status} • ${m.minute}</span>
            </span>`;
        } else if (m.status === 'ENCERRADO') {
            statusBadge = `<span class="bg-slate-500/10 text-slate-500 border border-slate-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">Fim de Jogo</span>`;
        } else {
            statusBadge = `<span class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">${m.status}</span>`;
        }

        const card = document.createElement('div');
        card.className = "bg-lightmode-card dark:bg-darkmode-card border border-lightmode-border dark:border-darkmode-border rounded-2xl p-5 shadow-lg hover:border-emerald-500/50 transition flex flex-col justify-between space-y-4";
        card.innerHTML = `
            <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span class="truncate max-w-[180px]"><i class="fa-solid fa-location-dot mr-1 text-emerald-500"></i> ${m.venue}</span>
                ${statusBadge}
            </div>
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">${m.homeLogo}</span>
                        <span class="font-bold text-slate-800 dark:text-slate-100 text-base">${m.home}</span>
                    </div>
                    <span class="text-2xl font-black text-slate-900 dark:text-white">${m.homeScore}</span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">${m.awayLogo}</span>
                        <span class="font-bold text-slate-800 dark:text-slate-100 text-base">${m.away}</span>
                    </div>
                    <span class="text-2xl font-black text-slate-900 dark:text-white">${m.awayScore}</span>
                </div>
            </div>
            <div class="pt-3 border-t border-lightmode-border dark:border-darkmode-border flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Mateus da bola Ao Vivo</span>
                <button onclick="simulateGoal(${m.id})" class="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"><i class="fa-solid fa-bolt mr-1"></i> Simular Lance</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Standings Table
function renderStandings() {
    const league = leaguesData[currentLeagueKey];
    const tbody = document.getElementById('standingsBody');
    tbody.innerHTML = '';

    league.standings.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-lightmode-hover dark:hover:bg-darkmode-hover transition-colors";

        let zoneColor = 'border-l-4 border-transparent';
        if (row.zone === 'libertadores') zoneColor = 'border-l-4 border-blue-500';
        else if (row.zone === 'pre-libertadores') zoneColor = 'border-l-4 border-amber-500';
        else if (row.zone === 'sul-americana') zoneColor = 'border-l-4 border-emerald-500';
        else if (row.zone === 'rebaixamento') zoneColor = 'border-l-4 border-red-500';

        tr.className += ` ${zoneColor}`;

        let formHtml = '<div class="flex space-x-1 justify-center">';
        row.form.forEach(res => {
            if (res === 'v') formHtml += '<span class="w-5 h-5 rounded bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">V</span>';
            else if (res === 'e') formHtml += '<span class="w-5 h-5 rounded bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">E</span>';
            else formHtml += '<span class="w-5 h-5 rounded bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">D</span>';
        });
        formHtml += '</div>';

        const sg = row.gp - row.gc;
        const sgFormatted = sg > 0 ? `+${sg}` : sg;

        tr.innerHTML = `
            <td class="py-3 px-4 text-center font-bold text-slate-600 dark:text-slate-400">${row.pos}</td>
            <td class="py-3 px-4">
                <div class="flex items-center space-x-3">
                    <span class="text-xl">${row.logo}</span>
                    <span class="font-bold text-slate-900 dark:text-white">${row.team}</span>
                </div>
            </td>
            <td class="py-3 px-3 text-center font-black text-emerald-600 dark:text-emerald-400">${row.p}</td>
            <td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">${row.j}</td>
            <td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">${row.v}</td>
            <td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">${row.e}</td>
            <td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">${row.d}</td>
            <td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">${row.gp}</td>
            <td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">${row.gc}</td>
            <td class="py-3 px-3 text-center font-semibold text-slate-700 dark:text-slate-300">${sgFormatted}</td>
            <td class="py-3 px-4 text-center">${formHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Render Scorers
function renderScorers() {
    const league = leaguesData[currentLeagueKey];
    const container = document.getElementById('scorersContainer');
    container.innerHTML = '';

    league.scorers.forEach((s, index) => {
        const card = document.createElement('div');
        card.className = "bg-lightmode-card dark:bg-darkmode-card border border-lightmode-border dark:border-darkmode-border rounded-2xl p-5 shadow-lg flex items-center space-x-4 relative overflow-hidden";
        
        let badgeColor = "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200";
        if (index === 0) badgeColor = "bg-amber-400 text-slate-900 font-extrabold";
        else if (index === 1) badgeColor = "bg-slate-300 text-slate-800 font-extrabold";
        else if (index === 2) badgeColor = "bg-amber-700 text-white font-extrabold";

        card.innerHTML = `
            <div class="absolute top-3 right-3 w-8 h-8 rounded-xl ${badgeColor} flex items-center justify-center text-sm shadow">
                #${index + 1}
            </div>
            <img src="${s.photo}" alt="${s.name}" class="w-16 h-16 rounded-xl object-cover bg-slate-800 border border-lightmode-border dark:border-darkmode-border shadow">
            <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-base">${s.name}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">${s.team}</p>
                <div class="flex items-center space-x-3 text-xs">
                    <span class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                        <i class="fa-solid fa-futbol mr-1"></i> ${s.goals} Gols
                    </span>
                    <span class="bg-slate-500/10 text-slate-600 dark:text-slate-400 font-semibold px-2.5 py-1 rounded-lg">
                        <i class="fa-solid fa-hands-holding-child mr-1"></i> ${s.assists} Assist.
                    </span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Simulate Goal Live Action
function simulateGoal(matchId) {
    const league = leaguesData[currentLeagueKey];
    const match = league.matches.find(m => m.id === matchId);
    if (match) {
        if (Math.random() > 0.5) {
            match.homeScore++;
            showToast("GOOOOOOL!", `${match.home} marcou contra o ${match.away}!`);
        } else {
            match.awayScore++;
            showToast("GOOOOOOL!", `${match.away} marcou contra o ${match.home}!`);
        }
        renderMatches();
    }
}

// Refresh Data Simulation
function refreshData() {
    const icon = document.getElementById('refreshIcon');
    icon.classList.add('rotate-180');
    setTimeout(() => {
        icon.classList.remove('rotate-180');
    }, 500);

    const league = leaguesData[currentLeagueKey];
    league.matches.forEach(m => {
        if (m.isLive) {
            if (Math.random() > 0.7) m.homeScore += 1;
        }
    });

    renderCurrentLeague();
    showToast("Placares Atualizados", "Todos os dados foram sincronizados com sucesso.");
}

// Toast notification helper
function showToast(title, msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').innerText = title;
    document.getElementById('toastMsg').innerText = msg;
    
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3500);
}