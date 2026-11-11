// ===== Dados =====
let produtos = [];
const CHAVE = "estoque-produtos";

function carregar() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) produtos = JSON.parse(salvo);
  } catch (e) {
    produtos = [];
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(produtos));
  } catch (e) {}
}

const moeda = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ===== Funções do sistema =====

// 1) Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  codigo = codigo.trim();
  descricao = descricao.trim();

  if (!codigo || !descricao)
    return { ok: false, texto: "Informe o código e a descrição." };
  if (!Number.isInteger(quantidade) || quantidade < 0)
    return { ok: false, texto: "A quantidade deve ser um número inteiro maior ou igual a zero." };
  if (!Number.isFinite(valor) || valor < 0)
    return { ok: false, texto: "O valor deve ser um número maior ou igual a zero." };
  if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase()))
    return { ok: false, texto: "Já existe um produto com o código " + codigo + "." };

  produtos.push({ codigo, descricao, quantidade, valor });
  salvar();
  return { ok: true, texto: "Produto " + codigo + " cadastrado." };
}

// 2) Listar os produtos cadastrados
function listarProdutos() {
  const corpo = document.getElementById("lista");
  corpo.innerHTML = "";

  if (produtos.length === 0) {
    corpo.innerHTML = '<tr><td colspan="6" class="vazio">Nenhum produto cadastrado. Use o formulário acima para começar.</td></tr>';
  }

  produtos.forEach((p, i) => {
    const tr = document.createElement("tr");
    if (p.quantidade <= 5) tr.className = "baixo";

    tr.innerHTML = `
      <td></td><td></td>
      <td class="num"><input type="number" min="0" step="0.01" value="${p.valor}" id="v${i}" aria-label="Novo valor do produto ${i + 1}"></td>
      <td class="num"><input type="number" min="0" step="1" value="${p.quantidade}" id="q${i}" aria-label="Nova quantidade do produto ${i + 1}"></td>
      <td class="num">${moeda(p.valor * p.quantidade)}</td>
      <td class="acoes">
        <button class="sec" data-acao="valor" data-i="${i}">Salvar valor</button>
        <button class="sec" data-acao="qtd" data-i="${i}">Salvar qtd.</button>
        <button class="del" data-acao="remover" data-i="${i}">Remover</button>
      </td>`;

    // textContent evita injeção de HTML nos textos digitados
    tr.children[0].textContent = p.codigo;
    tr.children[1].textContent = p.descricao;
    corpo.appendChild(tr);
  });

  document.getElementById("totalItens").textContent = produtos.length;
  document.getElementById("totalUnid").textContent = produtos.reduce((s, p) => s + p.quantidade, 0);
  document.getElementById("totalValor").textContent = moeda(produtos.reduce((s, p) => s + p.quantidade * p.valor, 0));
}

// 3) Alterar o valor de um produto
function alterarValor(indice, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0)
    return { ok: false, texto: "Valor inválido. Use um número maior ou igual a zero." };

  produtos[indice].valor = novoValor;
  salvar();
  return { ok: true, texto: "Valor de " + produtos[indice].codigo + " atualizado para " + moeda(novoValor) + "." };
}

// 4) Alterar a quantidade de um produto
function alterarQuantidade(indice, novaQtd) {
  if (!Number.isInteger(novaQtd) || novaQtd < 0)
    return { ok: false, texto: "Quantidade inválida. Use um número inteiro maior ou igual a zero." };

  produtos[indice].quantidade = novaQtd;
  salvar();
  return { ok: true, texto: "Quantidade de " + produtos[indice].codigo + " atualizada para " + novaQtd + "." };
}

// Extra: remover produto
function removerProduto(indice) {
  const cod = produtos[indice].codigo;
  produtos.splice(indice, 1);
  salvar();
  return { ok: true, texto: "Produto " + cod + " removido." };
}

// ===== Interface =====
function mostrar(r) {
  const el = document.getElementById("msg");
  el.textContent = r.texto;
  el.className = "msg " + (r.ok ? "ok" : "erro");
}

document.getElementById("formProduto").addEventListener("submit", e => {
  e.preventDefault();
  const r = cadastrarProduto(
    document.getElementById("codigo").value,
    document.getElementById("descricao").value,
    parseInt(document.getElementById("quantidade").value, 10),
    parseFloat(document.getElementById("valor").value)
  );
  mostrar(r);
  if (r.ok) {
    e.target.reset();
    document.getElementById("codigo").focus();
    listarProdutos();
  }
});

document.getElementById("lista").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const i = Number(b.dataset.i);
  let r;

  if (b.dataset.acao === "valor")
    r = alterarValor(i, parseFloat(document.getElementById("v" + i).value));
  else if (b.dataset.acao === "qtd")
    r = alterarQuantidade(i, parseInt(document.getElementById("q" + i).value, 10));
  else
    r = removerProduto(i);

  mostrar(r);
  if (r.ok) listarProdutos();
});

// ===== Início =====
carregar();
listarProdutos();