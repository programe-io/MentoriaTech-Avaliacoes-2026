
const camisas = [
  {
    id: 1,
    nome: "Camisa Brasil",
    time: "Seleção Brasileira",
    preco: 129.90,
    imagem: "🇧🇷"
  },
  {
    id: 2,
    nome: "Camisa Real Madrid",
    time: "Real Madrid",
    preco: 149.90,
    imagem: "⚪"
  },
  {
    id: 3,
    nome: "Camisa Barcelona",
    time: "Barcelona",
    preco: 139.90,
    imagem: "🔵🔴"
  },
  {
    id: 4,
    nome: "Camisa Flamengo",
    time: "Flamengo",
    preco: 119.90,
    imagem: "🔴⚫"
  },
  {
    id: 5,
    nome: "Camisa Corinthians",
    time: "Corinthians",
    preco: 119.90,
    imagem: "⚫⚪"
  },
  {
    id: 6,
    nome: "Camisa Portugal",
    time: "Seleção Portuguesa",
    preco: 129.90,
    imagem: "🇵🇹"
  }
];

const lista = document.getElementById("lista-camisas");
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

function mostrarCamisas(filtro = "") {
  lista.innerHTML = "";

  const encontradas = camisas.filter(camisa =>
    camisa.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    camisa.time.toLowerCase().includes(filtro.toLowerCase())
  );

  if (encontradas.length === 0) {
    lista.textContent = "Nenhuma camisa encontrada.";
    return;
  }

  encontradas.forEach(camisa => {
    const card = document.createElement("article");
    card.className = "card";

    const imagem = document.createElement("div");
    imagem.className = "camisa";
    imagem.textContent = camisa.imagem;

    const nome = document.createElement("h3");
    nome.textContent = camisa.nome;

    const time = document.createElement("p");
    time.textContent = camisa.time;

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = moeda(camisa.preco);

    const tamanho = document.createElement("select");
    tamanho.setAttribute("aria-label", "Escolha o tamanho");

    ["P", "M", "G", "GG"].forEach(t => {
      const opcao = document.createElement("option");
      opcao.value = t;
      opcao.textContent = "Tamanho " + t;
      tamanho.appendChild(opcao);
    });

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";

    botao.addEventListener("click", () => {
      carrinho.push({
        ...camisa,
        tamanho: tamanho.value,
        itemId: Date.now() + Math.random()
      });

      mostrarCarrinho();
    });

    card.append(imagem, nome, time, preco, tamanho, botao);
    lista.appendChild(card);
  });
}

function mostrarCarrinho() {
  itensCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    itensCarrinho.textContent = "Seu carrinho está vazio.";
  }

  carrinho.forEach(item => {
    const linha = document.createElement("div");
    linha.className = "item-carrinho";

    const texto = document.createElement("span");
    texto.textContent =
      `${item.nome} - Tam. ${item.tamanho} - ${moeda(item.preco)}`;

    const remover = document.createElement("button");
    remover.textContent = "Remover";

    remover.addEventListener("click", () => {
      carrinho = carrinho.filter(
        produto => produto.itemId !== item.itemId
      );
      mostrarCarrinho();
    });

    linha.append(texto, remover);
    itensCarrinho.appendChild(linha);
  });

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  totalTexto.textContent =
    `Total: ${moeda(total)} | ${carrinho.length} item(ns)`;
}

pesquisa.addEventListener("input", () => {
  mostrarCamisas(pesquisa.value);
});

botaoFinalizar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Adicione uma camisa ao carrinho primeiro!");
    return;
  }

  const resumo = carrinho.map(item =>
    `${item.nome} - tamanho ${item.tamanho}: ${moeda(item.preco)}`
  ).join("\n");

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  alert(
    "Resumo do pedido:\n\n" +
    resumo +
    "\n\nTotal: " + moeda(total) +
    "\n\nEste é um catálogo demonstrativo. A compra não foi realizada."
  );
});

mostrarCamisas();
mostrarCarrinho();
