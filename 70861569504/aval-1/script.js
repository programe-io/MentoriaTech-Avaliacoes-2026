/* =========================================================
   Loja Raiz – carrinho de compras
   Os preços ficam em centavos (números inteiros) para evitar
   erros de arredondamento nos cálculos com decimais.
   ========================================================= */

// ---------- Dados ----------
const PRODUTOS = [
  { id: 1, nome: "Jiboia",             desc: "Resistente, ótima para iniciantes.", preco: 4990,  icone: "🌿", cor: "#d9e8d0" },
  { id: 2, nome: "Cacto Mandacaru",    desc: "Pouca água e muito sol.",            preco: 3590,  icone: "🌵", cor: "#e3ecc9" },
  { id: 3, nome: "Samambaia",          desc: "Gosta de sombra e umidade.",         preco: 5490,  icone: "🪴", cor: "#cfe3dc" },
  { id: 4, nome: "Costela-de-adão",    desc: "Folhas grandes e marcantes.",        preco: 8990,  icone: "🍃", cor: "#d3e0ef" },
  { id: 5, nome: "Suculenta Echeveria",desc: "Pequena, perfeita para a mesa.",     preco: 2290,  icone: "🌱", cor: "#e8e4cf" },
  { id: 6, nome: "Orquídea Phalaenopsis", desc: "Flores que duram meses.",         preco: 12990, icone: "🌸", cor: "#ecd9e3" }
];

const FRETE_PADRAO = 1990;          // R$ 19,90
const FRETE_GRATIS_ACIMA = 20000;   // frete grátis a partir de R$ 200,00
const QTD_MAXIMA = 99;
const CHAVE_STORAGE = "raiz-carrinho";

// carrinho: { [idProduto]: quantidade }
let carrinho = carregarCarrinho();

// ---------- Utilitários ----------
const formatarReais = (centavos) =>
  (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const limitarQtd = (valor) => {
  const n = parseInt(valor, 10);
  if (isNaN(n) || n < 1) return 1;
  return Math.min(n, QTD_MAXIMA);
};

const buscarProduto = (id) => PRODUTOS.find((p) => p.id === id);

function salvarCarrinho() {
  try { localStorage.setItem(CHAVE_STORAGE, JSON.stringify(carrinho)); } catch (e) { /* ignora */ }
}

function carregarCarrinho() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    return dados && typeof dados === "object" ? dados : {};
  } catch (e) {
    return {};
  }
}

let temporizadorAviso;
function mostrarAviso(texto) {
  const el = document.getElementById("aviso");
  el.textContent = texto;
  el.classList.add("visivel");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => el.classList.remove("visivel"), 2200);
}

// ---------- Cálculos ----------
function calcularTotais() {
  let subtotal = 0;
  let quantidade = 0;

  for (const [id, qtd] of Object.entries(carrinho)) {
    const produto = buscarProduto(Number(id));
    if (!produto) continue;
    subtotal += produto.preco * qtd;
    quantidade += qtd;
  }

  const frete = subtotal === 0 || subtotal >= FRETE_GRATIS_ACIMA ? 0 : FRETE_PADRAO;
  return { subtotal, frete, total: subtotal + frete, quantidade };
}

// ---------- Ações do carrinho ----------
function adicionar(id, qtd) {
  carrinho[id] = Math.min((carrinho[id] || 0) + qtd, QTD_MAXIMA);
  atualizarCarrinho();
  const p = buscarProduto(id);
  mostrarAviso(`${qtd}x ${p.nome} adicionado ao carrinho`);
}

function definirQuantidade(id, qtd) {
  carrinho[id] = limitarQtd(qtd);
  atualizarCarrinho();
}

function remover(id) {
  delete carrinho[id];
  atualizarCarrinho();
}

function esvaziar() {
  carrinho = {};
  atualizarCarrinho();
}

// ---------- Renderização: produtos ----------
function criarControleQtd(valorInicial, aoMudar) {
  const wrap = document.createElement("div");
  wrap.className = "qtd";
  wrap.innerHTML = `
    <button type="button" data-acao="menos" aria-label="Diminuir quantidade">−</button>
    <input type="number" min="1" max="${QTD_MAXIMA}" value="${valorInicial}" aria-label="Quantidade" inputmode="numeric">
    <button type="button" data-acao="mais" aria-label="Aumentar quantidade">+</button>
  `;
  const input = wrap.querySelector("input");

  wrap.querySelector('[data-acao="menos"]').addEventListener("click", () => {
    input.value = limitarQtd(Number(input.value) - 1);
    aoMudar(Number(input.value));
  });
  wrap.querySelector('[data-acao="mais"]').addEventListener("click", () => {
    input.value = limitarQtd(Number(input.value) + 1);
    aoMudar(Number(input.value));
  });
  input.addEventListener("change", () => {
    input.value = limitarQtd(input.value);
    aoMudar(Number(input.value));
  });

  return wrap;
}

function renderizarProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  PRODUTOS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "produto";
    card.innerHTML = `
      <div class="produto-imagem" style="background:${p.cor}" aria-hidden="true">${p.icone}</div>
      <div class="produto-corpo">
        <h3 class="produto-nome">${p.nome}</h3>
        <p class="produto-desc">${p.desc}</p>
        <p class="produto-preco">${formatarReais(p.preco)}</p>
        <div class="produto-acoes"></div>
      </div>
    `;

    let qtdEscolhida = 1;
    const acoes = card.querySelector(".produto-acoes");
    const controle = criarControleQtd(1, (v) => (qtdEscolhida = v));

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "btn btn-principal";
    botao.textContent = "Adicionar";
    botao.addEventListener("click", () => {
      adicionar(p.id, qtdEscolhida);
      // volta o seletor para 1 depois de adicionar
      qtdEscolhida = 1;
      controle.querySelector("input").value = 1;
    });

    acoes.append(controle, botao);
    lista.appendChild(card);
  });
}

// ---------- Renderização: carrinho ----------
function renderizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  lista.innerHTML = "";

  const ids = Object.keys(carrinho).map(Number).filter((id) => buscarProduto(id));

  ids.forEach((id) => {
    const p = buscarProduto(id);
    const qtd = carrinho[id];

    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div class="item-icone" style="background:${p.cor}" aria-hidden="true">${p.icone}</div>
      <span class="item-nome">${p.nome}<br><small>${formatarReais(p.preco)} cada</small></span>
      <span class="item-subtotal">${formatarReais(p.preco * qtd)}</span>
    `;

    li.appendChild(criarControleQtd(qtd, (v) => definirQuantidade(id, v)));

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "item-remover";
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => remover(id));
    li.appendChild(btnRemover);

    lista.appendChild(li);
  });
}

function renderizarResumo() {
  const { subtotal, frete, total, quantidade } = calcularTotais();
  const vazio = quantidade === 0;

  document.getElementById("subtotal").textContent = formatarReais(subtotal);
  document.getElementById("frete").textContent =
    vazio ? formatarReais(0) : frete === 0 ? "Grátis" : formatarReais(frete);
  document.getElementById("total").textContent = formatarReais(total);
  document.getElementById("contador-topo").textContent = quantidade;

  document.getElementById("carrinho-vazio").hidden = !vazio;
  document.getElementById("btn-finalizar").disabled = vazio;
  document.getElementById("btn-limpar").hidden = vazio;

  const aviso = document.getElementById("aviso-frete");
  if (vazio) {
    aviso.hidden = true;
  } else if (frete === 0) {
    aviso.hidden = false;
    aviso.textContent = "Você ganhou frete grátis!";
  } else {
    aviso.hidden = false;
    aviso.textContent = `Faltam ${formatarReais(FRETE_GRATIS_ACIMA - subtotal)} para o frete grátis.`;
  }
}

function atualizarCarrinho() {
  salvarCarrinho();
  renderizarCarrinho();
  renderizarResumo();
}

// ---------- Inicialização ----------
document.getElementById("btn-limpar").addEventListener("click", esvaziar);

document.getElementById("btn-finalizar").addEventListener("click", () => {
  const { total } = calcularTotais();
  alert(`Pedido confirmado! Total a pagar: ${formatarReais(total)}`);
  esvaziar();
});

renderizarProdutos();
atualizarCarrinho();