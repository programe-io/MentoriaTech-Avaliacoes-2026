
const chuteiras = [
  {
    nome: "Chuteira Velocidade",
    marca: "Nike",
    preco: 299.90,
    imagem: "👟",
    descricao: "Leve e ideal para arrancadas."
  },
  {
    nome: "Chuteira Controle",
    marca: "Adidas",
    preco: 349.90,
    imagem: "⚽",
    descricao: "Conforto e controle de bola."
  },
  {
    nome: "Chuteira Pro Campo",
    marca: "Puma",
    preco: 399.90,
    imagem: "👟",
    descricao: "Estabilidade para jogar no campo."
  },
  {
    nome: "Chuteira Futsal",
    marca: "Umbro",
    preco: 219.90,
    imagem: "⚽",
    descricao: "Aderência para quadras indoor."
  }
];

const lista = document.getElementById("lista-chuteiras");
const pesquisa = document.getElementById("pesquisa");
const carrinhoTexto = document.getElementById("carrinho");

let totalCarrinho = 0;

function mostrarChuteiras(filtro = "") {
  lista.innerHTML = "";

  const encontradas = chuteiras.filter(chuteira =>
    chuteira.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    chuteira.marca.toLowerCase().includes(filtro.toLowerCase())
  );

  if (encontradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma chuteira encontrada.</p>";
    return;
  }

  encontradas.forEach(chuteira => {
    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("div");
    imagem.className = "imagem";
    imagem.textContent = chuteira.imagem;

    const nome = document.createElement("h3");
    nome.textContent = chuteira.nome;

    const marca = document.createElement("p");
    marca.textContent = chuteira.marca;

    const descricao = document.createElement("p");
    descricao.textContent = chuteira.descricao;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = chuteira.preco.toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    );

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";

    botao.addEventListener("click", () => {
      totalCarrinho++;
      carrinhoTexto.textContent =
        `🛒 Carrinho: ${totalCarrinho} itens`;

      botao.textContent = "Adicionado! ✓";

      setTimeout(() => {
        botao.textContent = "Adicionar ao carrinho";
      }, 1200);
    });

    card.append(imagem, nome, marca, descricao, preco, botao);
    lista.appendChild(card);
  });
}

pesquisa.addEventListener("input", () => {
  mostrarChuteiras(pesquisa.value);
});

mostrarChuteiras();
