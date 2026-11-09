
// Array que armazena os produtos
let produtos = [];

// Identifica se estamos editando algum produto
let indiceEdicao = -1;

// Elementos do formulário
const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// Cadastrar ou atualizar produto
formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  if (
    !codigo ||
    !descricao ||
    !Number.isSafeInteger(quantidade) ||
    quantidade < 0 ||
    !Number.isFinite(valor) ||
    valor < 0
  ) {
    alert("Preencha os campos corretamente!");
    return;
  }

  // Verifica se o código já existe
  const codigoExistente = produtos.some((produto, index) =>
    produto.codigo.toLowerCase() === codigo.toLowerCase() &&
    index !== indiceEdicao
  );

  if (codigoExistente) {
    alert("Já existe um produto com esse código!");
    return;
  }

  const produto = {
    codigo,
    descricao,
    quantidade,
    valor
  };

  if (indiceEdicao === -1) {

    // Cadastro de novo produto
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

  } else {

    // Atualização de produto existente
    produtos[indiceEdicao] = produto;

    alert("Produto atualizado com sucesso!");

    indiceEdicao = -1;

    document.getElementById("tituloFormulario")
      .textContent = "Cadastrar novo produto";

    document.getElementById("btnCadastrar")
      .textContent = "+ Cadastrar produto";
  }

  formulario.reset();

  listarProdutos();

});

// Listar produtos
function listarProdutos() {

  lista.innerHTML = "";

  if (produtos.length === 0) {

    lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

  }

  produtos.forEach((produto, index) => {

    const linha = document.createElement("tr");

    // Evita inserir os dados do usuário como HTML
    [produto.codigo, produto.descricao,
      String(produto.quantidade),
      produto.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })].forEach(valor => {

      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);

    });

    const celulaAcoes = document.createElement("td");
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const editar = document.createElement("button");
    editar.className = "btn-editar";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => editarProduto(index));

    const excluir = document.createElement("button");
    excluir.className = "btn-excluir";
    excluir.textContent = "Excluir";
    excluir.addEventListener("click", () => excluirProduto(index));

    acoes.append(editar, excluir);
    celulaAcoes.appendChild(acoes);
    linha.appendChild(celulaAcoes);

    lista.appendChild(linha);

  });

  atualizarDashboard();

}

// Alterar valor e quantidade do produto
function editarProduto(index) {

  const produto = produtos[index];

  document.getElementById("codigo").value = produto.codigo;
  document.getElementById("descricao").value = produto.descricao;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("valor").value = produto.valor;

  indiceEdicao = index;

  document.getElementById("tituloFormulario")
    .textContent = "Alterar produto";

  document.getElementById("btnCadastrar")
    .textContent = "Salvar alterações";

  document.getElementById("codigo").focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// Excluir produto
function excluirProduto(index) {

  const confirmar = confirm(
    "Deseja realmente excluir este produto?"
  );

  if (confirmar) {

    produtos.splice(index, 1);

    if (indiceEdicao === index) {
      indiceEdicao = -1;
      formulario.reset();

      document.getElementById("tituloFormulario")
        .textContent = "Cadastrar novo produto";

      document.getElementById("btnCadastrar")
        .textContent = "+ Cadastrar produto";

    } else if (indiceEdicao > index) {
      indiceEdicao--;
    }

    listarProdutos();

  }

}

// Atualizar indicadores
function atualizarDashboard() {

  document.getElementById("totalProdutos")
    .textContent = produtos.length;

  const total = produtos.reduce((soma, produto) => {
    return soma + (produto.quantidade * produto.valor);
  }, 0);

  document.getElementById("valorEstoque")
    .textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}

// Inicialização
listarProdutos();
