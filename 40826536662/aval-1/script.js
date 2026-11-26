const CHAVE_STORAGE = "sistema_estoque_avaliacao_v1";

const formProduto = document.querySelector("#form-produto");
const inputNome = document.querySelector("#nome-produto");
const selectCategoria = document.querySelector("#categoria-produto");
const inputQuantidade = document.querySelector("#quantidade-produto");
const inputMinimo = document.querySelector("#minimo-produto");
const mensagemErro = document.querySelector("#mensagem-erro");

const campoBusca = document.querySelector("#campo-busca");
const containerFiltros = document.querySelector("#filtros-status");
const corpoTabela = document.querySelector("#corpo-tabela");
const btnLimparTudo = document.querySelector("#btn-limpar-tudo");

const elTotalItens = document.querySelector("#total-itens");
const elTotalUnidades = document.querySelector("#total-unidades");
const elTotalBaixo = document.querySelector("#total-baixo");

let produtos = carregarProdutos();
let filtroAtual = "todos";
let termoBusca = "";

function carregarProdutos() {
  const salvo = localStorage.getItem(CHAVE_STORAGE);
  if (!salvo) {
    return [
      {
        id: 1,
        nome: "Mouse Sem Fio",
        categoria: "Periféricos",
        quantidade: 14,
        minimo: 5
      },
      {
        id: 2,
        nome: "Cabo HDMI 2.0",
        categoria: "Cabos e Adaptadores",
        quantidade: 3,
        minimo: 5
      },
      {
        id: 3,
        nome: "Monitor 24 Polegadas",
        categoria: "Monitores",
        quantidade: 0,
        minimo: 2
      }
    ];
  }

  try {
    const parsed = JSON.parse(salvo);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarProdutos() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(produtos));
}

function proximoId() {
  if (produtos.length === 0) return 1;
  const maiorId = produtos.reduce((maior, item) => (item.id > maior ? item.id : maior), 0);
  return maiorId + 1;
}

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.hidden = false;
}

function limparErro() {
  mensagemErro.textContent = "";
  mensagemErro.hidden = true;
}

function obterStatus(produto) {
  if (produto.quantidade === 0) {
    return { texto: "Zerado", classe: "badge-zerado" };
  }
  if (produto.quantidade <= produto.minimo) {
    return { texto: "Estoque Baixo", classe: "badge-baixo" };
  }
  return { texto: "Normal", classe: "badge-ok" };
}

function obterProdutosFiltrados() {
  const buscaNormalizada = termoBusca.trim().toLowerCase();

  return produtos.filter((produto) => {
    const passaStatus =
      filtroAtual === "todos" ||
      (filtroAtual === "baixo" && produto.quantidade > 0 && produto.quantidade <= produto.minimo) ||
      (filtroAtual === "zerado" && produto.quantidade === 0);

    const passaBusca =
      !buscaNormalizada ||
      produto.nome.toLowerCase().includes(buscaNormalizada) ||
      produto.categoria.toLowerCase().includes(buscaNormalizada);

    return passaStatus && passaBusca;
  });
}

function atualizarResumo() {
  const totalItens = produtos.length;
  const totalUnidades = produtos.reduce((soma, item) => soma + item.quantidade, 0);
  const totalBaixo = produtos.filter(
    (item) => item.quantidade <= item.minimo
  ).length;

  elTotalItens.textContent = totalItens;
  elTotalUnidades.textContent = totalUnidades;
  elTotalBaixo.textContent = totalBaixo;
}

function render() {
  atualizarResumo();
  const listaVisivel = obterProdutosFiltrados();
  corpoTabela.innerHTML = "";

  if (listaVisivel.length === 0) {
    const tr = document.createElement("tr");
    tr.className = "linha-vazia";

    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "Nenhum produto encontrado para o filtro atual.";

    tr.appendChild(td);
    corpoTabela.appendChild(tr);
    return;
  }

  listaVisivel.forEach((produto) => {
    const tr = document.createElement("tr");
    tr.dataset.id = String(produto.id);

    const tdNome = document.createElement("td");
    tdNome.textContent = produto.nome;

    const tdCategoria = document.createElement("td");
    tdCategoria.textContent = produto.categoria;

    const tdQtd = document.createElement("td");
    tdQtd.textContent = String(produto.quantidade);

    const tdMin = document.createElement("td");
    tdMin.textContent = String(produto.minimo);

    const status = obterStatus(produto);
    const tdStatus = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `badge ${status.classe}`;
    badge.textContent = status.texto;
    tdStatus.appendChild(badge);

    const tdAcoes = document.createElement("td");
    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes-linha";

    const btnMais = document.createElement("button");
    btnMais.type = "button";
    btnMais.className = "btn-mini";
    btnMais.dataset.acao = "aumentar";
    btnMais.textContent = "+1";

    const btnMenos = document.createElement("button");
    btnMenos.type = "button";
    btnMenos.className = "btn-mini";
    btnMenos.dataset.acao = "diminuir";
    btnMenos.textContent = "-1";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-mini btn-mini-remover";
    btnRemover.dataset.acao = "remover";
    btnRemover.textContent = "Excluir";

    divAcoes.append(btnMais, btnMenos, btnRemover);
    tdAcoes.appendChild(divAcoes);

    tr.append(tdNome, tdCategoria, tdQtd, tdMin, tdStatus, tdAcoes);
    corpoTabela.appendChild(tr);
  });
}

formProduto.addEventListener("submit", (event) => {
  event.preventDefault();
  limparErro();

  const nome = inputNome.value.trim();
  const categoria = selectCategoria.value;
  const quantidade = Number(inputQuantidade.value);
  const minimo = Number(inputMinimo.value);

  if (!nome) {
    mostrarErro("Informe o nome do produto.");
    inputNome.focus();
    return;
  }

  if (inputQuantidade.value === "" || Number.isNaN(quantidade) || quantidade < 0) {
    mostrarErro("A quantidade inicial deve ser um número igual ou maior que 0.");
    inputQuantidade.focus();
    return;
  }

  if (inputMinimo.value === "" || Number.isNaN(minimo) || minimo < 0) {
    mostrarErro("O estoque mínimo deve ser um número igual ou maior que 0.");
    inputMinimo.focus();
    return;
  }

  const novoProduto = {
    id: proximoId(),
    nome,
    categoria,
    quantidade: Math.floor(quantidade),
    minimo: Math.floor(minimo)
  };

  produtos.push(novoProduto);
  salvarProdutos();
  render();

  formProduto.reset();
  inputMinimo.value = "5";
  inputNome.focus();
});

campoBusca.addEventListener("input", (event) => {
  termoBusca = event.target.value;
  render();
});

containerFiltros.addEventListener("click", (event) => {
  const botao = event.target.closest(".filtro-btn");
  if (!botao) return;

  filtroAtual = botao.dataset.filtro;

  containerFiltros.querySelectorAll(".filtro-btn").forEach((btn) => {
    btn.classList.toggle("ativo", btn === botao);
  });

  render();
});

corpoTabela.addEventListener("click", (event) => {
  const botao = event.target.closest("button[data-acao]");
  if (!botao) return;

  const linha = botao.closest("tr");
  if (!linha) return;

  const id = Number(linha.dataset.id);
  const produto = produtos.find((item) => item.id === id);
  if (!produto) return;

  const acao = botao.dataset.acao;

  if (acao === "aumentar") {
    produto.quantidade += 1;
  } else if (acao === "diminuir") {
    if (produto.quantidade > 0) {
      produto.quantidade -= 1;
    }
  } else if (acao === "remover") {
    produtos = produtos.filter((item) => item.id !== id);
  }

  salvarProdutos();
  render();
});

btnLimparTudo.addEventListener("click", () => {
  produtos = [];
  salvarProdutos();
  render();
});

render();