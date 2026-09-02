let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor,
    }
    produtos.push(novoProduto);
    return novoProduto;
}

function listarProdutos() {
    return produtos;
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (produto) {
        produto.valor = novoValor;
        return produto;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (produto) {
        produto.quantidade += novaQuantidade;
        return produto;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    if (!alert) return;
    alert.textContent = message;
    alert.className = `alert alert-${type}`;

    setTimeout(() => {
        alert.className = 'alert';
    }, 5000);
}

function renderizarTabela() {
    const tbody = document.getElementById('tabelaProdutos');
    const count = document.getElementById('produtoCount');
    
    if (!tbody || !count) {
        console.error('Elementos da tabela não encontrados!');
        return;
    }

    console.log('Renderizando produtos:', produtos);

    if (produtos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-message">Nenhum produto cadastrado</td></tr>`;
        count.textContent = 'Total: 0 produtos';
        return;
    }

    count.textContent = `Total: ${produtos.length} produtos`;

    tbody.innerHTML = produtos.map(prod => `
        <tr>
            <td><strong>${prod.codigo}</strong></td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td>
                <div class="acoes-cell">
                    <button onclick="excluirProduto(${prod.codigo})" class="btn btn-danger btn-small">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function iniciarSistema() {
    console.log('🚀 Iniciando sistema...');
    
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const descricao = document.getElementById('descricao').value.trim();
            const quantidade = parseInt(document.getElementById('quantidade').value);
            const valor = parseFloat(document.getElementById('valor').value);

            try {
                const novoProduto = cadastrarProduto(descricao, quantidade, valor);
                renderizarTabela();
                showAlert(`✅ Produto "${descricao}" cadastrado com sucesso! Código: ${novoProduto.codigo}`, 'success');
                this.reset();
            } catch (error) {
                showAlert(`❌ Erro: ${error.message}`, 'error');
            }
        });
    }

    try {
        console.log('📦 Cadastrando produtos de exemplo...');
        cadastrarProduto("Cadeira Gamer", 12, 699.00);
        cadastrarProduto("Mouse Logi", 38, 99.00);
        console.log('✅ Produtos cadastrados:', produtos);
        renderizarTabela();
    } catch (error) {
        console.error('❌ Erro ao carregar produtos iniciais:', error);
    }
}

window.atualizarValorUI = function() {
    const codigo = parseInt(document.getElementById('codigoAtualizar').value);
    const novoValor = parseFloat(document.getElementById('novoValor').value);

    if (!codigo || isNaN(novoValor)) {
        showAlert('❌ Por favor, preencha o código e o novo valor corretamente', 'error');
        return;
    }

    try {
        const produto = atualizarValor(codigo, novoValor);
        renderizarTabela();
        showAlert(`✅ Valor do produto "${produto.descricao}" atualizado para R$ ${novoValor.toFixed(2)}`, 'success');
        document.getElementById('novoValor').value = '';
    } catch (error) {
        showAlert(`❌ Erro: ${error.message}`, 'error');
    }
}

window.atualizarQuantidadeUI = function() {
    const codigo = parseInt(document.getElementById('codigoAtualizar').value);
    const novaQuantidade = parseInt(document.getElementById('novaQuantidade').value);

    if (!codigo || isNaN(novaQuantidade)) {
        showAlert('❌ Por favor, preencha o código e a quantidade corretamente', 'error');
        return;
    }

    try {
        const produto = atualizarQuantidade(codigo, novaQuantidade);
        renderizarTabela();
        showAlert(`✅ Quantidade do produto "${produto.descricao}" atualizada para ${produto.quantidade}`, 'success');
        document.getElementById('novaQuantidade').value = '';
    } catch (error) {
        showAlert(`❌ Erro: ${error.message}`, 'error');
    }
}

window.excluirProduto = function(codigo) {
    if (confirm(`Tem certeza que deseja excluir o produto de código ${codigo}?`)) {
        const index = produtos.findIndex(prod => prod.codigo === codigo);
        if (index !== -1) {
            const produto = produtos[index];
            produtos.splice(index, 1);
            renderizarTabela();
            showAlert(`🗑️ Produto "${produto.descricao}" excluído com sucesso`, 'success');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistema);
} else {
    iniciarSistema();
}