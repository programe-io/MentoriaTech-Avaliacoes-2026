
const pesquisa = document.getElementById("pesquisa");
const produtos = document.querySelectorAll(".produto");
const filtros = document.querySelectorAll(".filtros button");

let carrinho = [];

function atualizarProdutos() {
  const texto = pesquisa.value.toLowerCase();
  const categoria = document.querySelector(".filtros .ativo").dataset.categoria;

  let encontrados = 0;

  produtos.forEach(produto => {
    const nome = produto.dataset.nome.toLowerCase();
    const tipo = produto.dataset.categoria;

    const mostrar =
      nome.includes(texto) &&
      (categoria === "Todos" || tipo === categoria);

    produto.style.display = mostrar ? "block" : "none";

    if (mostrar) encontrados++;
  });

  document.getElementById("semResultado").hidden = encontrados > 0;
}

pesquisa.addEventListener("input", atualizarProdutos);

filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtros.forEach(f => f.classList.remove("ativo"));
    botao.classList.add("ativo");
    atualizarProdutos();
  });
});

// Adicionar produtos
document.querySelectorAll(".comprar").forEach(botao => {
  botao.addEventListener("click", () => {
    const produto = botao.closest(".produto");

    carrinho.push({
      nome: produto.dataset.nome,
      preco: Number(produto.dataset.preco)
    });

    atualizarCarrinho();
    document.getElementById("carrinho").classList.add("aberto");
  });
});

// Atualizar carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  lista.innerHTML = "";

  carrinho.forEach((item, indice) => {
    const div = document.createElement("div");
    div.className = "item";

    const nome = document.createElement("strong");
    nome.textContent = item.nome;

    const preco = document.createElement("p");
    preco.textContent = "R$ " + item.preco.toFixed(2).replace(".", ",");

    const remover = document.createElement("button");
    remover.textContent = "Remover";
    remover.addEventListener("click", () => {
      carrinho.splice(indice, 1);
      atualizarCarrinho();
    });

    div.append(nome, preco, remover);
    lista.appendChild(div);
  });

  document.getElementById("total").textContent =
    total.toFixed(2).replace(".", ",");

  document.getElementById("quantidade").textContent = carrinho.length;
}

// Abrir e fechar carrinho
document.getElementById("abrirCarrinho").onclick = () => {
  document.getElementById("carrinho").classList.add("aberto");
};

document.getElementById("fecharCarrinho").onclick = () => {
  document.getElementById("carrinho").classList.remove("aberto");
};

// Finalizar pedido
document.getElementById("finalizar").onclick = () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Pedido preparado! Para receber pagamentos, conecte um sistema de checkout.");

};
