let produtos = [];

function validarDescricao(descricao) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  }
}

function validarProduto(descricao, quantidade, valor) {
  validarDescricao(descricao);
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
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
}

function listarProdutos() {
  return produtos;
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
  const produto = buscarProdutoPorCodigo(codigoProduto);
  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  const produto = buscarProdutoPorCodigo(codigoProduto);
  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// Formata número no padrão R$ 0.000,00 (com centavos)
function formatarMoeda(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Soma o valor total do estoque (quantidade x valor de cada produto)
function calcularValorTotalEstoque() {
  return produtos.reduce((total, p) => total + (p.quantidade * p.valor), 0);
}

function renderizarTabela() {
  const corpo = document.getElementById("tabelaProdutos");
  const vazio = document.getElementById("vazio");
  const contador = document.getElementById("contador");
  const valorTotal = document.getElementById("valorTotal");

  corpo.innerHTML = "";

  if (produtos.length === 0) {
    vazio.style.display = "block";
  } else {
    vazio.style.display = "none";
    produtos.forEach((p) => {
      const linha = document.createElement("tr");
      linha.innerHTML =
        "<td class='num'>" + p.codigo + "</td>" +
        "<td>" + p.descricao + "</td>" +
        "<td class='num'>" + p.quantidade + "</td>" +
        "<td class='num'>" + formatarMoeda(p.valor) + "</td>";
      corpo.appendChild(linha);
    });
  }

  contador.textContent = produtos.length;
  valorTotal.textContent = formatarMoeda(calcularValorTotalEstoque());
}

function mostrarMensagem(idElemento, texto, tipo) {
  const el = document.getElementById(idElemento);
  el.textContent = texto;
  el.className = "msg " + tipo;
}

function onCadastrar() {
  const descricao = document.getElementById("inDescricao").value.trim();
  const quantidade = Number(document.getElementById("inQuantidade").value);
  const valor = Number(document.getElementById("inValor").value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    mostrarMensagem("msgCadastro", "Produto cadastrado com sucesso!", "ok");
    document.getElementById("inDescricao").value = "";
    document.getElementById("inQuantidade").value = "";
    document.getElementById("inValor").value = "";
    renderizarTabela();
  } catch (erro) {
    mostrarMensagem("msgCadastro", erro.message, "err");
  }
}

function onAtualizar() {
  const codigo = Number(document.getElementById("upCodigo").value);
  const valorCampo = document.getElementById("upValor").value;
  const quantidadeCampo = document.getElementById("upQuantidade").value;

  try {
    if (valorCampo !== "") {
      atualizarValor(codigo, Number(valorCampo));
    }
    if (quantidadeCampo !== "") {
      atualizarQuantidade(codigo, Number(quantidadeCampo));
    }
    if (valorCampo === "" && quantidadeCampo === "") {
      throw new Error("Informe um novo valor ou uma quantidade a somar");
    }
    mostrarMensagem("msgAtualizar", "Produto atualizado com sucesso!", "ok");
    document.getElementById("upCodigo").value = "";
    document.getElementById("upValor").value = "";
    document.getElementById("upQuantidade").value = "";
    renderizarTabela();
  } catch (erro) {
    mostrarMensagem("msgAtualizar", erro.message, "err");
  }
}

renderizarTabela();