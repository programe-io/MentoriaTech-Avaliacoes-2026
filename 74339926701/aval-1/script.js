// Array que simula o banco de dados do estoque
let estoque = [];

// Selecionando elementos do HTML
const formCadastro = document.getElementById('form-cadastro');
const tabelaProdutos = document.getElementById('tabela-produtos');
const btnAlterarValor = document.getElementById('btn-alterar-valor');
const btnAlterarQtd = document.getElementById('btn-alterar-qtd');

// 1. Cadastrar um novo produto
formCadastro.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que a página recarregue

    const codigo = document.getElementById('codigo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    // Verifica se o código já existe no estoque
    const produtoExistente = estoque.find(item => item.codigo.toLowerCase() === codigo.toLowerCase());
    if (produtoExistente) {
        alert('Erro: Já existe um produto cadastrado com este código!');
        return;
    }

    // Cria o objeto produto e adiciona no array
    const novoProduto = { codigo, descricao, quantidade, valor };
    estoque.push(novoProduto);

    formCadastro.reset(); // Limpa os campos
    listarProdutos();     // Atualiza a tabela na tela
});

// 2. Listar os produtos cadastrados
function listarProdutos() {
    tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de redesenhar

    if (estoque.length === 0) {
        tabelaProdutos.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    estoque.forEach(produto => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2).replace('.', ',')}</td>
        `;
        tabelaProdutos.appendChild(linha);
    });
}

// 3. Alterar o valor de um produto
btnAlterarValor.addEventListener('click', function() {
    const codigoBusca = document.getElementById('codigo-busca').value.trim();
    const novoValor = parseFloat(document.getElementById('novo-valor').value);

    if (!codigoBusca || isNaN(novoValor) || novoValor < 0) {
        alert('Informe o código do produto e um novo valor válido.');
        return;
    }

    const produto = estoque.find(item => item.codigo.toLowerCase() === codigoBusca.toLowerCase());

    if (produto) {
        produto.valor = novoValor;
        document.getElementById('novo-valor').value = '';
        listarProdutos();
        alert(`Valor do produto "${produto.descricao}" atualizado com sucesso!`);
    } else {
        alert('Produto não encontrado!');
    }
});

// 4. Alterar a quantidade de um produto
btnAlterarQtd.addEventListener('click', function() {
    const codigoBusca = document.getElementById('codigo-busca').value.trim();
    const novaQtd = parseInt(document.getElementById('nova-quantidade').value);

    if (!codigoBusca || isNaN(novaQtd) || novaQtd < 0) {
        alert('Informe o código do produto e uma quantidade válida.');
        return;
    }

    const produto = estoque.find(item => item.codigo.toLowerCase() === codigoBusca.toLowerCase());

    if (produto) {
        produto.quantidade = novaQtd;
        document.getElementById('nova-quantidade').value = '';
        listarProdutos();
        alert(`Quantidade do produto "${produto.descricao}" atualizada com sucesso!`);
    } else {
        alert('Produto não encontrado!');
    }
});

// Inicializa a tabela vazia ao abrir a página
listarProdutos();
