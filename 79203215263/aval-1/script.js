
let produtos = [];
let proximoCodigo = 1;

// Elementos da página
const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const codigoEdicao = document.getElementById("codigoEdicao");
const listaProdutos = document.getElementById("listaProdutos");
const estadoVazio = document.getElementById("estadoVazio");
const mensagem = document.getElementById("mensagem");
const buscaProduto = document.getElementById("buscaProduto");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");

// Formatação de valores em reais
const formatarMoeda = (valor) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
  if (typeof descricao !== "string" || descricao.trim().length < 5) {
    throw new Error(
      "A descrição deve ter, no mínimo, cinco caracteres."
    );
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error(
      "A quantidade deve ser um número inteiro maior que zero."
    );
  }

  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error(
      "O valor deve ser um número maior ou igual a zero."
    );
  }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: proximoCodigo++,
    descricao: descricao.trim(),
    quantidade,
    valor
  };

  produtos.push(novoProduto);
  return novoProduto;
}

// Lista os produtos no console
function listarProdutos() {
  console.table(produtos);
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find(
    (produto) => produto.codigo === Number(codigoProduto)
  );
}

// Valida a descrição
function validarDescricao(descricao) {
  if (typeof descricao !== "string" || descricao.trim().length < 5) {
    throw new Error(
      "A descrição deve ter, no mínimo, cinco caracteres."
    );
  }
}

// Atualiza o preço
function atualizarValor(codigoProduto, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    throw new Error(
      "O valor deve ser maior ou igual a zero."
    );
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.valor = novoValor;
  return produto;
}

// Adiciona unidades ao estoque existente
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
    throw new Error(
      "A quantidade deve ser um número inteiro maior que zero."
    );
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.quantidade += novaQuantidade;
  return produto;
}

// Exibe mensagens de sucesso e erro
function exibirMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  mensagem.hidden = false;
}

// Limpa o formulário e encerra o modo de edição
function limparFormulario() {
  formProduto.reset();
  codigoEdicao.value = "";

  tituloFormulario.textContent = "Cadastrar produto";
  btnSalvar.textContent = "Cadastrar produto";
  btnCancelar.hidden = true;
}

// Cria uma célula da tabela com texto seguro
function criarCelula(texto, classe = "") {
  const celula = document.createElement("td");
  celula.textContent = texto;

  if (classe) {
    celula.className = classe;
  }

  return celula;
}

// Renderiza a tabela de produtos
function renderizarProdutos() {
  const termo = buscaProduto.value.trim().toLocaleLowerCase("pt-BR");

  const filtrados = produtos.filter((produto) => {
    return (
      String(produto.codigo).includes(termo) ||
      produto.descricao.toLocaleLowerCase("pt-BR").includes(termo)
    );
  });

  listaProdutos.replaceChildren();

  filtrados.forEach((produto) => {
    const linha = document.createElement("tr");

    linha.appendChild(
      criarCelula(String(produto.codigo), "codigo")
    );

    linha.appendChild(
      criarCelula(produto.descricao, "descricao-produto")
    );

    linha.appendChild(
      criarCelula(String(produto.quantidade))
    );

    linha.appendChild(
      criarCelula(formatarMoeda(produto.valor))
    );

    linha.appendChild(
      criarCelula(
        formatarMoeda(produto.quantidade * produto.valor),
        "valor-total"
      )
    );

    const celulaAcoes = document.createElement("td");
    const acoes = document.createElement("div");
    acoes.className = "acoes-tabela";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn btn-editar";
    btnEditar.textContent = "Editar";
    btnEditar.setAttribute(
      "aria-label",
      `Editar ${produto.descricao}`
    );
    btnEditar.addEventListener("click", () => editarProduto(produto.codigo));

    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.className = "btn btn-excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.setAttribute(
      "aria-label",
      `Excluir ${produto.descricao}`
    );
    btnExcluir.addEventListener("click", () => excluirProduto(produto.codigo));

    acoes.append(btnEditar, btnExcluir);
    celulaAcoes.appendChild(acoes);
    linha.appendChild(celulaAcoes);

    listaProdutos.appendChild(linha);
  });

  estadoVazio.hidden = filtrados.length > 0;

  if (filtrados.length === 0 && termo !== "") {
    estadoVazio.querySelector("h3").textContent =
      "Nenhum produto encontrado";
    estadoVazio.querySelector("p").textContent =
      "Tente buscar por outro código ou descrição.";
  } else if (filtrados.length === 0) {
    estadoVazio.querySelector("h3").textContent =
      "Nenhum produto cadastrado";
    estadoVazio.querySelector("p").textContent =
      "Cadastre seu primeiro produto usando o formulário acima.";
    estadoVazio.hidden = false;
  }

  atualizarResumo();
}

// Atualiza os indicadores do estoque
function atualizarResumo() {
  const totalProdutos = produtos.length;

  const totalUnidades = produtos.reduce(
    (total, produto) => total + produto.quantidade,
    0
  );

  const valorEstoque = produtos.reduce(
    (total, produto) =>
      total + produto.quantidade * produto.valor,
    0
  );

  document.getElementById("totalProdutos").textContent =
    totalProdutos;

  document.getElementById("totalUnidades").textContent =
    totalUnidades;

  document.getElementById("valorEstoque").textContent =
    formatarMoeda(valorEstoque);
}

// Coloca os dados do produto no formulário
function editarProduto(codigo) {
  const produto = buscarProdutoPorCodigo(codigo);

  if (!produto) {
    exibirMensagem("Produto não encontrado.", "erro");
    return;
  }

  codigoEdicao.value = produto.codigo;
  campoDescricao.value = produto.descricao;
  campoQuantidade.value = produto.quantidade;
  campoValor.value = produto.valor;

  tituloFormulario.textContent = "Editar produto";
  btnSalvar.textContent = "Salvar alterações";
  btnCancelar.hidden = false;

  formProduto.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  campoDescricao.focus();
}

// Exclui um produto
function excluirProduto(codigo) {
  const produto = buscarProdutoPorCodigo(codigo);

  if (!produto) {
    exibirMensagem("Produto não encontrado.", "erro");
    return;
  }

  const confirmar = window.confirm(
    `Deseja realmente excluir "${produto.descricao}"?`
  );

  if (!confirmar) return;

  produtos = produtos.filter(
    (item) => item.codigo !== produto.codigo
  );

  if (Number(codigoEdicao.value) === produto.codigo) {
    limparFormulario();
  }

  renderizarProdutos();
  exibirMensagem("Produto excluído com sucesso!");
}

// Cadastra ou atualiza o produto pelo formulário
formProduto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  try {
    const descricao = campoDescricao.value;
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);
    const codigo = Number(codigoEdicao.value);

    validarProduto(descricao, quantidade, valor);

    if (codigoEdicao.value !== "") {
      const produto = buscarProdutoPorCodigo(codigo);

      if (!produto) {
        throw new Error("Produto não encontrado.");
      }

      produto.descricao = descricao.trim();
      produto.quantidade = quantidade;
      atualizarValor(codigo, valor);

      exibirMensagem("Produto atualizado com sucesso!");
    } else {
      cadastrarProduto(descricao, quantidade, valor);

      exibirMensagem("Produto cadastrado com sucesso!");
    }

    limparFormulario();
    renderizarProdutos();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Cancela a edição
btnCancelar.addEventListener("click", () => {
  limparFormulario();
  exibirMensagem("Edição cancelada.");
});

// Busca enquanto o usuário digita
buscaProduto.addEventListener("input", renderizarProdutos);

// Inicializa a interface
renderizarProdutos();
