let carrinho = [];
let totalItens = 0;

// Adicionar produto ao carrinho
function adicionar(nome, preco) {
  carrinho.push({
    nome: nome,
    preco: preco
  });

  totalItens++;

  document.getElementById("quantidade").textContent = totalItens;

  mostrarNotificacao(nome + " adicionado ao carrinho!");
}

// Filtrar produtos por categoria
function filtrar(categoria, botao) {
  const produtos = document.querySelectorAll(".produto");
  const filtros = document.querySelectorAll(".filtro");

  filtros.forEach(function(filtro) {
    filtro.classList.remove("ativo");
  });

  botao.classList.add("ativo");

  produtos.forEach(function(produto) {
    if (
      categoria === "todos" ||
      produto.dataset.categoria === categoria
    ) {
      produto.hidden = false;
    } else {
      produto.hidden = true;
    }
  });
}

// Mostrar o carrinho e o valor total
function mostrarCarrinho() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Escolha um produto Nike.");
    return;
  }

  let mensagem = "🛒 SEU CARRINHO\n\n";
  let total = 0;

  carrinho.forEach(function(produto, indice) {
    mensagem +=
      (indice + 1) + ". " +
      produto.nome + " - " +
      produto.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      }) + "\n";

    total += produto.preco;
  });

  mensagem += "\nTOTAL: " +
    total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  mensagem += "\n\nCompra demonstrativa. Nenhum pagamento foi realizado.";

  alert(mensagem);
}

// Notificação na tela
function mostrarNotificacao(texto) {
  const notificacao = document.getElementById("notificacao");

  notificacao.textContent = texto;
  notificacao.classList.add("visivel");

  setTimeout(function() {
    notificacao.classList.remove("visivel");
  }, 2500);
}