
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sistema de Estoque</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f1f5f9;
  color: #1e293b;
}
header {
  background: #172554;
  color: white;
  padding: 22px;
  font-size: 24px;
  font-weight: bold;
}
main { padding: 25px; max-width: 1200px; margin: auto; }
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
  gap: 15px;
  margin-bottom: 25px;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
}
.card span { color: #64748b; font-size: 14px; }
.card h2 { margin-bottom: 0; color: #2563eb; }
.panel {
  background: white;
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
}
input, button {
  padding: 11px;
  border-radius: 7px;
  border: 1px solid #cbd5e1;
  margin: 5px 2px;
}
button {
  cursor: pointer;
  background: #2563eb;
  color: white;
  border: none;
}
button:hover { opacity: .85; }
.delete { background: #dc2626; }
.edit { background: #d97706; }
table { width: 100%; border-collapse: collapse; }
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}
th { background: #f8fafc; }
.baixo { color: #dc2626; font-weight: bold; }
.tabela { overflow-x: auto; }
@media(max-width:600px) {
  main { padding: 12px; }
  header { font-size: 20px; }
}
</style>
</head>
<body>

<header>📦 Sistema de Controle de Estoque</header>

<main>

<div class="cards">
  <div class="card">
    <span>Total de produtos</span>
    <h2 id="totalProdutos">0</h2>
  </div>
  <div class="card">
    <span>Unidades em estoque</span>
    <h2 id="totalUnidades">0</h2>
  </div>
  <div class="card">
    <span>Valor do estoque</span>
    <h2 id="valorEstoque">R$ 0,00</h2>
  </div>
  <div class="card">
    <span>Estoque baixo</span>
    <h2 id="estoqueBaixo">0</h2>
  </div>
</div>

<div class="panel">
<h3>➕ Cadastrar produto</h3>

<form id="formProduto">
  <input id="nome" placeholder="Nome do produto" required>
  <input id="codigo" placeholder="Código" required>
  <input id="quantidade" type="number" min="0" placeholder="Quantidade" required>
  <input id="preco" type="number" min="0" step="0.01" placeholder="Preço unitário" required>
  <input id="minimo" type="number" min="0" value="5" placeholder="Estoque mínimo" required>
  <button type="submit">Cadastrar</button>
</form>
</div>

<div class="panel">
<h3>🔄 Movimentação de estoque</h3>
<select id="produtoMovimento">
  <option value="">Selecione um produto</option>
</select>
<input id="qtdMovimento" type="number" min="1" placeholder="Quantidade">
<button onclick="movimentar('entrada')">Entrada</button>
<button class="delete" onclick="movimentar('saida')">Saída</button>
</div>

<div class="panel">
<h3>📋 Produtos cadastrados</h3>
<input id="pesquisa" placeholder="Pesquisar produto..." oninput="renderizar()">

<div class="tabela">
<table>
<thead>
<tr>
<th>Código</th>
<th>Produto</th>
<th>Quantidade</th>
<th>Preço</th>
<th>Valor total</th>
<th>Status</th>
<th>Ações</th>
</tr>
</thead>
<tbody id="listaProdutos"></tbody>
</table>
</div>
</div>

</main>

<script>
let produtos = JSON.parse(localStorage.getItem("estoque")) || [];
let editando = null;

const moeda = valor => valor.toLocaleString("pt-BR", {
  style: "currency", currency: "BRL"
});

function salvar() {
  localStorage.setItem("estoque", JSON.stringify(produtos));
  renderizar();
}

document.getElementById("formProduto").addEventListener("submit", function(e) {
  e.preventDefault();

  const produto = {
    nome: document.getElementById("nome").value.trim(),
    codigo: document.getElementById("codigo").value.trim(),
    quantidade: Number(document.getElementById("quantidade").value),
    preco: Number(document.getElementById("preco").value),
    minimo: Number(document.getElementById("minimo").value)
  };

  if (!produto.nome || !produto.codigo ||
      !Number.isFinite(produto.quantidade) ||
      !Number.isFinite(produto.preco) ||
      !Number.isFinite(produto.minimo) ||
      produto.quantidade < 0 || produto.preco < 0 ||
      produto.minimo < 0) {
    alert("Preencha os campos corretamente.");
    return;
  }

  const duplicado = produtos.some((p, i) =>
    p.codigo.toLowerCase() === produto.codigo.toLowerCase() &&
    i !== editando
  );

  if (duplicado) {
    alert("Este código já está cadastrado!");
    return;
  }

  if (editando !== null) {
    produtos[editando] = produto;
    editando = null;
  } else {
    produtos.push(produto);
  }

  this.reset();
  document.getElementById("minimo").value = 5;
  salvar();
});

function movimentar(tipo) {
  const codigo = document.getElementById("produtoMovimento").value;
  const qtd = Number(document.getElementById("qtdMovimento").value);
  const produto = produtos.find(p => p.codigo === codigo);

  if (!produto || !Number.isInteger(qtd) || qtd <= 0) {
    alert("Selecione um produto e informe uma quantidade válida.");
    return;
  }

  if (tipo === "saida" && qtd > produto.quantidade) {
    alert("Estoque insuficiente!");
    return;
  }

  produto.quantidade += tipo === "entrada" ? qtd : -qtd;
  document.getElementById("qtdMovimento").value = "";
  salvar();
}

function editar(index) {
  const p = produtos[index];

  document.getElementById("nome").value = p.nome;
  document.getElementById("codigo").value = p.codigo;
  document.getElementById("quantidade").value = p.quantidade;
  document.getElementById("preco").value = p.preco;
  document.getElementById("minimo").value = p.minimo;

  editando = index;
  window.scrollTo({top: 0, behavior: "smooth"});
}

function excluir(index) {
  if (confirm("Deseja realmente excluir este produto?")) {
    produtos.splice(index, 1);
    editando = null;
    salvar();
  }
}

function renderizar() {
  const busca = document.getElementById("pesquisa").value.toLowerCase();
  const lista = document.getElementById("listaProdutos");

  lista.innerHTML = "";

  produtos.forEach((p, i) => {
    if (!(p.nome + p.codigo).toLowerCase().includes(busca)) return;

    const tr = document.createElement("tr");

    const valores = [
      p.codigo,
      p.nome,
      p.quantidade,
      moeda(p.preco),
      moeda(p.quantidade * p.preco)
    ];

    valores.forEach(valor => {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    });

    const status = document.createElement("td");
    status.textContent = p.quantidade <= p.minimo
      ? "Estoque baixo" : "Normal";
    if (p.quantidade <= p.minimo) status.className = "baixo";
    tr.appendChild(status);

    const acoes = document.createElement("td");
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.className = "edit";
    editarBtn.onclick = () => editar(i);

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";
    excluirBtn.className = "delete";
    excluirBtn.onclick = () => excluir(i);

    acoes.append(editarBtn, excluirBtn);
    tr.appendChild(acoes);
    lista.appendChild(tr);
  });

  document.getElementById("totalProdutos").textContent = produtos.length;
  document.getElementById("totalUnidades").textContent =
    produtos.reduce((s, p) => s + p.quantidade, 0);
  document.getElementById("valorEstoque").textContent =
    moeda(produtos.reduce((s, p) => s + p.quantidade * p.preco, 0));
  document.getElementById("estoqueBaixo").textContent =
    produtos.filter(p => p.quantidade <= p.minimo).length;

  const select = document.getElementById("produtoMovimento");
  const selecionado = select.value;
  select.replaceChildren(new Option("Selecione um produto", ""));

  produtos.forEach(p => {
    select.add(new Option(p.nome + " (" + p.codigo + ")", p.codigo));
  });

  select.value = selecionado;
}

renderizar();
</script>
</body>
</html>
