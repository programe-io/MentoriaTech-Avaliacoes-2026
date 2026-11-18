"use strict";

/* ---------- Dados ----------
   Preços em CENTAVOS (números inteiros) para evitar erros
   de arredondamento do JavaScript com números decimais. */
const PRODUTOS = [
  { id: 1, nome: "Starfall Rangers",    plataforma: "PC",          genero: "Ação espacial",  preco: 14990, sigla: "SR", cores: ["#3b49df", "#8a5cf5"] },
  { id: 2, nome: "Reino das Brumas",    plataforma: "PlayStation", genero: "RPG de aventura", preco: 24990, sigla: "RB", cores: ["#1f9d72", "#0d5c4a"] },
  { id: 3, nome: "Turbo Kart Mania",    plataforma: "Nintendo",    genero: "Corrida",         preco: 19990, sigla: "TK", cores: ["#ff4d6d", "#ff9a3c"] },
  { id: 4, nome: "Cidade Neon 2099",    plataforma: "PC",          genero: "Cyberpunk",       preco: 17990, sigla: "CN", cores: ["#d62ed6", "#2e5bd6"] },
  { id: 5, nome: "Fazenda Feliz",       plataforma: "Nintendo",    genero: "Simulação",       preco: 9990,  sigla: "FF", cores: ["#7cb518", "#3f8f29"] },
  { id: 6, nome: "Guerra dos Tronos X", plataforma: "Xbox",        genero: "Estratégia",      preco: 22990, sigla: "GX", cores: ["#c4501a", "#7a2410"] },
  { id: 7, nome: "Futebol Total 27",    plataforma: "PlayStation", genero: "Esporte",         preco: 27990, sigla: "FT", cores: ["#12a150", "#0b6b34"] },
  { id: 8, nome: "Abismo Profundo",     plataforma: "Xbox",        genero: "Terror",          preco: 12990, sigla: "AP", cores: ["#243b6b", "#0b1530"] }
];

const DESCONTO_PIX = 0.10;   // 10%
const MAX_PARCELAS = 3;
const QTD_MAXIMA = 10;

/* ---------- Estado ---------- */
let carrinho = {};            // { idDoProduto: quantidade }
let selecionado = {};         // quantidade escolhida no card, antes de adicionar
let filtroAtual = "Todos";

/* ---------- Utilitários ---------- */
const formatarReais = (centavos) =>
  (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const $ = (id) => document.getElementById(id);
const buscarProduto = (id) => PRODUTOS.find((p) => p.id === id);
const gradiente = (p) => `linear-gradient(135deg, ${p.cores[0]}, ${p.cores[1]})`;

let temporizadorAviso;
function mostrarAviso(texto) {
  const aviso = $("aviso");
  aviso.textContent = texto;
  aviso.classList.add("visivel");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove("visivel"), 2200);
}

/* ---------- Filtros ---------- */
function renderizarFiltros() {
  const plataformas = ["Todos", ...new Set(PRODUTOS.map((p) => p.plataforma))];
  $("filtros").innerHTML = plataformas
    .map((nome) => `<button class="filtro" data-filtro="${nome}" aria-pressed="${nome === filtroAtual}">${nome}</button>`)
    .join("");
}

/* ---------- Produtos ---------- */
function renderizarProdutos() {
  const lista = filtroAtual === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.plataforma === filtroAtual);

  $("produtos").innerHTML = lista.map((p) => {
    const qtd = selecionado[p.id] || 1;
    return `
      <article class="produto" data-id="${p.id}">
        <div class="capa" style="background:${gradiente(p)}">
          <span class="plataforma">${p.plataforma}</span>
          ${p.sigla}
        </div>
        <div class="produto-corpo">
          <h3>${p.nome}</h3>
          <span class="genero">${p.genero}</span>
          <div class="preco">${formatarReais(p.preco)}</div>
          <div class="acoes">
            <div class="qtd" role="group" aria-label="Quantidade de ${p.nome}">
              <button data-acao="menos-card" aria-label="Diminuir quantidade">&minus;</button>
              <output>${qtd}</output>
              <button data-acao="mais-card" aria-label="Aumentar quantidade">+</button>
            </div>
            <button class="adicionar" data-acao="adicionar">Adicionar</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

/* ---------- Carrinho ---------- */
function calcularTotais() {
  let subtotal = 0;
  let itens = 0;

  for (const id in carrinho) {
    subtotal += buscarProduto(Number(id)).preco * carrinho[id];
    itens += carrinho[id];
  }

  const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
  const desconto = pagamento === "pix" ? Math.round(subtotal * DESCONTO_PIX) : 0;
  const total = subtotal - desconto;

  return { subtotal, desconto, total, itens, pagamento };
}

function renderizarCarrinho() {
  const ids = Object.keys(carrinho);

  $("itens").innerHTML = ids.length === 0
    ? `<li class="vazio">Seu carrinho está vazio. Escolha um jogo e clique em Adicionar.</li>`
    : ids.map((id) => {
        const p = buscarProduto(Number(id));
        const qtd = carrinho[id];
        return `
          <li class="item" data-id="${id}">
            <div class="mini" style="background:${gradiente(p)}">${p.sigla}</div>
            <div class="item-info">
              <strong>${p.nome}</strong>
              <span>${formatarReais(p.preco)} cada</span><br>
              <button class="remover" data-acao="remover">Remover</button>
            </div>
            <div class="item-direita">
              <div class="qtd">
                <button data-acao="menos-carrinho" aria-label="Diminuir quantidade">&minus;</button>
                <output>${qtd}</output>
                <button data-acao="mais-carrinho" aria-label="Aumentar quantidade">+</button>
              </div>
              <div class="item-subtotal">${formatarReais(p.preco * qtd)}</div>
            </div>
          </li>`;
      }).join("");

  const { subtotal, desconto, total, itens, pagamento } = calcularTotais();

  $("contador").textContent = itens;
  $("subtotal").textContent = formatarReais(subtotal);
  $("desconto").textContent = "- " + formatarReais(desconto);
  $("linha-desconto").style.display = pagamento === "pix" && subtotal > 0 ? "flex" : "none";
  $("total").textContent = formatarReais(total);

  $("parcelas").textContent = pagamento === "cartao" && total > 0
    ? `ou ${MAX_PARCELAS}x de ${formatarReais(Math.ceil(total / MAX_PARCELAS))} sem juros`
    : "";

  $("finalizar").disabled = itens === 0;
  $("limpar").style.display = itens === 0 ? "none" : "block";
}

function adicionarAoCarrinho(id) {
  const qtd = selecionado[id] || 1;
  const nova = Math.min((carrinho[id] || 0) + qtd, QTD_MAXIMA);
  carrinho[id] = nova;
  selecionado[id] = 1;
  atualizarCard(id);
  renderizarCarrinho();
  mostrarAviso(`${qtd}x ${buscarProduto(id).nome} no carrinho`);
}

function alterarQuantidadeCarrinho(id, delta) {
  const nova = (carrinho[id] || 0) + delta;
  if (nova <= 0) delete carrinho[id];
  else carrinho[id] = Math.min(nova, QTD_MAXIMA);
  renderizarCarrinho();
}

function atualizarCard(id) {
  const card = document.querySelector(`.produto[data-id="${id}"] output`);
  if (card) card.textContent = selecionado[id] || 1;
}

/* ---------- Gaveta do carrinho (celular) ---------- */
function alternarGaveta(abrir) {
  $("carrinho").classList.toggle("aberto", abrir);
  $("fundo").classList.toggle("aberto", abrir);
  $("abrir-carrinho").setAttribute("aria-expanded", abrir);
}

/* ---------- Eventos ---------- */
document.addEventListener("click", (e) => {
  const alvo = e.target.closest("button");
  if (!alvo) return;

  if (alvo.dataset.filtro) {
    filtroAtual = alvo.dataset.filtro;
    renderizarFiltros();
    renderizarProdutos();
    return;
  }

  const acao = alvo.dataset.acao;
  const elemento = alvo.closest("[data-id]");
  const id = elemento ? Number(elemento.dataset.id) : null;

  switch (acao) {
    case "mais-card":
      selecionado[id] = Math.min((selecionado[id] || 1) + 1, QTD_MAXIMA);
      atualizarCard(id);
      break;
    case "menos-card":
      selecionado[id] = Math.max((selecionado[id] || 1) - 1, 1);
      atualizarCard(id);
      break;
    case "adicionar":       adicionarAoCarrinho(id); break;
    case "mais-carrinho":   alterarQuantidadeCarrinho(id, +1); break;
    case "menos-carrinho":  alterarQuantidadeCarrinho(id, -1); break;
    case "remover":         alterarQuantidadeCarrinho(id, -QTD_MAXIMA); break;
  }
});

document.querySelectorAll('input[name="pagamento"]').forEach((r) =>
  r.addEventListener("change", renderizarCarrinho)
);

$("abrir-carrinho").addEventListener("click", () => alternarGaveta(true));
$("fechar-carrinho").addEventListener("click", () => alternarGaveta(false));
$("fundo").addEventListener("click", () => alternarGaveta(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") alternarGaveta(false); });

$("limpar").addEventListener("click", () => {
  carrinho = {};
  renderizarCarrinho();
});

$("finalizar").addEventListener("click", () => {
  const { total, itens } = calcularTotais();
  mostrarAviso(`Pedido de ${itens} item(ns) confirmado: ${formatarReais(total)}`);
  carrinho = {};
  renderizarCarrinho();
  alternarGaveta(false);
});

/* ---------- Início ---------- */
renderizarFiltros();
renderizarProdutos();
renderizarCarrinho();