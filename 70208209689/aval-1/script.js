// ======================================================
// PROJETO CRUD E ESTOQUE EM JAVASCRIPT
// ======================================================

// Array que armazenará os produtos
let produtos = [];


// ======================================================
// 1. FUNÇÃO PARA VALIDAR A DESCRIÇÃO
// ======================================================

function validarDescricao(descricao) {

    if (descricao === undefined || descricao === null) {
        throw new Error("A descrição é obrigatória.");
    }

    descricao = descricao.trim();

    if (descricao.length < 3) {
        throw new Error("A descrição deve possuir pelo menos 3 caracteres.");
    }

    return descricao;
}


// ======================================================
// 2. FUNÇÃO PARA VALIDAR A QUANTIDADE
// ======================================================

function validarQuantidade(quantidade) {

    quantidade = Number(quantidade);

    if (isNaN(quantidade)) {
        throw new Error("A quantidade deve ser um número.");
    }

    if (quantidade < 0) {
        throw new Error("A quantidade não pode ser negativa.");
    }

    if (!Number.isInteger(quantidade)) {
        throw new Error("A quantidade deve ser um número inteiro.");
    }

    return quantidade;
}


// ======================================================
// 3. FUNÇÃO PARA VALIDAR O VALOR
// ======================================================

function validarValor(valor) {

    valor = Number(valor);

    if (isNaN(valor)) {
        throw new Error("O valor deve ser um número.");
    }

    if (valor <= 0) {
        throw new Error("O valor deve ser maior que zero.");
    }

    return valor;
}


// ======================================================
// 4. FUNÇÃO PARA GERAR O CÓDIGO DO PRODUTO
// ======================================================

function gerarCodigo() {

    if (produtos.length === 0) {
        return 1;
    }

    return produtos[produtos.length - 1].codigo + 1;
}


// ======================================================
// 5. FUNÇÃO PARA CADASTRAR PRODUTO
// ======================================================

function cadastrarProduto(descricao, quantidade, valor) {

    try {

        // Validação dos dados
        descricao = validarDescricao(descricao);
        quantidade = validarQuantidade(quantidade);
        valor = validarValor(valor);

        // Criação do objeto produto
        let produto = {
            codigo: gerarCodigo(),
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        // Adiciona o produto ao array
        produtos.push(produto);

        console.log("=================================");
        console.log("PRODUTO CADASTRADO COM SUCESSO!");
        console.log("Código:", produto.codigo);
        console.log("Descrição:", produto.descricao);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor.toFixed(2));
        console.log("=================================");

        return produto;

    } catch (erro) {

        console.log("ERRO:", erro.message);

    }
}


// ======================================================
// 6. FUNÇÃO PARA LISTAR PRODUTOS
// ======================================================

function listarProdutos() {

    console.log("\n=================================");
    console.log("LISTA DE PRODUTOS");
    console.log("=================================");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(function(produto) {

        console.log(
            "Código:", produto.codigo,
            "| Produto:", produto.descricao,
            "| Quantidade:", produto.quantidade,
            "| Valor: R$", produto.valor.toFixed(2)
        );

    });
}


// ======================================================
// 7. FUNÇÃO PARA BUSCAR PRODUTO COM FIND
// ======================================================

function buscarProduto(codigo) {

    codigo = Number(codigo);

    let produtoEncontrado = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    return produtoEncontrado;
}


// ======================================================
// 8. TRATAMENTO DE PRODUTO NÃO ENCONTRADO
// ======================================================

function verificarProduto(codigo) {

    let produto = buscarProduto(codigo);

    if (!produto) {
        console.log("Produto não encontrado.");
        return null;
    }

    return produto;
}


// ======================================================
// 9. FUNÇÃO PARA ATUALIZAR O VALOR DO PRODUTO
// ======================================================

function atualizarValor(codigo, novoValor) {

    try {

        let produto = verificarProduto(codigo);

        if (!produto) {
            return;
        }

        novoValor = validarValor(novoValor);

        produto.valor = novoValor;

        console.log("=================================");
        console.log("VALOR ATUALIZADO COM SUCESSO!");
        console.log("Produto:", produto.descricao);
        console.log("Novo valor: R$", produto.valor.toFixed(2));
        console.log("=================================");

    } catch (erro) {

        console.log("ERRO:", erro.message);

    }
}


// ======================================================
// 10. FUNÇÃO PARA ATUALIZAR A QUANTIDADE DO PRODUTO
// ======================================================

function atualizarQuantidade(codigo, novaQuantidade) {

    try {

        let produto = verificarProduto(codigo);

        if (!produto) {
            return;
        }

        novaQuantidade = validarQuantidade(novaQuantidade);

        produto.quantidade = novaQuantidade;

        console.log("=================================");
        console.log("QUANTIDADE ATUALIZADA!");
        console.log("Produto:", produto.descricao);
        console.log("Nova quantidade:", produto.quantidade);
        console.log("=================================");

    } catch (erro) {

        console.log("ERRO:", erro.message);

    }
}


// ======================================================
// 11. FUNÇÃO PARA SOMAR QUANTIDADE AO ESTOQUE
// ======================================================

function adicionarEstoque(codigo, quantidadeAdicionar) {

    try {

        let produto = verificarProduto(codigo);

        if (!produto) {
            return;
        }

        quantidadeAdicionar = validarQuantidade(quantidadeAdicionar);

        if (quantidadeAdicionar === 0) {
            console.log("Informe uma quantidade maior que zero.");
            return;
        }

        produto.quantidade += quantidadeAdicionar;

        console.log("=================================");
        console.log("ESTOQUE ATUALIZADO!");
        console.log("Produto:", produto.descricao);
        console.log("Quantidade adicionada:", quantidadeAdicionar);
        console.log("Estoque atual:", produto.quantidade);
        console.log("=================================");

    } catch (erro) {

        console.log("ERRO:", erro.message);

    }
}


// ======================================================
// 12. FUNÇÃO PARA RETIRAR PRODUTO DO ESTOQUE
// ======================================================

function retirarEstoque(codigo, quantidadeRetirar) {

    try {

        let produto = verificarProduto(codigo);

        if (!produto) {
            return;
        }

        quantidadeRetirar = validarQuantidade(quantidadeRetirar);

        if (quantidadeRetirar === 0) {
            console.log("Informe uma quantidade maior que zero.");
            return;
        }

        if (quantidadeRetirar > produto.quantidade) {
            console.log("Estoque insuficiente.");
            return;
        }

        produto.quantidade -= quantidadeRetirar;

        console.log("=================================");
        console.log("SAÍDA REGISTRADA!");
        console.log("Produto:", produto.descricao);
        console.log("Quantidade retirada:", quantidadeRetirar);
        console.log("Estoque atual:", produto.quantidade);
        console.log("=================================");

    } catch (erro) {

        console.log("ERRO:", erro.message);

    }
}


// ======================================================
// 13. FUNÇÃO PARA EXIBIR UM PRODUTO
// ======================================================

function exibirProduto(codigo) {

    let produto = verificarProduto(codigo);

    if (!produto) {
        return;
    }

    console.log("\n=================================");
    console.log("DADOS DO PRODUTO");
    console.log("=================================");
    console.log("Código:", produto.codigo);
    console.log("Descrição:", produto.descricao);
    console.log("Quantidade:", produto.quantidade);
    console.log("Valor: R$", produto.valor.toFixed(2));
}


// ======================================================
// 14. FUNÇÃO PARA CALCULAR VALOR TOTAL DO ESTOQUE
// ======================================================

function calcularEstoqueTotal() {

    let total = 0;

    produtos.forEach(function(produto) {

        total += produto.quantidade * produto.valor;

    });

    console.log("\n=================================");
    console.log("VALOR TOTAL DO ESTOQUE");
    console.log("=================================");
    console.log("Total: R$", total.toFixed(2));

    return total;
}


// ======================================================
// 15. FUNÇÃO PARA EXCLUIR PRODUTO
// ======================================================

function excluirProduto(codigo) {

    codigo = Number(codigo);

    let indice = produtos.findIndex(function(produto) {
        return produto.codigo === codigo;
    });

    if (indice === -1) {
        console.log("Produto não encontrado.");
        return;
    }

    let produtoExcluido = produtos.splice(indice, 1);

    console.log(
        "Produto",
        produtoExcluido[0].descricao,
        "excluído com sucesso."
    );
}


// ======================================================
// 16. TESTANDO O CADASTRO
// ======================================================

console.log("\n");
console.log("=================================");
console.log("SISTEMA DE CONTROLE DE ESTOQUE");
console.log("=================================");


// Cadastro dos produtos

cadastrarProduto("Arroz 5kg", 20, 28.50);

cadastrarProduto("Feijão 1kg", 30, 8.90);

cadastrarProduto("Açúcar 2kg", 15, 7.50);

cadastrarProduto("Café 500g", 25, 15.90);

cadastrarProduto("Macarrão 500g", 40, 5.50);


// ======================================================
// 17. LISTAGEM DOS PRODUTOS
// ======================================================

listarProdutos();


// ======================================================
// 18. BUSCA DE PRODUTO
// ======================================================

console.log("\n");
console.log("BUSCANDO PRODUTO COM CÓDIGO 2...");

let produto = buscarProduto(2);

if (produto) {

    console.log("Produto encontrado:");
    console.log(produto);

} else {

    console.log("Produto não encontrado.");

}


// ======================================================
// 19. ATUALIZAÇÃO DO VALOR
// ======================================================

console.log("\n");
console.log("ATUALIZANDO VALOR DO PRODUTO 1...");

atualizarValor(1, 32.90);


// ======================================================
// 20. ATUALIZAÇÃO DA QUANTIDADE
// ======================================================

console.log("\n");
console.log("ATUALIZANDO QUANTIDADE DO PRODUTO 1...");

atualizarQuantidade(1, 50);


// ======================================================
// 21. SOMANDO PRODUTOS AO ESTOQUE
// ======================================================

console.log("\n");
console.log("ADICIONANDO 10 UNIDADES AO PRODUTO 2...");

adicionarEstoque(2, 10);


// ======================================================
// 22. RETIRANDO PRODUTOS DO ESTOQUE
// ======================================================

console.log("\n");
console.log("RETIRANDO 5 UNIDADES DO PRODUTO 3...");

retirarEstoque(3, 5);


// ======================================================
// 23. EXIBINDO UM PRODUTO
// ======================================================

exibirProduto(1);


// ======================================================
// 24. CALCULANDO VALOR TOTAL DO ESTOQUE
// ======================================================

calcularEstoqueTotal();


// ======================================================
// 25. LISTAGEM FINAL
// ======================================================

listarProdutos();