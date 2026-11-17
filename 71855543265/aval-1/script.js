
// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Elementos HTML
const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const totalProdutos = document.getElementById("totalProdutos");

// Salvar produtos no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    // Verifica se o código já existe
    if (produtos.some(produto => produto.codigo === codigo)) {
        alert("Já existe um produto com esse código!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach((produto, index) => {

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
        const divAcoes = document.createElement("div");
        divAcoes.className = "acoes";

        // Botão alterar valor
        const btnValor = document.createElement("button");
        btnValor.textContent = "Alterar valor";
        btnValor.className = "btn-editar";

        btnValor.addEventListener("click", function() {
            alterarValor(index);
        });

        // Botão alterar quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Alterar quantidade";
        btnQuantidade.className = "btn-editar";

        btnQuantidade.addEventListener("click", function() {
            alterarQuantidade(index);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", function() {
            excluirProduto(index);
        });

        divAcoes.appendChild(btnValor);
        divAcoes.appendChild(btnQuantidade);
        divAcoes.appendChild(btnExcluir);

        acoes.appendChild(divAcoes);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        listaProdutos.appendChild(linha);
    });

    totalProdutos.textContent =
        "Total de produtos cadastrados: " + produtos.length;
}

// Alterar valor do produto
function alterarValor(index) {

    const novoValor = prompt(
        "Digite o novo valor do produto:"
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    salvarProdutos();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(index) {

    const novaQuantidade = prompt(
        "Digite a nova quantidade do produto:"
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isSafeInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(index, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Mostrar produtos ao abrir o sistema
listarProdutos();
