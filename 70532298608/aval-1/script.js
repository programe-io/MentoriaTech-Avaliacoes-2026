
let produtos = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Formata o valor como moeda brasileira
function formatarValor(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Cadastra um novo produto
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Informe um código inteiro positivo.");
        return;
    }

    if (!descricao) {
        alert("Informe a descrição do produto.");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("A quantidade deve ser um número inteiro não negativo.");
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Informe um valor válido.");
        return;
    }

    // Verifica se o código já existe
    const existe = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (existe) {
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

    formProduto.reset();
    listarProdutos();

    alert("Produto cadastrado com sucesso!");
});

// Lista os produtos cadastrados
function listarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarValor(produto.valor)
        ];

        dados.forEach(function(dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        // Cria os botões de alteração
        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "btn-valor";
        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });
}

// Altera o valor de um produto
function alterarValor(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const entrada = prompt(
        "Digite o novo valor do produto (R$):",
        produto.valor.toFixed(2)
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novoValor = Number(entrada);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um valor válido e não negativo.");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
    alert("Valor alterado com sucesso!");
}

// Altera a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const entrada = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novaQuantidade = Number(entrada);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Informe uma quantidade inteira não negativa.");
        return;
    }

    produto.quantidade = novaQuantidade;

    listarProdutos();
    alert("Quantidade alterada com sucesso!");
}
