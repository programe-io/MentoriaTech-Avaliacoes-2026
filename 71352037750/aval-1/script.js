const CHAVE = "loja-gamer-v1";
const ESTOQUE_BAIXO = 5;
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Produtos prontos da loja (edite nomes, emojis, preços e estoque inicial aqui)
const PRODUTOS = [
  { id: "cadeira", nome: "Cadeira Gamer", emoji: "🪑", preco: 899.9, estoque: 12 },
  { id: "mouse", nome: "Mouse Gamer", emoji: "🖱️", preco: 129.9, estoque: 30 },
  { id: "teclado", nome: "Teclado Mecânico", emoji: "⌨️", preco: 249.9, estoque: 4 },
  { id: "headset", nome: "Headset 7.1", emoji: "🎧", preco: 199.9, estoque: 20 },
  { id: "monitor", nome: 'Monitor 24" 144Hz', emoji: "🖥️", preco: 1099.9, estoque: 8 },
  { id: "mousepad", nome: "Mousepad Grande", emoji: "🟪", preco: 39.9, estoque: 50 },
  { id: "webcam", nome: "Webcam Full HD", emoji: "📷", preco: 159.9, estoque: 15 },
  { id: "microfone", nome: "Microfone USB", emoji: "🎙️", preco: 219.9, estoque: 10 },
];

const el = {
  produtos: document.getElementById("produtos"),
  resumoVazio: document.getElementById("resumo-vazio"),
  resumoLista: document.getElementById("resumo-lista"),
  total: document.getElementById("total"),
  totalTopo: document.getElementById("total-topo"),
  btnFinalizar: document.getElementById("btn-finalizar"),
  btnLimpar: document.getElementById("btn-limpar"),
  btnRestaurar: document.getElementById("btn-restaurar"),
  recibo: document.getElementById("recibo"),
  reciboInfo: document.getElementById("recibo-info"),
  reciboItens: document.getElementById("recibo-itens"),
  reciboTotal: document.getElementById("recibo-total"),
  btnFechar: document.getElementById("btn-fechar"),
  aviso: document.getElementById("aviso"),
};

const cards = {}; // id -> elementos de cada card
let estado = lerEstado();
let timerAviso;

// ---------- Armazenamento (localStorage) ----------

function estadoInicial() {
  return {
    estoque: Object.fromEntries(PRODUTOS.map((p) => [p.id, p.estoque])),
    selecao: {},
    pedidos: 0,
  };
}

function lerEstado() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && salvo.estoque && salvo.selecao) {
      // garante que todos os produtos atuais existam no estoque salvo
      for (const p of PRODUTOS) if (!(p.id in salvo.estoque)) salvo.estoque[p.id] = p.estoque;
      salvo.pedidos = salvo.pedidos || 0;
      return salvo;
    }
  } catch (e) {
    // usa o estado inicial
  }
  return estadoInicial();
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch (e) {
    // sem armazenamento: os dados ficam só enquanto a página estiver aberta
  }
}

// ---------- Regras ----------

const qtd = (id) => estado.selecao[id] || 0;
const itensSelecionados = () => PRODUTOS.filter((p) => qtd(p.id) > 0);
const total = () => itensSelecionados().reduce((s, p) => s + qtd(p.id) * p.preco, 0);

function definir(id, valor) {
  const p = PRODUTOS.find((x) => x.id === id);
  const max = estado.estoque[id];
  let n = parseInt(valor, 10);
  if (isNaN(n) || n < 0) n = 0;
  if (n > max) {
    n = max;
    mostrarAviso(`Estoque máximo de ${p.nome}: ${max} unidade(s).`);
  }
  if (n === 0) delete estado.selecao[id];
  else estado.selecao[id] = n;
  salvar();
  atualizar();
}

function limpar() {
  estado.selecao = {};
  salvar();
  atualizar();
}

function finalizarCompra() {
  const itens = itensSelecionados();
  if (itens.length === 0) return;

  // confere o estoque de novo antes de concluir
  for (const p of itens) {
    if (qtd(p.id) > estado.estoque[p.id]) {
      mostrarAviso(`Estoque insuficiente de ${p.nome}. Ajuste a quantidade.`);
      definir(p.id, estado.estoque[p.id]);
      return;
    }
  }

  const resumo = itens.map((p) => ({ nome: p.nome, quantidade: qtd(p.id), subtotal: qtd(p.id) * p.preco }));
  const valorTotal = total();

  for (const p of itens) estado.estoque[p.id] -= qtd(p.id);
  estado.selecao = {};
  estado.pedidos += 1;
  salvar();
  atualizar();
  mostrarRecibo(estado.pedidos, resumo, valorTotal);
}

function restaurarEstoque() {
  estado = estadoInicial();
  salvar();
  atualizar();
  mostrarAviso("Estoque inicial restaurado.");
}

// ---------- Interface ----------

function criar(tag, props = {}, ...filhos) {
  const e = document.createElement(tag);
  Object.assign(e, props);
  e.append(...filhos);
  return e;
}

function mostrarAviso(msg) {
  clearTimeout(timerAviso);
  el.aviso.textContent = msg;
  el.aviso.hidden = false;
  timerAviso = setTimeout(() => (el.aviso.hidden = true), 3500);
}

// Os cards são criados uma única vez; depois só são atualizados
function montarProdutos() {
  for (const p of PRODUTOS) {
    const menos = criar("button", { type: "button", textContent: "−", title: "Diminuir", ariaLabel: `Diminuir ${p.nome}` });
    const mais = criar("button", { type: "button", textContent: "+", title: "Adicionar", ariaLabel: `Adicionar ${p.nome}` });
    const input = criar("input", { type: "number", min: "0", value: "0", ariaLabel: `Quantidade de ${p.nome}` });
    const badge = criar("span", { className: "badge" });
    const subtotal = criar("div", { className: "subtotal" });

    menos.addEventListener("click", () => definir(p.id, qtd(p.id) - 1));
    mais.addEventListener("click", () => definir(p.id, qtd(p.id) + 1));
    input.addEventListener("change", () => definir(p.id, input.value));

    const card = criar("article", { className: "produto" },
      criar("div", { className: "emoji", textContent: p.emoji }),
      criar("div", { className: "nome", textContent: p.nome }),
      criar("div", { className: "preco", textContent: moeda.format(p.preco) }),
      criar("div", { className: "estoque" }, "Em estoque: ", badge),
      criar("div", { className: "quantidade" }, menos, input, mais),
      subtotal
    );
    el.produtos.append(card);
    cards[p.id] = { card, menos, mais, input, badge, subtotal };
  }
}

function atualizar() {
  for (const p of PRODUTOS) {
    const c = cards[p.id];
    const estoque = estado.estoque[p.id];
    const n = qtd(p.id);

    c.badge.textContent = estoque === 0 ? "Esgotado" : estoque <= ESTOQUE_BAIXO ? `${estoque} (últimas)` : estoque;
    c.badge.className = "badge " + (estoque === 0 ? "zero" : estoque <= ESTOQUE_BAIXO ? "baixo" : "ok");
    c.input.value = n;
    c.input.max = estoque;
    c.input.disabled = estoque === 0;
    c.menos.disabled = n === 0;
    c.mais.disabled = n >= estoque;
    c.subtotal.textContent = n > 0 ? `Subtotal: ${moeda.format(n * p.preco)}` : "";
    c.card.classList.toggle("selecionado", n > 0);
    c.card.classList.toggle("esgotado", estoque === 0);
  }

  const itens = itensSelecionados();
  el.resumoVazio.hidden = itens.length > 0;
  el.resumoLista.replaceChildren(
    ...itens.map((p) =>
      criar("li", {},
        criar("span", { textContent: `${qtd(p.id)}× ${p.nome}` }),
        criar("span", { textContent: moeda.format(qtd(p.id) * p.preco) })
      )
    )
  );
  el.total.textContent = moeda.format(total());
  el.totalTopo.textContent = moeda.format(total());
  el.btnFinalizar.disabled = itens.length === 0;
  el.btnLimpar.disabled = itens.length === 0;
}

function mostrarRecibo(numero, itens, valorTotal) {
  const data = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  el.reciboInfo.textContent = `Pedido #${String(numero).padStart(4, "0")} · ${data}`;
  el.reciboItens.replaceChildren(
    ...itens.map((i) =>
      criar("li", {},
        criar("span", { textContent: `${i.quantidade}× ${i.nome}` }),
        criar("span", { textContent: moeda.format(i.subtotal) })
      )
    )
  );
  el.reciboTotal.textContent = moeda.format(valorTotal);
  el.recibo.showModal();
}

// ---------- Eventos ----------

el.btnFinalizar.addEventListener("click", finalizarCompra);
el.btnLimpar.addEventListener("click", limpar);
el.btnFechar.addEventListener("click", () => el.recibo.close());
el.btnRestaurar.addEventListener("click", () => {
  if (confirm("Restaurar o estoque inicial? Sua seleção atual será limpa.")) restaurarEstoque();
});

montarProdutos();
atualizar();