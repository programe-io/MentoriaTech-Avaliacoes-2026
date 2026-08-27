
let estoque = [];
const elementoSaida = document.getElementById("saida");

function imprimirNaTela(texto) {
    elementoSaida.innerHTML += texto + "<br>";
}

// 1. Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    const produtoExiste = estoque.find(produto => produto.codigo === codigo);
   
    if (produtoExiste) {
        imprimirNaTela(`Erro: Já existe um produto com o código ${codigo}.`);
        return;
    }

    const novoProduto = { codigo, descricao, quantidade, valor };
    estoque.push(novoProduto);
    imprimirNaTela(`<strong>Sucesso:</strong> Produto "${descricao}" cadastrado!`);
}

// 2. Listar os produtos cadastrados
function listarProdutos() {
    imprimirNaTela("<br><strong>--- Produtos em Estoque ---</strong>");
    if (estoque.length === 0) {
        imprimirNaTela("O estoque está vazio.");
        return;
    }
   
    estoque.forEach(produto => {
        imprimirNaTela(`Código: ${produto.codigo} | Descrição: ${produto.descricao} | Qtd: ${produto.quantidade} | Valor: R$${produto.valor.toFixed(2)}`);
    });
    imprimirNaTela("-----------------------------------<br>");
}

// 3. Alterar o valor de um produto
function alterarValor(codigo, novoValor) {
    const produto = estoque.find(produto => produto.codigo === codigo);
   
    if (produto) {
        produto.valor = novoValor;
        imprimirNaTela(`<strong>Sucesso:</strong> Valor do produto ${codigo} atualizado para R$${novoValor.toFixed(2)}.`);
    } else {
        imprimirNaTela(`Erro: Produto com código ${codigo} não encontrado.`);
    }
}

// 4. Alterar a quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
    const produto = estoque.find(produto => produto.codigo === codigo);
   
    if (produto) {
        produto.quantidade = novaQuantidade;
        imprimirNaTela(`<strong>Sucesso:</strong> Quantidade do produto ${codigo} atualizada para ${novaQuantidade}.`);
    } else {
        imprimirNaTela(`Erro: Produto com código ${codigo} não encontrado.`);
    }
}

// EXECUÇÃO DO TESTE
cadastrarProduto(1, "Teclado Mecânico", 15, 250.00);
cadastrarProduto(2, "Mouse Gamer", 30, 120.50);
cadastrarProduto(3, "Monitor 24 Pol", 10, 850.00);

listarProdutos();

alterarValor(2, 110.00);
alterarQuantidade(1, 12);

listarProdutos();
