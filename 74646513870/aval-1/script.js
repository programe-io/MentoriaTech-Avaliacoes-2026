// Lista de produtos
let produtos = [
    {
        codigo: 1,
        descricao: "Cadeira gamer",
        quantidade: 12,
        valor: 699.00
    },
    {
        codigo: 2,
        descricao: "Mouse Logitech",
        quantidade: 38,
        valor: 97.00
    },
    {
        codigo: 3,
        descricao: "Teclado Mecânico",
        quantidade: 15,
        valor: 250.00
    },
    {
        codigo: 4,
        descricao: "Monitor 24",
        quantidade: 8,
        valor: 850.00
    }
];


// Validação
function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres"
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    if (valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }
}


// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// Alterar produto
function alterarProduto(codigo) {

    try {

        const novaQuantidade = Number(
            document.getElementById(
                "novaQuantidade" + codigo
            ).value
        );

        const novoValor = Number(
            document.getElementById(
                "novoValor" + codigo
            ).value
        );


        // Alterar quantidade
        if (novaQuantidade > 0) {
            atualizarQuantidade(
                codigo,
                novaQuantidade
            );
        }


        // Alterar valor
        if (novoValor >= 0) {
            atualizarValor(
                codigo,
                novoValor
            );
        }


        // Procurar produto
        const produto = produtos.find(
            (prod) => prod.codigo === codigo
        );


        // Atualizar quantidade na tela
        document.getElementById(
            "quantidade" + codigo
        ).textContent = produto.quantidade;


        // Atualizar valor na tela
        document.getElementById(
            "valor" + codigo
        ).textContent = produto.valor
            .toFixed(2)
            .replace(".", ",");


        alert("Produto atualizado com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }
}