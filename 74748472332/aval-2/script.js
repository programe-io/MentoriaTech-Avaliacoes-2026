const produtos = [
  {
    id: 1,
    nome: "Speed Pro",
    categoria: "Campo",
    preco: 289.90,
    tag: "MAIS VENDIDA",
    descricao: "Leveza e velocidade para gramados.",
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nome: "Elite Runner",
    categoria: "Society",
    preco: 219.90,
    tag: "DESTAQUE",
    descricao: "Conforto para dominar o society.",
    imagem: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nome: "Pro Control",
    categoria: "Futsal",
    preco: 179.90,
    tag: "OFERTA",
    descricao: "Controle e agilidade nas quadras.",
    imagem: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    nome: "Ultra Strike",
    categoria: "Campo",
    preco: 329.90,
    tag: "NOVO",
    descricao: "Performance para grandes partidas.",
    imagem: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    nome: "Street Soccer",
    categoria: "Society",
    preco: 199.90,
    tag: "POPULAR",
    descricao: "Estabilidade para jogos intensos.",
    imagem: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    nome: "Futsal Max",
    categoria: "Futsal",
    preco: 159.90,
    tag: "OFERTA",
    descricao: "Praticidade para jogar toda semana.",
    imagem: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    nome: "Velocity X",
    categoria: "Campo",
    preco: 349.90,
    tag: "PREMIUM",
    descricao: "Design esportivo para alta intensidade.",
    imagem: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    nome: "Quadra Flex",
    categoria: "Futsal",
    preco: 189.90,
    tag: "DESTAQUE",
    descricao: "Flexibilidade e conforto nos movimentos.",
    imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
  }
];

const grade = document.getElementById("product-grid");
const mensagemVazia = document.getElementById("empty-message");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const toast = document.getElementById("toast");

let categoriaAtual = "Todas";
let carrinho = [];
let toastTimeout;

const dinheiro = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function renderizarProdutos() {
  const filtrados = categoriaAtual === "Todas"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual);

  grade.innerHTML = filtrados.map(produto => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${produto.imagem}"
          alt="${produto.nome}"
          loading="lazy"
        >
        <span class="product-tag">${produto.tag}</span>
      </div>

      <div class="product-info">
        <span class="product-category">${produto.categoria}</span>
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>

        <div class="price">
          ${dinheiro(produto.preco)}
          <small>ou consulte as condições de pagamento</small>
        </div>

        <button class="add-button" data-add="${produto.id}">
          ADICIONAR AO CARRINHO +
        </button>
      </div>
    </article>
  `).join("");

  mensagemVazia.hidden = filtrados.length > 0;
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const item = carrinho.find(p => p.id === id);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1
    });
  }

  renderizarCarrinho();
  mostrarToast(`${produto.nome} adicionado ao carrinho!`);
}

function alterarQuantidade(id, variacao) {
  const item = carrinho.find(p => p.id === id);
  if (!item) return;

  item.quantidade += variacao;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(p => p.id !== id);
  }

  renderizarCarrinho();
}

function renderizarCarrinho() {
  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade, 0
  );

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade, 0
  );

  cartCount.textContent = quantidadeTotal;
  cartTotal.textContent = dinheiro(valorTotal);

  if (carrinho.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio.<br><br>
        Que tal escolher sua próxima chuteira?
      </p>
    `;
    return;
  }

  cartItems.innerHTML = carrinho.map(item => `
    <div class="cart-item">
      <img src="${item.imagem}" alt="${item.nome}">

      <div>
        <h3>${item.nome}</h3>
        <p>${dinheiro(item.preco * item.quantidade)}</p>

        <div class="quantity">
          <button data-change="${item.id}" data-delta="-1"
            aria-label="Diminuir quantidade">−</button>

          <span>${item.quantidade}</span>

          <button data-change="${item.id}" data-delta="1"
            aria-label="Aumentar quantidade">+</button>

          <button class="remove-item" data-remove="${item.id}">
            Remover
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function abrirCarrinho() {
  cartPanel.classList.add("show");
  overlay.classList.add("show");
  document.body.classList.add("cart-open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function fecharCarrinho() {
  cartPanel.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("cart-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

function mostrarToast(texto) {
  clearTimeout(toastTimeout);
  toast.textContent = texto;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Filtros por modalidade
document.querySelectorAll(".filter").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.category;

    document.querySelectorAll(".filter").forEach(b => {
      b.classList.toggle("active", b === botao);
    });

    renderizarProdutos();
  });
});

// Adicionar produtos
grade.addEventListener("click", evento => {
  const botao = evento.target.closest("[data-add]");
  if (botao) adicionarAoCarrinho(Number(botao.dataset.add));
});

// Alterar quantidades ou remover itens
cartItems.addEventListener("click", evento => {
  const quantidade = evento.target.closest("[data-change]");
  const remover = evento.target.closest("[data-remove]");

  if (quantidade) {
    alterarQuantidade(
      Number(quantidade.dataset.change),
      Number(quantidade.dataset.delta)
    );
  }

  if (remover) {
    carrinho = carrinho.filter(
      item => item.id !== Number(remover.dataset.remove)
    );
    renderizarCarrinho();
  }
});

// Abrir e fechar carrinho
document.getElementById("open-cart")
  .addEventListener("click", abrirCarrinho);

document.getElementById("close-cart")
  .addEventListener("click", fecharCarrinho);

overlay.addEventListener("click", fecharCarrinho);

document.addEventListener("keydown", evento => {
  if (evento.key === "Escape") fecharCarrinho();
});

// Menu para celular
document.getElementById("menu-button").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
  });
});

// Finalização demonstrativa
document.getElementById("checkout").addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarToast("Adicione uma chuteira antes de continuar.");
    return;
  }

  alert(
    "Resumo do pedido\n\n" +
    carrinho.map(item =>
      `${item.nome} x${item.quantidade} — ${
        dinheiro(item.preco * item.quantidade)
      }`
    ).join("\n") +
    "\n\nTotal: " + cartTotal.textContent +
    "\n\nEsta é uma demonstração. Nenhum pagamento foi realizado."
  );
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderizarProdutos();
renderizarCarrinho();