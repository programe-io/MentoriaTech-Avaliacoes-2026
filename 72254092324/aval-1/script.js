// ==========================================
// LÓGICA DO SEU MATERIAL (REGRAS DE NEGÓCIO)
// ==========================================

let produtos = [];

// Função para validar produto
function validarProduto(descricao, quantidade, valor) {
  if (!descricao || descricao.trim().length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres.");
  }
  if (isNaN(quantidade) || quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero.");
  }
  if (isNaN(valor) || valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero.");
  }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao.trim(),
    quantidade: Number(quantidade),
    valor: Number(valor)
  };

  produtos.push(novoProduto);
}

// Função para atualizar o valor do produto usando find()
function atualizarValor(codigoProduto, novoValor) {
  let produtoEncontrado = produtos.find(p => p.codigo === codigoProduto);

  if (!produtoEncontrado) {
    throw new Error("Produto não encontrado.");
  }
  if (isNaN(novoValor) || novoValor < 0) {
    throw new Error("O novo valor deve ser maior ou igual a zero.");
  }

  produtoEncontrado.valor = Number(novoValor);
}

// Função para atualizar (somar/subtrair) a quantidade do produto
function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
  let produtoEncontrado = produtos.find(p => p.codigo === codigoProduto);

  if (!produtoEncontrado) {
    throw new Error("Produto não encontrado.");
  }
  if (isNaN(quantidadeAdicional)) {
    throw new Error("Informe um número válido para a quantidade.");
  }

  let novaQuantidade = produtoEncontrado.quantidade + Number(quantidadeAdicional);
  
  if (novaQuantidade < 0) {
    throw new Error("O estoque não pode ficar negativo.");
  }

  produtoEncontrado.quantidade = novaQuantidade;
}

// ==========================================
// CONEXÃO COM A TELA (INTERFACE HTML)
// ==========================================

function mostrarErro(mensagem) {
  const caixaErro = document.getElementById("caixaErro");
  caixaErro.textContent = "⚠️ Erro: " + mensagem;
  caixaErro.style.display = "block";
}

function limparErro() {
  const caixaErro = document.getElementById("caixaErro");
  caixaErro.style.display = "none";
}

// Função para listar produtos na tabela HTML
function listarProdutos() {
  const tbody = document.getElementById("tabelaProdutos");
  tbody.innerHTML = "";

  produtos.forEach(produto => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>#${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade} un.</td>
      <td>R$ ${produto.valor.toFixed(2).replace('.', ',')}</td>
      <td>
        <button class="btn-acao" onclick="acaoAtualizarValor(${produto.codigo})">Alterar Valor</button>
        <button class="btn-acao" onclick="acaoSomarQuantidade(${produto.codigo})">Somar Qtd</button>
      </td>
    `;

    tbody.appendChild(linha);
  });
}

function acaoCadastrar() {
  limparErro();
  const descricao = document.getElementById("descricao").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
    
    listarProdutos();
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

function acaoAtualizarValor(codigo) {
  limparErro();
  const entrada = prompt("Digite o novo valor para o produto #" + codigo + ":");
  if (entrada === null) return;

  try {
    atualizarValor(codigo, Number(entrada));
    listarProdutos();
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

function acaoSomarQuantidade(codigo) {
  limparErro();
  const entrada = prompt("Digite a quantidade a adicionar (use sinal de menos para retirar, ex: -2):");
  if (entrada === null) return;

  try {
    atualizarQuantidade(codigo, Number(entrada));
    listarProdutos();
  } catch (erro) {
    mostrarErro(erro.message);
  }
}
