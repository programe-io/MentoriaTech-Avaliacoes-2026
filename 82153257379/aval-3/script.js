
const matches = [
  {
    league: "BRASILEIRÃO",
    category: "brasileirao",
    home: "Flamengo",
    away: "Palmeiras",
    homeIcon: "🔴",
    awayIcon: "🟢",
    score: "2 × 1",
    status: "Exemplo",
    info: "Partida demonstrativa"
  },
  {
    league: "BRASILEIRÃO",
    category: "brasileirao",
    home: "Corinthians",
    away: "São Paulo",
    homeIcon: "⚫",
    awayIcon: "🔴",
    score: "1 × 1",
    status: "Exemplo",
    info: "Partida demonstrativa"
  },
  {
    league: "INTERNACIONAL",
    category: "internacional",
    home: "Real Madrid",
    away: "Barcelona",
    homeIcon: "⚪",
    awayIcon: "🔵",
    score: "2 × 2",
    status: "Exemplo",
    info: "Clássico demonstrativo"
  },
  {
    league: "INTERNACIONAL",
    category: "internacional",
    home: "Liverpool",
    away: "Man. City",
    homeIcon: "🔴",
    awayIcon: "🔵",
    score: "0 × 1",
    status: "Exemplo",
    info: "Partida demonstrativa"
  },
  {
    league: "BRASILEIRÃO",
    category: "brasileirao",
    home: "Grêmio",
    away: "Internacional",
    homeIcon: "🔵",
    awayIcon: "🔴",
    score: "1 × 0",
    status: "Exemplo",
    info: "Clássico demonstrativo"
  },
  {
    league: "INTERNACIONAL",
    category: "internacional",
    home: "PSG",
    away: "Bayern",
    homeIcon: "🔵",
    awayIcon: "🔴",
    score: "1 × 2",
    status: "Exemplo",
    info: "Partida demonstrativa"
  }
];

const standings = [
  { name: "Flamengo", icon: "🔴", pts: 40, games: 18, wins: 12, gd: 18 },
  { name: "Palmeiras", icon: "🟢", pts: 37, games: 18, wins: 11, gd: 15 },
  { name: "Corinthians", icon: "⚫", pts: 34, games: 18, wins: 10, gd: 9 },
  { name: "São Paulo", icon: "🔴", pts: 31, games: 18, wins: 9, gd: 7 },
  { name: "Grêmio", icon: "🔵", pts: 28, games: 18, wins: 8, gd: 4 }
];

const matchGrid = document.getElementById("match-grid");
const tabs = document.getElementById("match-tabs");
const standingsBody = document.getElementById("standings-body");

function renderMatches(filter = "todos") {
  const filtered = filter === "todos"
    ? matches
    : matches.filter(match => match.category === filter);

  matchGrid.innerHTML = filtered.map(match => `
    <article class="match-card">
      <div>
        <span class="league-name">${match.league}</span>
        <span class="match-status">${match.status}</span>
      </div>

      <div class="teams">
        <div class="team">
          <div class="team-icon">${match.homeIcon}</div>
          ${match.home}
        </div>

        <div class="score">${match.score}</div>

        <div class="team">
          <div class="team-icon">${match.awayIcon}</div>
          ${match.away}
        </div>
      </div>

      <div class="match-footer">${match.info}</div>
    </article>
  `).join("");
}

function renderStandings() {
  standingsBody.innerHTML = standings.map((team, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${team.icon} ${team.name}</td>
      <td><strong>${team.pts}</strong></td>
      <td>${team.games}</td>
      <td>${team.wins}</td>
      <td>${team.gd > 0 ? "+" : ""}${team.gd}</td>
    </tr>
  `).join("");
}

tabs.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab === button);
  });

  renderMatches(button.dataset.filter);
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderMatches();
renderStandings();
