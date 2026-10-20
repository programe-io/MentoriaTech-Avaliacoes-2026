// Base de dados em memória (Array de Objetos)
const listaProdutos = [];

// Escuta o envio do formulário de cadastro
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar
    
    const descricao = document.getElementById('desc').value;
    const quantidade = parseInt(document.getElementById('qtd').value);
    const valor = parseFloat(document.getElementById('val').value);

    // Validações locais antes do cadastro
    if (descricao.trim().length < 3) {
        alert("A descrição deve ter ao menos 3 caracteres.");
        return;
    }

    // Cria e insere o produto
    const novoId = listaProdutos.length === 0 ? 1 : listaProdutos[listaProdutos.length - 1].id + 1;
    const produto = {
        id: novoId,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    listaProdutos.push(produto);
    atualizarTabela();
    
    // Limpa o formulário
    this.reset();
});

// Busca de produto por ID
function buscarProdutoPorId(id) {
    return listaProdutos.find(p => p.id === id);
}

// Operação: Mudar Preço (Substituição)
function alterarPreçoWeb() {
    const id = parseInt(document.getElementById('id-preco').value);
    const novoPreco = parseFloat(document.getElementById('novo-preco').value);

    if (isNaN(id) || isNaN(novoPreco) || novoPreco <= 0) {
        alert("Preencha o ID corretamente e insira um preço maior que zero.");
        return;
    }

    const produto = buscarProdutoPorId(id);
    if (!produto) {
        alert(`Produto com o ID ${id} não foi encontrado.`);
        return;
    }

    produto.valor = novoPreco;
    atualizarTabela();
    
    document.getElementById('id-preco').value = '';
    document.getElementById('novo-preco').value = '';
}

// Operação: Mudar Quantidade (Acumulação / Subtração)
function alterarQuantidadeWeb() {
    const id = parseInt(document.getElementById('id-qtd').value);
    const variacao = parseInt(document.getElementById('variacao-qtd').value);

    if (isNaN(id) || isNaN(variacao)) {
        alert("Preencha os campos de ID e Quantidade corretamente.");
        return;
    }

    const produto = buscarProdutoPorId(id);
    if (!produto) {
        alert(`Produto com o ID ${id} não foi encontrado.`);
        return;
    }

    if (produto.quantidade + variacao < 0) {
        alert(`Estoque insuficiente! Saldo atual: ${produto.quantidade}. Você não pode retirar ${Math.abs(variacao)} itens.`);
        return;
    }

    produto.quantidade += variacao;
    atualizarTabela();

    document.getElementById('id-qtd').value = '';
    document.getElementById('variacao-qtd').value = '';
}

// Atualiza a visualização da tabela na tela
function atualizarTabela() {
    const tbody = document.getElementById('tabela-produtos');
    tbody.innerHTML = ''; // Limpa as linhas antigas

    if (listaProdutos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888;">Nenhum produto em estoque.</td></tr>`;
        return;
    }

    listaProdutos.forEach(p => {
        const totalItem = p.quantidade * p.valor;
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td><strong>#${p.id}</strong></td>
            <td>${p.descricao}</td>
            <td>${p.quantidade} un.</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td><strong>R$ ${totalItem.toFixed(2)}</strong></td>
        `;
        
        tbody.appendChild(linha);
    });
}

// Inicializa com a tabela vazia ou informativa
atualizarTabela();
