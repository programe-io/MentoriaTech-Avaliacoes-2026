/**
 * Projeto CRUD e Estoque em JavaScript
 * ------------------------------------
 * Lógica de negócio idêntica à ensinada na aula, com uma camada
 * de interface (DOM) por cima para uso no navegador.
 *
 * Cada produto possui: código (gerado automaticamente),
 * descrição, quantidade e valor.
 *
 * Regras importantes:
 *  - descricao precisa ter no mínimo 5 caracteres
 *  - quantidade inicial precisa ser maior que zero
 *  - valor precisa ser maior ou igual a zero
 *  - atualizarValor SUBSTITUI o valor atual
 *  - atualizarQuantidade SOMA à quantidade existente
 */

// ------------------------------------------------------------
// Lógica de negócio (igual à da aula)
// ------------------------------------------------------------

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
    valor: valor
  };

  produtos.push(novoProduto);
  return novoProduto;
}

function listarProdutos() {
  return produtos;
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
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// ------------------------------------------------------------
// Camada de interface (DOM)
// ------------------------------------------------------------

const formCadastro = document.getElementById('form-cadastro');
const mensagemCadastro = document.getElementById('mensagem-cadastro');

const corpoTabela = document.getElementById('corpo-tabela');
const tabelaEstoque = document.getElementById('tabela-estoque');
const listaVazia = document.getElementById('lista-vazia');
const contador = document.getElementById('contador');

const modalAtualizacao = document.getElementById('modal-atualizacao');
const modalProdutoInfo = document.getElementById('modal-produto-info');
const botaoFecharModal = document.getElementById('botao-fechar-modal');

const novoValorInput = document.getElementById('novo-valor');
const botaoAtualizarValor = document.getElementById('botao-atualizar-valor');
const mensagemValor = document.getElementById('mensagem-valor');

const quantidadeAdicionarInput = document.getElementById('quantidade-adicionar');
const botaoAdicionarQuantidade = document.getElementById('botao-adicionar-quantidade');
const mensagemQuantidade = document.getElementById('mensagem-quantidade');

let codigoSelecionado = null;

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = 'mensagem ' + (tipo === 'erro' ? 'mensagem--erro' : 'mensagem--ok');
  setTimeout(() => {
    elemento.textContent = '';
    elemento.className = 'mensagem';
  }, 2500);
}

function renderizarProdutos() {
  const lista = listarProdutos();

  contador.textContent = lista.length === 1 ? '1 item' : `${lista.length} itens`;

  if (lista.length === 0) {
    listaVazia.hidden = false;
    tabelaEstoque.hidden = true;
    return;
  }

  listaVazia.hidden = true;
  tabelaEstoque.hidden = false;

  corpoTabela.innerHTML = '';

  lista.forEach((produto) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.valor)}</td>
      <td>${formatarMoeda(produto.quantidade * produto.valor)}</td>
      <td><button class="acao-editar" data-codigo="${produto.codigo}">Atualizar</button></td>
    `;

    corpoTabela.appendChild(linha);
  });
}

formCadastro.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = Number(document.getElementById('quantidade').value);
  const valor = Number(document.getElementById('valor').value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    formCadastro.reset();
    document.getElementById('descricao').focus();
    mostrarMensagem(mensagemCadastro, 'Produto cadastrado com sucesso!', 'ok');
    renderizarProdutos();
  } catch (erro) {
    mostrarMensagem(mensagemCadastro, erro.message, 'erro');
  }
});

corpoTabela.addEventListener('click', (evento) => {
  const botao = evento.target.closest('.acao-editar');
  if (!botao) return;

  const codigo = Number(botao.dataset.codigo);
  const produto = listarProdutos().find((prod) => prod.codigo === codigo);
  if (!produto) return;

  codigoSelecionado = codigo;
  modalProdutoInfo.textContent = `Código ${produto.codigo} — ${produto.descricao}`;
  novoValorInput.value = produto.valor;
  quantidadeAdicionarInput.value = '';

  modalAtualizacao.hidden = false;
});

botaoAtualizarValor.addEventListener('click', () => {
  const novoValor = Number(novoValorInput.value);

  try {
    atualizarValor(codigoSelecionado, novoValor);
    mostrarMensagem(mensagemValor, 'Valor atualizado!', 'ok');
    renderizarProdutos();
  } catch (erro) {
    mostrarMensagem(mensagemValor, erro.message, 'erro');
  }
});

botaoAdicionarQuantidade.addEventListener('click', () => {
  const novaQuantidade = Number(quantidadeAdicionarInput.value);

  try {
    atualizarQuantidade(codigoSelecionado, novaQuantidade);
    quantidadeAdicionarInput.value = '';
    mostrarMensagem(mensagemQuantidade, 'Quantidade adicionada ao estoque!', 'ok');
    renderizarProdutos();
  } catch (erro) {
    mostrarMensagem(mensagemQuantidade, erro.message, 'erro');
  }
});

botaoFecharModal.addEventListener('click', () => {
  modalAtualizacao.hidden = true;
  codigoSelecionado = null;
});

modalAtualizacao.addEventListener('click', (evento) => {
  if (evento.target === modalAtualizacao) {
    modalAtualizacao.hidden = true;
    codigoSelecionado = null;
  }
});

renderizarProdutos();