// ---------- Dados ----------
// Preços em centavos para evitar erros de arredondamento com números decimais.
const produtos = [
  { id: 1, nome: "Café especial 250 g",     icone: "☕", preco: 3290,  estoque: 12 },
  { id: 2, nome: "Café torrado moído 500 g", icone: "🫘", preco: 2990,  estoque: 20 },
  { id: 3, nome: "Coador de pano",           icone: "🧦", preco: 1450,  estoque: 3 },
  { id: 4, nome: "Prensa francesa 600 ml",   icone: "🫖", preco: 8990,  estoque: 6 },
  { id: 5, nome: "Moedor manual",            icone: "⚙️", preco: 15900, estoque: 4 },
  { id: 6, nome: "Caneca de cerâmica",       icone: "🍵", preco: 3990,  estoque: 0 }
];

const carrinho = {};  // { idDoProduto: quantidade }
const selecao = {};   // quantidade escolhida no card, antes de adicionar

// ---------- Utilidades ----------
const formatarReais = (centavos) =>
  (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const buscarProduto = (id) => produtos.find((p) => p.id === id);
const noCarrinho = (id) => carrinho[id] || 0;
const disponivel = (id) => buscarProduto(id).estoque - noCarrinho(id);
const quantidadeSelecionada = (id) => Math.min(selecao[id] || 1, Math.max(disponivel(id), 1));

const el = {
  produtos: document.getElementById("lista-produtos"),
  itens: document.getElementById("itens-carrinho"),
  totalItens: document.getElementById("total-itens"),
  totalValor: document.getElementById("total-valor"),
  finalizar: document.getElementById("btn-finalizar"),
  limpar: document.getElementById("btn-limpar"),
  mensagem: document.getElementById("mensagem")
};

function avisar(texto, tipo) {
  el.mensagem.textContent = texto;
  el.mensagem.className = "mensagem " + (tipo || "");
}

// ---------- Cálculos ----------
function calcularTotais() {
  let itens = 0;
  let valor = 0;
  for (const id in carrinho) {
    itens += carrinho[id];
    valor += carrinho[id] * buscarProduto(Number(id)).preco;
  }
  return { itens, valor };
}

// ---------- Renderização ----------
function renderProdutos() {
  el.produtos.innerHTML = produtos.map((p) => {
    const livre = disponivel(p.id);
    const qtd = quantidadeSelecionada(p.id);
    const esgotado = livre <= 0;
    const baixo = !esgotado && livre <= 3;
    const textoEstoque = esgotado
      ? (p.estoque === 0 ? "Esgotado" : "Todo o estoque está no carrinho")
      : livre + (livre === 1 ? " unidade disponível" : " unidades disponíveis");

    return `
      <article class="produto ${esgotado ? "esgotado" : ""}">
        <span class="icone" aria-hidden="true">${p.icone}</span>
        <h3>${p.nome}</h3>
        <span class="preco">${formatarReais(p.preco)}</span>
        <span class="estoque ${baixo || esgotado ? "baixo" : ""}">${textoEstoque}</span>
        <div class="acoes">
          <div class="qtd">
            <button data-acao="menos" data-id="${p.id}" aria-label="Diminuir quantidade" ${qtd <= 1 || esgotado ? "disabled" : ""}>−</button>
            <span>${esgotado ? 0 : qtd}</span>
            <button data-acao="mais" data-id="${p.id}" aria-label="Aumentar quantidade" ${qtd >= livre ? "disabled" : ""}>+</button>
          </div>
          <button class="btn btn-adicionar" data-acao="adicionar" data-id="${p.id}" ${esgotado ? "disabled" : ""}>Adicionar</button>
        </div>
      </article>`;
  }).join("");
}

function renderCarrinho() {
  const ids = Object.keys(carrinho).map(Number);

  el.itens.innerHTML = ids.length === 0
    ? `<li class="vazio">Seu carrinho está vazio. Escolha uma quantidade e clique em Adicionar.</li>`
    : ids.map((id) => {
        const p = buscarProduto(id);
        const qtd = carrinho[id];
        return `
          <li class="item">
            <span class="nome">${p.nome}</span>
            <span class="sub">${formatarReais(qtd * p.preco)}</span>
            <div class="qtd">
              <button data-acao="item-menos" data-id="${id}" aria-label="Diminuir ${p.nome}">−</button>
              <span>${qtd}</span>
              <button data-acao="item-mais" data-id="${id}" aria-label="Aumentar ${p.nome}" ${disponivel(id) <= 0 ? "disabled" : ""}>+</button>
            </div>
            <button class="remover" data-acao="remover" data-id="${id}">Remover</button>
          </li>`;
      }).join("");

  const { itens, valor } = calcularTotais();
  el.totalItens.textContent = itens;
  el.totalValor.textContent = formatarReais(valor);
  el.finalizar.disabled = itens === 0;
  el.limpar.disabled = itens === 0;
}

function renderTudo() {
  renderProdutos();
  renderCarrinho();
}

// ---------- Ações ----------
function alterarNoCarrinho(id, delta) {
  const nova = noCarrinho(id) + delta;
  if (nova <= 0) {
    delete carrinho[id];
  } else if (nova <= buscarProduto(id).estoque) {
    carrinho[id] = nova;
  }
}

function aoClicar(evento) {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  const acao = botao.dataset.acao;
  avisar("");

  if (acao === "mais") selecao[id] = Math.min(quantidadeSelecionada(id) + 1, disponivel(id));
  if (acao === "menos") selecao[id] = Math.max(quantidadeSelecionada(id) - 1, 1);

  if (acao === "adicionar") {
    const qtd = quantidadeSelecionada(id);
    alterarNoCarrinho(id, qtd);
    selecao[id] = 1;
    avisar(qtd + "× " + buscarProduto(id).nome + " adicionado ao carrinho.", "ok");
  }

  if (acao === "item-mais") alterarNoCarrinho(id, 1);
  if (acao === "item-menos") alterarNoCarrinho(id, -1);
  if (acao === "remover") delete carrinho[id];

  renderTudo();
}

function finalizarCompra() {
  const { itens, valor } = calcularTotais();
  if (itens === 0) return;

  // Baixa no estoque
  for (const id in carrinho) {
    buscarProduto(Number(id)).estoque -= carrinho[id];
    delete carrinho[id];
  }

  renderTudo();
  avisar("Compra finalizada! " + itens + (itens === 1 ? " item" : " itens") + " no valor de " + formatarReais(valor) + ".", "ok");
}

function esvaziarCarrinho() {
  for (const id in carrinho) delete carrinho[id];
  renderTudo();
  avisar("Carrinho esvaziado.");
}

// ---------- Início ----------
el.produtos.addEventListener("click", aoClicar);
el.itens.addEventListener("click", aoClicar);
el.finalizar.addEventListener("click", finalizarCompra);
el.limpar.addEventListener("click", esvaziarCarrinho);

renderTudo();