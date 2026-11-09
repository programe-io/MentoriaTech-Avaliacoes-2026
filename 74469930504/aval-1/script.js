
let produtos = [];

// CADASTRAR PRODUTO
document.getElementById("formProduto").addEventListener("submit", function(event) {
  event.preventDefault();

  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  // Verificar se o código já existe
  if (produtos.some(produto => produto.codigo === codigo)) {
    alert("Este código já está cadastrado!");
    return;
  }

  if (quantidade < 0 || valor < 0 ||
    !Number.isFinite(quantidade) || !Number.isFinite(valor)) {
    alert("Informe valores válidos!");
    return;
  }

  const produto = {
    codigo,
    descricao,
    quantidade,
    valor
  };

  produtos.push(produto);

  alert("Produto cadastrado com sucesso!");

  this.reset();

  listarProdutos();
});


// LISTAR PRODUTOS
function listarProdutos() {
  const lista = document.getElementById("listaProdutos");

  lista.innerHTML = "";

  if (produtos.length === 0) {
    lista.innerHTML = `
            <tr>
                <td colspan="5">Nenhum produto cadastrado.</td>
            </tr>
        `;
  }

  produtos.forEach((produto, indice) => {
    const linha = document.createElement("tr");

    const codigo = document.createElement("td");
    codigo.textContent = produto.codigo;

    const descricao = document.createElement("td");
    descricao.textContent = produto.descricao;

    const quantidade = document.createElement("td");
    quantidade.textContent = produto.quantidade;

    const valor = document.createElement("td");
    valor.textContent = produto.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const acoes = document.createElement("td");

    const btnValor = document.createElement("button");
    btnValor.textContent = "Valor";
    btnValor.className = "btn-edit";
    btnValor.onclick = () => alterarValor(indice);

    const btnQuantidade = document.createElement("button");
    btnQuantidade.textContent = "Qtd.";
    btnQuantidade.className = "btn-edit";
    btnQuantidade.onclick = () => alterarQuantidade(indice);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "btn-delete";
    btnExcluir.onclick = () => excluirProduto(indice);

    acoes.append(btnValor, btnQuantidade, btnExcluir);

    linha.append(
      codigo,
      descricao,
      quantidade,
      valor,
      acoes
    );

    lista.appendChild(linha);
  });

  atualizarDashboard();
}


// ALTERAR VALOR DO PRODUTO
function alterarValor(indice) {
  const novoValor = prompt("Digite o novo valor do produto:");

  if (novoValor === null || novoValor.trim() === "") return;

  const valor = Number(novoValor);

  if (!Number.isFinite(valor) || valor < 0) {
    alert("Informe um valor válido!");
    return;
  }

  produtos[indice].valor = valor;

  alert("Valor atualizado com sucesso!");

  listarProdutos();
}


// ALTERAR QUANTIDADE
function alterarQuantidade(indice) {
  const novaQuantidade = prompt("Digite a nova quantidade:");

  if (novaQuantidade === null || novaQuantidade.trim() === "") return;

  const quantidade = Number(novaQuantidade);

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    alert("Informe uma quantidade inteira válida!");
    return;
  }

  produtos[indice].quantidade = quantidade;

  alert("Quantidade atualizada com sucesso!");

  listarProdutos();
}


// EXCLUIR PRODUTO
function excluirProduto(indice) {
  const confirmar = confirm("Deseja realmente excluir este produto?");

  if (confirmar) {
    produtos.splice(indice, 1);
    listarProdutos();
  }
}


// ATUALIZAR INDICADORES
function atualizarDashboard() {
  const totalProdutos = produtos.length;

  const totalUnidades = produtos.reduce(
    (total, produto) => total + produto.quantidade, 0
  );

  const valorEstoque = produtos.reduce(
    (total, produto) => total + (produto.quantidade * produto.valor), 0
  );

  document.getElementById("totalProdutos").textContent = totalProdutos;

  document.getElementById("totalUnidades").textContent = totalUnidades;

  document.getElementById("valorEstoque").textContent =
    valorEstoque.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
}


// EXIBIR LISTA INICIAL
listarProdutos();
