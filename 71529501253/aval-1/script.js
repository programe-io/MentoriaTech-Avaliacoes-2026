// ================================================
// ESTADO DA APLICAÇÃO (Dados em memória)
// ================================================
let produtos = [];

// ================================================
// FUNÇÕES DE VALIDAÇÃO E BUSCA (Regras de Negócio)
// ================================================

function validarProduto(descricao, quantidade, valor) {
  if (descricao.trim().length < 5) {
    throw new Error("A descrição deve ter, no mínimo, 5 caracteres.");
  }
  if (quantidade < 1) {
    throw new Error("A quantidade deve ser maior que zero.");
  }
  if (valor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }
}

function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

// ================================================
// FUNÇÕES DE OPERAÇÃO DO ESTOQUE
// ================================================

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao.trim(),
    quantidade: Number(quantidade),
    valor: Number(valor)
  };

  produtos.push(novoProduto);
  renderizarTabela();
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = Number(novoValor);
    renderizarTabela();
  } else {
    throw new Error(`Produto com o código ${codigoProduto} não foi encontrado.`);
  }
}

function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
  if (quantidadeAdicional < 1) {
    throw new Error("A quantidade a ser adicionada deve ser maior que zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade += Number(quantidadeAdicional);
    renderizarTabela();
  } else {
    throw new Error(`Produto com o código ${codigoProduto} não foi encontrado.`);
  }
}

// ================================================
// MANIPULAÇÃO DO DOM / INTERFACE
// ================================================

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function exibirMensagem(texto, ehErro = false) {
  const elMensagem = document.getElementById("mensagem");
  elMensagem.textContent = texto;
  elMensagem.className = `mensagem ${ehErro ? 'erro' : 'sucesso'}`;
  
  // Oculta a mensagem após 4 segundos
  setTimeout(() => {
    elMensagem.className = "mensagem hidden";
  }, 4000);
}

function renderizarTabela() {
  const tbody = document.getElementById("tabela-produtos");
  tbody.innerHTML = "";

  if (produtos.length === 0) {
    tbody.innerHTML = `
      <tr id="linha-vazia">
        <td colspan="5" class="text-center">Nenhum produto cadastrado.</td>
      </tr>`;
    return;
  }

  produtos.forEach((prod) => {
    const tr = document.createElement("tr");
    const valorTotal = prod.quantidade * prod.valor;

    tr.innerHTML = `
      <td>${prod.codigo}</td>
      <td>${prod.descricao}</td>
      <td>${prod.quantidade}</td>
      <td>${formatarMoeda(prod.valor)}</td>
      <td>${formatarMoeda(valorTotal)}</td>
    `;

    tbody.appendChild(tr);
  });
}

// ================================================
// EVENTOS DOS FORMULÁRIOS
// ================================================

// Form: Cadastrar Produto
document.getElementById("form-cadastrar").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const descricao = document.getElementById("cad-descricao").value;
  const quantidade = Number(document.getElementById("cad-quantidade").value);
  const valor = Number(document.getElementById("cad-valor").value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    exibirMensagem("Produto cadastrado com sucesso!");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
});

// Form: Atualizar Valor
document.getElementById("form-atualizar-valor").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const codigo = Number(document.getElementById("val-codigo").value);
  const novoValor = Number(document.getElementById("val-novo-valor").value);

  try {
    atualizarValor(codigo, novoValor);
    exibirMensagem("Valor atualizado com sucesso!");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
});

// Form: Adicionar Quantidade
document.getElementById("form-atualizar-qtd").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const codigo = Number(document.getElementById("qtd-codigo").value);
  const quantidadeSomar = Number(document.getElementById("qtd-adicionar").value);

  try {
    atualizarQuantidade(codigo, quantidadeSomar);
    exibirMensagem("Quantidade somada ao estoque com sucesso!");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
});