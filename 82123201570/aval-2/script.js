
const WHATSAPP = "5586988841620";

const produtos = [
  {
    id: 1,
    nome: "Shampoo Nutrição Intensa",
    categoria: "Shampoos",
    preco: 39.90,
    descricao: "Limpeza suave e toque sedoso.",
    imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    nome: "Máscara Reconstrutora",
    categoria: "Tratamentos",
    preco: 59.90,
    descricao: "Cuidado intensivo para os fios.",
    imagem: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    nome: "Óleo Finalizador Luxury",
    categoria: "Finalizadores",
    preco: 44.90,
    descricao: "Brilho e acabamento sofisticado.",
    imagem: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    nome: "Condicionador Hidratante",
    categoria: "Shampoos",
    preco: 37.90,
    descricao: "Maciez e desembaraço.",
    imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    nome: "Leave-in Protetor",
    categoria: "Finalizadores",
    preco: 49.90,
    descricao: "Finalização para sua rotina capilar.",
    imagem: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    nome: "Kit Cronograma Capilar",
    categoria: "Kits",
    preco: 129.90,
    descricao: "Uma rotina completa de cuidados.",
    imagem: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80"
  }
];

let categoriaAtual = "Todos";
let sacola = [];

const grade = document.getElementById("product-grid");
const busca = document.getElementById("search");
const contador = document.getElementById("cart-count");
const overlay = document.getElementById("cart-overlay");
const itensSacola = document.getElementById("cart-items");
const totalSacola = document.getElementById("cart-total");

const formatarPreco = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function renderizarProdutos() {
  const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

  const filtrados = produtos.filter(produto => {
    const correspondeCategoria =
      categoriaAtual === "Todos" ||
      produto.categoria === categoriaAtual;

    const correspondeBusca =
      produto.nome.toLocaleLowerCase("pt-BR").includes(termo);

    return correspondeCategoria && correspondeBusca;
  });

  grade.replaceChildren();

  if (filtrados.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.className = "empty-message";
    mensagem.textContent = "Nenhum produto encontrado.";
    grade.appendChild(mensagem);
    return;
  }

  filtrados.forEach(produto => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.loading = "lazy";

    imagem.onerror = () => {
      imagem.removeAttribute("src");
      imagem.alt = "Imagem indisponível: " + produto.nome;
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const categoria = document.createElement("span");
    categoria.className = "product-category";
    categoria.textContent = produto.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.className = "product-description";
    descricao.textContent = produto.descricao;

    const preco = document.createElement("strong");
    preco.className = "product-price";
    preco.textContent = formatarPreco(produto.preco);

    const botao = document.createElement("button");
    botao.className = "add-button";
    botao.textContent = "Adicionar à sacola";
    botao.addEventListener("click", () => adicionar(produto.id));

    info.append(categoria, titulo, descricao, preco, botao);
    card.append(imagem, info);
    grade.appendChild(card);
  });
}

function adicionar(id) {
  const produto = produtos.find(p => p.id === id);
  const item = sacola.find(p => p.id === id);

  if (item) {
    item.quantidade++;
  } else {
    sacola.push({ ...produto, quantidade: 1 });
  }

  renderizarSacola();
  abrirSacola();
}

function alterarQuantidade(id, variacao) {
  const item = sacola.find(p => p.id === id);

  if (!item) return;

  item.quantidade += variacao;
  sacola = sacola.filter(p => p.quantidade > 0);

  renderizarSacola();
}

function renderizarSacola() {
  contador.textContent = sacola.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  itensSacola.replaceChildren();

  sacola.forEach(item => {
    const linha = document.createElement("div");
    linha.className = "cart-item";

    const detalhes = document.createElement("div");
    const titulo = document.createElement("strong");
    titulo.textContent = item.nome;

    const preco = document.createElement("p");
    preco.textContent = formatarPreco(item.preco) + " cada";

    const controles = document.createElement("div");
    controles.className = "quantity-controls";

    const menos = document.createElement("button");
    menos.textContent = "−";
    menos.setAttribute("aria-label", "Diminuir quantidade");
    menos.addEventListener("click", () => alterarQuantidade(item.id, -1));

    const qtd = document.createElement("span");
    qtd.textContent = item.quantidade;

    const mais = document.createElement("button");
    mais.textContent = "+";
    mais.setAttribute("aria-label", "Aumentar quantidade");
    mais.addEventListener("click", () => alterarQuantidade(item.id, 1));

    controles.append(menos, qtd, mais);
    detalhes.append(titulo, preco, controles);

    const subtotal = document.createElement("strong");
    subtotal.textContent = formatarPreco(item.preco * item.quantidade);

    linha.append(detalhes, subtotal);
    itensSacola.appendChild(linha);
  });

  const total = sacola.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  totalSacola.textContent = formatarPreco(total);
}

function abrirSacola() {
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("close-cart").focus();
}

function fecharSacola() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  document.getElementById("open-cart").focus();
}

document.getElementById("filters").addEventListener("click", event => {
  const botao = event.target.closest("[data-category]");

  if (!botao) return;

  categoriaAtual = botao.dataset.category;

  document.querySelectorAll(".filter").forEach(filtro => {
    filtro.classList.toggle("active", filtro === botao);
  });

  renderizarProdutos();
});

busca.addEventListener("input", renderizarProdutos);

document.getElementById("open-cart")
  .addEventListener("click", abrirSacola);

document.getElementById("close-cart")
  .addEventListener("click", fecharSacola);

overlay.addEventListener("click", event => {
  if (event.target === overlay) fecharSacola();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !overlay.hidden) fecharSacola();
});

document.getElementById("clear-cart").addEventListener("click", () => {
  sacola = [];
  renderizarSacola();
});

document.getElementById("checkout").addEventListener("click", () => {
  if (sacola.length === 0) {
    alert("Adicione pelo menos um produto à sacola.");
    return;
  }

  const linhas = sacola.map(item =>
    `${item.nome} x${item.quantidade} — ${formatarPreco(
      item.preco * item.quantidade
    )}`
  );

  const total = sacola.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  const mensagem = [
    "Olá! Quero fazer um pedido na Luxe Hair:",
    "",
    ...linhas,
    "",
    `Subtotal: ${formatarPreco(total)}`,
    "Gostaria de confirmar disponibilidade, frete e formas de pagamento."
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

renderizarProdutos();
renderizarSacola();
