// Banco de dados em memória para simular o estoque
let estoque = [];
let proximoCodigo = 1; // Gerador de código sequencial pós-incrementado

// Referências dos elementos HTML
const formCadastro = document.getElementById('form-cadastro');
const tabelaProdutos = document.getElementById('lista-produtos');

// --- FUNÇÕES DE SISTEMA ---

// 1. Cadastrar Produto
function cadastrarProduto(descricao, quantidade, valor) {
    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    };
    estoque.push(novoProduto);
    listarProdutos();
}

// 2. Listar Produtos
function listarProdutos() {
    tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de renderizar

    if (estoque.length === 0) {
        tabelaProdutos.innerHTML = `<tr><td colspan="5" style="text-align:center; color: #888;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    estoque.forEach(produto => {
        const total = produto.quantidade * produto.valor;
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td><strong>#${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td><strong>R$ ${total.toFixed(2)}</strong></td>
        `;
        tabelaProdutos.appendChild(linha);
    });
}

// 3. Alterar Valor
function alterarValor(codigo, novoValor) {
    const produto = estoque.find(p => p.codigo === parseInt(codigo));
    if (!produto) {
        alert("Erro: Produto não encontrado!");
        return;
    }
    produto.valor = parseFloat(novoValor);
    listarProdutos();
    alert(`Valor do produto #${codigo} atualizado com sucesso!`);
}

// 4. Alterar Quantidade
function alterarQuantidade(codigo, novaQtd) {
    const produto = estoque.find(p => p.codigo === parseInt(codigo));
    if (!produto) {
        alert("Erro: Produto não encontrado!");
        return;
    }
    produto.quantidade = parseInt(novaQtd);
    listarProdutos();
    alert(`Quantidade do produto #${codigo} atualizada com sucesso!`);
}

// --- ESCUTADORES DE EVENTOS (INTERAÇÃO COM A TELA) ---

// Ouvinte do formulário de cadastro
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('descricao').value;
    const qtd = document.getElementById('quantidade').value;
    const val = document.getElementById('valor').value;

    cadastrarProduto(desc, qtd, val);
    formCadastro.reset(); // Limpa os campos após enviar
});

// Ouvinte para alteração de valor
document.getElementById('btn-alterar-valor').addEventListener('click', () => {
    const cod = document.getElementById('cod-valor').value;
    const valor = document.getElementById('novo-valor').value;

    if (!cod || !valor) {
        alert("Por favor, preencha o código e o novo valor.");
        return;
    }
    alterarValor(cod, valor);
    document.getElementById('cod-valor').value = '';
    document.getElementById('novo-valor').value = '';
});

// Ouvinte para alteração de quantidade
document.getElementById('btn-alterar-qtd').addEventListener('click', () => {
    const cod = document.getElementById('cod-qtd').value;
    const qtd = document.getElementById('nova-qtd').value;

    if (!cod || !qtd) {
        alert("Por favor, preencha o código e a nova quantidade.");
        return;
    }
    alterarQuantidade(cod, qtd);
    document.getElementById('cod-qtd').value = '';
    document.getElementById('nova-qtd').value = '';
});

// Inicializa a tabela vazia ao carregar a página
listarProdutos();
