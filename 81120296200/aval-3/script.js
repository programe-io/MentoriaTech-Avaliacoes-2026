
const bolas = [
  {
    id: 1,
    nome: "Bola Profissional",
    tipo: "Campo",
    preco: 199.90,
    imagem: "⚽",
    tamanho: "5"
  },
  {
    id: 2,
    nome: "Bola de Futsal",
    tipo: "Futsal",
    preco: 129.90,
    imagem: "⚽",
    tamanho: "4"
  },
  {
    id: 3,
    nome: "Bola Society",
    tipo: "Society",
    preco: 149.90,
    imagem: "⚽",
    tamanho: "5"
  },
  {
    id: 4,
    nome: "Bola de Treino",
    tipo: "Campo",
    preco: 89.90,
    imagem: "⚽",
    tamanho: "5"
  },
  {
    id: 5,
    nome: "Bola Infantil",
    tipo: "Infantil",
    preco: 69.90,
    imagem: "⚽",
    tamanho: "3"
  },
  {
    id: 6,
    nome: "Bola de Futebol Premium",
    tipo: "Campo",
    preco: 249.90,
    imagem: "⚽",
    tamanho: "5"
  }
];

const lista = document.getElementById("lista-bolas");
const pesquisa = document.getElementById("pesquisa");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalTexto = document.getElementById("total");
const botaoFinalizar = document.getElementById("finalizar");

let carrinho = [];

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostrarBolas(filtro = "") {
  lista.innerHTML = "";

  const encontradas = bolas.filter(bola =>
    bola.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    bola.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  if (encontradas.length === 0) {
    lista.textContent = "Nenhuma bola encontrada.";
    return;
  }

  encontradas.forEach(bola => {
    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("div");
    imagem.className = "imagem-bola";
    imagem.textContent = bola.imagem;

    const nome = document.createElement("h3");
    nome.textContent = bola.nome;

    const tipo = document.createElement("p");
    tipo.textContent = "Modalidade: " + bola.tipo;

    const tamanho = document.createElement("p");
    tamanho.textContent = "Tamanho: " + bola.tamanho;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = moeda(bola.preco);

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";

    botao.addEventListener("click", () => {
      carrinho.push({
        ...bola,
        itemId: Date.now() + Math.random()
      });

      mostrarCarrinho();
    });

    card.append(imagem, nome, tipo, tamanho, preco, botao);
    lista.appendChild(card);
  });
}

function mostrarCarrinho() {
  itensCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    itensCarrinho.textContent = "Seu carrinho está vazio.";
  }

  carrinho.forEach(bola => {
    const linha = document.createElement("div");
    linha.className = "item-carrinho";

    const texto = document.createElement("span");
    texto.textContent =
      `${bola.nome} - ${moeda(bola.preco)}`;

    const remover = document.createElement("button");
    remover.textContent = "Remover";

    remover.addEventListener("click", () => {
      carrinho = carrinho.filter(
        item => item.itemId !== bola.itemId
      );

      mostrarCarrinho();
    });

    linha.append(texto, remover);
    itensCarrinho.appendChild(linha);
  });

  const total = carrinho.reduce(
    (soma, bola) => soma + bola.preco,
    0
  );

  totalTexto.textContent =
    `Total: ${moeda(total)} | ${carrinho.length} item(ns)`;
}

pesquisa.addEventListener("input", () => {
  mostrarBolas(pesquisa.value);
});

botaoFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Adicione uma bola ao carrinho primeiro!");
    return;
  }

  const resumo = carrinho.map(bola =>
    `${bola.nome}: ${moeda(bola.preco)}`
  ).join("\n");

  const total = carrinho.reduce(
    (soma, bola) => soma + bola.preco,
    0
  );

  alert(
    "Resumo do pedido:\n\n" +
    resumo +
    "\n\nTotal: " + moeda(total) +
    "\n\nEsta é uma demonstração. Nenhuma compra foi realizada."
  );
});

mostrarBolas();
mostrarCarrinho();
