
"use strict";

const STORAGE_KEY = "stockly_produtos_v1";

let produtos = carregarProdutos();
let currentView = "dashboard";
let toastTimer;

const $ = (id) => document.getElementById(id);

const form = $("productForm");
const modal = $("modalBackdrop");

function carregarProdutos() {
  try {
    const dados = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(dados)
      ? dados.filter(p =>
          p &&
          Number.isInteger(p.codigo) &&
          typeof p.descricao === "string" &&
          Number.isFinite(p.quantidade) &&
          Number.isFinite(p.valor)
        )
      : [];
  } catch (error) {
    console.warn("Não foi possível carregar os produtos:", error);
    return [];
  }
}

function salvarProdutos() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(produtos)
    );
  } catch (error) {
    mostrarToast(
      "Não foi possível salvar neste navegador.",
      true
    );
  }
}

function validarProduto(descricao, quantidade, valor) {
  if (
    typeof descricao !== "string" ||
    descricao.trim().length < 5
  ) {
    throw new Error(
      "A descrição deve ter, no mínimo, cinco caracteres."
    );
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error(
      "A quantidade deve ser um número inteiro maior que zero."
    );
  }

  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error(
      "O valor deve ser um número maior ou igual a zero."
    );
  }
}

function proximoCodigo() {
  return produtos.reduce(
    (maior, produto) => Math.max(maior, produto.codigo),
    0
  ) + 1;
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);

  const novoProduto = {
    codigo: proximoCodigo(),
    descricao: descricao.trim(),
    quantidade: quantidade,
    valor: valor
  };

  produtos.push(novoProduto);
  salvarProdutos();

  return novoProduto;
}

function listarProdutos() {
  return [...produtos].sort(
    (a, b) => a.codigo - b.codigo
  );
}

function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find(
    (prod) => prod.codigo === Number(codigoProduto)
  );
}

function atualizarValor(codigoProduto, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    throw new Error(
      "O valor deve ser maior ou igual a zero."
    );
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
    salvarProdutos();
    return produto;
  }

  throw new Error("Produto não encontrado.");
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (
    !Number.isInteger(novaQuantidade) ||
    novaQuantidade < 1
  ) {
    throw new Error(
      "A quantidade a adicionar deve ser um número inteiro maior que zero."
    );
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade =
      produto.quantidade + novaQuantidade;

    salvarProdutos();
    return produto;
  }

  throw new Error("Produto não encontrado.");
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caractere]);
}

function statusProduto(produto) {
  if (produto.quantidade === 0) {
    return {
      classe: "stock-out",
      texto: "Sem estoque"
    };
  }

  if (produto.quantidade <= 5) {
    return {
      classe: "stock-low",
      texto: "Estoque baixo"
    };
  }

  return {
    classe: "stock-ok",
    texto: "Disponível"
  };
}

function iconeProduto(descricao) {
  const nome = descricao.toLowerCase();

  if (/cadeira|mesa|móvel|sofa|sofá/.test(nome)) {
    return "▱";
  }

  if (/mouse|teclado|fone|headset|computador|notebook/.test(nome)) {
    return "⌨";
  }

  if (/cabo|carregador|celular|telefone/.test(nome)) {
    return "⌁";
  }

  if (/livro|caderno|caneta|papel/.test(nome)) {
    return "▤";
  }

  if (/bola|esporte|camisa/.test(nome)) {
    return "◉";
  }

  return "◇";
}

function renderizar() {
  const totalProdutos = produtos.length;

  const totalUnidades = produtos.reduce(
    (soma, p) => soma + p.quantidade,
    0
  );

  const valorTotal = produtos.reduce(
    (soma, p) => soma + p.quantidade * p.valor,
    0
  );

  const estoqueBaixo = produtos.filter(
    p => p.quantidade <= 5
  ).length;

  $("statProducts").textContent =
    totalProdutos.toLocaleString("pt-BR");

  $("statUnits").textContent =
    totalUnidades.toLocaleString("pt-BR");

  $("statValue").textContent = formatarMoeda(valorTotal);

  $("statLow").textContent =
    estoqueBaixo.toLocaleString("pt-BR");

  $("navProductCount").textContent = totalProdutos;

  const busca = $("searchInput")
    .value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const filtro = $("stockFilter").value;

  let filtrados = listarProdutos().filter(p =>
    p.descricao
      .toLocaleLowerCase("pt-BR")
      .includes(busca) ||
    String(p.codigo).includes(busca) ||
    `#${p.codigo}`.includes(busca)
  );

  if (filtro === "low") {
    filtrados = filtrados.filter(
      p => p.quantidade <= 5
    );
  }

  if (filtro === "available") {
    filtrados = filtrados.filter(
      p => p.quantidade > 5
    );
  }

  if (
    currentView === "dashboard" &&
    !busca &&
    filtro === "all"
  ) {
    filtrados = filtrados.slice(0, 5);
  }

  const tbody = $("productTableBody");

  tbody.innerHTML = filtrados.map(p => {
    const status = statusProduto(p);

    return `
      <tr>
        <td>
          <div class="product-cell">
            <div class="product-icon">
              ${iconeProduto(p.descricao)}
            </div>
            <div>
              <div class="product-name">
                ${escaparHTML(p.descricao)}
              </div>
              <div class="product-subtitle">
                Cadastrado no estoque
              </div>
            </div>
          </div>
        </td>

        <td>
          <span class="code-pill">
            #${p.codigo.toString().padStart(3, "0")}
          </span>
        </td>

        <td>
          <span class="quantity">
            ${p.quantidade.toLocaleString("pt-BR")} un.
          </span>
        </td>

        <td>
          <span class="money">
            ${formatarMoeda(p.valor)}
          </span>
        </td>

        <td>
          <span class="total-money">
            ${formatarMoeda(p.valor * p.quantidade)}
          </span>
        </td>

        <td>
          <span class="stock-badge ${status.classe}">
            ${status.texto}
          </span>
        </td>

        <td>
          <div class="row-actions">
            <button
              class="icon-button"
              data-action="price"
              data-code="${p.codigo}"
              title="Alterar valor"
              aria-label="Alterar valor de ${escaparHTML(p.descricao)}"
            >＄</button>

            <button
              class="icon-button"
              data-action="quantity"
              data-code="${p.codigo}"
              title="Adicionar unidades"
              aria-label="Adicionar unidades de ${escaparHTML(p.descricao)}"
            >＋</button>

            <button
              class="icon-button"
              data-action="edit"
              data-code="${p.codigo}"
              title="Editar produto"
              aria-label="Editar ${escaparHTML(p.descricao)}"
            >✎</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  const semResultados = filtrados.length === 0;

  $("emptyState").classList.toggle(
    "visible",
    semResultados
  );

  $("productTableBody").parentElement.style.display =
    semResultados ? "none" : "table";

  $("emptyState").querySelector("h3").textContent =
    produtos.length === 0
      ? "Nenhum produto por aqui"
      : "Nenhum resultado encontrado";

  $("emptyState").querySelector("p").textContent =
    produtos.length === 0
      ? "Cadastre seu primeiro produto para começar a organizar o estoque."
      : "Tente mudar a busca ou o filtro para encontrar seus produtos.";

  $("emptyCreate").style.display =
    produtos.length === 0 ? "inline-flex" : "none";

  $("resultsText").textContent =
    `Mostrando ${filtrados.length} de ${produtos.length} produto${produtos.length === 1 ? "" : "s"}`;

  $("tableTitle").textContent =
    currentView === "dashboard"
      ? "Produtos recentes"
      : "Todos os produtos";

  $("tableSubtitle").textContent =
    currentView === "dashboard"
      ? "Veja e gerencie os produtos cadastrados."
      : "Pesquise, atualize preços ou adicione unidades ao estoque.";

  $("viewAll").style.display =
    currentView === "dashboard" && produtos.length > 5
      ? "inline-flex"
      : "none";
}

function abrirModal(modo = "create", produto = null) {
  form.reset();

  $("editingCode").value = "";
  $("formError").hidden = true;
  $("formError").textContent = "";

  // Restaura os campos antes de abrir qualquer modo.
  $("description").readOnly = false;
  $("description").style.background = "";
  $("quantity").disabled = false;

  if (modo === "edit" && produto) {
    $("modalTitle").textContent = "Editar produto";

    $("modalDescription").textContent =
      `Atualize os dados do produto #${produto.codigo}.`;

    $("description").value = produto.descricao;
    $("quantity").value = produto.quantidade;
    $("price").value = produto.valor;
    $("editingCode").value = produto.codigo;

    $("submitProduct").innerHTML =
      'Salvar alterações <span>→</span>';

    $("quantity").disabled = true;

    $("quantity").previousElementSibling.innerHTML =
      'Quantidade atual <span>*</span>';

    $("quantity").nextElementSibling.textContent =
      "Use o botão + na tabela para adicionar unidades.";

  } else {
    $("modalTitle").textContent = "Cadastrar produto";

    $("modalDescription").textContent =
      "Preencha os dados para adicionar um produto.";

    $("submitProduct").innerHTML =
      'Cadastrar produto <span>→</span>';

    $("quantity").disabled = false;

    $("quantity").previousElementSibling.innerHTML =
      'Quantidade inicial <span>*</span>';

    $("quantity").nextElementSibling.textContent =
      "Informe pelo menos 1 unidade.";

    if (modo === "price" && produto) {
      $("modalTitle").textContent = "Alterar valor";

      $("modalDescription").textContent =
        `Atualize o preço de ${produto.descricao}.`;

      $("description").value = produto.descricao;
      $("description").readOnly = true;
      $("description").style.background = "#f8f9fc";

      $("quantity").value = produto.quantidade;
      $("quantity").disabled = true;

      $("price").value = produto.valor;
      $("editingCode").value = produto.codigo;

      $("submitProduct").innerHTML =
        'Atualizar valor <span>→</span>';
    }
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  setTimeout(() => $("description").focus(), 30);
}

function fecharModal() {
  modal.hidden = true;
  document.body.style.overflow = "";

  $("description").readOnly = false;
  $("description").style.background = "";
  $("quantity").disabled = false;
}

function mostrarErro(mensagem) {
  $("formError").textContent = mensagem;
  $("formError").hidden = false;
}

function mostrarToast(mensagem, erro = false) {
  const toast = $("toast");

  $("toastMessage").textContent = mensagem;

  toast.querySelector(".toast-check").textContent =
    erro ? "!" : "✓";

  toast.querySelector(".toast-check").style.background =
    erro ? "#d94b4b" : "#1eb980";

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function mudarVisao(view) {
  currentView = view;

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.view === view
    );
  });

  const isDashboard = view === "dashboard";

  $("breadcrumbCurrent").textContent =
    isDashboard ? "Visão geral" : "Produtos";

  $("pageEyebrow").textContent =
    isDashboard ? "PAINEL DE CONTROLE" : "GERENCIAMENTO";

  $("pageTitle").textContent =
    isDashboard ? "Visão geral" : "Produtos";

  $("pageSubtitle").textContent =
    isDashboard
      ? "Acompanhe o que está acontecendo no seu estoque."
      : "Gerencie seus produtos, valores e quantidades.";

  renderizar();
}

// Eventos dos botões e campos.
$("openCreate").addEventListener("click", () => {
  abrirModal();
});

$("emptyCreate").addEventListener("click", () => {
  abrirModal();
});

$("closeModal").addEventListener("click", fecharModal);
$("cancelModal").addEventListener("click", fecharModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    fecharModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) {
    fecharModal();
  }
});

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    mudarVisao(btn.dataset.view);
  });
});

$("viewAll").addEventListener("click", () => {
  mudarVisao("inventory");
});

$("searchInput").addEventListener("input", renderizar);
$("stockFilter").addEventListener("change", renderizar);

$("clearSearch").addEventListener("click", () => {
  $("searchInput").value = "";
  $("stockFilter").value = "all";
  renderizar();
});

// Cadastro e atualização de produtos.
form.addEventListener("submit", event => {
  event.preventDefault();

  try {
    const codigoEdicao = $("editingCode").value;
    const descricao = $("description").value;
    const quantidade = Number($("quantity").value);
    const valor = Number($("price").value);

    if ($("quantity").disabled && !codigoEdicao) {
      throw new Error("Confira a quantidade informada.");
    }

    if (codigoEdicao) {
      const produto = buscarProdutoPorCodigo(codigoEdicao);

      if (!produto) {
        throw new Error("Produto não encontrado.");
      }

      if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
          "O valor deve ser maior ou igual a zero."
        );
      }

      if ($("description").readOnly) {
        atualizarValor(produto.codigo, valor);
        mostrarToast("Valor do produto atualizado!");
      } else {
        validarProduto(descricao, quantidade, valor);

        produto.descricao = descricao.trim();
        produto.valor = valor;

        salvarProdutos();

        mostrarToast("Produto atualizado com sucesso!");
      }
    } else {
      cadastrarProduto(descricao, quantidade, valor);
      mostrarToast("Produto cadastrado com sucesso!");
    }

    fecharModal();
    renderizar();

  } catch (error) {
    mostrarErro(
      error.message || "Não foi possível concluir a operação."
    );
  }
});

// Ações da tabela: alterar preço, adicionar unidades ou editar.
$("productTableBody").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const produto = buscarProdutoPorCodigo(button.dataset.code);

  if (!produto) {
    mostrarToast("Produto não encontrado.", true);
    return;
  }

  const action = button.dataset.action;

  if (action === "edit") {
    abrirModal("edit", produto);

  } else if (action === "price") {
    abrirModal("price", produto);

  } else if (action === "quantity") {
    const resposta = prompt(
      `Quantas unidades de "${produto.descricao}" chegaram?\n` +
      `Estoque atual: ${produto.quantidade} unidades`
    );

    if (resposta === null) return;

    const quantidade = Number(resposta.trim());

    try {
      if (resposta.trim() === "") {
        throw new Error(
          "Informe a quantidade que deseja adicionar."
        );
      }

      atualizarQuantidade(produto.codigo, quantidade);
      renderizar();

      mostrarToast(
        `Estoque atualizado: ${produto.quantidade} unidades.`
      );

    } catch (error) {
      mostrarToast(error.message, true);
    }
  }
});

// Produtos de demonstração na primeira abertura.
if (!localStorage.getItem(STORAGE_KEY)) {
  try {
    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Mouse Logitech", 38, 99);
    cadastrarProduto("Teclado mecânico", 4, 249.90);
  } catch (error) {
    console.warn(
      "Não foi possível criar os exemplos iniciais:",
      error
    );
  }
}

renderizar();
