
let produtos = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        !Number.isSafeInteger(codigo) || codigo <= 0 ||
        descricao === "" ||
        !Number.isSafeInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0
    ) {
        alert("Preencha todos os campos com dados válidos!");
        return;
    }

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

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        valores.forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");

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

        celulaAcoes.appendChild(botaoValor);
        celulaAcoes.appendChild(botaoQuantidade);

        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(codigo) {
    const produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;

    listarProdutos();
    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isSafeInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
    alert("Quantidade alterada com sucesso!");
}
