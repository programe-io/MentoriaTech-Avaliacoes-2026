// Array que armazena os produtos cadastrados
let estoque = [];

// Referências aos elementos da página
const formProduto = document.getElementById("form-produto");
const tabelaProdutos = document.getElementById("tabela-produtos");
const listaVazia = document.getElementById("lista-vazia");
const totalGeralEl = document.getElementById("total-geral");
const mensagemEl = document.getElementById("mensagem");

// Exibe feedback visual para o usuário
function exibirMensagem(texto, erro = false) {
  mensagemEl.textContent = texto;
  mensagemEl.style.color = erro ? "#dc2626" : "#059669";
  setTimeout(() => {
    mensagemEl.textContent = "";
  }, 3500);
}

// 1. Cadastrar um novo produto
formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const codigo = Number(document.getElementById("codigo").value);
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  // Verifica se o código já existe
  const codigoDuplicado = estoque.some((item) => item.codigo === codigo);
  if (codigoDuplicado) {
    exibirMensagem("Erro: Já existe um produto com este código!", true);
    return;
  }

  const novoProduto = {
    codigo,
    descricao,
    quantidade,
    valor,
  };

  estoque.push(novoProduto);
  formProduto.reset();
  exibirMensagem(`Produto "${descricao}" cadastrado com sucesso!`);
  listarProdutos();
});

// 2. Listar os produtos cadastrados
function listarProdutos() {
  tabelaProdutos.innerHTML = "";

  if (estoque.length === 0) {
    listaVazia.style.display = "block";
    totalGeralEl.textContent = "Total em estoque: R$ 0,00";
    return;
  }

  listaVazia.style.display = "none";
  let somaTotal = 0;

  estoque.forEach((produto) => {
    const subtotal = produto.quantidade * produto.valor;
    somaTotal += subtotal;

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2)}</td>
      <td>R$ ${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn-acao btn-qtd" onclick="alterarQuantidade(${produto.codigo})">Qtd</button>
        <button class="btn-acao btn-valor" onclick="alterarValor(${produto.codigo})">Valor</button>
        <button class="btn-acao btn-excluir" onclick="excluirProduto(${produto.codigo})">Excluir</button>
      </td>
    `;

    tabelaProdutos.appendChild(linha);
  });

  totalGeralEl.textContent = `Total em estoque: R$ ${somaTotal.toFixed(2)}`;
}

// 3. Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
  const produto = estoque.find((item) => item.codigo === codigo);
  if (!produto) return;

  const entrada = prompt(
    `Quantidade atual de "${produto.descricao}": ${produto.quantidade}\nDigite a nova quantidade:`
  );

  if (entrada === null) return;
  const novaQuantidade = Number(entrada);

  if (isNaN(novaQuantidade) || novaQuantidade < 0) {
    alert("Quantidade inválida!");
    return;
  }

  produto.quantidade = novaQuantidade;
  exibirMensagem(`Quantidade de "${produto.descricao}" atualizada!`);
  listarProdutos();
}

// 4. Alterar o valor de um produto
function alterarValor(codigo) {
  const produto = estoque.find((item) => item.codigo === codigo);
  if (!produto) return;

  const entrada = prompt(
    `Valor atual de "${produto.descricao}": R$ ${produto.valor.toFixed(2)}\nDigite o novo valor:`
  );

  if (entrada === null) return;
  const novoValor = Number(entrada);

  if (isNaN(novoValor) || novoValor < 0) {
    alert("Valor inválido!");
    return;
  }

  produto.valor = novoValor;
  exibirMensagem(`Valor de "${produto.descricao}" atualizado!`);
  listarProdutos();
}

// 5. Excluir produto (extra do CRUD)
function excluirProduto(codigo) {
  const indice = estoque.findIndex((item) => item.codigo === codigo);
  if (indice === -1) return;

  const removido = estoque.splice(indice, 1);
  exibirMensagem(`Produto "${removido[0].descricao}" removido.`);
  listarProdutos();
}

// Inicializa a visualização
listarProdutos();