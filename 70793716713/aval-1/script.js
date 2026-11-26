const CHAVE_STORAGE = "sistema_estoque_v1";

let produtos = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [
  { id: crypto.randomUUID(), nome: "Mouse Sem Fio", categoria: "Periféricos", quantidade: 14, preco: 79.9 },
  { id: crypto.randomUUID(), nome: "Cabo HDMI 2.0", categoria: "Acessórios", quantidade: 4, preco: 34.5 },
  { id: crypto.randomUUID(), nome: "SSD NVMe 1TB", categoria: "Hardware", quantidade: 0, preco: 389.0 }
];

const form = document.getElementById("form-produto");
const corpoTabela = document.getElementById("corpo-tabela");
const buscaInput = document.getElementById("busca");

const elTotalProdutos = document.getElementById("total-produtos");
const elTotalUnidades = document.getElementById("total-unidades");
const elEstoqueBaixo = document.getElementById("estoque-baixo");

function salvar() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(produtos));
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function obterStatus(qtd) {
  if (qtd === 0) return { texto: "Sem estoque", classe: "badge-zerado" };
  if (qtd <= 5) return { texto: "Estoque baixo", classe: "badge-baixo" };
  return { texto: "Disponível", classe: "badge-ok" };
}

function atualizarKPIs() {
  elTotalProdutos.textContent = produtos.length;
  elTotalUnidades.textContent = produtos.reduce((acc, item) => acc + item.quantidade, 0);
  elEstoqueBaixo.textContent = produtos.filter((item) => item.quantidade <= 5).length;
}

function renderizar() {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo)
  );

  corpoTabela.innerHTML = "";

  if (filtrados.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="7" class="vazio">Nenhum produto encontrado.</td></tr>`;
    atualizarKPIs();
    return;
  }

  filtrados.forEach((produto) => {
    const status = obterStatus(produto.quantidade);
    const subtotal = produto.quantidade * produto.preco;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${produto.nome}</strong></td>
      <td>${produto.categoria}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.preco)}</td>
      <td>${formatarMoeda(subtotal)}</td>
      <td><span class="badge ${status.classe}">${status.texto}</span></td>
      <td>
        <div class="acoes-linha">
          <button type="button" class="btn btn-mini" onclick="alterarQtd('${produto.id}', 1)" title="Entrada (+1)">+1</button>
          <button type="button" class="btn btn-mini" onclick="alterarQtd('${produto.id}', -1)" title="Saída (-1)">-1</button>
          <button type="button" class="btn btn-mini btn-excluir" onclick="removerProduto('${produto.id}')">Excluir</button>
        </div>
      </td>
    `;
    corpoTabela.appendChild(tr);
  });

  atualizarKPIs();
}

function alterarQtd(id, delta) {
  const item = produtos.find((p) => p.id === id);
  if (!item) return;
  item.quantidade = Math.max(0, item.quantidade + delta);
  salvar();
  renderizar();
}

function removerProduto(id) {
  produtos = produtos.filter((p) => p.id !== id);
  salvar();
  renderizar();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value;
  const quantidade = parseInt(document.getElementById("quantidade").value, 10);
  const preco = parseFloat(document.getElementById("preco").value);

  if (!nome || !categoria || Number.isNaN(quantidade) || Number.isNaN(preco)) return;

  produtos.unshift({
    id: crypto.randomUUID(),
    nome,
    categoria,
    quantidade: Math.max(0, quantidade),
    preco: Math.max(0, preco)
  });

  salvar();
  renderizar();
  form.reset();
  document.getElementById("quantidade").value = 1;
  document.getElementById("nome").focus();
});

buscaInput.addEventListener("input", renderizar);

renderizar();