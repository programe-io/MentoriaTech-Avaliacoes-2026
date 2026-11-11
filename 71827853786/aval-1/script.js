
// =====================================
// SISTEMA DE ESTOQUE
// =====================================

// Lista de produtos
const produtos = [];

// Código automático dos produtos
let proximoCodigo = 1;


// =====================================
// 1. CADASTRAR PRODUTO
// =====================================

function cadastrarProduto(nome, quantidade, valor) {

    if (!nome || quantidade < 0 || valor < 0) {
        throw new Error("Dados do produto inválidos");
    }

    const produto = {
        codigo: proximoCodigo++,
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}


// =====================================
// 2. LISTAR PRODUTOS
// =====================================

function listarProdutos() {

    console.log("===== ESTOQUE DE PRODUTOS =====");

    produtos.forEach(produto => {

        console.log(
            "Código:", produto.codigo,
            "| Nome:", produto.nome,
            "| Quantidade:", produto.quantidade,
            "| Valor: R$", produto.valor.toFixed(2)
        );

    });

}


// =====================================
// 3. ATUALIZAR VALOR
// =====================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("O valor não pode ser negativo");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {

        produto.valor = novoValor;

        console.log("Valor atualizado com sucesso!");

    } else {

        throw new Error("Produto não encontrado");

    }

}


// =====================================
// 4. ATUALIZAR QUANTIDADE
// =====================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {

        produto.quantidade += novaQuantidade;

        console.log("Quantidade atualizada com sucesso!");

    } else {

        throw new Error("Produto não encontrado");

    }

}


// =====================================
// 5. BUSCAR PRODUTO
// =====================================

function buscarProduto(codigoProduto) {

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {

        console.log("Produto encontrado:");
        console.log(produto);

        return produto;

    } else {

        console.log("Produto não encontrado");

        return null;

    }

}


// =====================================
// 6. REMOVER PRODUTO
// =====================================

function removerProduto(codigoProduto) {

    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {

        produtos.splice(indice, 1);

        console.log("Produto removido com sucesso!");

    } else {

        throw new Error("Produto não encontrado");

    }

}


// =====================================
// 7. CALCULAR VALOR TOTAL DO ESTOQUE
// =====================================

function calcularValorEstoque() {

    const total = produtos.reduce(
        (soma, produto) => {
            return soma + (produto.quantidade * produto.valor);
        },
        0
    );

    console.log("Valor total do estoque: R$", total.toFixed(2));

    return total;

}


// =====================================
// 8. PRODUTOS COM ESTOQUE BAIXO
// =====================================

function verificarEstoqueBaixo() {

    console.log("===== ESTOQUE BAIXO =====");

    const estoqueBaixo = produtos.filter(
        produto => produto.quantidade <= 5
    );

    if (estoqueBaixo.length === 0) {

        console.log("Nenhum produto com estoque baixo");

    } else {

        estoqueBaixo.forEach(produto => {
            console.log(
                produto.nome,
                "- Quantidade:",
                produto.quantidade
            );
        });

    }

}


// =====================================
// TESTANDO O SISTEMA
// =====================================

// Cadastrar produtos

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

// Listar produtos

listarProdutos();

// Atualizar valor

atualizarValor(2, 97.00);

listarProdutos();

// Atualizar quantidade

atualizarQuantidade(1, 3);

listarProdutos();

// Buscar produto

buscarProduto(1);

// Calcular valor do estoque

calcularValorEstoque();

// Verificar estoque baixo

verificarEstoqueBaixo();

// Remover produto

// removerProduto(2);

// Listar novamente

listarProdutos();
