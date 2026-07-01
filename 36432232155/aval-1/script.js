/* ===== DATA ===== */
const teams = [
  { name: 'Real Madrid', flag: '🇪🇸', country: 'Espanha' },
  { name: 'Barcelona', flag: '🇪🇸', country: 'Espanha' },
  { name: 'Manchester City', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'Inglaterra' },
  { name: 'Bayern de Munique', flag: '🇩🇪', country: 'Alemanha' },
  { name: 'Liverpool', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'Inglaterra' },
  { name: 'AC Milan', flag: '🇮🇹', country: 'Itália' },
  { name: 'Ajax', flag: '🇳🇱', country: 'Holanda' },
  { name: 'Juventus', flag: '🇮🇹', country: 'Itália' },
  { name: 'Paris Saint-Germain', flag: '🇫🇷', country: 'França' },
  { name: 'Borussia Dortmund', flag: '🇩🇪', country: 'Alemanha' },
  { name: 'Chelsea', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'Inglaterra' },
  { name: 'Inter de Milão', flag: '🇮🇹', country: 'Itália' },
  { name: 'Arsenal', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'Inglaterra' },
  { name: 'Benfica', flag: '🇵🇹', country: 'Portugal' },
  { name: 'Porto', flag: '🇵🇹', country: 'Portugal' },
  { name: 'Celtic', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', country: 'Escócia' },
];

const matches = [
  { team1: { name: 'Real Madrid', flag: '🇪🇸' }, team2: { name: 'Manchester City', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, date: '12/04/2026', time: '16:00', stage: 'Quartas de Final' },
  { team1: { name: 'Bayern de Munique', flag: '🇩🇪' }, team2: { name: 'Arsenal', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, date: '12/04/2026', time: '16:00', stage: 'Quartas de Final' },
  { team1: { name: 'Paris Saint-Germain', flag: '🇫🇷' }, team2: { name: 'Barcelona', flag: '🇪🇸' }, date: '13/04/2026', time: '16:00', stage: 'Quartas de Final' },
  { team1: { name: 'Inter de Milão', flag: '🇮🇹' }, team2: { name: 'Liverpool', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, date: '13/04/2026', time: '16:00', stage: 'Quartas de Final' },
  { team1: { name: 'Borussia Dortmund', flag: '🇩🇪' }, team2: { name: 'Chelsea', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, date: '15/04/2026', time: '16:00', stage: 'Playoffs' },
  { team1: { name: 'AC Milan', flag: '🇮🇹' }, team2: { name: 'Juventus', flag: '🇮🇹' }, date: '15/04/2026', time: '16:00', stage: 'Playoffs' },
];

const scorers = [
  { name: 'Cristiano Ronaldo', goals: 140, clubs: 'Manchester United, Real Madrid, Juventus' },
  { name: 'Lionel Messi', goals: 129, clubs: 'Barcelona, Paris Saint-Germain' },
  { name: 'Robert Lewandowski', goals: 94, clubs: 'Borussia Dortmund, Bayern de Munique, Barcelona' },
  { name: 'Karim Benzema', goals: 90, clubs: 'Lyon, Real Madrid' },
  { name: 'Raúl González', goals: 71, clubs: 'Real Madrid, Schalke 04' },
  { name: 'Ruud van Nistelrooy', goals: 60, clubs: 'PSV, Manchester United, Real Madrid' },
  { name: 'Thomas Müller', goals: 55, clubs: 'Bayern de Munique' },
  { name: 'Thierry Henry', goals: 51, clubs: 'Arsenal, Barcelona' },
  { name: 'Alfredo Di Stéfano', goals: 49, clubs: 'Real Madrid' },
  { name: 'Zlatan Ibrahimović', goals: 48, clubs: 'Ajax, Juventus, Inter, Barcelona, AC Milan, PSG' },
];

const historyData = [
  { year: '1955', title: 'Fundação da Competição', desc: 'A Copa dos Campeões Europeus é criada, inspirando-se no sucesso de torneios amistosos entre campeões nacionais. O primeiro campeão foi o Real Madrid.' },
  { year: '1960', title: 'Cinco Títulos Consecutivos do Real Madrid', desc: 'O Real Madrid conquista seu quinto título consecutivo, um recorde que permanece até hoje. Di Stéfano e Puskás brilham na final contra o Eintracht Frankfurt por 7-3.' },
  { year: '1992', title: 'Nascimento da Champions League', desc: 'A competição é reformulada, ganhando o nome UEFA Champions League, com nova identidade visual, hino icônico e fase de grupos.' },
  { year: '1999', title: 'A Virada do United', desc: 'Manchester United vira sobre o Bayern de Munique nos acréscimos com dois gols (Sheringham e Solskjær) na final de Barcelona. Um dos finais mais emocionantes da história.' },
  { year: '2005', title: 'Milagre de Istambul', desc: 'Liverpool perde por 3-0 no primeiro tempo para o AC Milan e busca um empate épico no segundo tempo, vencendo nos pênaltis. A "Noite de Istambul" entra para a lenda.' },
  { year: '2014', title: 'La Décima do Real Madrid', desc: 'Real Madrid conquista sua 10ª taça ao vencer o Atlético de Madrid na prorrogação por 4-1, graças ao gol de cabeça de Sergio Ramos nos acréscimos.' },
  { year: '2020', title: 'Pandemia e Final em Lisboa', desc: 'A competição é paralisada pela COVID-19 e retorna em formato de final 8 em Lisboa. Bayern de Munique vence o PSG na final com gol de Coman.' },
  { year: '2024', title: 'Nova Era com Formato Expandido', desc: 'A Champions League adota novo formato com 36 clubes na fase de liga única, prometendo mais confrontos de alto nível entre os gigantes europeus.' },
];

/* ===== RENDER ===== */

// Teams
function renderTeams() {
  const grid = document.getElementById('teamsGrid');
  if (!grid) return;
  grid.innerHTML = teams.map(t => `
    <div class="team-card">
      <span class="team-flag">${t.flag}</span>
      <div class="team-name">${t.name}</div>
      <div class="team-country">${t.country}</div>
    </div>
  `).join('');
}

// Matches
function renderMatches() {
  const list = document.getElementById('matchesList');
  if (!list) return;
  list.innerHTML = matches.map(m => `
    <div class="match-card">
      <div class="match-teams">
        <div class="match-team"><span>${m.team1.flag}</span> ${m.team1.name}</div>
        <div class="match-vs">VS</div>
        <div class="match-team"><span>${m.team2.flag}</span> ${m.team2.name}</div>
      </div>
      <div class="match-info">
        <span class="match-score-badge">${m.stage}</span>
        <span class="match-date">📅 ${m.date} · ${m.time}</span>
      </div>
    </div>
  `).join('');
}

// Scorers
function renderScorers() {
  const tbody = document.getElementById('scorersBody');
  if (!tbody) return;
  tbody.innerHTML = scorers.map((s, i) => `
    <tr>
      <td class="scorer-rank">${i + 1}</td>
      <td class="scorer-name">${s.name}</td>
      <td>${s.goals}</td>
      <td class="scorer-clubs">${s.clubs}</td>
    </tr>
  `).join('');
}

// History
function renderHistory() {
  const timeline = document.getElementById('historyTimeline');
  if (!timeline) return;
  timeline.innerHTML = historyData.map(h => `
    <div class="history-card">
      <div class="history-year">${h.year}</div>
      <div class="history-title">${h.title}</div>
      <div class="history-desc">${h.desc}</div>
    </div>
  `).join('');
}

/* ===== NAV ===== */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const links = document.querySelectorAll('[data-nav]');
  const navbar = document.getElementById('navbar');

  // Toggle mobile menu
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Close menu on nav link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      // Update active link
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Highlight active section on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderTeams();
  renderMatches();
  renderScorers();
  renderHistory();
  initNav();
});
