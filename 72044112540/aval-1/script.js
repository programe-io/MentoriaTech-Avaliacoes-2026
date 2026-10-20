// Lista de produtos (fica na memória; o localStorage guarda entre recarregamentos)
let produtos = [];

try {
  produtos = JSON.parse(localStorage.getItem("produtos")) || [];
} catch (e) {
  produtos = [];
}

const form = document.getElementById("form-produto");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const mensagem = document.getElementById("mensagem");

function salvar() {
  try { localStorage.setItem("produtos", JSON.stringify(produtos)); } catch (e) {}
}

function formatarValor(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function avisar(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.className = erro ? "erro" : "";
}

// 1) Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
    avisar("Já existe um produto com o código " + codigo + ".", true);
    return false;
  }
  produtos.push({ codigo, descricao, quantidade, valor });
  salvar();
  avisar("Produto " + codigo + " cadastrado.");
  return true;
}

// 2) Listar os produtos cadastrados
function listarProdutos() {
  lista.innerHTML = "";
  vazio.style.display = produtos.length ? "none" : "block";

  produtos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td></td><td></td>
      <td class="num">${p.quantidade}</td>
      <td class="num">${formatarValor(p.valor)}</td>
      <td><div class="acoes">
        <button class="secundario" data-acao="valor" data-codigo="">Valor</button>
        <button class="secundario" data-acao="quantidade" data-codigo="">Quantidade</button>
      </div></td>`;
    // textContent evita injetar HTML digitado pelo usuário
    tr.children[0].textContent = p.codigo;
    tr.children[1].textContent = p.descricao;
    tr.querySelectorAll("button").forEach(b => b.dataset.codigo = p.codigo);
    lista.appendChild(tr);
  });
}

// 3) Alterar o valor de um produto
function alterarValor(codigo, novoValor) {
  const p = produtos.find(x => x.codigo === codigo);
  p.valor = novoValor;
  salvar();
  avisar("Valor de " + codigo + " atualizado.");
}

// 4) Alterar a quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
  const p = produtos.find(x => x.codigo === codigo);
  p.quantidade = novaQuantidade;
  salvar();
  avisar("Quantidade de " + codigo + " atualizada.");
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = parseInt(document.getElementById("quantidade").value, 10);
  const valor = parseFloat(document.getElementById("valor").value);

  if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor) || quantidade < 0 || valor < 0) {
    avisar("Preencha todos os campos com valores válidos.", true);
    return;
  }
  if (cadastrarProduto(codigo, descricao, quantidade, valor)) {
    form.reset();
    listarProdutos();
  }
});

lista.addEventListener("click", e => {
  const botao = e.target.closest("button");
  if (!botao) return;
  const codigo = botao.dataset.codigo;

  if (botao.dataset.acao === "valor") {
    const entrada = prompt("Novo valor (R$) para " + codigo + ":");
    if (entrada === null) return;
    const novo = parseFloat(entrada.replace(",", "."));
    if (isNaN(novo) || novo < 0) return avisar("Valor inválido.", true);
    alterarValor(codigo, novo);
  } else {
    const entrada = prompt("Nova quantidade para " + codigo + ":");
    if (entrada === null) return;
    const nova = parseInt(entrada, 10);
    if (isNaN(nova) || nova < 0) return avisar("Quantidade inválida.", true);
    alterarQuantidade(codigo, nova);
  }
  listarProdutos();
});

listarProdutos();