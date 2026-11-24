
// Lista para armazenar os produtos
let produtos = [];

// Cadastrar produto
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("formProduto").reset();

    listarProdutos();
});

// Listar produtos
function listarProdutos() {
    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {
        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;
    });

    if (produtos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="4">Nenhum produto cadastrado.</td>
            </tr>
        `;
    }
}

// Alterar valor do produto
function alterarValor() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto && document.getElementById("novoValor").value !== "" && novoValor >= 0) {
        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");
        listarProdutos();
    } else {
        alert("Produto não encontrado ou valor inválido!");
    }
}

// Alterar quantidade do produto
function alterarQuantidade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto && document.getElementById("novaQuantidade").value !== "" && Number.isInteger(novaQuantidade) && novaQuantidade >= 0) {
        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");
        listarProdutos();
    } else {
        alert("Produto não encontrado ou quantidade inválida!");
    }
}
