let estoque = [];

function cadastrarProduto() {

    let nome = prompt("Digite o nome do produto:");
    let codigo = prompt("Digite o código do produto:");
    let preco = Number(prompt("Digite o preço do produto:"));
    let quantidade = Number(prompt("Digite a quantidade:"));

    if (!nome || !codigo || preco <= 0 || quantidade < 0 ||
        !Number.isFinite(preco) || !Number.isInteger(quantidade)) {
        alert("Preencha os dados corretamente!");
        return;
    }

    estoque.push({
        nome: nome,
        codigo: codigo,
        preco: preco,
        quantidade: quantidade
    });

    alert("Produto cadastrado com sucesso!");

    console.log(estoque);
}

// Executar cadastro
cadastrarProduto();