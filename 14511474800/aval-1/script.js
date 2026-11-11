const CHAVE = "mercado-bom-preco-v1";
const ESTOQUE_BAIXO = 5;
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Categorias da loja
const CATEGORIAS = [
  { nome: "Hortifruti", emoji: "🥬" },
  { nome: "Padaria", emoji: "🥖" },
  { nome: "Laticínios", emoji: "🥛" },
  { nome: "Carnes", emoji: "🥩" },
  { nome: "Mercearia", emoji: "🍚" },
  { nome: "Bebidas", emoji: "🥤" },
];

// Produtos prontos (edite nomes, preços, unidade e estoque inicial aqui)
// unidade: "kg" (vendido por quilo) ou "un" (vendido por unidade/embalagem)
const PRODUTOS = [
  // Hortifruti
  { id: "banana", categoria: "Hortifruti", nome: "Banana Prata", emoji: "🍌", preco: 6.99, unidade: "kg", estoque: 40 },
  { id: "maca", categoria: "Hortifruti", nome: "Maçã Fuji", emoji: "🍎", preco: 9.49, unidade: "kg", estoque: 30 },
  { id: "tomate", categoria: "Hortifruti", nome: "Tomate", emoji: "🍅", preco: 7.99, unidade: "kg", estoque: 25 },
  { id: "batata", categoria: "Hortifruti", nome: "Batata", emoji: "🥔", preco: 5.49, unidade: "kg", estoque: 50 },
  { id: "cenoura", categoria: "Hortifruti", nome: "Cenoura", emoji: "🥕", preco: 4.99, unidade: "kg", estoque: 4 },
  { id: "alface", categoria: "Hortifruti", nome: "Alface Crespa", emoji: "🥬", preco: 3.49, unidade: "un", estoque: 20 },
  // Padaria
  { id: "pao", categoria: "Padaria", nome: "Pão Francês", emoji: "🥖", preco: 14.9, unidade: "kg", estoque: 25 },
  { id: "paoforma", categoria: "Padaria", nome: "Pão de Forma", emoji: "🍞", preco: 8.99, unidade: "un", estoque: 18 },
  { id: "bolo", categoria: "Padaria", nome: "Bolo de Milho", emoji: "🌽", preco: 12.9, unidade: "un", estoque: 6 },
  // Laticínios
  { id: "leite", categoria: "Laticínios", nome: "Leite Integral 1L", emoji: "🥛", preco: 5.49, unidade: "un", estoque: 60 },
  { id: "queijo", categoria: "Laticínios", nome: "Queijo Mussarela", emoji: "🧀", preco: 42.9, unidade: "kg", estoque: 12 },
  { id: "iogurte", categoria: "Laticínios", nome: "Iogurte Natural", emoji: "🥣", preco: 4.29, unidade: "un", estoque: 24 },
  { id: "manteiga", categoria: "Laticínios", nome: "Manteiga 200g", emoji: "🧈", preco: 11.9, unidade: "un", estoque: 15 },
  { id: "ovos", categoria: "Laticínios", nome: "Ovos (dúzia)", emoji: "🥚", preco: 14.9, unidade: "un", estoque: 30 },
  // Carnes
  { id: "frango", categoria: "Carnes", nome: "Frango Inteiro", emoji: "🍗", preco: 12.9, unidade: "kg", estoque: 20 },
  { id: "moida", categoria: "Carnes", nome: "Carne Moída", emoji: "🥩", preco: 32.9, unidade: "kg", estoque: 15 },
  { id: "linguica", categoria: "Carnes", nome: "Linguiça Toscana", emoji: "🌭", preco: 21.9, unidade: "kg", estoque: 3 },
  { id: "tilapia", categoria: "Carnes", nome: "Filé de Tilápia", emoji: "🐟", preco: 29.9, unidade: "kg", estoque: 10 },
  // Mercearia
  { id: "arroz", categoria: "Mercearia", nome: "Arroz 5kg", emoji: "🍚", preco: 28.9, unidade: "un", estoque: 40 },
  { id: "feijao", categoria: "Mercearia", nome: "Feijão Carioca 1kg", emoji: "🫘", preco: 8.99, unidade: "un", estoque: 45 },
  { id: "macarrao", categoria: "Mercearia", nome: "Macarrão Espaguete 500g", emoji: "🍝", preco: 4.99, unidade: "un", estoque: 60 },
  { id: "oleo", categoria: "Mercearia", nome: "Óleo de Soja 900ml", emoji: "🫒", preco: 7.49, unidade: "un", estoque: 35 },
  { id: "acucar", categoria: "Mercearia", nome: "Açúcar 1kg", emoji: "🍬", preco: 4.79, unidade: "un", estoque: 50 },
  { id: "cafe", categoria: "Mercearia", nome: "Café 500g", emoji: "☕", preco: 18.9, unidade: "un", estoque: 28 },
  // Bebidas
  { id: "suco", categoria: "Bebidas", nome: "Suco de Laranja 1L", emoji: "🍊", preco: 9.9, unidade: "un", estoque: 20 },
  { id: "refri", categoria: "Bebidas", nome: "Refrigerante 2L", emoji: "🥤", preco: 8.99, unidade: "un", estoque: 40 },
  { id: "agua", categoria: "Bebidas", nome: "Água Mineral 1,5L", emoji: "💧", preco: 2.99, unidade: "un", estoque: 80 },
  { id: "coco", categoria: "Bebidas", nome: "Água de Coco 1L", emoji: "🥥", preco: 8.49, unidade: "un", estoque: 15 },
];

const el = {
  busca: document.getElementById("busca"),
  categorias: document.getElementById("categorias"),
  produtos: document.getElementById("produtos"),
  semResultado: document.getElementById("sem-resultado"),
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
let categoriaAtiva = "Todos";
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
const rotuloQtd = (p, n) => (p.unidade === "kg" ? `${n} kg` : `${n}×`);
const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function definir(id, valor) {
  const p = PRODUTOS.find((x) => x.id === id);
  const max = estado.estoque[id];
  let n = parseInt(valor, 10);
  if (isNaN(n) || n < 0) n = 0;
  if (n > max) {
    n = max;
    mostrarAviso(`Estoque máximo de ${p.nome}: ${max} ${p.unidade === "kg" ? "kg" : "unidade(s)"}.`);
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

  for (const p of itens) {
    if (qtd(p.id) > estado.estoque[p.id]) {
      mostrarAviso(`Estoque insuficiente de ${p.nome}. Ajuste a quantidade.`);
      definir(p.id, estado.estoque[p.id]);
      return;
    }
  }

  const resumo = itens.map((p) => ({
    rotulo: `${rotuloQtd(p, qtd(p.id))} ${p.nome}`,
    subtotal: qtd(p.id) * p.preco,
  }));
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

// Categorias (botões de filtro)
function montarCategorias() {
  const lista = [{ nome: "Todos", emoji: "🛒" }, ...CATEGORIAS];
  for (const c of lista) {
    const b = criar("button", { type: "button", className: "chip", textContent: `${c.emoji} ${c.nome}` });
    b.dataset.categoria = c.nome;
    b.addEventListener("click", () => {
      categoriaAtiva = c.nome;
      filtrar();
    });
    el.categorias.append(b);
  }
}

// Os cards são criados uma única vez; depois só são atualizados
function montarProdutos() {
  for (const p of PRODUTOS) {
    const menos = criar("button", { type: "button", textContent: "−", title: "Diminuir", ariaLabel: `Diminuir ${p.nome}` });
    const mais = criar("button", { type: "button", textContent: "+", title: "Adicionar", ariaLabel: `Adicionar ${p.nome}` });
    const input = criar("input", {
      type: "number", min: "0", value: "0",
      ariaLabel: `Quantidade de ${p.nome} (${p.unidade === "kg" ? "kg" : "unidades"})`,
    });
    const badge = criar("span", { className: "badge" });
    const subtotal = criar("div", { className: "subtotal" });

    menos.addEventListener("click", () => definir(p.id, qtd(p.id) - 1));
    mais.addEventListener("click", () => definir(p.id, qtd(p.id) + 1));
    input.addEventListener("change", () => definir(p.id, input.value));

    const card = criar("article", { className: "produto" },
      criar("div", { className: "emoji", textContent: p.emoji }),
      criar("div", { className: "categoria", textContent: p.categoria }),
      criar("div", { className: "nome", textContent: p.nome }),
      criar("div", { className: "preco" }, moeda.format(p.preco), " ", criar("small", { textContent: `/ ${p.unidade}` })),
      criar("div", { className: "estoque" }, "Em estoque: ", badge),
      criar("div", { className: "quantidade" }, menos, input, mais),
      subtotal
    );
    el.produtos.append(card);
    cards[p.id] = { card, menos, mais, input, badge, subtotal };
  }
}

function filtrar() {
  const termo = semAcento(el.busca.value.trim());
  let visiveis = 0;
  for (const p of PRODUTOS) {
    const okCategoria = categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;
    const okBusca = !termo || semAcento(p.nome).includes(termo) || semAcento(p.categoria).includes(termo);
    cards[p.id].card.hidden = !(okCategoria && okBusca);
    if (okCategoria && okBusca) visiveis++;
  }
  el.semResultado.hidden = visiveis > 0;
  for (const b of el.categorias.children) {
    b.classList.toggle("ativa", b.dataset.categoria === categoriaAtiva);
  }
}

function atualizar() {
  for (const p of PRODUTOS) {
    const c = cards[p.id];
    const estoque = estado.estoque[p.id];
    const n = qtd(p.id);
    const un = p.unidade === "kg" ? " kg" : "";

    c.badge.textContent =
      estoque === 0 ? "Esgotado" : estoque <= ESTOQUE_BAIXO ? `${estoque}${un} (últimas)` : `${estoque}${un}`;
    c.badge.className = "badge " + (estoque === 0 ? "zero" : estoque <= ESTOQUE_BAIXO ? "baixo" : "ok");
    c.input.value = n;
    c.input.max = estoque;
    c.input.disabled = estoque === 0;
    c.menos.disabled = n === 0;
    c.mais.disabled = n >= estoque;
    c.subtotal.textContent = n > 0 ? `${rotuloQtd(p, n)} = ${moeda.format(n * p.preco)}` : "";
    c.card.classList.toggle("selecionado", n > 0);
    c.card.classList.toggle("esgotado", estoque === 0);
  }

  const itens = itensSelecionados();
  el.resumoVazio.hidden = itens.length > 0;
  el.resumoLista.replaceChildren(
    ...itens.map((p) =>
      criar("li", {},
        criar("span", { textContent: `${rotuloQtd(p, qtd(p.id))} ${p.nome}` }),
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
        criar("span", { textContent: i.rotulo }),
        criar("span", { textContent: moeda.format(i.subtotal) })
      )
    )
  );
  el.reciboTotal.textContent = moeda.format(valorTotal);
  el.recibo.showModal();
}

// ---------- Eventos ----------

el.busca.addEventListener("input", filtrar);
el.btnFinalizar.addEventListener("click", finalizarCompra);
el.btnLimpar.addEventListener("click", limpar);
el.btnFechar.addEventListener("click", () => el.recibo.close());
el.btnRestaurar.addEventListener("click", () => {
  if (confirm("Restaurar o estoque inicial? Sua seleção atual será limpa.")) restaurarEstoque();
});

montarCategorias();
montarProdutos();
filtrar();
atualizar();