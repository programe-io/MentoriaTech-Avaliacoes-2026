
const WHATSAPP = "5511999999999"; // Troque pelo número da sua loja
// Use DDI + DDD + número, somente dígitos.

const produtos = [
  {
    id: 1,
    nome: "Conjunto Ursinho",
    descricao: "Confortável e delicado",
    preco: 79.90,
    categoria: "Bebê",
    tamanhos: ["P", "M", "G", "1"],
    selo: "Mais vendido",
    imagem: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nome: "Vestido Florzinha",
    descricao: "Leve e cheio de charme",
    preco: 89.90,
    categoria: "Menina",
    tamanhos: ["1", "2", "3", "4"],
    selo: "Novidade",
    imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nome: "Look Pequeno Príncipe",
    descricao: "Estilo para todo dia",
    preco: 69.90,
    categoria: "Menino",
    tamanhos: ["1", "2", "3", "4", "6"],
    selo: "",
    imagem: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    nome: "Macacão Nuvem",
    descricao: "Maciez para os bebês",
    preco: 59.90,
    categoria: "Bebê",
    tamanhos: ["RN", "P", "M", "G"],
    selo: "Fofo demais",
    imagem: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    nome: "Conjunto Rosa Doce",
    descricao: "Delicado e confortável",
    preco: 74.90,
    categoria: "Menina",
    tamanhos: ["1", "2", "3", "4", "6"],
    selo: "",
    imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    nome: "Conjunto Aventura",
    descricao: "Perfeito para brincar",
    preco: 84.90,
    categoria: "Menino",
    tamanhos: ["2", "3", "4", "6", "8"],
    selo: "Novidade",
    imagem: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    nome: "Body Amor",
    descricao: "Um abraço em forma de roupa",
    preco: 39.90,
    categoria: "Bebê",
    tamanhos: ["RN", "P", "M", "G"],
    selo: "",
    imagem: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    nome: "Vestido Jardim",
    descricao: "Para momentos especiais",
    preco: 99.90,
    categoria: "Menina",
    tamanhos: ["1", "2", "3", "4", "6"],
    selo: "Especial",
    imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
  }
];

let carrinho = [];
let categoriaAtual = "Todos";

const lista = document.getElementById("lista-produtos");
const contador = document.getElementById("contador");
const fundoModal = document.getElementById("fundo-modal");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalElemento = document.getElementById("total");

const dinheiro = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function renderizarProdutos() {
  const filtrados = categoriaAtual === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual);

  lista.innerHTML = filtrados.map(p => `
    <article class="produto">
      <div class="produto-imagem">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
        ${p.selo ? `<span class="selo">${p.selo}</span>` : ""}
      </div>
      <h3>${p.nome}</h3>
      <p class="descricao">${p.descricao}</p>
      <p class="preco">${dinheiro(p.preco)}</p>
      <label>
        <span class="descricao">Escolha o tamanho</span>
        <select id="tamanho-${p.id}" aria-label="Tamanho de ${p.nome}">
          ${p.tamanhos.map(t =>
            `<option value="${t}">${t}</option>`
          ).join("")}
        </select>
      </label>
      <button class="adicionar" data-id="${p.id}">
        Adicionar à sacolinha +
      </button>
    </article>
  `).join("");
}

function adicionarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  const seletor = document.getElementById(`tamanho-${id}`);
  const tamanho = seletor.value;

  const existente = carrinho.find(
    item => item.id === id && item.tamanho === tamanho
  );

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      tamanho,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const quantidade = carrinho.reduce(
    (soma, item) => soma + item.quantidade, 0
  );

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  contador.textContent = quantidade;
  totalElemento.textContent = dinheiro(total);

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML =
      '<p class="vazio">Sua sacolinha está vazia. 💕</p>';
    return;
  }

  itensCarrinho.innerHTML = carrinho.map((item, indice) => `
    <div class="item-carrinho">
      <div>
        <strong>${item.nome}</strong>
        <p>Tamanho: ${item.tamanho} · Qtd: ${item.quantidade}</p>
        <p>${dinheiro(item.preco * item.quantidade)}</p>
        <button class="remover" data-indice="${indice}">
          Remover item
        </button>
      </div>
    </div>
  `).join("");
}

lista.addEventListener("click", evento => {
  const botao = evento.target.closest(".adicionar");
  if (botao) adicionarProduto(Number(botao.dataset.id));
});

document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.categoria;

    document.querySelectorAll(".filtro").forEach(b => {
      b.classList.toggle("ativo", b === botao);
    });

    renderizarProdutos();
  });
});

document.getElementById("abrir-carrinho").addEventListener("click", () => {
  fundoModal.hidden = false;
});

document.getElementById("fechar-carrinho").addEventListener("click", () => {
  fundoModal.hidden = true;
});

fundoModal.addEventListener("click", evento => {
  if (evento.target === fundoModal) fundoModal.hidden = true;
});

itensCarrinho.addEventListener("click", evento => {
  const botao = evento.target.closest(".remover");
  if (!botao) return;

  carrinho.splice(Number(botao.dataset.indice), 1);
  atualizarCarrinho();
});

document.getElementById("finalizar").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos um produto à sacolinha.");
    return;
  }

  if (!/^\d{12,13}$/.test(WHATSAPP)) {
    alert("Configure o número de WhatsApp da loja no arquivo script.js.");
    return;
  }

  const linhas = carrinho.map(item =>
    `- ${item.nome} | Tamanho: ${item.tamanho} | ` +
    `Quantidade: ${item.quantidade} | ` +
    `Subtotal: ${dinheiro(item.preco * item.quantidade)}`
  );

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  const mensagem = [
    "Olá! 💕 Gostaria de fazer um pedido na Pequeno Encanto:",
    "",
    ...linhas,
    "",
    `Total dos produtos: ${dinheiro(total)}`,
    "",
    "Por favor, confirme a disponibilidade, o frete e o pagamento."
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.getElementById("ano").textContent = new Date().getFullYear();

renderizarProdutos();
atualizarCarrinho();
