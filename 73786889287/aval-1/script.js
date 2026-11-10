
let produtos = [
    {
        codigo: 1,
        descricao: "Fone Bluetooth Pro",
        quantidade: 40,
        valor: 89.90
    }
];

// Validar produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(prod => prod.codigo === codigoProduto);
}

// Listar produtos
function listarProdutos() {
    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    let totalUnidades = 0;
    let valorEstoque = 0;

    produtos.forEach(produto => {
        let total = produto.quantidade * produto.valor;

        totalUnidades += produto.quantidade;
        valorEstoque += total;

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td>${formatarMoeda(total)}</td>
            <td>
                <div class="acoes">
                    <button onclick="atualizarValor(${produto.codigo})">
                        Alterar valor
                    </button>

                    <button onclick="atualizarQuantidade(${produto.codigo})">
                        Adicionar quantidade
                    </button>
                </div>
            </td>
        `;

        tabela.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

// Formatar valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualizar valor
function atualizarValor(codigoProduto) {
    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let entrada = prompt("Digite o novo valor do produto:");

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    let novoValor = Number(entrada);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um valor válido.");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
    alert("Valor atualizado com sucesso!");
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto) {
    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let entrada = prompt("Digite a quantidade que deseja adicionar:");

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    let novaQuantidade = Number(entrada);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("Informe uma quantidade válida.");
        return;
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
    alert("Quantidade atualizada com sucesso!");
}

// Evento do formulário
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        document.getElementById("formProduto").reset();

        alert("Produto cadastrado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
});

// Mostrar produtos ao abrir a página
listarProdutos();
