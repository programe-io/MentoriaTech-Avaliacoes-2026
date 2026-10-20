
/* PRODUTOS DA LOJA */
const roupas = [
  {
    id: 1,
    nome: "Camiseta Básica",
    descricao: "Confortável e moderna",
    preco: 49.90,
    imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
  },
  {
    id: 2,
    nome: "Calça Jeans",
    descricao: "Estilo para qualquer ocasião",
    preco: 119.90,
    imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
  },
  {
    id: 3,
    nome: "Moletom Casual",
    descricao: "Conforto nos dias frios",
    preco: 89.90,
    imagem: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
  },
  {
    id: 4,
    nome: "Vestido Elegante",
    descricao: "Elegância e sofisticação",
    preco: 99.90,
    imagem: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600"
  },
  {
    id: 5,
    nome: "Jaqueta Moderna",
    descricao: "Uma peça cheia de personalidade",
    preco: 159.90,
    imagem: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
  },
  {
    id: 6,
    nome: "Camisa Casual",
    descricao: "Ideal para sair ou trabalhar",
    preco: 79.90,
    imagem: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=600"
  },
  {
    id: 7,
    nome: "Tênis Casual",
    descricao: "Praticidade para o dia a dia",
    preco: 139.90,
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    id: 8,
    nome: "Bolsa Fashion",
    descricao: "O acessório para seu visual",
    preco: 89.90,
    imagem: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
  }
];

/* CONFIGURAÇÃO */
const WHATSAPP = ""; 
// Coloque seu número com código do país e DDD.
// Exemplo: 5511999999999

const carrinho = [];

const listaProdutos = document.getElementById("lista-produtos");
const listaCarrinho = document.getElementById("itens-carrinho");
const quantidadeEl = document.getElementById("quantidade");
const totalEl = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar-compra");

/* FORMATA PREÇO EM REAIS */
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* MOSTRA OS PRODUTOS */
function mostrarProdutos() {
  roupas.forEach((roupa) => {
    const card = document.createElement("article");
    card.className = "produto";

    const imagem = document.createElement("img");
    imagem.src = roupa.imagem;
    imagem.alt = roupa.nome;
    imagem.loading = "lazy";

    const info = document.createElement("div");
    info.className = "produto-info";

    const nome = document.createElement("h3");
    nome.textContent = roupa.nome;

    const descricao = document.createElement("p");
    descricao.className = "descricao";
    descricao.textContent = roupa.descricao;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = formatarPreco(roupa.preco);

    const botao = document.createElement("button");
    botao.className = "botao";
    botao.textContent = "Adicionar ao carrinho";
    botao.addEventListener("click", () => adicionarCarrinho(roupa.id));

    info.append(nome, descricao, preco, botao);
    card.append(imagem, info);
    listaProdutos.appendChild(card);
  });
}

/* ADICIONA UM ITEM */
function adicionarCarrinho(id) {
  const roupa = roupas.find((item) => item.id === id);
  const item = carrinho.find((item) => item.id === id);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ ...roupa, quantidade: 1 });
  }

  atualizarCarrinho();
}

/* REMOVE UMA UNIDADE */
function removerCarrinho(id) {
  const indice = carrinho.findIndex((item) => item.id === id);

  if (indice === -1) return;

  carrinho[indice].quantidade--;

  if (carrinho[indice].quantidade <= 0) {
    carrinho.splice(indice, 1);
  }

  atualizarCarrinho();
}

/* ATUALIZA O CARRINHO E O TOTAL */
function atualizarCarrinho() {
  listaCarrinho.replaceChildren();

  const quantidade = carrinho.reduce(
    (soma, item) => soma + item.quantidade, 0
  );

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  quantidadeEl.textContent = quantidade;
  totalEl.textContent = formatarPreco(total);
  finalizarBtn.disabled = quantidade === 0;

  if (carrinho.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "carrinho-vazio";
    vazio.textContent = "Seu carrinho está vazio.";
    listaCarrinho.appendChild(vazio);
    return;
  }

  carrinho.forEach((item) => {
    const linha = document.createElement("div");
    linha.className = "item-carrinho";

    const nome = document.createElement("span");
    nome.textContent =
      `${item.nome} × ${item.quantidade}`;

    const subtotal = document.createElement("strong");
    subtotal.textContent =
      formatarPreco(item.preco * item.quantidade);

    const remover = document.createElement("button");
    remover.textContent = "− Remover";
    remover.setAttribute(
      "aria-label", `Remover uma unidade de ${item.nome}`
    );
    remover.addEventListener(
      "click", () => removerCarrinho(item.id)
    );

    linha.append(nome, subtotal, remover);
    listaCarrinho.appendChild(linha);
  });
}

/* ABRE A ÁREA DO CARRINHO */
document.getElementById("abrir-carrinho").addEventListener("click", () => {
  document.getElementById("carrinho").scrollIntoView({
    behavior: "smooth"
  });
});

/* PREPARA O PEDIDO PARA O WHATSAPP */
finalizarBtn.addEventListener("click", () => {
  if (carrinho.length === 0) return;

  if (!/^\d{10,15}$/.test(WHATSAPP)) {
    alert(
      "O carrinho está funcionando! Para enviar pedidos, " +
      "configure seu número de WhatsApp no arquivo script.js."
    );
    return;
  }

  const linhas = carrinho.map((item) =>
    `${item.nome} x${item.quantidade} - ` +
    formatarPreco(item.preco * item.quantidade)
  );

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  const mensagem =
    "Olá! Quero fazer este pedido na Moda Style:\n\n" +
    linhas.join("\n") +
    "\n\nTotal dos produtos: " + formatarPreco(total) +
    "\n\nComo posso concluir a compra?";

  const url =
    "https://wa.me/" + WHATSAPP +
    "?text=" + encodeURIComponent(mensagem);

  window.open(url, "_blank", "noopener,noreferrer");
});

/* ANO AUTOMÁTICO NO RODAPÉ */
document.getElementById("ano").textContent =
  new Date().getFullYear();

/* INICIA A LOJA */
mostrarProdutos();
atualizarCarrinho();
