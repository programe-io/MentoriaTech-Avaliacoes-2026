
let produtos = [];
let proximoCodigo = 1;

const form = document.getElementById("formProduto");
const campoCodigo = document.getElementById("codigo");
const campoNome = document.getElementById("nome");
const campoQuantidade = document.getElementById("quantidade");
const campoPreco = document.getElementById("preco");
const lista = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const resumo = document.getElementById("resumo");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
}

function cadastrarProduto(nome, quantidade, preco) {
  if (nome.trim().length < 3) {
    throw new Error("O nome deve ter pelo menos 3 caracteres.");
  }

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    throw new Error("Informe uma quantidade inteira igual ou maior que zero.");
  }

  if (!Number.isFinite(preco) || preco <= 0) {
    throw new Error("O preço deve ser maior que zero.");
  }

  const produto = {
    codigo: proximoCodigo++,
    nome: nome.trim(),
    quantidade: quantidade,
    preco: preco
  };

  produtos.push(produto);
  listarProdutos();
}

function listarProdutos() {
  lista.replaceChildren();

  produtos.forEach(function(produto) {
    const linha = document.createElement("tr");

    const valores = [
      produto.codigo,
      produto.nome,
      produto.quantidade,
      produto.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })
    ];

    valores.forEach(function(valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    });

    const celulaAcoes = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "editar";
    btnEditar.addEventListener("click", function() {
      editarProduto(produto.codigo);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "excluir";
    btnExcluir.addEventListener("click", function() {
      excluirProduto(produto.codigo);
    });

    celulaAcoes.append(btnEditar, btnExcluir);
    linha.appendChild(celulaAcoes);
    lista.appendChild(linha);
  });

  const totalItens = produtos.reduce(function(total, produto) {
    return total + produto.quantidade;
  }, 0);

  resumo.textContent =
    produtos.length + " produto(s) cadastrado(s) | " +
    totalItens + " unidade(s) no estoque.";
}

function editarProduto(codigo) {
  const produto = produtos.find(function(item) {
    return item.codigo === codigo;
  });

  if (!produto) return;

  campoCodigo.value = produto.codigo;
  campoNome.value = produto.nome;
  campoQuantidade.value = produto.quantidade;
  campoPreco.value = produto.preco;

  btnSalvar.textContent = "Salvar alterações";
  btnCancelar.hidden = false;
  mostrarMensagem("Editando: " + produto.nome);

  campoNome.focus();
}

function excluirProduto(codigo) {
  const produto = produtos.find(function(item) {
    return item.codigo === codigo;
  });

  if (!produto) return;

  if (!confirm("Deseja excluir " + produto.nome + "?")) return;

  produtos = produtos.filter(function(item) {
    return item.codigo !== codigo;
  });

  listarProdutos();
  mostrarMensagem("Produto excluído com sucesso.");
}

function limparFormulario() {
  form.reset();
  campoCodigo.value = "";
  btnSalvar.textContent = "Cadastrar produto";
  btnCancelar.hidden = true;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  try {
    const nome = campoNome.value;
    const quantidade = Number(campoQuantidade.value);
    const preco = Number(campoPreco.value);
    const codigo = Number(campoCodigo.value);

    if (campoCodigo.value !== "") {
      const produto = produtos.find(function(item) {
        return item.codigo === codigo;
      });

      if (!produto) {
        throw new Error("Produto não encontrado.");
      }

      if (nome.trim().length < 3) {
        throw new Error("O nome deve ter pelo menos 3 caracteres.");
      }

      if (!Number.isInteger(quantidade) || quantidade < 0) {
        throw new Error("Quantidade inválida.");
      }

      if (!Number.isFinite(preco) || preco <= 0) {
        throw new Error("Preço inválido.");
      }

      produto.nome = nome.trim();
      produto.quantidade = quantidade;
      produto.preco = preco;

      mostrarMensagem("Produto atualizado com sucesso.");
    } else {
      cadastrarProduto(nome, quantidade, preco);
      mostrarMensagem("Produto cadastrado com sucesso.");
    }

    listarProdutos();
    limparFormulario();
  } catch (erro) {
    mostrarMensagem("Erro: " + erro.message);
  }
});

btnCancelar.addEventListener("click", function() {
  limparFormulario();
  mostrarMensagem("Edição cancelada.");
});

listarProdutos();