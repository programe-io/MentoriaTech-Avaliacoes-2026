// --- LÓGICA ORIGINAL DO JS DOS PRINTS ---

// Lista (Array) de Produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descricao deve ter no mínimo cinco caracteres");
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
    "codigo": produtos.length + 1,
    "descricao": descricao,
    "quantidade": Number(quantidade),
    "valor": Number(valor)
  };
  produtos.push(novoProduto);
  atualizarInterface();
}

function listarProdutos() {
  console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
  const produto = produtos.find(prod => prod.codigo === codigoProduto);
  if (produto) {
    produto.valor = Number(novoValor);
    atualizarInterface();
  } else {
    throw new Error("Produto não encontrado");
  }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade a adicionar deve ser pelo menos 1");
  }
  const produto = produtos.find(prod => prod.codigo === codigoProduto);
  if (produto) {
    produto.quantidade += Number(novaQuantidade);
    atualizarInterface();
  } else {
    throw new Error("Produto não encontrado");
  }
}

// --- LÓGICA DE INTEGRAÇÃO COM A INTERFACE (DOM) ---

// Elementos da página
const formProduto = document.getElementById('form-produto');
const tabelaBody = document.getElementById('tabela-produtos-body');
const mensagemErro = document.getElementById('mensagem-erro');

// Cartões
const statTotalProdutos = document.getElementById('stat-total-produtos');
const statTotalItens = document.getElementById('stat-total-itens');
const statValorTotal = document.getElementById('stat-valor-total');

// Modal
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalDescricaoProduto = document.getElementById('modal-descricao-produto');
const modalLabelInput = document.getElementById('modal-label-input');
const modalInput = document.getElementById('modal-input');
const modalMensagemErro = document.getElementById('modal-mensagem-erro');
const btnModalSalvar = document.getElementById('btn-modal-salvar');

let acaoModal = null; // Função a ser executada ao guardar no modal

// Atualizar a tabela e os cartões na tela
function atualizarInterface() {
  tabelaBody.innerHTML = '';

  let totalItens = 0;
  let valorTotalEstoque = 0;

  produtos.forEach(prod => {
    const totalProduto = prod.quantidade * prod.valor;
    totalItens += prod.quantidade;
    valorTotalEstoque += totalProduto;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${prod.codigo}</td>
      <td><strong>${prod.descricao}</strong></td>
      <td>${prod.quantidade}</td>
      <td>R$ ${prod.valor.toFixed(2)}</td>
      <td>R$ ${totalProduto.toFixed(2)}</td>
      <td>
        <button class="btn btn-action" onclick="abrirModalAtualizarQuantidade(${prod.codigo})">+ Qtd</button>
        <button class="btn btn-action" onclick="abrirModalAtualizarValor(${prod.codigo})">Valor</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });

  // Atualizar contadores
  statTotalProdutos.textContent = produtos.length;
  statTotalItens.textContent = totalItens;
  statValorTotal.textContent = `R$ ${valorTotalEstoque.toFixed(2)}`;
}

// Submissão do Formulário de Cadastro
formProduto.addEventListener('submit', (e) => {
  e.preventDefault();
  ocultarErro();

  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = Number(document.getElementById('quantidade').value);
  const valor = Number(document.getElementById('valor').value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    formProduto.reset();
  } catch (err) {
    exibirErro(err.message);
  }
});

function exibirErro(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.style.display = 'block';
}

function ocultarErro() {
  mensagemErro.style.display = 'none';
}

// --- MODAL DE EDIÇÃO ---

function abrirModalAtualizarQuantidade(codigo) {
  const produto = produtos.find(p => p.codigo === codigo);
  modalTitulo.textContent = "Adicionar Quantidade";
  modalDescricaoProduto.textContent = `Produto: ${produto.descricao} (Atual: ${produto.quantidade})`;
  modalLabelInput.textContent = "Quantidade a somar";
  modalInput.value = 1;
  modalInput.min = 1;
  modalInput.step = 1;

  acaoModal = () => {
    atualizarQuantidade(codigo, Number(modalInput.value));
  };

  abrirModal();
}

function abrirModalAtualizarValor(codigo) {
  const produto = produtos.find(p => p.codigo === codigo);
  modalTitulo.textContent = "Atualizar Valor Unitário";
  modalDescricaoProduto.textContent = `Produto: ${produto.descricao} (Atual: R$ ${produto.valor.toFixed(2)})`;
  modalLabelInput.textContent = "Novo Valor (R$)";
  modalInput.value = produto.valor;
  modalInput.min = 0;
  modalInput.step = 0.01;

  acaoModal = () => {
    atualizarValor(codigo, Number(modalInput.value));
  };

  abrirModal();
}

function abrirModal() {
  modalMensagemErro.style.display = 'none';
  modal.style.display = 'flex';
}

function fecharModal() {
  modal.style.display = 'none';
}

btnModalSalvar.addEventListener('click', () => {
  try {
    if (acaoModal) acaoModal();
    fecharModal();
  } catch (err) {
    modalMensagemErro.textContent = err.message;
    modalMensagemErro.style.display = 'block';
  }
});

// Execução inicial simulando a sequência do print das imagens
window.onload = () => {
  cadastrarProduto("Cadeira Gamer", 12, 699.00);
  cadastrarProduto("Mouse Logi", 38, 99.00);
  atualizarValor(2, 97.00);
  atualizarQuantidade(1, 3);
};