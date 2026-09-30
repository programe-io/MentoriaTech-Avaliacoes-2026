"use strict";

/* ---------- Dados ---------- */
const CHAVE = "conexao-estado-v1";
const VOCE = { nome: "Você", handle: "@voce" };

const PESSOAS = [
  { nome: "Marina Lopes", handle: "@marina", cor: "#4b3fd6" },
  { nome: "Caio Ribeiro", handle: "@caio", cor: "#0f8a7a" },
  { nome: "Dona Iracema", handle: "@iracema", cor: "#c2410c" },
  { nome: "Beatriz Nunes", handle: "@bia", cor: "#b0287a" },
  { nome: "Tiago Farias", handle: "@tiago", cor: "#2b6cb0" },
];

const agora = Date.now();
const min = 60 * 1000;

const estadoInicial = () => ({
  seguindo: ["@marina", "@caio"],
  posts: [
    { id: 1, handle: "@marina", criado: agora - 12 * min, texto: "Primeiro dia testando o app de vocês. Bem mais leve do que eu esperava! #novidade", curtidas: ["@caio"], comentarios: [{ handle: "@caio", texto: "Bem-vinda!" }] },
    { id: 2, handle: "@caio", criado: agora - 95 * min, texto: "Alguém indica um bom livro sobre design de interfaces? #livros #design", curtidas: [], comentarios: [] },
    { id: 3, handle: "@iracema", criado: agora - 300 * min, texto: "Fiz bolo de milho hoje e sobrou. Quem quiser passar aqui, a porta está aberta. #receitas", curtidas: ["@marina", "@bia", "@tiago"], comentarios: [] },
    { id: 4, handle: "@bia", criado: agora - 1500 * min, texto: "Terminei minha primeira corrida de 5 km. Devagar, mas terminei. #corrida", curtidas: ["@voce"], comentarios: [] },
  ],
});

let estado = carregar();
let aba = "todos";
let filtroTag = "";

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && Array.isArray(salvo.posts)) return salvo;
  } catch (e) { /* sem armazenamento: usa dados iniciais */ }
  return estadoInicial();
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* ignora */ }
}

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);

function pessoa(handle) {
  return PESSOAS.find((p) => p.handle === handle) || { ...VOCE, cor: "#25213f" };
}

function tempo(ts) {
  const m = Math.floor((Date.now() - ts) / min);
  if (m < 1) return "agora";
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.floor(h / 24)} d`;
}

function avatar(p, extra = "") {
  const a = document.createElement("span");
  a.className = "avatar " + extra;
  a.style.background = p.cor;
  a.textContent = p.nome.trim()[0].toUpperCase();
  a.setAttribute("aria-hidden", "true");
  return a;
}

function tag(tipo, props = {}, texto) {
  const e = document.createElement(tipo);
  Object.assign(e, props);
  if (texto !== undefined) e.textContent = texto;
  return e;
}

// Converte o texto em nós seguros, transformando #assuntos em botões
function textoComTags(texto) {
  const frag = document.createDocumentFragment();
  texto.split(/(#[\p{L}\p{N}_]+)/u).forEach((parte) => {
    if (parte.startsWith("#")) {
      const b = tag("button", { type: "button", className: "tag" }, parte);
      b.addEventListener("click", () => filtrarTag(parte.toLowerCase()));
      frag.append(b);
    } else frag.append(document.createTextNode(parte));
  });
  return frag;
}

/* ---------- Renderização ---------- */
function postsVisiveis() {
  const termo = $("busca").value.trim().toLowerCase();
  return estado.posts
    .filter((p) => aba === "todos" || estado.seguindo.includes(p.handle) || p.handle === VOCE.handle)
    .filter((p) => !filtroTag || p.texto.toLowerCase().includes(filtroTag))
    .filter((p) => !termo || p.texto.toLowerCase().includes(termo))
    .sort((a, b) => b.criado - a.criado);
}

function desenharFeed() {
  const feed = $("feed");
  feed.replaceChildren();
  const lista = postsVisiveis();

  for (const p of lista) {
    const autor = pessoa(p.handle);
    const art = tag("article", { className: "cartao post" });

    const cab = tag("header");
    const info = tag("div");
    info.append(tag("strong", {}, autor.nome), document.createElement("br"),
      tag("small", {}, `${autor.handle} · ${tempo(p.criado)}`));
    cab.append(avatar(autor), info);
    if (p.handle === VOCE.handle) {
      const del = tag("button", { type: "button", className: "fantasma" }, "Excluir");
      del.setAttribute("aria-label", "Excluir publicação");
      del.addEventListener("click", () => { estado.posts = estado.posts.filter((x) => x.id !== p.id); atualizar(); });
      cab.append(del);
    }

    const corpo = tag("p");
    corpo.append(textoComTags(p.texto));

    const curtiu = p.curtidas.includes(VOCE.handle);
    const acoes = tag("div", { className: "acoes" });
    const bCurtir = tag("button", { type: "button" }, `${curtiu ? "Curtido" : "Curtir"} (${p.curtidas.length})`);
    bCurtir.setAttribute("aria-pressed", String(curtiu));
    bCurtir.addEventListener("click", () => {
      p.curtidas = curtiu ? p.curtidas.filter((h) => h !== VOCE.handle) : [...p.curtidas, VOCE.handle];
      atualizar();
    });
    const bComent = tag("button", { type: "button" }, `Comentar (${p.comentarios.length})`);
    acoes.append(bCurtir, bComent);

    const caixa = tag("div", { className: "comentarios" });
    caixa.hidden = !p.aberto;
    for (const c of p.comentarios) {
      const linha = tag("div", { className: "comentario" });
      linha.append(tag("b", {}, pessoa(c.handle).nome + ": "), document.createTextNode(c.texto));
      caixa.append(linha);
    }
    const f = tag("form", { className: "form-comentario" });
    const campo = tag("input", { type: "text", maxLength: 140, placeholder: "Escreva um comentário" });
    campo.setAttribute("aria-label", "Comentário");
    f.append(campo, tag("button", { type: "submit" }, "Enviar"));
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = campo.value.trim();
      if (!t) return;
      p.comentarios.push({ handle: VOCE.handle, texto: t });
      p.aberto = true;
      atualizar();
    });
    caixa.append(f);
    bComent.addEventListener("click", () => { p.aberto = !p.aberto; caixa.hidden = !p.aberto; });

    art.append(cab, corpo, acoes, caixa);
    feed.append(art);
  }

  const vazio = $("vazio");
  vazio.hidden = lista.length > 0;
  vazio.textContent = aba === "seguindo"
    ? "Ninguém que você segue publicou ainda. Siga pessoas na coluna ao lado."
    : "Nada encontrado. Limpe a busca ou o filtro de assunto.";
}

function desenharLaterais() {
  $("perfil-nome").textContent = VOCE.nome;
  $("perfil-handle").textContent = VOCE.handle;
  const pa = $("perfil-avatar");
  pa.replaceChildren();
  Object.assign(pa.style, { background: "#25213f" });
  pa.className = "avatar grande";
  pa.textContent = "V";
  $("est-posts").textContent = estado.posts.filter((p) => p.handle === VOCE.handle).length;
  $("est-seguindo").textContent = estado.seguindo.length;

  const sug = $("sugestoes");
  sug.replaceChildren();
  for (const p of PESSOAS) {
    const segue = estado.seguindo.includes(p.handle);
    const li = tag("li");
    const info = tag("div");
    info.append(tag("strong", {}, p.nome), document.createElement("br"), tag("small", {}, p.handle));
    const b = tag("button", { type: "button" }, segue ? "Seguindo" : "Seguir");
    b.setAttribute("aria-pressed", String(segue));
    b.addEventListener("click", () => {
      estado.seguindo = segue ? estado.seguindo.filter((h) => h !== p.handle) : [...estado.seguindo, p.handle];
      atualizar();
    });
    li.append(avatar(p), info, b);
    sug.append(li);
  }

  const contagem = {};
  for (const p of estado.posts)
    for (const t of p.texto.toLowerCase().match(/#[\p{L}\p{N}_]+/gu) || []) contagem[t] = (contagem[t] || 0) + 1;
  const ul = $("assuntos");
  ul.replaceChildren();
  Object.entries(contagem).sort((a, b) => b[1] - a[1]).slice(0, 6).forEach(([t, n]) => {
    const li = tag("li");
    const b = tag("button", { type: "button", className: "tag fantasma" }, t);
    b.addEventListener("click", () => filtrarTag(t));
    li.append(b, tag("small", {}, `${n} ${n === 1 ? "publicação" : "publicações"}`));
    ul.append(li);
  });
}

function atualizar() {
  salvar();
  desenharFeed();
  desenharLaterais();
}

/* ---------- Eventos ---------- */
function filtrarTag(t) {
  filtroTag = t;
  const b = $("limpar-filtro");
  b.hidden = false;
  b.textContent = `Limpar filtro ${t}`;
  desenharFeed();
}

$("limpar-filtro").addEventListener("click", () => {
  filtroTag = "";
  $("limpar-filtro").hidden = true;
  desenharFeed();
});

document.querySelectorAll("[data-aba]").forEach((b) =>
  b.addEventListener("click", () => {
    aba = b.dataset.aba;
    document.querySelectorAll("[data-aba]").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    desenharFeed();
  })
);

$("busca").addEventListener("input", desenharFeed);

$("texto").addEventListener("input", (e) => {
  $("contador").textContent = 280 - e.target.value.length;
});

$("form-post").addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = $("texto").value.trim();
  if (!texto) return $("texto").focus();
  estado.posts.push({ id: Date.now(), handle: VOCE.handle, criado: Date.now(), texto, curtidas: [], comentarios: [] });
  e.target.reset();
  $("contador").textContent = "280";
  atualizar();
});

/* ---------- Início ---------- */
atualizar();
setInterval(desenharFeed, 60 * 1000); // mantém "há X min" atualizado