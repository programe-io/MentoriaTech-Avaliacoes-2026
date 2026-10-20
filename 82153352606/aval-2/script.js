
const produtos = [
  { nome: "X-Burger", preco: 18.90 },
  { nome: "X-Bacon", preco: 24.90 },
  { nome: "Batata Frita", preco: 12.00 },
  { nome: "Refrigerante", preco: 6.00 }
];

const carrinho = [];

const formatarPreco = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

// Adicionar produto ao carrinho
document.querySelectorAll(".adicionar").forEach(botao => {
  botao.addEventListener("click", () => {
    const id = Number(botao.dataset.id);
    carrinho.push(produtos[id]);
    atualizarCarrinho();
  });
});

// Mostrar produtos e total
function atualizarCarrinho() {
  const area = document.getElementById("itens-carrinho");

  area.replaceChildren();

  if (carrinho.length === 0) {
    area.textContent = "Seu carrinho está vazio.";
  } else {
    carrinho.forEach((produto, indice) => {
      const linha = document.createElement("p");
      const descricao = document.createElement("span");
      const remover = document.createElement("button");

      descricao.textContent =
        `${produto.nome} — ${formatarPreco(produto.preco)}`;

      remover.textContent = "Remover";
      remover.addEventListener("click", () => {
        carrinho.splice(indice, 1);
        atualizarCarrinho();
      });

      linha.append(descricao, remover);
      area.appendChild(linha);
    });
  }

  const total = carrinho.reduce(
    (soma, produto) => soma + produto.preco, 0
  );

  document.getElementById("total").textContent =
    formatarPreco(total);
}

// Finalizar pedido pelo WhatsApp
document.getElementById("finalizar").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Adicione algum produto ao carrinho!");
    return;
  }

  // Troque pelo seu número: código do país + DDD + número
  const telefone = "5511999999999";

  const lista = carrinho.map(produto =>
    `${produto.nome} - ${formatarPreco(produto.preco)}`
  ).join("\n");

  const total = carrinho.reduce(
    (soma, produto) => soma + produto.preco, 0
  );

  const mensagem =
    `Olá! Quero fazer um pedido:\n\n${lista}\n\n` +
    `Total: ${formatarPreco(total)}`;

  const url = "https://wa.me/" + telefone +
    "?text=" + encodeURIComponent(mensagem);

  window.open(url, "_blank");
});
