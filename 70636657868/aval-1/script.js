// Lista de produtos
let produtos = [];

// Função para validar os dados
function validarProduto(descricao, quantidade, valor) {

  if (descricao.trim().length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
  \}

  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
  \}

  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
  \}
\}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

  validarProduto(descricao, quantidade, valor);

  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao.trim(),
    quantidade: Number(quantidade),
    valor: Number(valor)
  \};

  produtos.push(novoProduto);

  listarProdutos();

  return novoProduto;
\}

// Função para listar produtos
function listarProdutos() {

  console.log(produtos);

  const lista = document.getElementById("listaProdutos");
  const total = document.getElementById("totalProdutos");

  total.textContent = produtos.length;

  if (produtos.length === 0) {
    lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  \}

  lista.innerHTML = produtos.map(produto => `
    <div class="produto">
      <h3>\${escaparHTML(produto.descricao)\}</h3>
      <p><strong>Código:</strong> \${produto.codigo\}</p>
      <p><strong>Quantidade:</strong> \${produto.quantidade\}</p>
      <p><strong>Valor:</strong> R\$ \${produto.valor.toFixed(2).replace(".", ",")\}</p>

      <button class="editar" onclick="atualizarValor(\${produto.codigo\})">
        Alterar valor
      </button>

      <button onclick="atualizarQuantidade(\${produto.codigo\})">
        Alterar quantidade
      </button>
    </div>
  `).join("");
\}

// Função para atualizar o valor
function atualizarValor(codigoProduto, novoValor) {

  const produto = produtos.find(p => p.codigo === Number(codigoProduto));

  if (!produto) {
    throw new Error("Produto não encontrado");
  \}

  if (novoValor === undefined) {
    novoValor = prompt("Digite o novo valor:");
  \}

  if (novoValor === null || novoValor.trim() === "") return;

  const valor = Number(novoValor.replace(",", "."));

  if (!Number.isFinite(valor) || valor < 0) {
    alert("Informe um valor válido, maior ou igual a zero.");
    return;
  \}

  produto.valor = valor;

  listarProdutos();
\}

// Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

  const produto = produtos.find(p => p.codigo === Number(codigoProduto));

  if (!produto) {
    throw new Error("Produto não encontrado");
  \}

  if (novaQuantidade === undefined) {
    novaQuantidade = prompt("Digite a nova quantidade:");
  \}

  if (novaQuantidade === null || novaQuantidade.trim() === "") return;

  const quantidade = Number(novaQuantidade);

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    alert("A quantidade deve ser um número inteiro maior que zero.");
    return;
  \}

  produto.quantidade = quantidade;

  listarProdutos();
\}

// Protege a exibição das descrições
function escaparHTML(texto) {
  return texto.replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  \})[caractere]);
\}

// Evento do formulário
document.getElementById("formProduto").addEventListener("submit", function(evento) {

  evento.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  const mensagem = document.getElementById("mensagem");

  try {

    cadastrarProduto(descricao, quantidade, valor);

    mensagem.style.color = "green";
    mensagem.textContent = "Produto cadastrado com sucesso!";

    document.getElementById("formProduto").reset();

  \} catch (erro) {

    mensagem.style.color = "red";
    mensagem.textContent = erro.message;

  \}
\});

// Exibe a lista inicial
listarProdutos();$0