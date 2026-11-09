
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

// Formatação de valores em reais
function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Salvar os produtos
function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Atualizar os indicadores
function atualizarDashboard() {
  const totalProdutos = produtos.length;

  const totalUnidades = produtos.reduce(
    (total, produto) => total + produto.quantidade, 0
  );

  const valorTotal = produtos.reduce(
    (total, produto) =>
      total + (produto.quantidade * produto.valor), 0
  );

  document.getElementById("totalProdutos").textContent =
    totalProdutos;

  document.getElementById("totalUnidades").textContent =
    totalUnidades;

  document.getElementById("valorEstoque").textContent =
    formatarMoeda(valorTotal);
}

// Cadastrar produto
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const codigo = document.getElementById("codigo")
    .value.trim();

  const descricao = document.getElementById("descricao")
    .value.trim();

  const quantidade = Number(
    document.getElementById("quantidade").value
  );

  const valor = Number(
    document.getElementById("valor").value
  );

  if (!codigo || !descricao ||
    !Number.isSafeInteger(quantidade) ||
    quantidade < 0 ||
    !Number.isFinite(valor) || valor < 0) {
    alert("Preencha os campos com valores válidos.");
    return;
  }

  const existe = produtos.some(
    produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
  );

  if (existe) {
    alert("Já existe um produto com esse código!");
    return;
  }

  const produto = {
    codigo,
    descricao,
    quantidade,
    valor
  };

  produtos.push(produto);

  salvar();
  renderizarProdutos();

  form.reset();

  alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function renderizarProdutos(filtro = "") {
  lista.innerHTML = "";

  const filtrados = produtos.filter(produto =>
    produto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  if (filtrados.length === 0) {
    lista.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
  }

  filtrados.forEach(produto => {
    const index = produtos.indexOf(produto);

    const situacao = produto.quantidade <= 5
      ? `<span class="badge-baixo">Estoque baixo</span>`
      : `<span class="badge-estoque">Disponível</span>`;

    const linha = document.createElement("tr");

    const dados = [
      produto.codigo,
      produto.descricao,
      `${produto.quantidade} unidades`,
      formatarMoeda(produto.valor),
      formatarMoeda(produto.quantidade * produto.valor)
    ];

    dados.forEach((dado, i) => {
      const celula = document.createElement("td");

      if (i === 1) {
        const strong = document.createElement("strong");
        strong.textContent = dado;
        celula.appendChild(strong);
      } else {
        celula.textContent = dado;
      }

      linha.appendChild(celula);
    });

    const status = document.createElement("td");
    status.innerHTML = situacao;

    // Ações de edição e exclusão
    const acoes = document.createElement("td");

    const editar = document.createElement("button");
    editar.className = "action-btn edit-btn";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => editarProduto(index));

    const excluir = document.createElement("button");
    excluir.className = "action-btn delete-btn";
    excluir.textContent = "Excluir";
    excluir.addEventListener("click", () => excluirProduto(index));

    acoes.append(editar, excluir);

    linha.append(status, acoes);
    lista.appendChild(linha);
  });

  document.getElementById("contador").textContent =
    `${filtrados.length} produtos encontrados`;

  atualizarDashboard();
}

// Alterar valor e quantidade
function editarProduto(index) {
  const produto = produtos[index];

  const novoValor = prompt(
    "Digite o novo valor unitário:",
    produto.valor
  );

  if (novoValor === null) return;

  const valor = Number(novoValor);

  if (novoValor.trim() === "" ||
    !Number.isFinite(valor) || valor < 0) {
    alert("Valor inválido!");
    return;
  }

  const novaQuantidade = prompt(
    "Digite a nova quantidade:",
    produto.quantidade
  );

  if (novaQuantidade === null) return;

  const quantidade = Number(novaQuantidade);

  if (novaQuantidade.trim() === "" ||
    !Number.isSafeInteger(quantidade) || quantidade < 0) {
    alert("Quantidade inválida!");
    return;
  }

  produto.valor = valor;
  produto.quantidade = quantidade;

  salvar();
  renderizarProdutos(pesquisa.value);

  alert("Produto atualizado com sucesso!");
}

// Excluir produto
function excluirProduto(index) {
  const confirmar = confirm(
    "Deseja realmente excluir este produto?"
  );

  if (!confirmar) return;

  produtos.splice(index, 1);

  salvar();
  renderizarProdutos(pesquisa.value);

  alert("Produto excluído com sucesso!");
}

// Pesquisar produtos
pesquisa.addEventListener("input", function() {
  renderizarProdutos(this.value);
});

// Inicializar sistema
renderizarProdutos();
