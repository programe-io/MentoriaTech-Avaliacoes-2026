
let produtos = [];
let proximoCodigo = 1;

const formulario = document.getElementById("form-cadastro");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("lista-produtos");
const mensagem = document.getElementById("mensagem");

function validarProduto(descricao, quantidade, valor) {
  if (descricao.trim().length < 5) {
    throw new Error("A descrição deve ter no mínimo cinco caracteres.");
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error("A quantidade deve ser um número inteiro maior que zero.");
  }

  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: proximoCodigo++,
    descricao: descricao.trim(),
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  atualizarTela();
  mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
}

function listarProdutos() {
  return produtos;
}

function atualizarValor(codigoProduto, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }

  const produto = produtos.find(
    prod => prod.codigo === codigoProduto
  );

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.valor = novoValor;
  atualizarTela();
  mostrarMensagem("Valor atualizado com sucesso!", "sucesso");
}

function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
  if (!Number.isInteger(quantidadeAdicional) || quantidadeAdicional < 1) {
    throw new Error("A quantidade deve ser um inteiro maior que zero.");
  }

  const produto = produtos.find(
    prod => prod.codigo === codigoProduto
  );

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  produto.quantidade += quantidadeAdicional;
  atualizarTela();
  mostrarMensagem("Quantidade atualizada com sucesso!", "sucesso");
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function criarCelula(texto) {
  const celula = document.createElement("td");
  celula.textContent = texto;
  return celula;
}

function atualizarTela() {
  listaProdutos.replaceChildren();

  if (produtos.length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");

    celula.colSpan = 6;
    celula.className = "vazio";
    celula.textContent = "Nenhum produto cadastrado ainda.";

    linha.appendChild(celula);
    listaProdutos.appendChild(linha);
  } else {
    produtos.forEach(produto => {
      const linha = document.createElement("tr");

      linha.appendChild(criarCelula(String(produto.codigo)));
      linha.appendChild(criarCelula(produto.descricao));
      linha.appendChild(criarCelula(String(produto.quantidade)));
      linha.appendChild(criarCelula(formatarMoeda(produto.valor)));
      linha.appendChild(
        criarCelula(formatarMoeda(produto.quantidade * produto.valor))
      );

      const celulaAcoes = document.createElement("td");
      const acoes = document.createElement("div");
      acoes.className = "acoes";

      const botaoValor = document.createElement("button");
      botaoValor.type = "button";
      botaoValor.className = "editar";
      botaoValor.textContent = "Alterar valor";

      botaoValor.addEventListener("click", () => {
        const entrada = prompt(
          `Novo valor unitário para ${produto.descricao} (R$):`,
          produto.valor.toFixed(2)
        );

        if (entrada === null || entrada.trim() === "") return;

        const novoValor = Number(entrada.replace(",", "."));

        try {
          atualizarValor(produto.codigo, novoValor);
        } catch (erro) {
          mostrarMensagem(erro.message, "erro");
        }
      });

      const botaoQuantidade = document.createElement("button");
      botaoQuantidade.type = "button";
      botaoQuantidade.className = "editar";
      botaoQuantidade.textContent = "Adicionar unidades";

      botaoQuantidade.addEventListener("click", () => {
        const entrada = prompt(
          `Quantas unidades deseja adicionar a ${produto.descricao}?`,
          "1"
        );

        if (entrada === null || entrada.trim() === "") return;

        const quantidadeAdicional = Number(entrada);

        try {
          atualizarQuantidade(produto.codigo, quantidadeAdicional);
        } catch (erro) {
          mostrarMensagem(erro.message, "erro");
        }
      });

      acoes.append(botaoValor, botaoQuantidade);
      celulaAcoes.appendChild(acoes);
      linha.appendChild(celulaAcoes);
      listaProdutos.appendChild(linha);
    });
  }

  document.getElementById("total-produtos").textContent = produtos.length;

  document.getElementById("total-unidades").textContent =
    produtos.reduce((total, produto) => total + produto.quantidade, 0);

  const valorTotal = produtos.reduce(
    (total, produto) => total + produto.quantidade * produto.valor,
    0
  );

  document.getElementById("valor-estoque").textContent =
    formatarMoeda(valorTotal);
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const descricao = campoDescricao.value;
  const quantidade = Number(campoQuantidade.value);
  const valor = Number(campoValor.value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    formulario.reset();
    campoDescricao.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
});

document.getElementById("botao-exemplos").addEventListener("click", () => {
  if (produtos.length > 0) {
    const confirmar = window.confirm(
      "Adicionar os dois produtos de exemplo ao estoque atual?"
    );

    if (!confirmar) return;
  }

  try {
    cadastrarProduto("Cadeira Gamer", 12, 699.00);
    cadastrarProduto("Mouse Logi", 38, 99.00);
    mostrarMensagem("Produtos de exemplo adicionados.", "sucesso");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
});

atualizarTela();
