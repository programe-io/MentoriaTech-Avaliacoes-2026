// ==========================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ==========================================
// 1. Lista de produtos
let produtos = [];

// 2. Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// 3. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
    console.log(novoProduto);
}

// 4. Função para listar produtos
function listarProdutos() {
    console.log("\n===== PRODUTOS CADASTRADOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.table(produtos); // Exibe os produtos em formato de tabela no console
}

// 5. Função para buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}

// 6. Função para atualizar o valor
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        console.log(`Valor do produto [${produto.descricao}] atualizado com sucesso!`);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 7. Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
        console.log(`Quantidade do produto [${produto.descricao}] atualizada com sucesso!`);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ==========================================
// 8. CADASTRANDO OS PRODUTOS E TESTANDO
// ==========================================
try {
    // Cadastrar produtos iniciais
    cadastrarProduto("Corretivo Em Bastão", 12, 699);
    cadastrarProduto("Duo Blush Cremoso", 38, 99);
    cadastrarProduto("Base Líquida MAC", 20, 150);
    cadastrarProduto("Lápis Para Olhos - Superpreto", 10, 850);

    // Listar produtos logo após o cadastro
    listarProdutos();

    // Atualizar valor do produto de código 2 (Mouse Logitech)
    atualizarValor(2, 97);

    // Adicionar 3 unidades ao produto de código 1 (Cadeira gamer)
    atualizarQuantidade(1, 3);

    // Mostrar lista final atualizada
    listarProdutos();

} catch (erro) {
    console.log("ERRO: " + erro.message);
}

