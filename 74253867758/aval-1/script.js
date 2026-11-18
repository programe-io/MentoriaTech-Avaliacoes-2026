"use strict";

const CHAVE_ESTOQUE = "controleEstoqueProdutos";

const form = document.querySelector("#formProduto");
const campoCodigo = document.querySelector("#codigo");
const campoDescricao = document.querySelector("#descricao");
const campoQuantidade = document.querySelector("#quantidade");
const campoValor = document.querySelector("#valor");
const campoIndice = document.querySelector("#indiceEdicao");
const busca = document.querySelector("#busca");
const lista = document.querySelector("#listaProdutos");
const estadoVazio = document.querySelector("#estadoVazio");
const mensagem = document.querySelector("#mensagem");
const botaoSalvar = document.querySelector("#botaoSalvar");
const botaoCancelar = document.querySelector("#botaoCancelar");
const tituloFormulario = document.querySelector("#tituloFormulario");

let produtos = carregarProdutos();
let temporizadorMensagem;

function carregarProdutos() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_ESTOQUE) || "[]");
    if (!Array.isArray(dados)) return [];

    return dados.filter(produto =>
      produto &&
      typeof produto.codigo === "string" &&
      typeof produto.descricao === "string" &&
      Number.isInteger(Number(produto.quantidade)) &&
      Number(produto.quantidade) >= 0 &&
      Number.isFinite(Number(produto.valor)) &&
      Number(produto.valor) >= 0
    ).map(produto => ({
      codigo: produto.codigo,
      descricao: produto.descricao,
      quantidade: Number(produto.quantidade),
      valor: Number(produto.valor)
    }));
  } catch {
    return [];
  }
}

function salvarProdutos() {
  try {
    localStorage.setItem(CHAVE_ESTOQUE, JSON.stringify(produtos));
    return true;
  } catch {
    avisar("Não foi possível salvar. Verifique o armazenamento do navegador.");
    return false;
  }
}

function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function avisar(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add("visivel");

  clearTimeout(temporizadorMensagem);
  temporizadorMensagem = setTimeout(() => {
    mensagem.classList.remove("visivel");
  }, 2600);
}

form.addEventListener("submit", evento => {
  evento.preventDefault();

  const produto = {
    codigo: campoCodigo.value.trim(),
    descricao: campoDescricao.value.trim(),
    quantidade: Number(campoQuantidade.value),
    valor: Number(campoValor.value)
  };

  if (
    !produto.codigo ||
    !produto.descricao ||
    !Number.isInteger(produto.quantidade) ||
    produto.quantidade < 0 ||
    !Number.isFinite(produto.valor) ||
    produto.valor < 0
  ) {
    avisar("Confira os dados informados.");
    return;
  }

  const indiceEdicao = campoIndice.value;
  const codigoNormalizado = produto.codigo.toLocaleLowerCase("pt-BR");

  const codigoEmUso = produtos.some((item, indice) =>
    item.codigo.toLocaleLowerCase("pt-BR") === codigoNormalizado &&
    String(indice) !== indiceEdicao
  );

  if (codigoEmUso) {
    avisar("Esse código já está cadastrado.");
    campoCodigo.focus();
    return;
  }

  if (indiceEdicao === "") {
    produtos.push(produto);
  } else {
    const indice = Number(indiceEdicao);
    if (!Number.isInteger(indice) || !produtos[indice]) {
      avisar("Não foi possível localizar o produto para edição.");
      cancelarEdicao();
      return;
    }
    produtos[indice] = produto;
  }

  if (!salvarProdutos()) return;

  form.reset();
  cancelarEdicao();
  renderizar();
  avisar(indiceEdicao === "" ? "Produto cadastrado." : "Produto atualizado.");
});

busca.addEventListener("input", renderizar);

function renderizar() {
  const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

  const encontrados = produtos
    .map((produto, indice) => ({ produto, indice }))
    .filter(({ produto }) =>
      produto.codigo.toLocaleLowerCase("pt-BR").includes(termo) ||
      produto.descricao.toLocaleLowerCase("pt-BR").includes(termo)
    );

  lista.replaceChildren();

  encontrados.forEach(({ produto, indice }) => {
    const linha = document.createElement("tr");

    const valores = [
      produto.codigo,
      produto.descricao,
      produto.quantidade,
      moeda(produto.valor),
      moeda(produto.quantidade * produto.valor)
    ];

    valores.forEach(valor => {
      const celula = document.createElement("td");
      celula.textContent = String(valor);
      linha.appendChild(celula);
    });

    const celulaAcoes = document.createElement("td");

    const editar = document.createElement("button");
    editar.className = "acao";
    editar.textContent = "Editar";
    editar.type = "button";
    editar.setAttribute("aria-label", `Editar ${produto.descricao}`);
    editar.addEventListener("click", () => iniciarEdicao(indice));

    const excluir = document.createElement("button");
    excluir.className = "acao excluir";
    excluir.textContent = "Excluir";
    excluir.type = "button";
    excluir.setAttribute("aria-label", `Excluir ${produto.descricao}`);
    excluir.addEventListener("click", () => removerProduto(indice));

    celulaAcoes.append(editar, excluir);
    linha.appendChild(celulaAcoes);
    lista.appendChild(linha);
  });

  estadoVazio.hidden = encontrados.length > 0;
  estadoVazio.textContent = produtos.length === 0
    ? "Nenhum produto cadastrado."
    : "Nenhum produto encontrado.";

  document.querySelector("#totalProdutos").textContent = produtos.length;
  document.querySelector("#totalUnidades").textContent = produtos.reduce(
    (total, produto) => total + produto.quantidade,
    0
  );

  const valorTotal = produtos.reduce(
    (total, produto) => total + produto.quantidade * produto.valor,
    0
  );

  document.querySelector("#valorEstoque").textContent = moeda(valorTotal);
}

function iniciarEdicao(indice) {
  const produto = produtos[indice];
  if (!produto) return;

  campoCodigo.value = produto.codigo;
  campoDescricao.value = produto.descricao;
  campoQuantidade.value = produto.quantidade;
  campoValor.value = produto.valor;
  campoIndice.value = indice;

  tituloFormulario.textContent = "Editar produto";
  botaoSalvar.textContent = "Salvar alterações";
  botaoCancelar.classList.remove("escondido");

  campoCodigo.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicao() {
  campoIndice.value = "";
  tituloFormulario.textContent = "Cadastrar produto";
  botaoSalvar.textContent = "Cadastrar produto";
  botaoCancelar.classList.add("escondido");
}

botaoCancelar.addEventListener("click", () => {
  form.reset();
  cancelarEdicao();
});

function removerProduto(indice) {
  const produto = produtos[indice];
  if (!produto) return;

  if (!confirm(`Excluir o produto "${produto.descricao}"?`)) return;

  produtos.splice(indice, 1);

  if (!salvarProdutos()) {
    produtos.splice(indice, 0, produto);
    return;
  }

  renderizar();
  avisar("Produto excluído.");
}

renderizar();