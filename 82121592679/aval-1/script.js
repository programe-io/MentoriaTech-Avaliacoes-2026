
const produtos = [
  {
    nome: "Vestido Floral",
    categoria: "Vestido",
    preco: 59.90,
    imagem: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"
  },
  {
    nome: "Vestido Elegante",
    categoria: "Vestido",
    preco: 79.90,
    imagem: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500"
  },
  {
    nome: "Conjunto Feminino",
    categoria: "Conjunto",
    preco: 69.90,
    imagem: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500"
  },
  {
    nome: "Conjunto Casual",
    categoria: "Conjunto",
    preco: 49.90,
    imagem: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500"
  }
];

let carrinho = [];

const lista = document.getElementById("lista-produtos");
const busca = document.getElementById("busca");
const categoria = document.getElementById("categoria");

function mostrarProdutos() {
  const termo = busca.value.toLowerCase();
  const tipo = categoria.value;

  const filtrados = produtos.filter(produto => {
    const nomeCombina = produto.nome.toLowerCase().includes(termo);
    const categoriaCombina =
      tipo === "todos" || produto.categoria === tipo;

    return nomeCombina && categoriaCombina;
  });

  lista.innerHTML = "";

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  filtrados.forEach(produto => {
    const card = document.createElement("article");
    card.className = "produto";

    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.loading = "lazy";

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = produto.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";
    botao.addEventListener("click", () => {
      carrinho.push(produto);
      atualizarCarrinho();
      alert(produto.nome + " foi adicionado ao carrinho!");
    });

    card.append(imagem, nome, preco, botao);
    lista.appendChild(card);
  });
}

function atualizarCarrinho() {
  document.getElementById("quantidade").textContent = carrinho.length;
}

busca.addEventListener("input", mostrarProdutos);
categoria.addEventListener("change", mostrarProdutos);

document.getElementById("botao-carrinho")
  .addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const total = carrinho.reduce(
      (soma, produto) => soma + produto.preco, 0
    );

    alert(
      "Itens no carrinho: " + carrinho.length +
      "\nTotal: " +
      total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })
    );
  });

mostrarProdutos();
