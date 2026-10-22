
const perfumes = [
  {
    id: 1,
    nome: "Chanel Nº 5",
    marca: "CHANEL",
    categoria: "Feminino",
    preco: 899.90,
    descricao: "Floral aldeídico, clássico e sofisticado.",
    emoji: "🌸",
    cor: "#ead9ce"
  },
  {
    id: 2,
    nome: "Sauvage",
    marca: "DIOR",
    categoria: "Masculino",
    preco: 759.90,
    descricao: "Notas frescas, amadeiradas e marcantes.",
    emoji: "🌿",
    cor: "#d5ddd5"
  },
  {
    id: 3,
    nome: "Bright Crystal",
    marca: "VERSACE",
    categoria: "Feminino",
    preco: 529.90,
    descricao: "Fragrância delicada, frutada e luminosa.",
    emoji: "💎",
    cor: "#e8d6dc"
  },
  {
    id: 4,
    nome: "Guilty Pour Homme",
    marca: "GUCCI",
    categoria: "Masculino",
    preco: 689.90,
    descricao: "Aroma intenso com personalidade moderna.",
    emoji: "🖤",
    cor: "#d5d0c4"
  },
  {
    id: 5,
    nome: "Paradoxe",
    marca: "PRADA",
    categoria: "Feminino",
    preco: 819.90,
    descricao: "Uma combinação floral contemporânea.",
    emoji: "🌷",
    cor: "#e9d6c7"
  },
  {
    id: 6,
    nome: "Oud Wood",
    marca: "TOM FORD",
    categoria: "Unissex",
    preco: 1499.90,
    descricao: "Madeiras nobres, especiarias e elegância.",
    emoji: "✨",
    cor: "#d9c8a8"
  },
  {
    id: 7,
    nome: "Acqua di Giò",
    marca: "GIORGIO ARMANI",
    categoria: "Masculino",
    preco: 699.90,
    descricao: "Notas aquáticas, frescas e aromáticas.",
    emoji: "🌊",
    cor: "#cbdde0"
  },
  {
    id: 8,
    nome: "CK One",
    marca: "CALVIN KLEIN",
    categoria: "Unissex",
    preco: 359.90,
    descricao: "Fragrância cítrica, leve e versátil.",
    emoji: "🍋",
    cor: "#e7e4c9"
  }
];

let categoriaAtual = "Todos";
let carrinho = [];

const listaPerfumes = document.getElementById("listaPerfumes");
const pesquisa = document.getElementById("pesquisa");
const semResultados = document.getElementById("semResultados");

const dinheiro = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

// Exibe os perfumes
function renderizarPerfumes() {
  const termo = pesquisa.value
    .trim()
    .toLowerCase();

  const filtrados = perfumes.filter(perfume => {
    const correspondeCategoria =
      categoriaAtual === "Todos" ||
      perfume.categoria === categoriaAtual;

    const correspondePesquisa =
      perfume.nome.toLowerCase().includes(termo) ||
      perfume.marca.toLowerCase().includes(termo) ||
      perfume.categoria.toLowerCase().includes(termo);

    return correspondeCategoria && correspondePesquisa;
  });

  listaPerfumes.innerHTML = filtrados.map(perfume => `
    <article class="product-card">
      <div class="product-image" style="--produto-cor: ${perfume.cor}">
        <span class="product-label">${perfume.categoria}</span>
        <span class="bottle-emoji">${perfume.emoji}</span>
        <span class="product-brand">${perfume.marca}</span>
      </div>

      <div class="product-info">
        <p class="product-brand-small">${perfume.marca}</p>
        <h3>${perfume.nome}</h3>
        <p class="product-description">${perfume.descricao}</p>

        <div class="product-bottom">
          <strong>${dinheiro(perfume.preco)}</strong>
          <button
            class="add-btn"
            data-id="${perfume.id}"
            aria-label="Adicionar ${perfume.nome} ao carrinho"
          >+ Adicionar</button>
        </div>
      </div>
    </article>
  `).join("");

  semResultados.hidden = filtrados.length > 0;
}

// Filtros de categoria
document.querySelectorAll(".filter").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.category;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    botao.classList.add("active");
    renderizarPerfumes();
  });
});

// Pesquisa
pesquisa.addEventListener("input", renderizarPerfumes);

// Adiciona produtos ao carrinho
listaPerfumes.addEventListener("click", evento => {
  const botao = evento.target.closest(".add-btn");

  if (!botao) return;

  const id = Number(botao.dataset.id);
  const perfume = perfumes.find(item => item.id === id);

  if (!perfume) return;

  const existente = carrinho.find(item => item.id === id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      ...perfume,
      quantidade: 1
    });
  }

  renderizarCarrinho();
  mostrarAviso(`${perfume.nome} adicionado ao carrinho!`);
});

// Atualiza carrinho
function renderizarCarrinho() {
  const itensCarrinho = document.getElementById("itensCarrinho");
  const contador = document.getElementById("contadorCarrinho");

  contador.textContent = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
  } else {
    itensCarrinho.innerHTML = carrinho.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.nome}</strong>
          <p>${dinheiro(item.preco)} × ${item.quantidade}</p>
        </div>

        <div class="cart-item-actions">
          <button data-action="menos" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
          <span>${item.quantidade}</span>
          <button data-action="mais" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
          <button data-action="remover" data-id="${item.id}" aria-label="Remover produto">×</button>
        </div>
      </div>
    `).join("");
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  document.getElementById("total").textContent = dinheiro(total);
}

document.getElementById("itensCarrinho").addEventListener("click", evento => {
  const botao = evento.target.closest("button");

  if (!botao) return;

  const id = Number(botao.dataset.id);
  const item = carrinho.find(produto => produto.id === id);

  if (!item) return;

  if (botao.dataset.action === "mais") {
    item.quantidade++;
  } else if (botao.dataset.action === "menos") {
    item.quantidade--;

    if (item.quantidade <= 0) {
      carrinho = carrinho.filter(produto => produto.id !== id);
    }
  } else if (botao.dataset.action === "remover") {
    carrinho = carrinho.filter(produto => produto.id !== id);
  }

  renderizarCarrinho();
});

// Abre e fecha o carrinho
const carrinhoPainel = document.getElementById("carrinho");
const overlay = document.getElementById("overlay");

function abrirCarrinho() {
  carrinhoPainel.classList.add("open");
  overlay.classList.add("show");
  carrinhoPainel.setAttribute("aria-hidden", "false");
}

function fecharCarrinho() {
  carrinhoPainel.classList.remove("open");
  overlay.classList.remove("show");
  carrinhoPainel.setAttribute("aria-hidden", "true");
}

document.getElementById("abrirCarrinho")
  .addEventListener("click", abrirCarrinho);

document.getElementById("fecharCarrinho")
  .addEventListener("click", fecharCarrinho);

overlay.addEventListener("click", fecharCarrinho);

// Finalização demonstrativa
document.getElementById("finalizar").addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarAviso("Adicione um perfume antes de continuar.");
    return;
  }

  mostrarAviso("Pedido demonstrativo! A loja ainda não processa pagamentos.");
});

// Newsletter demonstrativa
document.getElementById("formNewsletter").addEventListener("submit", evento => {
  evento.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (!email) return;

  document.getElementById("mensagemEmail").textContent =
    "Cadastro demonstrativo realizado!";

  evento.target.reset();
});

// Menu para celular
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("menu-open");
});

document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("menu-open");
  });
});

// Avisos
let temporizadorAviso;

function mostrarAviso(mensagem) {
  const aviso = document.getElementById("aviso");

  aviso.textContent = mensagem;
  aviso.classList.add("visible");

  clearTimeout(temporizadorAviso);

  temporizadorAviso = setTimeout(() => {
    aviso.classList.remove("visible");
  }, 2800);
}

// Ano automático no rodapé
document.getElementById("ano").textContent =
  new Date().getFullYear();

// Inicialização
renderizarPerfumes();
renderizarCarrinho();
