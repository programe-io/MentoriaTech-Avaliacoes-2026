
/* ============================
   GLOW BEAUTY - JAVASCRIPT
   Loja de maquiagem e beleza
============================ */

// Produtos da loja

const produtos = [
  {
    id: 1,
    nome: "Batom Velvet",
    preco: 39.90,
    emoji: "💋"
  },
  {
    id: 2,
    nome: "Iluminador Glow",
    preco: 49.90,
    emoji: "✨"
  },
  {
    id: 3,
    nome: "Primer Fresh",
    preco: 44.90,
    emoji: "🧴"
  },
  {
    id: 4,
    nome: "Paleta Nude",
    preco: 69.90,
    emoji: "🎨"
  }
];

// Sacola de compras

let sacola = [];

// Formatar preço em reais

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Adicionar produto à sacola

function addCart(id) {

  const produto = produtos.find(
    item => item.id === id
  );

  if (!produto) {
    return;
  }

  sacola.push(produto);

  atualizarSacola();

  alert(
    produto.nome + " foi adicionado à sua sacola!"
  );

}

// Atualizar quantidade e total

function atualizarSacola() {

  const contador = document.getElementById("count");

  if (contador) {
    contador.textContent = sacola.length;
  }

  const total = sacola.reduce(
    (soma, produto) => soma + produto.preco,
    0
  );

  const totalElemento = document.getElementById("total");

  if (totalElemento) {
    totalElemento.textContent = formatarPreco(total);
  }

  mostrarProdutosSacola();

}

// Mostrar produtos adicionados

function mostrarProdutosSacola() {

  const lista = document.getElementById("lista-sacola");

  if (!lista) {
    return;
  }

  lista.innerHTML = "";

  sacola.forEach((produto, index) => {

    const item = document.createElement("div");

    item.className = "item-sacola";

    item.innerHTML = `
      <span>${produto.emoji}</span>

      <span>${produto.nome}</span>

      <span>${formatarPreco(produto.preco)}</span>

      <button onclick="removerProduto(${index})">
        ❌
      </button>
    `;

    lista.appendChild(item);

  });

}

// Remover produto

function removerProduto(index) {

  if (index < 0 || index >= sacola.length) {
    return;
  }

  sacola.splice(index, 1);

  atualizarSacola();

}

// Finalizar compra

function finalizarCompra() {

  if (sacola.length === 0) {

    alert("Sua sacola está vazia!");

    return;

  }

  const total = sacola.reduce(
    (soma, produto) => soma + produto.preco,
    0
  );

  alert(
    "Obrigada por comprar na Glow Beauty! 💗\n\n" +
    "Quantidade de produtos: " + sacola.length +
    "\nTotal: " + formatarPreco(total)
  );

}

// Inicializar loja

document.addEventListener("DOMContentLoaded", function() {

  atualizarSacola();

});
