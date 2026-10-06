let produtos = [];

// 2. Função para validar as regras do produto
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

// 3. Função para cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    console.log(`Produto "${descricao}" cadastrado com sucesso!`);
}

// 4. Função para listar todos os produtos
function listarProdutos() {
    console.log("\n--- LISTA DE PRODUTOS NO ESTOQUE ---");
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }
    produtos.forEach(produto => {
        console.log(`Código: ${produto.codigo} | Descrição: ${produto.descricao} | Qtd: ${produto.quantidade} | R$: ${produto.valor}`);
    });
}

// 5. Função para atualizar o valor de um produto
function atualizarValor(codigoProduto, novoValor) {
    let produto = produtos.find(p => p.codigo === codigoProduto);
    
    if (!produto) {
        console.log(`Erro: Produto com código ${codigoProduto} não encontrado.`);
        return;
    }

    if (novoValor < 0) {
        console.log("Erro: O novo valor deve ser maior ou igual a zero.");
        return;
    }

    produto.valor = novoValor;
    console.log(`Valor do produto código ${codigoProduto} atualizado para R$ ${novoValor}.`);
}

// 6. Função para atualizar a quantidade em estoque
function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
    let produto = produtos.find(p => p.codigo === codigoProduto);

    if (!produto) {
        console.log(`Erro: Produto com código ${codigoProduto} não encontrado.`);
        return;
    }

    produto.quantidade += quantidadeAdicional;
    console.log(`Quantidade do produto código ${codigoProduto} alterada em ${quantidadeAdicional}. Nova quantidade: ${produto.quantidade}.`);
}

// --- TESTES DAS FUNCIONALIDADES ---
try {
    // Testando Cadastros Válidos
    cadastrarProduto("Mouse Logitech", 38, 99);
    cadastrarProduto("Cadeira gamer", 12, 699);

    // Listando produtos
    listarProdutos();

    // Atualizando Valor e Quantidade
    atualizarValor(1, 110);
    atualizarQuantidade(2, 5);

    // Listando novamente para confirmar atualizações
    listarProdutos();

} catch (error) {
    console.error("Erro na validação:", error.message);
}