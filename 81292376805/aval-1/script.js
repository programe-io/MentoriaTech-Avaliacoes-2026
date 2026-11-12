<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sistema de Vendas</title>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
  body { background: #f2f2f2; padding: 20px; color: #333; }
  .container { max-width: 800px; margin: 0 auto; }
  h1 { text-align: center; margin-bottom: 25px; color: #1b4332; }
  h2 { margin: 25px 0 10px; color: #444; }
  table { width: 100%; border-collapse: collapse; background: white; margin-bottom: 10px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  th { background: #2d6a4f; color: white; padding: 12px; text-align: left; }
  td { padding: 10px 12px; border-bottom: 1px solid #ddd; }
  tr:nth-child(even) td { background: #f8f8f8; }
  input, select { padding: 10px; margin: 5px 5px 5px 0; border: 1px solid #ccc; border-radius: 6px; }
  button { padding: 10px 18px; background: #2d6a4f; color: white; border: none; border-radius: 6px; cursor: pointer; }
  button:hover { background: #1b4332; }
  .total { background: #1b4332; color: white; padding: 15px; border-radius: 8px; font-size: 18px; font-weight: bold; text-align: right; margin-top: 10px; }
</style>
</head>
<body>
<div class="container">
  <h1>Sistema de Vendas</h1>

  <h2>Clientes</h2>
  <table>
    <tr><th>id</th><th>nome</th><th>telefone</th></tr>
    <tbody id="tabela-clientes"></tbody>
  </table>

  <h2>Produtos</h2>
  <table>
    <tr><th>id</th><th>nome</th><th>preço</th><th>estoque</th></tr>
    <tbody id="tabela-produtos"></tbody>
  </table>

  <h2>Vendas</h2>
  <table>
    <tr><th>id</th><th>cliente</th><th>produto</th><th>quantidade</th><th>total</th></tr>
    <tbody id="tabela-vendas"></tbody>
  </table>
  <div class="total" id="total-vendido">Total vendido: R$ 0.00</div>

  <h2>Cadastrar Cliente</h2>
  <input id="cliente-nome" placeholder="Nome">
  <input id="cliente-tel" placeholder="Telefone">
  <button onclick="addCliente()">Cadastrar</button>

  <h2>Cadastrar Produto</h2>
  <input id="produto-nome" placeholder="Nome">
  <input id="produto-preco" type="number" placeholder="Preço">
  <input id="produto-estoque" type="number" placeholder="Estoque">
  <button onclick="addProduto()">Cadastrar</button>

  <h2>Nova Venda</h2>
  <select id="venda-cliente"></select>
  <select id="venda-produto"></select>
  <input id="venda-qtd" type="number" value="1">
  <button onclick="addVenda()">Vender</button>
</div>

<script>
let clientes = [
  { id: 1, nome: "devid", telefone: "11999999999" },
  { id: 2, nome: "yan", telefone: "11888888888" }
];
let produtos = [
  { id: 1, nome: "Teclado", preco: 80, estoque: 20 },
  { id: 2, nome: "Mouse", preco: 45, estoque: 30 }
];
let vendas = [
  { id: 1, cliente: "Joao", produto: "Teclado", qtd: 1, total: 80 },
  { id: 2, cliente: "Maria", produto: "Mouse", qtd: 2, total: 90 }
];

function atualizarTabelas() {
  document.getElementById("tabela-clientes").innerHTML = clientes.map(c => <tr><td>${c.id}</td><td>${c.nome}</td><td>${c.telefone}</td></tr>).join("");
  document.getElementById("tabela-produtos").innerHTML = produtos.map(p => <tr><td>${p.id}</td><td>${p.nome}</td><td>${p.preco.toFixed(2)}</td><td>${p.estoque}</td></tr>).join("");
  let totalVendido = 0;
  document.getElementById("tabela-vendas").innerHTML = vendas.map(v => { totalVendido += v.total; return <tr><td>${v.id}</td><td>${v.cliente}</td><td>${v.produto}</td><td>${v.qtd}</td><td>${v.total.toFixed(2)}</td></tr>; }).join("");
  document.getElementById("total-vendido").innerText = "Total vendido: R$ " + totalVendido.toFixed(2);
  document.getElementById("venda-cliente").innerHTML = clientes.map(c => <option value="${c.nome}">${c.nome}</option>).join("");
  document.getElementById("venda-produto").innerHTML = produtos.map(p => <option value="${p.nome}">${p.nome} - R$ ${p.preco}</option>).join("");
}
function addCliente() {
  let nome = document.getElementById("cliente-nome").value;
  let tel = document.getElementById("cliente-tel").value;
  if (nome == "" || tel == "") return alert("Preenche tudo!");
  clientes.push({ id: clientes.length + 1, nome: nome, telefone: tel });
  atualizarTabelas(); alert("Cliente cadastrado!");
}
function addProduto() {
  let nome = document.getElementById("produto-nome").value;
  let preco = parseFloat(document.getElementById("produto-preco").value);
  let estoque = parseInt(document.getElementById("produto-estoque").value);
  if (!nome || !preco) return alert("Preenche tudo!");
  produtos.push({ id: produtos.length + 1, nome: nome, preco: preco, estoque: estoque });
  atualizarTabelas(); alert("Produto cadastrado!");
}
function addVenda() {
  let cliente = document.getElementById("venda-cliente").value;
  let nomeProduto = document.getElementById("venda-produto").value;
  let qtd = parseInt(document.getElementById("venda-qtd").value);
  let produto = produtos.find(p => p.nome == nomeProduto);
  if (qtd > produto.estoque) return alert("Sem estoque!");
  produto.estoque -= qtd;
  let total = produto.preco * qtd;
  vendas.push({ id: vendas.length + 1, cliente: cliente, produto: nomeProduto, qtd: qtd, total: total });
  atualizarTabelas(); alert("Venda registrada!");
}
atualizarTabelas();
</script>
</body>
</html>