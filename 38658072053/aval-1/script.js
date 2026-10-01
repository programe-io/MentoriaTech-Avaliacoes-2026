const produtos = [];

function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error(
      "A descrição deve ter, no mínimo, cinco caracteres."
    );
  }

  if (quantidade < 1) {
    throw new Error(
      "A quantidade deve ser maior que zero."
    );
  }

  if (valor < 0) {
    throw new Error(
      "O valor deve ser maior ou igual a zero."
    );
  }
}

function buscarProduto(codigo) {
  return produtos.find(
    produto => produto.codigo === codigo
  );
}

function mostrarMensagem(texto, tipo = "sucesso") {
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent = texto;
  mensagem.className =
    tipo === "erro"
      ? "mensagem-erro"
      : "mensagem-sucesso";
}

function limparFormulario() {
  document.getElementById("areaFormulario").innerHTML = "";
}

function abrirFormularioCadastro() {
  limparFormulario();

  document.getElementById("areaFormulario").innerHTML = `
    <div class="formulario">
      <h2>Cadastrar produto</h2>

      <label for="descricao">Descrição do produto:</label>
      <input type="text" id="descricao">

      <label for="quantidade">Quantidade inicial:</label>
      <input type="number" id="quantidade" min="1">

      <label for="valor">Valor do produto:</label>
      <input type="number" id="valor" min="0" step="0.01">

      <button onclick="cadastrarProduto()">
        Salvar produto
      </button>
    </div>
  `;
}

function cadastrarProduto() {
  try {
    const descricao = document
      .getElementById("descricao")
      .value
      .trim();

    const quantidade = Number(
      document.getElementById("quantidade").value
    );

    const valor = Number(
      document.getElementById("valor").value
    );

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
      codigo: produtos.length + 1,
      descricao: descricao,
      quantidade: quantidade,
      valor: valor
    };

    produtos.push(novoProduto);

    mostrarMensagem(
      `Produto cadastrado com sucesso! Código gerado: ${novoProduto.codigo}.`
    );

    limparFormulario();
    listarProdutos(false);
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
  }
}

function listarProdutos(exibirMensagem = true) {
  const lista = document.getElementById("listaProdutos");

  if (produtos.length === 0) {
    lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
  } else {
    lista.innerHTML = produtos.map(produto => `
      <div class="produto">
        <p><strong>Código:</strong> ${produto.codigo}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
        <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
        <p>
          <strong>Valor:</strong>
          ${produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </p>
      </div>
    `).join("");
  }

  if (exibirMensagem) {
    mostrarMensagem("Lista de produtos atualizada.");
  }
}

function abrirFormularioValor() {
  limparFormulario();

  document.getElementById("areaFormulario").innerHTML = `
    <div class="formulario">
      <h2>Atualizar valor</h2>

      <label for="codigoValor">Código do produto:</label>
      <input type="number" id="codigoValor" min="1">

      <label for="novoValor">Novo valor:</label>
      <input type="number" id="novoValor" min="0" step="0.01">

      <button onclick="atualizarValor()">
        Atualizar valor
      </button>
    </div>
  `;
}

function atualizarValor() {
  try {
    const codigo = Number(
      document.getElementById("codigoValor").value
    );

    const novoValor = Number(
      document.getElementById("novoValor").value
    );

    const produto = buscarProduto(codigo);

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    if (novoValor < 0) {
      throw new Error(
        "O valor deve ser maior ou igual a zero."
      );
    }

    produto.valor = novoValor;

    mostrarMensagem("Valor atualizado com sucesso!");
    limparFormulario();
    listarProdutos(false);
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
  }
}

function abrirFormularioQuantidade() {
  limparFormulario();

  document.getElementById("areaFormulario").innerHTML = `
    <div class="formulario">
      <h2>Adicionar quantidade</h2>

      <label for="codigoQuantidade">
        Código do produto:
      </label>
      <input type="number" id="codigoQuantidade" min="1">

      <label for="quantidadeAdicionada">
        Quantidade que será adicionada:
      </label>
      <input type="number" id="quantidadeAdicionada" min="1">

      <button onclick="adicionarQuantidade()">
        Adicionar quantidade
      </button>
    </div>
  `;
}

function adicionarQuantidade() {
  try {
    const codigo = Number(
      document.getElementById("codigoQuantidade").value
    );

    const quantidadeAdicionada = Number(
      document.getElementById("quantidadeAdicionada").value
    );

    const produto = buscarProduto(codigo);

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    if (quantidadeAdicionada < 1) {
      throw new Error(
        "A quantidade deve ser maior que zero."
      );
    }

    produto.quantidade += quantidadeAdicionada;

    mostrarMensagem(
      `Quantidade atualizada com sucesso! Estoque atual: ${produto.quantidade} unidades.`
    );

    limparFormulario();
    listarProdutos(false);
  } catch (erro) {
    mostrarMensagem(`Erro: ${erro.message}`, "erro");
  }
}

function sairSistema() {
  limparFormulario();

  document.getElementById("listaProdutos").innerHTML =
    "<p>Sistema encerrado.</p>";

  mostrarMensagem("Sistema encerrado.");
}