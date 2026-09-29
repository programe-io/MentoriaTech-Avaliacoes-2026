const produtos = [
  {
    id: 1,
    nome: "Tênis Esportivo",
    preco: 199.90,
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 2,
    nome: "Relógio Moderno",
    preco: 149.90,
    imagem: "https://images.unsplash.com/photo-1524805444758-089113d48a6d"
  },
  {
    id: 3,
    nome: "Mochila Premium",
    preco: 119.90,
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
  },
  {
    id: 4,
    nome: "Fone Bluetooth",
    preco: 89.90,
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  }
];

let carrinho = [];

const listaProdutos = document.getElementById("produtos");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalElemento = document.getElementById("total");
const quantidadeElemento = document.getElementById("quantidade");

function mostrarProdutos(lista = produtos) {
  listaProdutos.innerHTML = "";

  lista.forEach(produto => {
    listaProdutos.innerHTML += `
      <article class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
        <button onclick="adicionarCarrinho(${produto.id})">
          Adicionar ao carrinho
        </button>
      </article>
    `;
  });
}

function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  atualizarCarrinho();
}

function removerCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";

  let total = 0;

  carrinho.forEach((produto, index) => {
    total += produto.preco;

    itensCarrinho.innerHTML += `
      <div class="item">
        <span>${produto.nome}</span>
        <strong>R$ ${produto.preco.toFixed(2).replace(".", ",")}</strong>
        <button onclick="removerCarrinho(${index})">Remover</button>
      </div>
    `;
  });

  totalElemento.textContent =
    total.toFixed(2).replace(".", ",");

  quantidadeElemento.textContent = carrinho.length;
}

document.getElementById("abrirCarrinho").onclick = () => {
  document.getElementById("carrinho").style.display = "block";
};

document.getElementById("fecharCarrinho").onclick = () => {
  document.getElementById("carrinho").style.display = "none";
};

document.getElementById("finalizar").onclick = () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Compra realizada com sucesso!");
  carrinho = [];
  atualizarCarrinho();
};

document.getElementById("busca").addEventListener("input", function() {
  const texto = this.value.toLowerCase();

  const filtrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(texto)
  );

  mostrarProdutos(filtrados);
});

mostrarProdutos();