
const produtos = [
  {
    id: 1,
    nome: "Creme de Hidratação",
    categoria: "Hidratação",
    descricao: "Maciez e hidratação para seus fios.",
    preco: 29.90,
    emoji: "🧴",
    tag: "Mais vendido"
  },
  {
    id: 2,
    nome: "Creme de Nutrição",
    categoria: "Nutrição",
    descricao: "Cuidado nutritivo para cabelos ressecados.",
    preco: 34.90,
    emoji: "🥥",
    tag: "Favorito"
  },
  {
    id: 3,
    nome: "Creme Reconstrutor",
    categoria: "Reconstrução",
    descricao: "Tratamento para fios danificados.",
    preco: 39.90,
    emoji: "🫙",
    tag: "Destaque"
  },
  {
    id: 4,
    nome: "Creme para Cachos",
    categoria: "Cachos",
    descricao: "Ajuda a definir e modelar os cachos.",
    preco: 27.90,
    emoji: "🌸",
    tag: "Queridinho"
  },
  {
    id: 5,
    nome: "Máscara Capilar",
    categoria: "Hidratação",
    descricao: "Um cuidado extra para os seus fios.",
    preco: 42.90,
    emoji: "🧖",
    tag: "Novidade"
  },
  {
    id: 6,
    nome: "Creme de Coco",
    categoria: "Nutrição",
    descricao: "Nutrição com inspiração tropical.",
    preco: 31.90,
    emoji: "🥥",
    tag: "Especial"
  },
  {
    id: 7,
    nome: "Creme Fortalecedor",
    categoria: "Reconstrução",
    descricao: "Cuidado para cabelos fragilizados.",
    preco: 36.90,
    emoji: "🌿",
    tag: "Essencial"
  },
  {
    id: 8,
    nome: "Ativador de Cachos",
    categoria: "Cachos",
    descricao: "Ajuda na definição e no controle do frizz.",
    preco: 32.90,
    emoji: "✨",
    tag: "Favorito"
  }
];

const carrinho = [];
let categoriaAtual = "Todos";

const formatarPreco = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

function mostrarProdutos() {
  const termo = pesquisa.value.trim().toLocaleLowerCase("pt-BR");

  const filtrados = produtos.filter(produto => {
    const correspondeCategoria =
      categoriaAtual === "Todos" ||
      produto.categoria === categoriaAtual;

    const texto = (
      produto.nome + " " +
      produto.descricao + " " +
      produto.categoria
    ).toLocaleLowerCase("pt-BR");

    return correspondeCategoria && texto.includes(termo);
  });

  listaProdutos.innerHTML = filtrados.map(produto => `
    <article class="product-card">
      <div class="product-art">
        <span class="product-tag">${produto.tag}</span>
        <span class="emoji">${produto.emoji}</span>
      </div>

      <div class="product-info">
        <h3>${produto.nome}</h3>
        <p class="description">${produto.descricao}</p>
        <div class="rating">★★★★★ <span>(Avaliação)</span></div>
        <p class="product-price">${formatarPreco(produto.preco)}</p>

        <button class="add-button" data-adicionar="${produto.id}">
          🛒 Adicionar ao carrinho
        </button>
      </div>
    </article>
  `).join("");

  document.getElementById("semResultados").hidden =
    filtrados.length > 0;
}

// Adicionar produto
function adicionarAoCarrinho(id) {
  const item = carrinho.find(produto => produto.id === id);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ id, quantidade: 1 });
  }

  atualizarCarrinho();

  const produto = produtos.find(p => p.id === id);
  mostrarAviso(`${produto.nome} adicionado ao carrinho!`);
}

// Alterar quantidade
function alterarQuantidade(id, valor) {
  const item = carrinho.find(produto => produto.id === id);

  if (!item) return;

  item.quantidade += valor;

  if (item.quantidade <= 0) {
    carrinho.splice(carrinho.indexOf(item), 1);
  }

  atualizarCarrinho();
}

// Remover produto
function removerProduto(id) {
  const indice = carrinho.findIndex(item => item.id === id);

  if (indice !== -1) {
    carrinho.splice(indice, 1);
  }

  atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
  const quantidade = carrinho.reduce(
    (total, item) => total + item.quantidade, 0
  );

  const total = carrinho.reduce((soma, item) => {
    const produto = produtos.find(p => p.id === item.id);
    return soma + produto.preco * item.quantidade;
  }, 0);

  document.getElementById("quantidadeCarrinho").textContent =
    quantidade;

  document.getElementById("total").textContent =
    formatarPreco(total);

  const container = document.getElementById("itensCarrinho");

  if (carrinho.length === 0) {
    container.innerHTML = `
      <p class="cart-empty">
        Seu carrinho está vazio. 🌸
      </p>
    `;
    return;
  }

  container.innerHTML = carrinho.map(item => {
    const produto = produtos.find(p => p.id === item.id);

    return `
      <div class="cart-item">
        <div class="cart-item-art">${produto.emoji}</div>

        <div>
          <h3>${produto.nome}</h3>
          <p>${formatarPreco(produto.preco)}</p>

          <div class="quantity">
            <button data-alterar="${produto.id}"
              data-valor="-1">−</button>

            <span>${item.quantidade}</span>

            <button data-alterar="${produto.id}"
              data-valor="1">+</button>
          </div>
        </div>

        <button class="remove-item"
          data-remover="${produto.id}">×</button>
      </div>
    `;
  }).join("");
}

// Abrir e fechar o carrinho
function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
  document.getElementById("carrinho")
    .setAttribute("aria-hidden", "false");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("open");
  document.getElementById("overlay").classList.remove("visible");
  document.getElementById("carrinho")
    .setAttribute("aria-hidden", "true");
}

// Mostrar aviso temporário
let temporizador;

function mostrarAviso(texto) {
  const aviso = document.getElementById("aviso");

  aviso.textContent = texto;
  aviso.classList.add("show");

  clearTimeout(temporizador);

  temporizador = setTimeout(() => {
    aviso.classList.remove("show");
  }, 2500);
}

// Eventos dos produtos
listaProdutos.addEventListener("click", evento => {
  const botao = evento.target.closest("[data-adicionar]");

  if (botao) {
    adicionarAoCarrinho(Number(botao.dataset.adicionar));
  }
});

// Eventos dos itens do carrinho
document.getElementById("itensCarrinho")
  .addEventListener("click", evento => {
    const alterar = evento.target.closest("[data-alterar]");
    const remover = evento.target.closest("[data-remover]");

    if (alterar) {
      alterarQuantidade(
        Number(alterar.dataset.alterar),
        Number(alterar.dataset.valor)
      );
    }

    if (remover) {
      removerProduto(Number(remover.dataset.remover));
    }
  });

// Filtros por categoria
document.querySelectorAll(".filter").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.category;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === botao);
    });

    mostrarProdutos();
  });
});

// Pesquisa
pesquisa.addEventListener("input", mostrarProdutos);

// Controles do carrinho
document.getElementById("abrirCarrinho")
  .addEventListener("click", abrirCarrinho);

document.getElementById("fecharCarrinho")
  .addEventListener("click", fecharCarrinho);

document.getElementById("overlay")
  .addEventListener("click", fecharCarrinho);

document.addEventListener("keydown", evento => {
  if (evento.key === "Escape") fecharCarrinho();
});

// Menu para celular
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("open");
});

document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("open");
  });
});

// Formulário de e-mail
document.getElementById("formEmail")
  .addEventListener("submit", evento => {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim();

    document.getElementById("mensagemEmail").textContent =
      `Obrigada! ${email} foi cadastrado nesta demonstração.`;

    evento.target.reset();
  });

// Finalizar pedido demonstrativo
document.getElementById("finalizar")
  .addEventListener("click", () => {
    if (carrinho.length === 0) {
      mostrarAviso("Adicione um produto ao carrinho primeiro.");
      return;
    }

    mostrarAviso(
      "Demonstração: nenhum pedido ou pagamento foi enviado."
    );
  });

// Atualizar o ano do rodapé
document.getElementById("ano").textContent =
  new Date().getFullYear();

// Inicializar a página
mostrarProdutos();
atualizarCarrinho();
