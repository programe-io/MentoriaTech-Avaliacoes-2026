// Array para armazenar a lista de produtos[cite: 3]
let produtos = [];

// ---- LÓGICA DO SISTEMA ----

// Valida os dados do produto com base nas regras do negócio[cite: 3, 4]
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");[cite: 4]
  }
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");[cite: 4]
  }
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");[cite: 4]
  }
}

// Cadastra um novo produto[cite: 3, 7]
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);[cite: 7]

  const novoProduto = {
    codigo: produtos.length + 1, // Geração automática do código[cite: 7, 8]
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);[cite: 7, 9]
}

// Busca o produto por código[cite: 16]
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);[cite: 12, 16]
}

// Atualiza o valor do produto[cite: 3, 12]
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");[cite: 12]
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);[cite: 12, 16]

  if (produto) {
    produto.valor = novoValor;[cite: 12]
  } else {
    throw new Error("Produto não encontrado");[cite: 12]
  }
}

// Atualiza a quantidade do produto (somando à existente)[cite: 3, 14, 15]
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");[cite: 14]
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);[cite: 14, 16]

  if (produto) {
    produto.quantidade += novaQuantidade; // Acumula a quantidade[cite: 14, 15]
  } else {
    throw new Error("Produto não encontrado");[cite: 14]
  }
}

// ---- INTERAÇÃO COM A INTERFACE (DOM) ----

function renderizarTabela() {
  const tbody = document.getElementById('tabela-produtos');
  tbody.innerHTML = '';

  produtos.forEach(prod => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prod.codigo}</td>
      <td>${prod.descricao}</td>
      <td>${prod.quantidade}</td>
      <td>€ ${prod.valor.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function exibirMensagem(texto, tipo) {
  const msgDiv = document.getElementById('mensagem');
  msgDiv.textContent = texto;
  msgDiv.className = `mensagem ${tipo}`;

  setTimeout(() => {
    msgDiv.className = 'mensagem hidden';
  }, 3000);
}

// Evento: Cadastrar
document.getElementById('form-cadastro').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const desc = document.getElementById('descricao').value;
    const qtd = parseInt(document.getElementById('quantidade').value);
    const val = parseFloat(document.getElementById('valor').value);

    cadastrarProduto(desc, qtd, val);
    renderizarTabela();
    exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento: Atualizar Valor
document.getElementById('form-atualizar-valor').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const cod = parseInt(document.getElementById('val-codigo').value);
    const novoValor = parseFloat(document.getElementById('val-novo').value);

    atualizarValor(cod, novoValor);
    renderizarTabela();
    exibirMensagem("Valor atualizado com sucesso!", "sucesso");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento: Atualizar Quantidade
document.getElementById('form-atualizar-qtd').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const cod = parseInt(document.getElementById('qtd-codigo').value);
    const novaQtd = parseInt(document.getElementById('qtd-nova').value);

    atualizarQuantidade(cod, novaQtd);
    renderizarTabela();
    exibirMensagem("Quantidade adicionada com sucesso!", "sucesso");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});