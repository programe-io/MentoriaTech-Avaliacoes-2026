// Banco de dados em memória para simular o estoque
let estoque = [];

// Elementos do DOM - Cadastro
const formCadastro = document.getElementById('form-cadastro');
const cadCodigo = document.getElementById('cad-codigo');
const cadDescricao = document.getElementById('cad-descricao');
const cadQuantidade = document.getElementById('cad-quantidade');
const cadValor = document.getElementById('cad-valor');

// Elementos do DOM - Alterações
const formAlterarValor = document.getElementById('form-alterar-valor');
const altValCodigo = document.getElementById('alt-val-codigo');
const altValNovo = document.getElementById('alt-val-novo');

const formAlterarQtd = document.getElementById('form-alterar-qtd');
const altQtdCodigo = document.getElementById('alt-qtd-codigo');
const altQtdNovo = document.getElementById('alt-qtd-novo');

// Elemento do DOM - Tabela
const listaProdutos = document.getElementById('lista-produtos');

// --- FUNÇÃO: Listar / Atualizar Tabela na Tela ---
function atualizarTabela() {
    // Limpa as linhas atuais da tabela
    listaProdutos.innerHTML = '';

    // Se não houver produtos, exibe uma mensagem amigável
    if (estoque.length === 0) {
        listaProdutos.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    // Mapeia e insere cada produto do array na tabela
    estoque.forEach(produto => {
        const total = produto.quantidade * produto.valor;
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td><strong>R$ ${total.toFixed(2)}</strong></td>
        `;

        listaProdutos.appendChild(linha);
    });
}

// --- FUNÇÃO: Cadastrar Produto ---
formCadastro.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const codigo = cadCodigo.value.trim().toUpperCase();
    
    // Validação para evitar códigos duplicados
    const produtoExiste = estoque.find(p => p.codigo === codigo);
    if (produtoExiste) {
        alert(`Erro: Já existe um produto cadastrado com o código ${codigo}!`);
        return;
    }

    // Cria o objeto do novo produto
    const novoProduto = {
        codigo: codigo,
        descricao: cadDescricao.value.trim(),
        quantidade: parseInt(cadQuantidade.value),
        valor: parseFloat(cadValor.value)
    };

    // Adiciona ao estoque e atualiza a interface
    estoque.push(novoProduto);
    atualizarTabela();

    // Limpa o formulário de cadastro
    formCadastro.reset();
    cadCodigo.focus();
});

// --- FUNÇÃO: Alterar o Valor de um Produto ---
formAlterarValor.addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = altValCodigo.value.trim().toUpperCase();
    const novoValor = parseFloat(altValNovo.value);

    // Busca o produto pelo código
    const produto = estoque.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = novoValor;
        atualizarTabela();
        formAlterarValor.reset();
        alert(`Valor do produto ${codigo} atualizado com sucesso!`);
    } else {
        alert(`Produto com o código ${codigo} não foi encontrado.`);
    }
});

// --- FUNÇÃO: Alterar a Quantidade de um Produto ---
formAlterarQtd.addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = altQtdCodigo.value.trim().toUpperCase();
    const novaQtd = parseInt(altQtdNovo.value);

    // Busca o produto pelo código
    const produto = estoque.find(p => p.codigo === codigo);

    if (produto) {
        produto.quantidade = novaQtd;
        atualizarTabela();
        formAlterarQtd.reset();
        alert(`Quantidade do produto ${codigo} atualizada com sucesso!`);
    } else {
        alert(`Produto com o código ${codigo} não foi encontrado.`);
    }
});

// Inicializa a tabela vazia ao carregar o script
atualizarTabela();