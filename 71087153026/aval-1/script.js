let produtos = [];
let proximoCodigo = 1;

function mostrarMensagem(texto, erro = true) {
  const msgEl = document.getElementById("msg");
  msgEl.style.color = erro ? "#d9534f" : "#28a745";
  msgEl.innerText = texto;
}

function cadastrarProduto() {
  const desc = document.getElementById("desc").value.trim();
  const qtd = parseInt(document.getElementById("qtd").value);
  const valor = parseFloat(document.getElementById("valor").value);

  if (desc.length < 5) {
    mostrarMensagem("A descrição deve ter no mínimo 5 caracteres.");
    return;
  }
  if (isNaN(qtd) || qtd < 1) {
    mostrarMensagem("A quantidade deve ser maior que zero.");
    return;
  }
  if (isNaN(valor) || valor < 0) {
    mostrarMensagem("O valor deve ser maior ou igual a zero.");
    return;
  }

  const produto = {
    codigo: proximoCodigo++,
    descricao: desc,
    quantidade: qtd,
    valor: valor
  };

  produtos.push(produto);
  mostrarMensagem(`Produto "${desc}" cadastrado com sucesso!`, false);

  document.getElementById("desc").value = "";
  document.getElementById("qtd").value = "";
  document.getElementById("valor").value = "";

  listarProdutos();
}

function listarProdutos() {
  const tabela = document.getElementById("tabelaEstoque");
  tabela.innerHTML = "";

  produtos.forEach((p) => {
    const linha = `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.descricao}</td>
        <td>${p.quantidade}</td>
        <td>R$ ${p.valor.toFixed(2)}</td>
      </tr>
    `;
    tabela.innerHTML += linha;
  });
}

function alterarValor() {
  const codigo = parseInt(document.getElementById("codigoAlt").value);
  const novoValor = parseFloat(document.getElementById("novoValor").value);

  const produto = produtos.find((p) => p.codigo === codigo);
  if (!produto) {
    mostrarMensagem("Produto não encontrado.");
    return;
  }
  if (isNaN(novoValor) || novoValor < 0) {
    mostrarMensagem("Informe um valor válido.");
    return;
  }

  produto.valor = novoValor;
  mostrarMensagem(`Valor do produto ${codigo} alterado para R$ ${novoValor.toFixed(2)}!`, false);
  listarProdutos();
}

function alterarQuantidade() {
  const codigo = parseInt(document.getElementById("codigoAlt").value);
  const qtdAdicional = parseInt(document.getElementById("novaQtd").value);

  const produto = produtos.find((p) => p.codigo === codigo);
  if (!produto) {
    mostrarMensagem("Produto não encontrado.");
    return;
  }
  if (isNaN(qtdAdicional) || qtdAdicional < 1) {
    mostrarMensagem("Informe uma quantidade válida a adicionar.");
    return;
  }

  produto.quantidade += qtdAdicional;
  mostrarMensagem(`Adicionadas ${qtdAdicional} unidades ao produto ${codigo}!`, false);
  listarProdutos();
}