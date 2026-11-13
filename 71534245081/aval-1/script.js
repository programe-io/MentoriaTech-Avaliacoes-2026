
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Salvar produtos no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    if (descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor maior que zero!");
        return;
    }

    // Verificar código duplicado
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

    document.getElementById("formProduto").reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

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

        // Botão alterar valor
        const btnValor = document.createElement("button");
        btnValor.textContent = "Alterar Valor";
        btnValor.className = "btn-valor";

        btnValor.onclick = function() {
            alterarValor(indice);
        };

        // Botão alterar quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Alterar Quantidade";
        btnQuantidade.className = "btn-quantidade";

        btnQuantidade.onclick = function() {
            alterarQuantidade(indice);
        };

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.onclick = function() {
            excluirProduto(indice);
        };

        acoes.appendChild(btnValor);
        acoes.appendChild(btnQuantidade);
        acoes.appendChild(btnExcluir);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        lista.appendChild(linha);

    });
}

// Alterar valor do produto
function alterarValor(indice) {

    const novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (!Number.isFinite(novoValor) || novoValor <= 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[indice].valor = novoValor;

    salvarProdutos();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(indice) {

    const novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[indice].quantidade = novaQuantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(indice) {

    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(indice, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído!");
    }
}

// Mostrar produtos ao abrir o sistema
listarProdutos();
