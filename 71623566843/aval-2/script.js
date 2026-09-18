let produtos = JSON.parse(
  localStorage.getItem("produtos")
) || [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");


// SALVAR
function salvarProdutos() {
  localStorage.setItem(
    "produtos",
    JSON.stringify(produtos)
  );
}


// ADICIONAR PRODUTO
form.addEventListener("submit", function(event) {

  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const quantidade = Number(
    document.getElementById("quantidade").value
  );
  const preco = Number(
    document.getElementById("preco").value
  );

  const produto = {
    id: Date.now(),
    nome,
    categoria,
    quantidade,
    preco
  };

  produtos.push(produto);

  salvarProdutos();

  form.reset();

  mostrarProdutos();

});


// MOSTRAR PRODUTOS
function mostrarProdutos() {

  lista.innerHTML = "";

  const termo = pesquisa.value
    .toLowerCase()
    .trim();

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(termo) ||
    produto.categoria.toLowerCase().includes(termo)
  );


  if (produtosFiltrados.length === 0) {

    document.getElementById(
      "mensagemVazia"
    ).style.display = "block";

  } else {

    document.getElementById(
      "mensagemVazia"
    ).style.display = "none";

  }


  produtosFiltrados.forEach(produto => {

    const tr = document.createElement("tr");

    let status;
    let classeStatus;

    if (produto.quantidade === 0) {

      status = "Esgotado";
      classeStatus = "esgotado";

    } else if (produto.quantidade <= 5) {

      status = "Estoque baixo";
      classeStatus = "baixo";

    } else {

      status = "Normal";
      classeStatus = "normal";

    }


    const valorTotal =
      produto.quantidade * produto.preco;


    tr.innerHTML = `

      <td>
        <strong>${produto.nome}</strong>
      </td>

      <td>
        ${produto.categoria}
      </td>

      <td>
        ${produto.quantidade}
      </td>

      <td>
        ${formatarMoeda(produto.preco)}
      </td>

      <td>
        ${formatarMoeda(valorTotal)}
      </td>

      <td>
        <span class="status ${classeStatus}">
          ${status}
        </span>
      </td>

      <td>

        <div class="acoes">

          <button
            class="btn-entrada"
            onclick="entrada(${produto.id})"
            title="Entrada"
          >
            +
          </button>

          <button
            class="btn-saida"
            onclick="saida(${produto.id})"
            title="Saída"
          >
            -
          </button>

          <button
            class="btn-excluir"
            onclick="excluirProduto(${produto.id})"
            title="Excluir"
          >
            🗑
          </button>

        </div>

      </td>

    `;

    lista.appendChild(tr);

  });


  atualizarResumo();

}


// ENTRADA
function entrada(id) {

  const produto = produtos.find(
    produto => produto.id === id
  );

  if (!produto) return;

  produto.quantidade++;

  salvarProdutos();

  mostrarProdutos();

}


// SAÍDA
function saida(id) {

  const produto = produtos.find(
    produto => produto.id === id
  );

  if (!produto) return;

  if (produto.quantidade <= 0) {

    alert("Produto sem estoque!");

    return;
  }

  produto.quantidade--;

  salvarProdutos();

  mostrarProdutos();

}


// EXCLUIR
function excluirProduto(id) {

  const confirmar = confirm(
    "Deseja realmente excluir este produto?"
  );

  if (!confirmar) return;

  produtos = produtos.filter(
    produto => produto.id !== id
  );

  salvarProdutos();

  mostrarProdutos();

}


// PESQUISAR
pesquisa.addEventListener(
  "input",
  mostrarProdutos
);


// FORMATAR MOEDA
function formatarMoeda(valor) {

  return valor.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

}


// ATUALIZAR RESUMO
function atualizarResumo() {

  const totalProdutos = produtos.length;

  const totalItens = produtos.reduce(
    (total, produto) =>
      total + produto.quantidade,
    0
  );

  const estoqueBaixo = produtos.filter(
    produto =>
      produto.quantidade > 0 &&
      produto.quantidade <= 5
  ).length;

  const valorEstoque = produtos.reduce(
    (total, produto) =>
      total +
      produto.quantidade *
      produto.preco,
    0
  );


  document.getElementById(
    "totalProdutos"
  ).textContent = totalProdutos;


  document.getElementById(
    "totalItens"
  ).textContent = totalItens;


  document.getElementById(
    "estoqueBaixo"
  ).textContent = estoqueBaixo;


  document.getElementById(
    "valorEstoque"
  ).textContent =
    formatarMoeda(valorEstoque);

}


// INICIAR
mostrarProdutos();