// ==========================================
//  SISTEMA DE ESTOQUE
//  Cada produto é: { codigo, descricao, quantidade, valor }
// ==========================================

let produtos = [];

// ---------- ELEMENTOS DA PÁGINA ----------
const form           = document.getElementById("form-produto");
const campoCodigo    = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoQtd       = document.getElementById("quantidade");
const campoValor     = document.getElementById("valor");
const corpoTabela    = document.getElementById("corpo-tabela");
const mensagem       = document.getElementById("mensagem");
const totalItens     = document.getElementById("total-itens");
const valorTotal     = document.getElementById("valor-total");

// ---------- FUNÇÕES AUXILIARES ----------
function mostrarMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
  setTimeout(() => {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
  }, 3000);
}

function formatarMoeda(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buscarProduto(codigo) {
  return produtos.find(p => p.codigo === codigo);
}

// ---------- 1. CADASTRAR PRODUTO ----------
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const codigo    = campoCodigo.value.trim();
  const descricao = campoDescricao.value.trim();
  const quantidade = parseInt(campoQtd.value);
  const valor      = parseFloat(campoValor.value);

  // Validações básicas
  if (!codigo || !descricao) {
    return mostrarMensagem("Preencha código e descrição!", "erro");
  }
  if (isNaN(quantidade) || quantidade < 0) {
    return mostrarMensagem("Quantidade inválida!", "erro");
  }
  if (isNaN(valor) || valor < 0) {
    return mostrarMensagem("Valor inválido!", "erro");
  }
  if (buscarProduto(codigo)) {
    return mostrarMensagem("Já existe um produto com esse código!", "erro");
  }

  produtos.push({ codigo, descricao, quantidade, valor });
  form.reset();
  campoCodigo.focus();
  listarProdutos();
  mostrarMensagem("✅ Produto cadastrado com sucesso!");
});

// ---------- 2. LISTAR PRODUTOS ----------
function listarProdutos() {
  corpoTabela.innerHTML = "";

  if (produtos.length === 0) {
    corpoTabela.innerHTML =
      `<tr><td colspan="6" class="vazio">Nenhum produto cadastrado ainda.</td></tr>`;
  } else {
    produtos.forEach((p) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${p.codigo}</td>
        <td>${p.descricao}</td>
        <td>${p.quantidade}</td>
        <td>${formatarMoeda(p.valor)}</td>
        <td>${formatarMoeda(p.quantidade * p.valor)}</td>
        <td class="acoes">
          <button class="btn-editar"  onclick="alterarValor('${p.codigo}')">💰 Valor</button>
          <button class="btn-editar"  onclick="alterarQuantidade('${p.codigo}')">🔢 Qtd</button>
          <button class="btn-remover" onclick="removerProduto('${p.codigo}')">🗑️</button>
        </td>
      `;
      corpoTabela.appendChild(linha);
    });
  }

  atualizarResumo();
}

function atualizarResumo() {
  const total = produtos.reduce((soma, p) => soma + p.quantidade * p.valor, 0);
  totalItens.textContent = produtos.length;
  valorTotal.textContent = formatarMoeda(total);
}

// ---------- 3. ALTERAR VALOR ----------
function alterarValor(codigo) {
  const produto = buscarProduto(codigo);
  if (!produto) return;

  const entrada = prompt(
    `Produto: ${produto.descricao}\n` +
    `Valor atual: ${formatarMoeda(produto.valor)}\n\n` +
    `Digite o NOVO valor (R$):`,
    produto.valor
  );

  if (entrada === null) return; // usuário cancelou

  const novoValor = parseFloat(entrada.replace(",", "."));
  if (isNaN(novoValor) || novoValor < 0) {
    return mostrarMensagem("Valor inválido!", "erro");
  }

  produto.valor = novoValor;
  listarProdutos();
  mostrarMensagem(`💰 Valor de "${produto.descricao}" atualizado!`);
}

// ---------- 4. ALTERAR QUANTIDADE ----------
function alterarQuantidade(codigo) {
  const produto = buscarProduto(codigo);
  if (!produto) return;

  const entrada = prompt(
    `Produto: ${produto.descricao}\n` +
    `Quantidade atual: ${produto.quantidade}\n\n` +
    `Digite a NOVA quantidade:`,
    produto.quantidade
  );

  if (entrada === null) return;

  const novaQtd = parseInt(entrada);
  if (isNaN(novaQtd) || novaQtd < 0) {
    return mostrarMensagem("Quantidade inválida!", "erro");
  }

  produto.quantidade = novaQtd;
  listarProdutos();
  mostrarMensagem(`🔢 Quantidade de "${produto.descricao}" atualizada!`);
}

// ---------- EXTRA: REMOVER PRODUTO ----------
function removerProduto(codigo) {
  const produto = buscarProduto(codigo);
  if (!produto) return;
  if (!confirm(`Remover o produto "${produto.descricao}"?`)) return;

  produtos = produtos.filter(p => p.codigo !== codigo);
  listarProdutos();
  mostrarMensagem("🗑️ Produto removido.");
}

// ---------- INICIALIZAÇÃO ----------
listarProdutos();