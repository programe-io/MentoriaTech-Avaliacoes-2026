
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

    // Validar os dados
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("O código deve ser um número inteiro positivo!");
        return;
    }

    if (descricao === "") {
        alert("Informe a descrição do produto!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("A quantidade deve ser um número inteiro não negativo!");
        return;
    }

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Informe um valor válido!");
        return;
    }

    // Verificar se o código já existe
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
        listaProdutos.innerHTML =
            '<tr><td colspan="5">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const celCodigo = document.createElement("td");
        celCodigo.textContent = produto.codigo;

        const celDescricao = document.createElement("td");
        celDescricao.textContent = produto.descricao;

        const celQuantidade = document.createElement("td");
        celQuantidade.textContent = produto.quantidade;

        const celValor = document.createElement("td");
        celValor.textContent = produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const celAcoes = document.createElement("td");

        // Botão para alterar o valor
        const btnValor = document.createElement("button");
        btnValor.textContent = "Alterar valor";
        btnValor.className = "btn-alterar";

        btnValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        // Botão para alterar a quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Alterar quantidade";
        btnQuantidade.className = "btn-alterar";

        btnQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        celAcoes.append(btnValor, btnQuantidade);

        linha.append(
            celCodigo,
            celDescricao,
            celQuantidade,
            celValor,
            celAcoes
        );

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

    const valor = Number(novoValor.replace(",", "."));

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

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira não negativa!");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
    alert("Quantidade alterada com sucesso!");
}
