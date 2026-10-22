
let produtos = [];
let proximoCodigo = 1;

const formCadastro = document.getElementById("formCadastro");
const formValor = document.getElementById("formValor");
const formQuantidade = document.getElementById("formQuantidade");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const busca = document.getElementById("busca");
const vazio = document.getElementById("vazio");

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Valida os dados do produto.
function validarProduto(descricao, quantidade, valor) {
  if (descricao.trim().length < 5) {
    throw new Error(
      "A descrição deve ter no mínimo cinco caracteres."
    );
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error(
      "A quantidade deve ser um número inteiro maior que zero."
    );
  }

  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error(
      "O valor deve ser maior ou igual a zero."
    );
  }
}

// Cadastra um produto.
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: proximoCodigo++,
    descricao: descricao.trim(),
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);

  return novoProduto;
}

// Busca um produto pelo código.
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find(
    (prod) => prod.codigo === codigoProduto
  );
}

// Lista os produtos na tabela.
function listarProdutos() {
  const termo = busca.value.trim().toLowerCase();

  const filtrados = produtos.filter((produto) =>
    produto.descricao.toLowerCase().includes(termo) ||
    String(produto.codigo).includes(termo)
  );

  listaProdutos.innerHTML = "";

  filtrados.forEach((produto) => {
    const linha = document.createElement("tr");

    const celulas = [
      `#${produto.codigo}`,
      produto.descricao,
      `${produto.quantidade} un.`,
      formatarMoeda(produto.valor),
      formatarMoeda(produto.quantidade * produto.valor)
    ];

    celulas.forEach((texto) => {
      const td = document.createElement("td");
      td.textContent = texto;
      linha.appendChild(td);
    });

    const tdAcoes = document.createElement("td");

    const botaoValor = document.createElement("button");
    botaoValor.textContent = "Editar valor";
    botaoValor.type = "button";
    botaoValor.addEventListener("click", () => {
      document.getElementById("codigoValor").value =
        produto.codigo;

      document.getElementById("novoValor").focus();
    });

    const botaoQuantidade = document.createElement("button");
    botaoQuantidade.textContent = "+ Estoque";
    botaoQuantidade.type = "button";
    botaoQuantidade.addEventListener("click", () => {
      document.getElementById("codigoQuantidade").value =
        produto.codigo;

      document.getElementById("novaQuantidade").focus();
    });

    tdAcoes.append(botaoValor, botaoQuantidade);
    linha.appendChild(tdAcoes);
    listaProdutos.appendChild(linha);
  });

  vazio.style.display = filtrados.length === 0 ? "block" : "none";

  document.getElementById("totalProdutos").textContent =
    produtos.length;

  document.getElementById("totalUnidades").textContent =
    produtos.reduce(
      (total, produto) => total + produto.quantidade,
      0
    );

  const valorTotal = produtos.reduce(
    (total, produto) =>
      total + produto.quantidade * produto.valor,
    0
  );

  document.getElementById("valorEstoque").textContent =
    formatarMoeda(valorTotal);
}

// Atualiza o preço do produto.
function atualizarValor(codigoProduto, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// Soma novas unidades à quantidade existente.
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
    throw new Error(
      "A quantidade deve ser um inteiro maior que zero."
    );
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade += novaQuantidade;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// Mostra mensagens de sucesso ou erro.
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function executarComTratamento(acao) {
  try {
    acao();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

// Evento de cadastro.
formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  executarComTratamento(() => {
    const descricao =
      document.getElementById("descricao").value;

    const quantidade =
      Number(document.getElementById("quantidade").value);

    const valor =
      Number(document.getElementById("valor").value);

    const produto = cadastrarProduto(
      descricao,
      quantidade,
      valor
    );

    listarProdutos();
    formCadastro.reset();

    mostrarMensagem(
      `Produto cadastrado! Código: ${produto.codigo}.`,
      "sucesso"
    );
  });
});

// Evento de atualização do valor.
formValor.addEventListener("submit", (evento) => {
  evento.preventDefault();

  executarComTratamento(() => {
    const codigo =
      Number(document.getElementById("codigoValor").value);

    const novoValor =
      Number(document.getElementById("novoValor").value);

    atualizarValor(codigo, novoValor);
    listarProdutos();
    formValor.reset();

    mostrarMensagem(
      "Valor atualizado com sucesso!",
      "sucesso"
    );
  });
});

// Evento para adicionar quantidade.
formQuantidade.addEventListener("submit", (evento) => {
  evento.preventDefault();

  executarComTratamento(() => {
    const codigo =
      Number(document.getElementById("codigoQuantidade").value);

    const quantidade =
      Number(document.getElementById("novaQuantidade").value);

    atualizarQuantidade(codigo, quantidade);
    listarProdutos();
    formQuantidade.reset();

    mostrarMensagem(
      "Estoque atualizado com sucesso!",
      "sucesso"
    );
  });
});

// Pesquisa por descrição ou código.
busca.addEventListener("input", listarProdutos);

// Exibe a tabela inicialmente.
listarProdutos();
