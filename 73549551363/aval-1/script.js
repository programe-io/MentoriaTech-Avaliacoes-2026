// 4. Criação da lista de produtos
let produtos = [];

// ==========================================
// FUNÇÕES DE REGRA DE NEGÓCIO (IGUAIS À AULA)
// ==========================================

// 6, 7, 8, 9. Função para validar produto
function validarProduto(descricao, quantidade, valor) {
  if (descricao.trim().length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres.");
  }
  if (isNaN(quantidade) || quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero.");
  }
  if (isNaN(valor) || valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero.");
  }
}

// 21. Melhoria sugerida: função específica de busca com find
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

// 10, 11, 12, 13. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao.trim(),
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
}

// 16, 17, 18. Função para atualizar o valor do produto (substitui o valor)
function atualizarValor(codigoProduto, novoValor) {
  if (isNaN(novoValor) || novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// 19, 20. Função para atualizar a quantidade (soma ao estoque existente)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (isNaN(novaQuantidade) || novaQuantidade < 1) {
    throw new Error("Quantidade a adicionar deve ser maior que zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// ==========================================
// MANIPULAÇÃO DO DOM E EVENTOS DA INTERFACE
// ==========================================

function exibirMensagem(texto, tipo) {
  const box = document.getElementById("mensagem");
  box.textContent = texto;
  box.className = `mensagem ${tipo}`;
}

// 14. Função para listar produtos na tabela HTML (e no console)
function listarProdutos() {
  console.log(produtos);

  const tbody = document.getElementById("lista-produtos");
  const avisoVazio = document.getElementById("aviso-vazio");
  tbody.innerHTML = "";

  if (produtos.length === 0) {
    avisoVazio.style.display = "block";
    return;
  }

  avisoVazio.style.display = "none";

  produtos.forEach((prod) => {
    const tr = document.createElement("tr");
    const subtotal = prod.quantidade * prod.valor;

    tr.innerHTML = `
      <td><strong>#${prod.codigo}</strong></td>
      <td>${prod.descricao}</td>
      <td>${prod.quantidade} un.</td>
      <td>R$ ${prod.valor.toFixed(2)}</td>
      <td>R$ ${subtotal.toFixed(2)}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Evento: Cadastrar Produto
document.getElementById("form-cadastro").addEventListener("submit", function (event) {
  event.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    listarProdutos();
    exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
    event.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento: Atualizar Valor
document.getElementById("form-valor").addEventListener("submit", function (event) {
  event.preventDefault();

  const codigo = Number(document.getElementById("codigo-valor").value);
  const novoValor = Number(document.getElementById("novo-valor").value);

  try {
    atualizarValor(codigo, novoValor);
    listarProdutos();
    exibirMensagem(`Valor do produto #${codigo} atualizado!`, "sucesso");
    event.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento: Somar Quantidade
document.getElementById("form-quantidade").addEventListener("submit", function (event) {
  event.preventDefault();

  const codigo = Number(document.getElementById("codigo-qtd").value);
  const novaQuantidade = Number(document.getElementById("nova-qtd").value);

  try {
    atualizarQuantidade(codigo, novaQuantidade);
    listarProdutos();
    exibirMensagem(`Estoque do produto #${codigo} atualizado!`, "sucesso");
    event.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Inicializa a listagem ao abrir a página
listarProdutos();