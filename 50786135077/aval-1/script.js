
let produtos = [];
let proximoCodigo = 1;

const formProduto = document.getElementById("formProduto");
const mensagem = document.getElementById("mensagem");

function validarProduto(descricao, quantidade, valor) {
  if (descricao.trim().length < 5) {
    throw new Error("A descrição deve ter pelo menos 5 caracteres.");
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error("A quantidade deve ser maior que zero.");
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

  listarProdutos();
}

function listarProdutos() {
  const tabela = document.getElementById("listaProdutos");
  const pesquisa = document.getElementById("pesquisa")
    .value.trim().toLowerCase();

  tabela.replaceChildren();

  const filtrados = produtos.filter(produto =>
    produto.descricao.toLowerCase().includes(pesquisa) ||
    String(produto.codigo).includes(pesquisa)
  );

  if (filtrados.length === 0) {
    const linha = tabela.insertRow();
    const celula = linha.insertCell();
    celula.colSpan = 4;
    celula.textContent = "Nenhum produto cadastrado.";
  }

  filtrados.forEach(produto => {
    const linha = tabela.insertRow();

    linha.insertCell().textContent = produto.codigo;
    linha.insertCell().textContent = produto.descricao;
    linha.insertCell().textContent = produto.quantidade;
    linha.insertCell().textContent = produto.valor.toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );
  });

  document.getElementById("totalProdutos").textContent =
    produtos.length;

  document.getElementById("totalUnidades").textContent =
    produtos.reduce((total, produto) =>
      total + produto.quantidade, 0
    );
}

function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find(produto =>
    produto.codigo === codigoProduto
  );
}

function atualizarValor(codigoProduto, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.valor = novoValor;
  listarProdutos();
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
    throw new Error("A quantidade deve ser maior que zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.quantidade += novaQuantidade;
  listarProdutos();
}

formProduto.addEventListener("submit", evento => {
  evento.preventDefault();

  try {
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
      document.getElementById("quantidade").value
    );
    const valor = Number(
      document.getElementById("valor").value
    );

    cadastrarProduto(descricao, quantidade, valor);

    formProduto.reset();
    mensagem.textContent = "Produto cadastrado com sucesso!";
    mensagem.style.color = "green";
  } catch (erro) {
    mensagem.textContent = erro.message;
    mensagem.style.color = "red";
  }
});

document.getElementById("botaoValor")
  .addEventListener("click", () => {
    try {
      const codigo = Number(
        document.getElementById("codigoAtualizar").value
      );
      const valorTexto = document.getElementById("novoValor").value;

      if (valorTexto === "") {
        throw new Error("Informe o novo valor.");
      }

      atualizarValor(codigo, Number(valorTexto));

      mensagem.textContent = "Valor atualizado com sucesso!";
      mensagem.style.color = "green";
    } catch (erro) {
      mensagem.textContent = erro.message;
      mensagem.style.color = "red";
    }
  });

document.getElementById("botaoQuantidade")
  .addEventListener("click", () => {
    try {
      const codigo = Number(
        document.getElementById("codigoAtualizar").value
      );
      const quantidadeTexto =
        document.getElementById("entradaQuantidade").value;

      if (quantidadeTexto === "") {
        throw new Error("Informe a quantidade a adicionar.");
      }

      atualizarQuantidade(codigo, Number(quantidadeTexto));

      document.getElementById("entradaQuantidade").value = "";
      mensagem.textContent = "Quantidade atualizada com sucesso!";
      mensagem.style.color = "green";
    } catch (erro) {
      mensagem.textContent = erro.message;
      mensagem.style.color = "red";
    }
  });

document.getElementById("pesquisa")
  .addEventListener("input", listarProdutos);

listarProdutos();
