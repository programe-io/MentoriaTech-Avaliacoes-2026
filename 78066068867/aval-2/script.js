

const filmes = [
  { nome: "Interestelar", tipo: "Filme", ano: 2014, poster: "gEU2QniE6E77NI6lCU6MxlNBvIx", desc: "Uma missão espacial em busca de um futuro para a humanidade." },
  { nome: "Barbie", tipo: "Filme", ano: 2023, poster: "iuFNMS8U5cb6xfzi51Dbkovj7vM", desc: "Uma aventura sobre descobertas, identidade e confiança." },
  { nome: "Oppenheimer", tipo: "Filme", ano: 2023, poster: "ptpr0kGAckfQkJeJIt8st5dglvd", desc: "Drama biográfico sobre o físico J. Robert Oppenheimer." },
  { nome: "Coringa", tipo: "Filme", ano: 2019, poster: "udDclJoHjfjb8Ekgsd4FDteOkCU", desc: "Um drama psicológico ambientado em Gotham City." },
  { nome: "Stranger Things", tipo: "Série", ano: 2016, poster: "x2LSRK2Cm7MZhjluni1msVJ3wDF", desc: "Amigos investigam acontecimentos sobrenaturais." },
  { nome: "Wandinha", tipo: "Série", ano: 2022, poster: "9PFonBhy4cQy7Jz20NpMygczOkv", desc: "Mistérios e aventuras na escola Nunca Mais." },
  { nome: "The Last of Us", tipo: "Série", ano: 2023, poster: "uKvVjHNqB5VmOrdxqAt2F7J78ED", desc: "Uma jornada de sobrevivência em um mundo devastado." }
];

const favoritos = JSON.parse(localStorage.getItem("wakanda-favoritos") || "[]");
let tipoAtual = "Todos";
let atual = null;

const urlPoster = id => `https://image.tmdb.org/t/p/w500/${id}.jpg`;
const busca = document.querySelector("#busca");
const filmesBox = document.querySelector("#catalogo-filmes");
const seriesBox = document.querySelector("#catalogo-series");
const modal = document.querySelector("#modal");

function criarCard(f, i) {
  return `<article class="card">
    <img src="${urlPoster(f.poster)}" alt="Pôster de ${f.nome}" loading="lazy">
    <div class="card-info">
      <h3>${f.nome}</h3>
      <p>${f.tipo} • ${f.ano}</p>
      <button onclick="detalhes(${i})">Ver detalhes</button>
      <button onclick="favoritar(${i})">${favoritos.includes(f.nome) ? "❤️ Salvo" : "♡ Favoritar"}</button>
    </div>
  </article>`;
}

function renderizar() {
  const termo = busca.value.toLowerCase();
  const lista = filmes.map((f, i) => ({ ...f, i })).filter(f =>
    f.nome.toLowerCase().includes(termo) &&
    (tipoAtual === "Todos" || f.tipo === tipoAtual)
  );

  filmesBox.innerHTML = lista.filter(f => f.tipo === "Filme").map(f => criarCard(f, f.i)).join("");
  seriesBox.innerHTML = lista.filter(f => f.tipo === "Série").map(f => criarCard(f, f.i)).join("");

  document.querySelector("#lista-top").innerHTML = filmes.slice(0, 10).map((f, i) =>
    `<li><span>${String(i + 1).padStart(2, "0")}</span>${f.nome} — ${f.tipo}</li>`
  ).join("");
}

function detalhes(i) {
  atual = filmes[i];
  document.querySelector("#poster-modal").src = urlPoster(atual.poster);
  document.querySelector("#titulo-modal").textContent = atual.nome;
  document.querySelector("#descricao-modal").textContent = atual.desc;
  atualizarBotao();
  modal.hidden = false;
}

function atualizarBotao() {
  document.querySelector("#favoritar-modal").textContent =
    favoritos.includes(atual.nome) ? "❤️ Remover favorito" : "♡ Favoritar";
}

function favoritar(i) {
  const nome = filmes[i].nome;
  const pos = favoritos.indexOf(nome);
  if (pos >= 0) favoritos.splice(pos, 1);
  else favoritos.push(nome);
  localStorage.setItem("wakanda-favoritos", JSON.stringify(favoritos));
  renderizar();
  if (atual) atualizarBotao();
}

document.querySelector("#favoritar-modal").addEventListener("click", () => {
  if (atual) favoritar(filmes.indexOf(atual));
});

document.querySelector("#fechar").addEventListener("click", () => modal.hidden = true);
modal.addEventListener("click", e => { if (e.target === modal) modal.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.hidden = true; });
busca.addEventListener("input", renderizar);

document.querySelectorAll(".filtros button").forEach(botao => {
  botao.addEventListener("click", () => {
    tipoAtual = botao.dataset.tipo;
    document.querySelectorAll(".filtros button").forEach(b => b.classList.toggle("ativo", b === botao));
    renderizar();
  });
});

document.querySelector("#menu-btn").addEventListener("click", e => {
  document.querySelector("#menu").classList.toggle("open");
  e.currentTarget.textContent = document.querySelector("#menu").classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => {
  document.querySelector("#menu").classList.remove("open");
  document.querySelector("#menu-btn").textContent = "☰";
}));

renderizar();
