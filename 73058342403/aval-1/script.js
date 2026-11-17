let produtos = [];
let proximoCodigo = 1;

// Função para gerar código automaticamente
async function gerarCodigo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(proximoCodigo++);
        }, 500);
    });
}

// Cadastrar produto
async function cadastrarProduto() {
    let codigo = await gerarCodigo();

    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso! Código: " + codigo);
}

// Listar produtos
function listarProdutos() {
    if (produtos.length === 0) {
        alert("Nenhum produto cadastrado!");
        return;
    }

    let lista = "";

    for (let produto of produtos) {
        lista +=
            "Código: " + produto.codigo +
            "\nDescrição: " + produto.descricao +
            "\nQuantidade: " + produto.quantidade +
            "\nValor: R$ " + produto.valor.toFixed(2) +
            "\n\n";
    }
