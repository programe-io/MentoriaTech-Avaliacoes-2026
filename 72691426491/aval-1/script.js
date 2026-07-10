let produtos = [];

function validarDescricao(descricao) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  }
}

function validarQuantidade(quantidade) {
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
}

function validarValor(valor) {
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

function validarProduto(descricao, quantidade, valor) {
  validarDescricao(descricao);
  validarQuantidade(quantidade);
  validarValor(valor);
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  return novoProduto;
}

function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

function atualizarValor(codigoProduto, novoValor) {
  validarValor(novoValor);

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  validarQuantidade(novaQuantidade);

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

function excluirProduto(codigoProduto) {
  const indice = produtos.findIndex((prod) => prod.codigo === codigoProduto);

  if (indice === -1) {
    throw new Error("Produto não encontrado");
  }

  produtos.splice(indice, 1);
}

// ------------------------------------------------------------
// Funções de interface (conectam o HTML com a lógica acima)
// ------------------------------------------------------------

function mostrarMensagem(texto, sucesso) {
  const el = document.getElementById("mensagem");
  el.textContent = texto;
  el.style.color = sucesso ? "green" : "red";
}

function renderizarTabela() {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";

  produtos.forEach((produto) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.valor}</td>
    `;
    corpo.appendChild(linha);
  });
}

function handleCadastrar() {
  try {
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    cadastrarProduto(descricao, quantidade, valor);
    mostrarMensagem("Produto cadastrado com sucesso!", true);
    renderizarTabela();

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
  } catch (erro) {
    mostrarMensagem(erro.message, false);
  }
}

function handleAtualizarValor() {
  try {
    const codigo = Number(document.getElementById("codigoValor").value);
    const novoValor = Number(document.getElementById("novoValor").value);

    atualizarValor(codigo, novoValor);
    mostrarMensagem("Valor atualizado com sucesso!", true);
    renderizarTabela();
  } catch (erro) {
    mostrarMensagem(erro.message, false);
  }
}

function handleAtualizarQuantidade() {
  try {
    const codigo = Number(document.getElementById("codigoQuantidade").value);
    const novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    atualizarQuantidade(codigo, novaQuantidade);
    mostrarMensagem("Quantidade atualizada com sucesso!", true);
    renderizarTabela();
  } catch (erro) {
    mostrarMensagem(erro.message, false);
  }
}

function handleExcluir() {
  try {
    const codigo = Number(document.getElementById("codigoExcluir").value);

    excluirProduto(codigo);
    mostrarMensagem("Produto excluído com sucesso!", true);
    renderizarTabela();
  } catch (erro) {
    mostrarMensagem(erro.message, false);
  }
}