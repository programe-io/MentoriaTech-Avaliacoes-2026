
// Lista de produtos
let produtos = [];

// Código automático
let proximoCodigo = 1;


// 1. CADASTRAR PRODUTO
function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value.trim();

    let quantidade = Number(document.getElementById("quantidade").value);

    let valor = Number(document.getElementById("valor").value);

    // Validar descrição
    if (descricao.length < 3) {
        alert("Digite uma descrição com pelo menos 3 caracteres!");
        return;
    }

    // Validar quantidade
    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    // Validar valor
    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor maior que zero!");
        return;
    }

    let produto = {
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    proximoCodigo++;

    alert("Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// 2. LISTAR PRODUTOS
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhum produto cadastrado.</p>';
        return;
    }

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">

                <h3>${produto.descricao}</h3>

                <p>Código: ${produto.codigo}</p>

                <p>Quantidade: ${produto.quantidade}</p>

                <p>Valor: ${produto.valor.toLocaleString(
                    "pt-BR",
                    { style: "currency", currency: "BRL" }
                )}</p>

                <div class="acoes">

                    <button class="valor"
                        onclick="alterarValor(${produto.codigo})">
                        Alterar Valor
                    </button>

                    <button class="quantidade"
                        onclick="alterarQuantidade(${produto.codigo})">
                        Alterar Quantidade
                    </button>

                </div>

            </div>
        `;
    });
}


// 3. ALTERAR VALOR DO PRODUTO
function alterarValor(codigo) {

    let produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (produto) {

        let novoValor = prompt("Digite o novo valor do produto:");

        if (novoValor === null) {
            return;
        }

        novoValor = Number(novoValor);

        if (!Number.isFinite(novoValor) || novoValor <= 0) {
            alert("Valor inválido!");
            return;
        }

        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");

        listarProdutos();
    }
}


// 4. ALTERAR QUANTIDADE DO PRODUTO
function alterarQuantidade(codigo) {

    let produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (produto) {

        let novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null) {
            return;
        }

        novaQuantidade = Number(novaQuantidade);

        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
            alert("Quantidade inválida!");
            return;
        }

        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");

        listarProdutos();
    }
}
