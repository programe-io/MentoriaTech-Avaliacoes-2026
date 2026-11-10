let estoque = [];

// Função que o botão "Cadastrar Produto" chama
function executarCadastro() {
    // 1. Captura os valores dos inputs da tela
    const codigo = parseInt(document.getElementById('codigo').value);
    const descricao = document.getElementById('descricao').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    // Validação simples para não cadastrar campos vazios
    if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
        alert("Por favor, preencha todos os campos corretamente para cadastrar!");
        return;
    }

    // Verifica se o código já existe
    const produtoExiste = estoque.find(p => p.codigo === codigo);
    if (produtoExiste) {
        alert(`Erro: Já existe um produto com o código ${codigo}.`);
        return;
    }

    // 2. Adiciona o produto ao estoque
    estoque.push({ codigo, descricao, quantidade, valor });
    alert(`Produto "${descricao}" cadastrado com sucesso!`);

    // 3. Limpa os campos da tela após cadastrar
    limparCampos();
    listarProdutos(); // Atualiza a lista automaticamente
}

// Função para listar os produtos na tela
function listarProdutos() {
    const painel = document.getElementById('listaEstoque');
    
    if (estoque.length === 0) {
        painel.innerHTML = "O estoque está vazio.";
        return;
    }

    let conteudo = "";
    estoque.forEach(p => {
        conteudo += `📦 Código: ${p.codigo} | ${p.descricao} | Qtd: ${p.quantidade} | Valor: R$ ${p.valor.toFixed(2)}\n`;
    });

    painel.innerHTML = conteudo;
}

// Função para alterar o valor usando o código digitado
function ejecutarAlterarValor() {
    const codigo = parseInt(document.getElementById('codigo').value);
    const novoValor = parseFloat(document.getElementById('valor').value);

    if (!codigo || isNaN(novoValor)) {
        alert("Preencha os campos 'Código' e 'Valor' para alterar!");
        return;
    }

    const produto = estoque.find(p => p.codigo === codigo);
    if (produto) {
        produto.valor = novoValor;
        alert(`Valor de "${produto.descricao}" atualizado.`);
        listarProdutos();
    } else {
        alert("Produto não encontrado.");
    }
}

// Função para alterar a quantidade usando o código digitado
function executarAlterarQuantidade() {
    const codigo = parseInt(document.getElementById('codigo').value);
    const novaQuantidade = parseInt(document.getElementById('quantidade').value);

    if (!codigo || isNaN(novaQuantidade)) {
        alert("Preencha os campos 'Código' e 'Quantidade' para alterar!");
        return;
    }

    const produto = estoque.find(p => p.codigo === codigo);
    if (produto) {
        produto.workspace = novaQuantidade;
        produto.quantidade = novaQuantidade;
        alert(`Quantidade de "${produto.descricao}" atualizada.`);
        listarProdutos();
    } else {
        alert("Produto não encontrado.");
    }
}

// Auxiliar para limpar o formulário
function limparCampos() {
    document.getElementById('codigo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';
}
