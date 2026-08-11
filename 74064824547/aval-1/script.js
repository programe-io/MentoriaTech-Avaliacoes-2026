/* =========================================================================
   SISTEMA DE CONTROLE DE ESTOQUE
   Estrutura escolhida: Array de Objetos.
   Cada produto: { codigo, descricao, quantidade, valor }
   ========================================================================= */

// "Banco de dados" em memória
let estoque = [];

/**
 * 1) CADASTRAR PRODUTO
 * Garante que o código seja único antes de inserir.
 */
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  if (!codigo || !descricao) {
    return { sucesso: false, mensagem: "Código e descrição são obrigatórios." };
  }
  if (isNaN(quantidade) || quantidade < 0) {
    return { sucesso: false, mensagem: "Quantidade inválida." };
  }
  if (isNaN(valor) || valor < 0) {
    return { sucesso: false, mensagem: "Valor inválido." };
  }

  const codigoExiste = estoque.some(
    (p) => p.codigo.toLowerCase() === codigo.toLowerCase()
  );
  if (codigoExiste) {
    return { sucesso: false, mensagem: `Já existe um produto com o código "${codigo}".` };
  }

  const novoProduto = {
    codigo: codigo.trim(),
    descricao: descricao.trim(),
    quantidade: Number(quantidade),
    valor: Number(valor),
  };

  estoque.push(novoProduto);
  return { sucesso: true, mensagem: `Produto "${codigo}" cadastrado com sucesso.`, produto: novoProduto };
}

/**
 * 2) LISTAR PRODUTOS
 */
function listarProdutos() {
  return [...estoque];
}

/**
 * Função utilitária interna: localiza o índice de um produto pelo código.
 */
function localizarIndicePorCodigo(codigo) {
  return estoque.findIndex(
    (p) => p.codigo.toLowerCase() === (codigo || "").toLowerCase()
  );
}

/**
 * 3) ALTERAR VALOR de um produto existente (busca por código)
 */
function alterarValorProduto(codigo, novoValor) {
  if (isNaN(novoValor) || novoValor < 0) {
    return { sucesso: false, mensagem: "Novo valor inválido." };
  }

  const indice = localizarIndicePorCodigo(codigo);
  if (indice === -1) {
    return { sucesso: false, mensagem: `Produto com código "${codigo}" não encontrado.` };
  }

  const valorAntigo = estoque[indice].valor;
  estoque[indice].valor = Number(novoValor);

  return {
    sucesso: true,
    mensagem: `Valor do produto "${codigo}" alterado de R$ ${valorAntigo.toFixed(2)} para R$ ${Number(novoValor).toFixed(2)}.`,
    produto: estoque[indice],
  };
}

/**
 * 4) ALTERAR QUANTIDADE de um produto existente (busca por código)
 */
function alterarQuantidadeProduto(codigo, novaQuantidade) {
  if (isNaN(novaQuantidade) || novaQuantidade < 0) {
    return { sucesso: false, mensagem: "Nova quantidade inválida." };
  }

  const indice = localizarIndicePorCodigo(codigo);
  if (indice === -1) {
    return { sucesso: false, mensagem: `Produto com código "${codigo}" não encontrado.` };
  }

  const qtdAntiga = estoque[indice].quantidade;
  estoque[indice].quantidade = Number(novaQuantidade);

  return {
    sucesso: true,
    mensagem: `Quantidade do produto "${codigo}" alterada de ${qtdAntiga} para ${novaQuantidade}.`,
    produto: estoque[indice],
  };
}

/* =========================================================================
   INTERFACE — ligação das funções acima aos elementos HTML
   ========================================================================= */

const tabelaBody = document.getElementById("tabela-produtos");
const emptyState = document.getElementById("empty");
const msgEl = document.getElementById("msg");

function gerarBarcode(codigo) {
  let bars = "";
  for (let i = 0; i < codigo.length; i++) {
    const code = codigo.charCodeAt(i);
    const thick = code % 3 === 0;
    bars += `<span class="${thick ? "thick" : ""}"></span>`;
  }
  return `<div class="barcode">${bars}</div>`;
}

function renderizarTabela() {
  const produtos = listarProdutos();
  tabelaBody.innerHTML = "";

  if (produtos.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  produtos.forEach((p) => {
    const tr = document.createElement("tr");
    const total = p.quantidade * p.valor;
    const qtdClasse = p.quantidade <= 5 ? "qty-low" : "qty-ok";

    tr.innerHTML = `
      <td>
        <div class="code-cell">
          <span class="code-text">${p.codigo}</span>
          ${gerarBarcode(p.codigo)}
        </div>
      </td>
      <td>${p.descricao}</td>
      <td><span class="qty-badge ${qtdClasse}">${p.quantidade}</span></td>
      <td>R$ ${p.valor.toFixed(2)}</td>
      <td>R$ ${total.toFixed(2)}</td>
    `;
    tabelaBody.appendChild(tr);
  });
}

function mostrarMensagem(resultado) {
  msgEl.textContent = resultado.mensagem;
  msgEl.className = resultado.sucesso ? "ok" : "err";
}

document.getElementById("form-cadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const codigo = document.getElementById("codigo").value;
  const descricao = document.getElementById("descricao").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  const resultado = cadastrarProduto(codigo, descricao, quantidade, valor);
  mostrarMensagem(resultado);

  if (resultado.sucesso) {
    e.target.reset();
    renderizarTabela();
  }
});

document.getElementById("btn-alterar-valor").addEventListener("click", () => {
  const codigo = document.getElementById("busca-codigo").value;
  const novoValor = Number(document.getElementById("novo-valor").value);

  const resultado = alterarValorProduto(codigo, novoValor);
  mostrarMensagem(resultado);
  if (resultado.sucesso) renderizarTabela();
});

document.getElementById("btn-alterar-qtd").addEventListener("click", () => {
  const codigo = document.getElementById("busca-codigo").value;
  const novaQtd = Number(document.getElementById("nova-qtd").value);

  const resultado = alterarQuantidadeProduto(codigo, novaQtd);
  mostrarMensagem(resultado);
  if (resultado.sucesso) renderizarTabela();
});

/* =========================================================================
   SIMULAÇÃO NO CONSOLE — demonstra as 4 operações programaticamente
   ========================================================================= */
(function simularOperacoesNoConsole() {
  console.log("===== SIMULAÇÃO DO SISTEMA DE CONTROLE DE ESTOQUE =====");

  console.log("\n--- 1) Cadastrar produtos ---");
  console.log(cadastrarProduto("P001", "Parafuso M6", 100, 0.35).mensagem);
  console.log(cadastrarProduto("P002", "Porca M6", 150, 0.20).mensagem);
  console.log(cadastrarProduto("P003", "Arruela de pressão", 200, 0.10).mensagem);

  console.log(cadastrarProduto("P001", "Parafuso M6 duplicado", 50, 0.35).mensagem);

  console.log("\n--- 2) Listar produtos cadastrados ---");
  console.table(listarProdutos());

  console.log("\n--- 3) Alterar valor do produto P002 ---");
  console.log(alterarValorProduto("P002", 0.25).mensagem);

  console.log("\n--- 4) Alterar quantidade do produto P003 ---");
  console.log(alterarQuantidadeProduto("P003", 180).mensagem);

  console.log("\n--- Estado final do estoque ---");
  console.table(listarProdutos());

  console.log("========================================================");
})();

renderizarTabela();