function comprar(produto) {
  const carrinho = document.getElementById("carrinho");

  const item = document.createElement("li");
  item.textContent = produto + " adicionado ao carrinho 🛒";

  carrinho.appendChild(item);
}