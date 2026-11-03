const readline = require('readline');

// Interface para entrada e saída de dados no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array que atuará como o banco de dados do estoque
const estoque = [];

// Função auxiliar para realizar perguntas no terminal usando Promises (async/await)
function fazerPergunta(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}

// 1. Cadastrar um novo produto
async function cadastrarProduto() {
    console.log('\n--- CADASTRO DE PRODUTO ---');
    
    const codigo = await fazerPergunta('Digite o código do produto: ');
    
    // Verifica se já existe um produto com o mesmo código
    const produtoExistente = estoque.find(p => p.codigo === codigo);
    if (produtoExistente) {
        console.log('❌ Erro: Já existe um produto cadastrado com este código!');
        return;
    }

    const descricao = await fazerPergunta('Digite a descrição do produto: ');
    const quantidade = parseInt(await fazerPergunta('Digite a quantidade em estoque: '), 10);
    const valor = parseFloat(await fazerPergunta('Digite o valor unitário (R$): '));

    // Validação simples dos dados inseridos
    if (isNaN(quantidade) || isNaN(valor) || quantidade < 0 || valor < 0) {
        console.log('❌ Erro: Quantidade e Valor devem ser números válidos e positivos.');
        return;
    }

    // Adiciona o novo produto ao estoque
    estoque.push({ codigo, descricao, quantidade, valor });
    console.log('✅ Produto cadastrado com sucesso!');
}

// 2. Listar os produtos cadastrados
function listarProdutos() {
    console.log('\n--- LISTA DE PRODUTOS ---');
    
    if (estoque.length === 0) {
        console.log('Nenhum produto cadastrado até o momento.');
        return;
    }

    // Exibe os produtos formatados em tabela
    console.table(estoque.map(p => ({
        Código: p.codigo,
        Descrição: p.descricao,
        Quantidade: p.quantidade,
        'Valor (R$)': p.valor.toFixed(2)
    })));
}

// 3. Alterar o valor de um produto
async function alterarValor() {
    console.log('\n--- ALTERAR VALOR DO PRODUTO ---');
    const codigo = await fazerPergunta('Digite o código do produto que deseja alterar: ');
    
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log('❌ Erro: Produto não encontrado.');
        return;
    }

    console.log(`Produto encontrado: ${produto.descricao} | Valor atual: R$ ${produto.valor.toFixed(2)}`);
    const novoValor = parseFloat(await fazerPergunta('Digite o novo valor (R$): '));

    if (isNaN(novoValor) || novoValor < 0) {
        console.log('❌ Erro: Valor inválido.');
        return;
    }

    produto.valor = novoValor;
    console.log('✅ Valor alterado com sucesso!');
}

// 4. Alterar a quantidade de um produto
async function alterarQuantidade() {
    console.log('\n--- ALTERAR QUANTIDADE DO PRODUTO ---');
    const codigo = await fazerPergunta('Digite o código do produto que deseja alterar: ');
    
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log('❌ Erro: Produto não encontrado.');
        return;
    }

    console.log(`Produto encontrado: ${produto.descricao} | Quantidade atual: ${produto.quantidade}`);
    const novaQuantidade = parseInt(await fazerPergunta('Digite a nova quantidade: '), 10);

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        console.log('❌ Erro: Quantidade inválida.');
        return;
    }

    produto.quantidade = novaQuantidade;
    console.log('✅ Quantidade alterada com sucesso!');
}

// Menu Principal do Sistema
async function menu() {
    let rodando = true;

    while (rodando) {
        console.log('\n=================================');
        console.log('    SISTEMA DE GESTÃO DE ESTOQUE  ');
        console.log('=================================');
        console.log('1. Cadastrar produto');
        console.log('2. Listar produtos');
        console.log('3. Alterar valor de um produto');
        console.log('4. Alterar quantidade de um produto');
        console.log('0. Sair');
        
        const opcao = await fazerPergunta('\nEscolha uma opção: ');

        switch (opcao) {
            case '1':
                await cadastrarProduto();
                break;
            case '2':
                listarProdutos();
                break;
            case '3':
                await alterarValor();
                break;
            case '4':
                await alterarQuantidade();
                break;
            case '0':
                console.log('\nEncerrando o sistema... Até logo!');
                rodando = false;
                rl.close();
                break;
            default:
                console.log('❌ Opção inválida! Tente novamente.');
        }
    }
}

// Inicializa o programa
menu();const readline = require('readline');

// Interface para entrada e saída de dados no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array que atuará como o banco de dados do estoque
const estoque = [];

// Função auxiliar para realizar perguntas no terminal usando Promises (async/await)
function fazerPergunta(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}

// 1. Cadastrar um novo produto
async function cadastrarProduto() {
    console.log('\n--- CADASTRO DE PRODUTO ---');
    
    const codigo = await fazerPergunta('Digite o código do produto: ');
    
    // Verifica se já existe um produto com o mesmo código
    const produtoExistente = estoque.find(p => p.codigo === codigo);
    if (produtoExistente) {
        console.log('❌ Erro: Já existe um produto cadastrado com este código!');
        return;
    }

    const descricao = await fazerPergunta('Digite a descrição do produto: ');
    const quantidade = parseInt(await fazerPergunta('Digite a quantidade em estoque: '), 10);
    const valor = parseFloat(await fazerPergunta('Digite o valor unitário (R$): '));

    // Validação simples dos dados inseridos
    if (isNaN(quantidade) || isNaN(valor) || quantidade < 0 || valor < 0) {
        console.log('❌ Erro: Quantidade e Valor devem ser números válidos e positivos.');
        return;
    }

    // Adiciona o novo produto ao estoque
    estoque.push({ codigo, descricao, quantidade, valor });
    console.log('✅ Produto cadastrado com sucesso!');
}

// 2. Listar os produtos cadastrados
function listarProdutos() {
    console.log('\n--- LISTA DE PRODUTOS ---');
    
    if (estoque.length === 0) {
        console.log('Nenhum produto cadastrado até o momento.');
        return;
    }

    // Exibe os produtos formatados em tabela
    console.table(estoque.map(p => ({
        Código: p.codigo,
        Descrição: p.descricao,
        Quantidade: p.quantidade,
        'Valor (R$)': p.valor.toFixed(2)
    })));
}

// 3. Alterar o valor de um produto
async function alterarValor() {
    console.log('\n--- ALTERAR VALOR DO PRODUTO ---');
    const codigo = await fazerPergunta('Digite o código do produto que deseja alterar: ');
    
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log('❌ Erro: Produto não encontrado.');
        return;
    }

    console.log(`Produto encontrado: ${produto.descricao} | Valor atual: R$ ${produto.valor.toFixed(2)}`);
    const novoValor = parseFloat(await fazerPergunta('Digite o novo valor (R$): '));

    if (isNaN(novoValor) || novoValor < 0) {
        console.log('❌ Erro: Valor inválido.');
        return;
    }

    produto.valor = novoValor;
    console.log('✅ Valor alterado com sucesso!');
}

// 4. Alterar a quantidade de um produto
async function alterarQuantidade() {
    console.log('\n--- ALTERAR QUANTIDADE DO PRODUTO ---');
    const codigo = await fazerPergunta('Digite o código do produto que deseja alterar: ');
    
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log('❌ Erro: Produto não encontrado.');
        return;
    }

    console.log(`Produto encontrado: ${produto.descricao} | Quantidade atual: ${produto.quantidade}`);
    const novaQuantidade = parseInt(await fazerPergunta('Digite a nova quantidade: '), 10);

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        console.log('❌ Erro: Quantidade inválida.');
        return;
    }

    produto.quantidade = novaQuantidade;
    console.log('✅ Quantidade alterada com sucesso!');
}

// Menu Principal do Sistema
async function menu() {
    let rodando = true;

    while (rodando) {
        console.log('\n=================================');
        console.log('    SISTEMA DE GESTÃO DE ESTOQUE  ');
        console.log('=================================');
        console.log('1. Cadastrar produto');
        console.log('2. Listar produtos');
        console.log('3. Alterar valor de um produto');
        console.log('4. Alterar quantidade de um produto');
        console.log('0. Sair');
        
        const opcao = await fazerPergunta('\nEscolha uma opção: ');

        switch (opcao) {
            case '1':
                await cadastrarProduto();
                break;
            case '2':
                listarProdutos();
                break;
            case '3':
                await alterarValor();
                break;
            case '4':
                await alterarQuantidade();
                break;
            case '0':
                console.log('\nEncerrando o sistema... Até logo!');
                rodando = false;
                rl.close();
                break;
            default:
                console.log('❌ Opção inválida! Tente novamente.');
        }
    }
}

// Inicializa o programa
menu();const readline = require('readline');

// Interface para entrada e saída de dados no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array que atuará como o banco de dados do estoque
const estoque = [];

// Função auxiliar para realizar perguntas no terminal usando Promises (async/await)
function fazerPergunta(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}

// 1. Cadastrar um novo produto
async function cadastrarProduto() {
    console.log('\n--- CADASTRO DE PRODUTO ---');
    
    const codigo = await fazerPergunta('Digite o código do produto: ');
    
    // Verifica se já existe um produto com o mesmo código
    const produtoExistente = estoque.find(p => p.codigo === codigo);
    if (produtoExistente) {
        console.log('❌ Erro: Já existe um produto cadastrado com este código!');
        return;
    }

    const descricao = await fazerPergunta('Digite a descrição do produto: ');
    const quantidade = parseInt(await fazerPergunta('Digite a quantidade em estoque: '), 10);
    const valor = parseFloat(await fazerPergunta('Digite o valor unitário (R$): '));

    // Validação simples dos dados inseridos
    if (isNaN(quantidade) || isNaN(valor) || quantidade < 0 || valor < 0) {
        console.log('❌ Erro: Quantidade e Valor devem ser números válidos e positivos.');
        return;
    }

    // Adiciona o novo produto ao estoque
    estoque.push({ codigo, descricao, quantidade, valor });
    console.log('✅ Produto cadastrado com sucesso!');
}

// 2. Listar os produtos cadastrados
function listarProdutos() {
    console.log('\n--- LISTA DE PRODUTOS ---');
    
    if (estoque.length === 0) {
        console.log('Nenhum produto cadastrado até o momento.');
        return;
    }

    // Exibe os produtos formatados em tabela
    console.table(estoque.map(p => ({
        Código: p.codigo,
        Descrição: p.descricao,
        Quantidade: p.quantidade,
        'Valor (R$)': p.valor.toFixed(2)
    })));
}

// 3. Alterar o valor de um produto
async function alterarValor() {
    console.log('\n--- ALTERAR VALOR DO PRODUTO ---');
    const codigo = await fazerPergunta('Digite o código do produto que deseja alterar: ');
    
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log('❌ Erro: Produto não encontrado.');
        return;
    }

    console.log(`Produto encontrado: ${produto.descricao} | Valor atual: R$ ${produto.valor.toFixed(2)}`);
    const novoValor = parseFloat(await fazerPergunta('Digite o novo valor (R$): '));

    if (isNaN(novoValor) || novoValor < 0) {
        console.log('❌ Erro: Valor inválido.');
        return;
    }

    produto.valor = novoValor;
    console.log('✅ Valor alterado com sucesso!');
}

// 4. Alterar a quantidade de um produto
async function alterarQuantidade() {
    console.log('\n--- ALTERAR QUANTIDADE DO PRODUTO ---');
    const codigo = await fazerPergunta('Digite o código do produto que deseja alterar: ');
    
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log('❌ Erro: Produto não encontrado.');
        return;
    }

    console.log(`Produto encontrado: ${produto.descricao} | Quantidade atual: ${produto.quantidade}`);
    const novaQuantidade = parseInt(await fazerPergunta('Digite a nova quantidade: '), 10);

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        console.log('❌ Erro: Quantidade inválida.');
        return;
    }

    produto.quantidade = novaQuantidade;
    console.log('✅ Quantidade alterada com sucesso!');
}

// Menu Principal do Sistema
async function menu() {
    let rodando = true;

    while (rodando) {
        console.log('\n=================================');
        console.log('    SISTEMA DE GESTÃO DE ESTOQUE  ');
        console.log('=================================');
        console.log('1. Cadastrar produto');
        console.log('2. Listar produtos');
        console.log('3. Alterar valor de um produto');
        console.log('4. Alterar quantidade de um produto');
        console.log('0. Sair');
        
        const opcao = await fazerPergunta('\nEscolha uma opção: ');

        switch (opcao) {
            case '1':
                await cadastrarProduto();
                break;
            case '2':
                listarProdutos();
                break;
            case '3':
                await alterarValor();
                break;
            case '4':
                await alterarQuantidade();
                break;
            case '0':
                console.log('\nEncerrando o sistema... Até logo!');
                rodando = false;
                rl.close();
                break;
            default:
                console.log('❌ Opção inválida! Tente novamente.');
        }
    }
}

// Inicializa o programa
menu();