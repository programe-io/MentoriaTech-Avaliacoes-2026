
const produtos = [];

const formProduto = document.querySelector("#formProduto");
const campoNome = document.querySelector("#nome");
const campoQuantidade = document.querySelector("#quantidade");
const campoPreco = document.querySelector("#preco");
const lista = document.querySelector("#lista");
const total = document.querySelector("#total");
const mensagem = document.querySelector("#mensagem");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderizarEstoque() {
  lista.innerHTML = "";
  let valorTotal = 0;

  produtos.forEach((produto, indice) => {
    valorTotal += produto.quantidade * produto.preco;

    const linha = document.createElement("tr");
    const nome = document.createElement("td");
    const quantidade = document.createElement("td");
    const preco = document.createElement("td");
    const acao = document.createElement("td");
    const botao = document.createElement("button");

    nome.textContent = produto.nome;
    quantidade.textContent = produto.quantidade;
    preco.textContent = formatarMoeda(produto.preco);

    botao.textContent = "Remover";
    botao.className = "remover";
    botao.type = "button";

    botao.addEventListener("click", () => {
      produtos.splice(indice, 1);
      renderizarEstoque();
      mensagem.textContent = "Produto removido.";
    });

    acao.appendChild(botao);
    linha.append(nome, quantidade, preco, acao);
    lista.appendChild(linha);
  });

  total.textContent = formatarMoeda(valorTotal);
}

formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const quantidade = Number(campoQuantidade.value);
  const preco = Number(campoPreco.value);

  if (
    !nome ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0 ||
    !Number.isFinite(preco) ||
    preco <= 0
  ) {
    mensagem.textContent = "Preencha os campos com valores válidos.";
    return;
  }

  produtos.push({ nome, quantidade, preco });
  renderizarEstoque();

  mensagem.textContent = "Produto adicionado com sucesso.";
  formProduto.reset();
  campoNome.focus();
});
