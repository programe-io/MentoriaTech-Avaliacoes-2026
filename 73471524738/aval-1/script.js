let produtos = [];

function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  }
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);
  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor,
  };
  produtos.push(novoProduto);
}

function listarProdutos() {
  console.log(produtos);
  const tbody = document.getElementById("tabela-produtos");
  if (!tbody) return;

  tbody.innerHTML = "";
  produtos.forEach((prod) => {
    tbody.innerHTML += `
      <tr>
        <td>${prod.codigo}</td>
        <td>${prod.descricao}</td>
        <td>${prod.quantidade}</td>
        <td>R$ ${prod.valor.toFixed(2)}</td>
      </tr>
    `;
  });
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
  const produto = produtos.find((prod) => prod.codigo === codigoProduto);
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
  const produto = produtos.find((prod) => prod.codigo === codigoProduto);
  if (produto) {
    produto.quantidade += novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// Funções de ligação com os botões da tela
function exibirStatus(texto, erro = false) {
  const msg = document.getElementById("mensagem");
  msg.style.color = erro ? "#dc2626" : "#059669";
  msg.textContent = texto;
}

function acaoCadastrar() {
  try {
    const desc = document.getElementById("descricao").value;
    const qtd = Number(document.getElementById("quantidade").value);
    const val = Number(document.getElementById("valor").value);

    cadastrarProduto(desc, qtd, val);
    listarProdutos();
    exibirStatus("Produto cadastrado com sucesso!");
  } catch (e) {
    exibirStatus(e.message, true);
  }
}

function acaoAtualizarValor() {
  try {
    const cod = Number(document.getElementById("codValor").value);
    const val = Number(document.getElementById("novoValor").value);

    atualizarValor(cod, val);
    listarProdutos();
    exibirStatus("Valor atualizado!");
  } catch (e) {
    exibirStatus(e.message, true);
  }
}

function acaoAtualizarQuantidade() {
  try {
    const cod = Number(document.getElementById("codQtd").value);
    const qtd = Number(document.getElementById("novaQtd").value);

    atualizarQuantidade(cod, qtd);
    listarProdutos();
    exibirStatus("Quantidade adicionada!");
  } catch (e) {
    exibirStatus(e.message, true);
  }
}

// Seus testes iniciais
listarProdutos();
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);
listarProdutos();
atualizarValor(2, 97.00);
listarProdutos();
atualizarQuantidade(1, 3);
listarProdutos();

