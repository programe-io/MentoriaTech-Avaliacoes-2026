// ===== Lista de produtos (array) =====
let produtos = [];

// ===== Validação =====
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  }
  if (isNaN(quantidade) || quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (isNaN(valor) || valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
}

// ===== Busca por código (melhoria sugerida na aula) =====
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

// ===== Cadastro =====
function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
}

// ===== Listagem (desenha a tabela na tela) =====
function listarProdutos() {
  const corpo = document.getElementById("lista");
  corpo.innerHTML = "";
  document.getElementById("vazio").style.display = produtos.length ? "none" : "block";

  produtos.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td><span class="cod">' + p.codigo + "</span></td>" +
      "<td></td>" +
      '<td class="num">' + p.quantidade + "</td>" +
      '<td class="num">' +
        p.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) +
      "</td>" +
      '<td class="acoes">' +
        '<button class="ghost" data-acao="valor" data-cod="' + p.codigo + '">Alterar valor</button> ' +
        '<button class="ghost" data-acao="qtd" data-cod="' + p.codigo + '">Adicionar qtd.</button>' +
      "</td>";
    tr.children[1].textContent = p.descricao; // textContent evita injeção de HTML
    corpo.appendChild(tr);
  });
}

// ===== Atualizar valor: o novo valor SUBSTITUI o antigo =====
function atualizarValor(codigoProduto, novoValor) {
  if (isNaN(novoValor) || novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  }
  const produto = buscarProdutoPorCodigo(codigoProduto);
  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// ===== Atualizar quantidade: a nova quantidade é SOMADA ao estoque =====
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (isNaN(novaQuantidade) || novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  const produto = buscarProdutoPorCodigo(codigoProduto);
  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado");
  }
}

// ===== Interface =====
const msg = document.getElementById("msg");

function mostrar(texto, tipo) {
  msg.textContent = texto;
  msg.className = "msg " + tipo;
}

// Botão "Cadastrar produto"
document.getElementById("btn-cadastrar").addEventListener("click", () => {
  const d = document.getElementById("descricao");
  const q = document.getElementById("quantidade");
  const v = document.getElementById("valor");

  try {
    cadastrarProduto(d.value.trim(), parseInt(q.value, 10), parseFloat(v.value));
    mostrar("Produto cadastrado com código " + produtos.length + ".", "ok");
    d.value = "";
    q.value = "";
    v.value = "";
    listarProdutos();
  } catch (e) {
    mostrar(e.message, "erro");
  }
});

// Botões "Alterar valor" e "Adicionar qtd." de cada linha
document.getElementById("lista").addEventListener("click", (ev) => {
  const btn = ev.target.closest("button[data-acao]");
  if (!btn) return;
  const cod = Number(btn.dataset.cod);

  try {
    if (btn.dataset.acao === "valor") {
      const r = prompt("Novo valor (R$) para o produto " + cod + ":");
      if (r === null) return;
      atualizarValor(cod, parseFloat(r.replace(",", ".")));
      mostrar("Valor do produto " + cod + " alterado.", "ok");
    } else {
      const r = prompt("Quantidade a adicionar ao estoque do produto " + cod + ":");
      if (r === null) return;
      atualizarQuantidade(cod, parseInt(r, 10));
      mostrar("Quantidade do produto " + cod + " atualizada.", "ok");
    }
    listarProdutos();
  } catch (e) {
    mostrar(e.message, "erro");
  }
});

listarProdutos();