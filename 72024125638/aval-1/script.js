// ========== DADOS ==========

const campeoes = [
  { pos: 1, clube: "Independiente", pais: "🇦🇷 Argentina", titulos: 7, ultimo: 1984 },
  { pos: 2, clube: "Boca Juniors", pais: "🇦🇷 Argentina", titulos: 6, ultimo: 2007 },
  { pos: 3, clube: "Peñarol", pais: "🇺🇾 Uruguai", titulos: 5, ultimo: 1987 },
  { pos: 4, clube: "River Plate", pais: "🇦🇷 Argentina", titulos: 4, ultimo: 2018 },
  { pos: 5, clube: "Estudiantes", pais: "🇦🇷 Argentina", titulos: 4, ultimo: 2009 },
  { pos: 6, clube: "Olimpia", pais: "🇵🇾 Paraguai", titulos: 3, ultimo: 2002 },
  { pos: 7, clube: "Nacional", pais: "🇺🇾 Uruguai", titulos: 3, ultimo: 1988 },
  { pos: 8, clube: "Flamengo", pais: "🇧🇷 Brasil", titulos: 3, ultimo: 2022 },
  { pos: 9, clube: "Santos", pais: "🇧🇷 Brasil", titulos: 3, ultimo: 2011 },
  { pos: 10, clube: "São Paulo", pais: "🇧🇷 Brasil", titulos: 3, ultimo: 2005 },
  { pos: 11, clube: "Palmeiras", pais: "🇧🇷 Brasil", titulos: 3, ultimo: 2021 },
  { pos: 12, clube: "Grêmio", pais: "🇧🇷 Brasil", titulos: 3, ultimo: 2017 },
];

const grupos = [
  {
    letra: "A",
    times: ["Palmeiras", "Cerro Porteño", "Independiente del Valle", "Universitario"],
  },
  {
    letra: "B",
    times: ["River Plate", "Nacional", "Flamengo", "Barcelona"],
  },
  {
    letra: "C",
    times: ["São Paulo", "Peñarol", "Atlético-MG", "Colo-Colo"],
  },
  {
    letra: "D",
    times: ["Boca Juniors", "LDU Quito", "Fluminense", "The Strongest"],
  },
  {
    letra: "E",
    times: ["Grêmio", "Olimpia", "Libertad", "Melgar"],
  },
  {
    letra: "F",
    times: ["Internacional", "Racing", "Sporting Cristal", "Alianza Lima"],
  },
  {
    letra: "G",
    times: ["Corinthians", "Atlético Nacional", "Defensa y Justicia", "Deportivo Táchira"],
  },
  {
    letra: "H",
    times: ["Cruzeiro", "Estudiantes", "Real Garcilaso", "Caracas"],
  },
];

const artilheiros = [
  { pos: 1, jogador: "Alberto Spencer", pais: "🇪🇨 Equador", gols: 54, periodo: "1960–1972" },
  { pos: 2, jogador: "Fernando Morena", pais: "🇺🇾 Uruguai", gols: 37, periodo: "1973–1986" },
  { pos: 3, jogador: "Pedro Virgilio Rocha", pais: "🇺🇾 Uruguai", gols: 36, periodo: "1963–1978" },
  { pos: 4, jogador: "Daniel Onega", pais: "🇦🇷 Argentina", gols: 31, periodo: "1965–1969" },
  { pos: 5, jogador: "Julio Morales", pais: "🇺🇾 Uruguai", gols: 30, periodo: "1966–1981" },
  { pos: 6, jogador: "Antonio Angelillo", pais: "🇦🇷 Argentina", gols: 29, periodo: "1960–1966" },
  { pos: 7, jogador: "Juan Carlos Sarnari", pais: "🇦🇷 Argentina", gols: 28, periodo: "1964–1974" },
  { pos: 8, jogador: "Oswaldo Ramírez", pais: "🇵🇪 Peru", gols: 28, periodo: "1966–1977" },
  { pos: 9, jogador: "Gabriel Barbosa (Gabigol)", pais: "🇧🇷 Brasil", gols: 26, periodo: "2019–presente" },
  { pos: 10, jogador: "Luis Suárez", pais: "🇺🇾 Uruguai", gols: 26, periodo: "2010–presente" },
];

// ========== RENDERIZAÇÃO ==========

function renderCampeoes() {
  const tbody = document.getElementById("campeoes-body");
  tbody.innerHTML = campeoes
    .map(
      (c) => `
    <tr>
      <td>${c.pos}</td>
      <td><strong>${c.clube}</strong></td>
      <td>${c.pais}</td>
      <td>${c.titulos}</td>
      <td>${c.ultimo}</td>
    </tr>
  `
    )
    .join("");
}

function renderGrupos() {
  const grid = document.getElementById("grupos-grid");
  grid.innerHTML = grupos
    .map(
      (g) => `
    <div class="grupo-card">
      <div class="grupo-header">
        <span>GRUPO ${g.letra}</span>
        <span>🟡🔵</span>
      </div>
      <ul class="grupo-times">
        ${g.times.map((t) => `<li>${t}</li>`).join("")}
      </ul>
    </div>
  `
    )
    .join("");
}

function renderArtilheiros() {
  const tbody = document.getElementById("artilheiros-body");
  tbody.innerHTML = artilheiros
    .map(
      (a) => `
    <tr>
      <td>${a.pos}</td>
      <td><strong>${a.jogador}</strong></td>
      <td>${a.pais}</td>
      <td>${a.gols}</td>
      <td>${a.periodo}</td>
    </tr>
  `
    )
    .join("");
}

// ========== NAVEGAÇÃO SUAVE COM OFFSET ==========

document.querySelectorAll("[data-nav]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    const offset = document.getElementById("nav").offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ========== ANIMAÇÃO SCROLL REVEAL ==========

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section, .hero").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// Adiciona CSS de animação inline via JS pra evitar arquivo extra
const styleAnim = document.createElement("style");
styleAnim.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(styleAnim);

// ========== INICIALIZA ==========

document.addEventListener("DOMContentLoaded", () => {
  renderCampeoes();
  renderGrupos();
  renderArtilheiros();
});
