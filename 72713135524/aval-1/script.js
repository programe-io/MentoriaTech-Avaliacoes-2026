// Projeto: Controle de Estoque
// Os dados são armazenados no localStorage do navegador.

const CHAVE_PRODUTOS = "controleEstoqueProdutos";
const CHAVE_CODIGO = "controleEstoqueProximoCodigo";

let produtos = carregarProdutos();
let proximoCodigo = Number(localStorage.getItem(CHAVE_CODIGO)) || calcularProximoCodigo();

const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const buscaProduto = document.getElementById("buscaProduto");
const mensagemFormulario = document.getElementById("mensagemFormulario");

document.getElementById("dataAtual").textContent =
  new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

function carregarProdutos() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PRODUTOS));
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    console.error("Não foi possível carregar os produtos:", erro);
    return [];
  }
}

function calcularProximoCodigo() {
  if (produtos.length === 0) return 1;
  return Math.max(...produtos.map(produto => Number(produto.codigo) || 0)) + 1;
}

function salvarDados() {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos));
  localStorage.setItem(CHAVE_CODIGO, String(proximoCodigo));
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Evita que caracteres digitados na descrição sejam interpretados como HTML.
function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caractere]);
}

function validarProduto(descricao, quantidade, valor) {
  if (descricao.trim().length < 5) {
    throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error("A quantidade deve ser um número inteiro maior que zero.");
  }

  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: proximoCodigo,
    descricao: descricao.trim(),
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  proximoCodigo++;
  salvarDados();
  renderizarProdutos();
}

function listarProdutos(lista = produtos) {
  if (lista.length === 0) {
    listaProdutos.innerHTML = `
      <tr class="linha-vazia">
        <td colspan="6">Nenhum produto encontrado.</td>
      </tr>`;
    return;
  }

  listaProdutos.innerHTML = lista.map(produto => {
    const total = produto.quantidade * produto.valor;
    const estoqueBaixo = produto.quantidade < 5;

    return `
      <tr>
        <td class="codigo">#${produto.codigo}</td>
        <td class="nome-produto">${escaparHTML(produto.descricao)}</td>
        <td class="quantidade">
          ${produto.quantidade}
          ${estoqueBaixo ? '<span class="estoque-baixo">ESTOQUE BAIXO</span>' : ""}
        </td>
        <td>${formatarMoeda(produto.valor)}</td>
        <td><strong>${formatarMoeda(total)}</strong></td>
        <td>
          <div class="acoes-linha">
            <button class="botao-acao" data-acao="valor" data-codigo="${produto.codigo}">Alterar preço</button>
            <button class="botao-acao" data-acao="quantidade" data-codigo="${produto.codigo}">Entrada</button>
            <button class="botao-acao excluir" data-acao="excluir" data-codigo="${produto.codigo}">Excluir</button>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function atualizarResumo() {
  const totalProdutos = produtos.length;
  const totalUnidades = produtos.reduce((soma, produto) => soma + produto.quantidade, 0);
  const valorTotal = produtos.reduce(
    (soma, produto) => soma + produto.quantidade * produto.valor, 0
  );

  document.getElementById("totalProdutos").textContent = totalProdutos;
  document.getElementById("totalUnidades").textContent = totalUnidades;
  document.getElementById("valorEstoque").textContent = formatarMoeda(valorTotal);
}

function renderizarProdutos() {
  const termo = buscaProduto.value.trim().toLocaleLowerCase("pt-BR");
  const filtrados = produtos.filter(produto =>
    produto.descricao.toLocaleLowerCase("pt-BR").includes(termo) ||
    String(produto.codigo).includes(termo)
  );

  listarProdutos(filtrados);
  atualizarResumo();
}

function exibirMensagem(texto, tipo = "erro") {
  mensagemFormulario.textContent = texto;
  mensagemFormulario.className = tipo === "sucesso" ? "mensagem sucesso" : "mensagem";
}

formProduto.addEventListener("submit", evento => {
  evento.preventDefault();

  const descricao = campoDescricao.value;
  const quantidade = Number(campoQuantidade.value);
  const valor = Number(campoValor.value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    formProduto.reset();
    exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
    campoDescricao.focus();
  } catch (erro) {
    exibirMensagem(erro.message);
  }
});

buscaProduto.addEventListener("input", renderizarProdutos);

listaProdutos.addEventListener("click", evento => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const codigo = Number(botao.dataset.codigo);
  const produto = produtos.find(item => item.codigo === codigo);
  if (!produto) {
    exibirMensagem("Produto não encontrado.");
    return;
  }

  const acao = botao.dataset.acao;

  if (acao === "valor") {
    atualizarValor(codigo);
  } else if (acao === "quantidade") {
    atualizarQuantidade(codigo);
  } else if (acao === "excluir") {
    excluirProduto(codigo);
  }
});

function atualizarValor(codigoProduto) {
  const produto = produtos.find(item => item.codigo === codigoProduto);
  if (!produto) throw new Error("Produto não encontrado.");

  const resposta = prompt(
    `Novo valor para "${produto.descricao}" (R$):`,
    produto.valor.toFixed(2)
  );

  if (resposta === null) return;

  const novoValor = Number(resposta.replace(",", "."));
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    alert("Informe um valor válido, maior ou igual a zero.");
    return;
  }

  produto.valor = novoValor;
  salvarDados();
  renderizarProdutos();
}

function atualizarQuantidade(codigoProduto) {
  const produto = produtos.find(item => item.codigo === codigoProduto);
  if (!produto) throw new Error("Produto não encontrado.");

  const resposta = prompt(
    `Quantas unidades deseja adicionar ao produto "${produto.descricao}"?`,
    "1"
  );

  if (resposta === null) return;

  const novaQuantidade = Number(resposta);
  if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
    alert("Informe uma quantidade inteira maior que zero.");
    return;
  }

  produto.quantidade = produto.quantidade + novaQuantidade;
  salvarDados();
  renderizarProdutos();
}

function excluirProduto(codigoProduto) {
  const produto = produtos.find(item => item.codigo === codigoProduto);
  if (!produto) return;

  const confirmou = confirm(`Deseja realmente excluir "${produto.descricao}"?`);
  if (!confirmou) return;

  produtos = produtos.filter(item => item.codigo !== codigoProduto);
  salvarDados();
  renderizarProdutos();
}

// Exibe os dados que já estavam salvos quando a página foi aberta.
renderizarProdutos();
