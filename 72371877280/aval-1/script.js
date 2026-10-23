
"use strict";

// ==========================================
// 1. CONEXÃO COM O HTML
// ==========================================

const $ = (id) => document.getElementById(id);

const formProduto = $("formProduto");
const campoId = $("produtoId");
const campoNome = $("nome");
const campoCodigo = $("codigo");
const campoCategoria = $("categoria");
const campoPreco = $("preco");
const campoQuantidade = $("quantidade");

const campoPesquisa = $("pesquisa");
const filtroCategoria = $("filtroCategoria");
const listaProdutos = $("listaProdutos");

const formMovimentacao = $("formMovimentacao");
const produtoMovimentacao = $("produtoMovimentacao");
const tipoMovimentacao = $("tipoMovimentacao");
const quantidadeMovimentacao = $("quantidadeMovimentacao");

const listaHistorico = $("listaHistorico");
const mensagem = $("mensagem");

const CHAVE_PRODUTOS = "estoque_produtos";
const CHAVE_HISTORICO = "estoque_historico";
const LIMITE_ESTOQUE_BAIXO = 5;
const LIMITE_QUANTIDADE = 1000000;

// ==========================================
// 2. ARMAZENAMENTO DOS DADOS
// ==========================================

function carregarDados(chave) {
  try {
    const dados = localStorage.getItem(chave);
    const resultado = dados ? JSON.parse(dados) : [];

    return Array.isArray(resultado) ? resultado : [];
  } catch (erro) {
    console.error("Erro ao carregar dados:", erro);
    return [];
  }
}

let produtos = carregarDados(CHAVE_PRODUTOS);
let historico = carregarDados(CHAVE_HISTORICO);

function salvarDados() {
  try {
    localStorage.setItem(
      CHAVE_PRODUTOS,
      JSON.stringify(produtos)
    );

    localStorage.setItem(
      CHAVE_HISTORICO,
      JSON.stringify(historico)
    );

    return true;
  } catch (erro) {
    console.error("Erro ao salvar dados:", erro);
    mostrarMensagem(
      "Não foi possível salvar os dados no navegador.",
      true
    );
    return false;
  }
}

// ==========================================
// 3. FUNÇÕES AUXILIARES
// ==========================================

function gerarId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return Date.now().toString(36) +
    Math.random().toString(36).slice(2);
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function escaparHTML(valor) {
  const caracteres = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(valor).replace(/[&<>"']/g, (caractere) => {
    return caracteres[caractere];
  });
}

let temporizadorMensagem;

function mostrarMensagem(texto, erro = false) {
  clearTimeout(temporizadorMensagem);

  mensagem.textContent = texto;
  mensagem.classList.toggle("erro", erro);
  mensagem.hidden = false;

  temporizadorMensagem = setTimeout(() => {
    mensagem.hidden = true;
  }, 3500);
}

// ==========================================
// 4. CADASTRAR PRODUTOS
// ==========================================

formProduto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const id = campoId.value;
  const nome = campoNome.value.trim();
  const codigo = campoCodigo.value.trim();
  const categoria = campoCategoria.value;
  const preco = Number(campoPreco.value);
  const quantidade = Number(campoQuantidade.value);

  if (!nome || !codigo || !categoria) {
    mostrarMensagem("Preencha todos os campos.", true);
    return;
  }

  if (
    !Number.isFinite(preco) ||
    preco <= 0 ||
    preco > 100000000
  ) {
    mostrarMensagem("Digite um preço válido.", true);
    return;
  }

  if (
    !id &&
    (!Number.isInteger(quantidade) ||
      quantidade < 0 ||
      quantidade > LIMITE_QUANTIDADE)
  ) {
    mostrarMensagem("Digite uma quantidade válida.", true);
    return;
  }

  const codigoExiste = produtos.some((produto) => {
    return produto.codigo.toLowerCase() === codigo.toLowerCase() &&
      produto.id !== id;
  });

  if (codigoExiste) {
    mostrarMensagem("Este código já está cadastrado.", true);
    return;
  }

  // Se existir ID, atualiza o produto.
  if (id) {
    const indice = produtos.findIndex(
      (produto) => produto.id === id
    );

    if (indice === -1) {
      mostrarMensagem("Produto não encontrado.", true);
      return;
    }

    const produtoAnterior = { ...produtos[indice] };

    produtos[indice] = {
      ...produtoAnterior,
      nome,
      codigo,
      categoria,
      preco
    };

    if (!salvarDados()) {
      produtos[indice] = produtoAnterior;
      return;
    }

    mostrarMensagem("Produto atualizado com sucesso!");
  } else {
    // Caso contrário, cadastra um novo produto.
    const novoProduto = {
      id: gerarId(),
      nome,
      codigo,
      categoria,
      preco,
      quantidade
    };

    produtos.push(novoProduto);

    if (!salvarDados()) {
      produtos.pop();
      return;
    }

    mostrarMensagem("Produto cadastrado com sucesso!");
  }

  limparFormulario();
  atualizarInterface();
});

// ==========================================
// 5. LIMPAR O FORMULÁRIO
// ==========================================

function limparFormulario() {
  formProduto.reset();

  campoId.value = "";
  campoQuantidade.disabled = false;
  campoQuantidade.value = "0";

  $("tituloFormulario").textContent = "Cadastrar produto";
  $("botaoSalvar").textContent = "Cadastrar produto";
  $("botaoCancelar").hidden = true;
}

$("botaoCancelar").addEventListener("click", limparFormulario);

// ==========================================
// 6. PESQUISAR E FILTRAR PRODUTOS
// ==========================================

function obterProdutosFiltrados() {
  const termo = campoPesquisa.value.trim().toLowerCase();
  const categoria = filtroCategoria.value;

  return produtos.filter((produto) => {
    const nome = produto.nome.toLowerCase();
    const codigo = produto.codigo.toLowerCase();

    const correspondePesquisa =
      nome.includes(termo) || codigo.includes(termo);

    const correspondeCategoria =
      categoria === "" || produto.categoria === categoria;

    return correspondePesquisa && correspondeCategoria;
  });
}

campoPesquisa.addEventListener("input", renderizarProdutos);

filtroCategoria.addEventListener("change", renderizarProdutos);

// ==========================================
// 7. MOSTRAR PRODUTOS NA TABELA
// ==========================================

function renderizarProdutos() {
  const filtrados = obterProdutosFiltrados();

  listaProdutos.replaceChildren();

  for (const produto of filtrados) {
    let classeStatus = "status-ok";
    let textoStatus = "Normal";

    if (produto.quantidade === 0) {
      classeStatus = "status-zerado";
      textoStatus = "Sem estoque";
    } else if (produto.quantidade <= LIMITE_ESTOQUE_BAIXO) {
      classeStatus = "status-baixo";
      textoStatus = "Estoque baixo";
    }

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${escaparHTML(produto.nome)}</td>
      <td>${escaparHTML(produto.codigo)}</td>
      <td>${escaparHTML(produto.categoria)}</td>
      <td>${formatarMoeda(produto.preco)}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.preco * produto.quantidade)}</td>
      <td>
        <span class="status ${classeStatus}">
          ${textoStatus}
        </span>
      </td>
      <td>
        <div class="acoes-tabela">
          <button type="button"
            class="botao-pequeno editar"
            data-acao="editar"
            data-id="${escaparHTML(produto.id)}">
            Editar
          </button>

          <button type="button"
            class="botao-pequeno excluir"
            data-acao="excluir"
            data-id="${escaparHTML(produto.id)}">
            Excluir
          </button>
        </div>
      </td>
    `;

    listaProdutos.appendChild(linha);
  }

  $("mensagemVazia").hidden = filtrados.length > 0;
}

// ==========================================
// 8. EDITAR PRODUTOS
// ==========================================

function editarProduto(id) {
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    mostrarMensagem("Produto não encontrado.", true);
    return;
  }

  campoId.value = produto.id;
  campoNome.value = produto.nome;
  campoCodigo.value = produto.codigo;
  campoCategoria.value = produto.categoria;
  campoPreco.value = produto.preco;
  campoQuantidade.value = produto.quantidade;

  // O estoque será alterado pela entrada ou saída.
  campoQuantidade.disabled = true;

  $("tituloFormulario").textContent = "Editar produto";
  $("botaoSalvar").textContent = "Salvar alterações";
  $("botaoCancelar").hidden = false;

  formProduto.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// ==========================================
// 9. EXCLUIR PRODUTOS
// ==========================================

function excluirProduto(id) {
  const indice = produtos.findIndex(
    (produto) => produto.id === id
  );

  if (indice === -1) {
    mostrarMensagem("Produto não encontrado.", true);
    return;
  }

  const produto = produtos[indice];

  if (!confirm(`Deseja excluir "${produto.nome}"?`)) {
    return;
  }

  produtos.splice(indice, 1);

  if (!salvarDados()) {
    produtos.splice(indice, 0, produto);
    return;
  }

  if (campoId.value === id) {
    limparFormulario();
  }

  mostrarMensagem("Produto excluído com sucesso!");
  atualizarInterface();
}

listaProdutos.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");

  if (!botao) return;

  if (botao.dataset.acao === "editar") {
    editarProduto(botao.dataset.id);
  }

  if (botao.dataset.acao === "excluir") {
    excluirProduto(botao.dataset.id);
  }
});

// ==========================================
// 10. ATUALIZAR RESUMO DO ESTOQUE
// ==========================================

function atualizarResumo() {
  let unidades = 0;
  let valorTotal = 0;
  let estoqueBaixo = 0;

  let i = 0;

  while (i < produtos.length) {
    const produto = produtos[i];

    unidades += produto.quantidade;
    valorTotal += produto.preco * produto.quantidade;

    if (produto.quantidade <= LIMITE_ESTOQUE_BAIXO) {
      estoqueBaixo++;
    }

    i++;
  }

  $("totalProdutos").textContent = produtos.length;
  $("totalUnidades").textContent = unidades;
  $("valorEstoque").textContent = formatarMoeda(valorTotal);
  $("estoqueBaixo").textContent = estoqueBaixo;
}

// ==========================================
// 11. SELECIONAR PRODUTOS PARA MOVIMENTAÇÃO
// ==========================================

function renderizarSeletorProdutos() {
  const selecionado = produtoMovimentacao.value;

  produtoMovimentacao.replaceChildren();

  const opcaoInicial = document.createElement("option");
  opcaoInicial.value = "";
  opcaoInicial.textContent = "Selecione um produto";

  produtoMovimentacao.appendChild(opcaoInicial);

  let i = 0;

  if (produtos.length > 0) {
    do {
      const produto = produtos[i];
      const opcao = document.createElement("option");

      opcao.value = produto.id;
      opcao.textContent = `${produto.nome} (${produto.codigo})`;

      produtoMovimentacao.appendChild(opcao);
      i++;
    } while (i < produtos.length);
  }

  if (produtos.some((produto) => produto.id === selecionado)) {
    produtoMovimentacao.value = selecionado;
  }
}

// ==========================================
// 12. REGISTRAR ENTRADAS E SAÍDAS
// ==========================================

formMovimentacao.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const id = produtoMovimentacao.value;
  const tipo = tipoMovimentacao.value;
  const quantidade = Number(quantidadeMovimentacao.value);

  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    mostrarMensagem("Selecione um produto válido.", true);
    return;
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    mostrarMensagem("Tipo de movimentação inválido.", true);
    return;
  }

  if (
    !Number.isInteger(quantidade) ||
    quantidade < 1 ||
    quantidade > LIMITE_QUANTIDADE
  ) {
    mostrarMensagem("Informe uma quantidade válida.", true);
    return;
  }

  const quantidadeAnterior = produto.quantidade;

  if (tipo === "entrada") {
    if (quantidadeAnterior + quantidade > LIMITE_QUANTIDADE) {
      mostrarMensagem("Limite de estoque excedido.", true);
      return;
    }

    produto.quantidade += quantidade;
  } else {
    if (quantidade > quantidadeAnterior) {
      mostrarMensagem("Estoque insuficiente.", true);
      return;
    }

    produto.quantidade -= quantidade;
  }

  const registro = {
    id: gerarId(),
    produtoId: produto.id,
    produtoNome: produto.nome,
    tipo,
    quantidade,
    data: new Date().toISOString()
  };

  historico.unshift(registro);

  if (!salvarDados()) {
    produto.quantidade = quantidadeAnterior;
    historico.shift();
    return;
  }

  formMovimentacao.reset();

  mostrarMensagem("Movimentação registrada com sucesso!");
  atualizarInterface();
});

// ==========================================
// 13. HISTÓRICO DE MOVIMENTAÇÕES
// ==========================================

function renderizarHistorico() {
  listaHistorico.replaceChildren();

  historico.forEach((registro) => {
    const linha = document.createElement("tr");
    const data = new Date(registro.data);

    const dataFormatada = Number.isNaN(data.getTime())
      ? "Data indisponível"
      : data.toLocaleString("pt-BR");

    const tipoTexto = registro.tipo === "entrada"
      ? "Entrada"
      : registro.tipo === "saida"
        ? "Saída"
        : "Indefinido";

    linha.innerHTML = `
      <td>${dataFormatada}</td>
      <td>${escaparHTML(registro.produtoNome || "Produto removido")}</td>
      <td>${tipoTexto}</td>
      <td>${Number(registro.quantidade) || 0}</td>
    `;

    listaHistorico.appendChild(linha);
  });

  $("historicoVazio").hidden = historico.length > 0;
}

// ==========================================
// 14. LIMPAR HISTÓRICO
// ==========================================

$("botaoLimparHistorico").addEventListener("click", () => {
  if (historico.length === 0) {
    mostrarMensagem("O histórico já está vazio.", true);
    return;
  }

  if (!confirm("Deseja apagar todo o histórico?")) {
    return;
  }

  const anterior = historico;
  historico = [];

  if (!salvarDados()) {
    historico = anterior;
    return;
  }

  renderizarHistorico();
  mostrarMensagem("Histórico apagado com sucesso!");
});

// ==========================================
// 15. INICIALIZAR O SISTEMA
// ==========================================

function atualizarInterface() {
  atualizarResumo();
  renderizarProdutos();
  renderizarSeletorProdutos();
  renderizarHistorico();
}

atualizarInterface();
