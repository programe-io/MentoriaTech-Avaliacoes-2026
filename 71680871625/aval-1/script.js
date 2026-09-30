// Array para simular o banco de dados do estoque
let estoque = [];

// Função para cadastrar um produto
function cadastrarProduto() {
    const codigo = document.getElementById('p-codigo').value.trim();
    const descricao = document.getElementById('p-descricao').value.trim();
    const quantidade = parseInt(document.getElementById('p-quantidade').value);
    const valor = parseFloat(document.getElementById('p-valor').value);

    // Validações básicas
    if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Verifica se o código já existe
    const existe = estoque.some(p => p.codigo === codigo);
    if (existe) {
        alert('Já existe um produto cadastrado com este código.');
        return;
    }

    // Adiciona o produto ao array
    estoque.push({ codigo, descricao, quantidade, valor });

    // Limpa os campos do formulário
    document.getElementById('p-codigo').value = '';
    document.getElementById('p-descricao').value = '';
    document.getElementById('p-quantidade').value = '';
    document.getElementById('p-valor').value = '';

    // Atualiza a tabela na tela
    atualizarTabela();
}

// Função para alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (produto) {
        const novaQtd = prompt(`Digite a nova quantidade para ${produto.descricao}:`, produto.quantidade);
        if (novaQtd !== null) {
            const qtdValida = parseInt(novaQtd);
            if (!isNaN(qtdValida) && qtdValida >= 0) {
                produto.quantidade = qtdValida;
                atualizarTabela();
            } else {
                alert('Quantidade inválida.');
            }
        }
    }
}

// Função para alterar o valor de um produto
function alterarValor(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (produto) {
        const novoValor = prompt(`Digite o novo valor para ${produto.descricao} (R$):`, produto.valor);
        if (novoValor !== null) {
            const valorValido = parseFloat(novoValor);
            if (!isNaN(valorValido) && valorValido >= 0) {
                produto.valor = valorValido;
                atualizarTabela();
            } else {
                alert('Valor inválido.');
            }
        }
    }
}

// Função para listar/atualizar os produtos na tabela HTML
function atualizarTabela() {
    const tbody = document.getElementById('tabela-produtos');
    tbody.innerHTML = ''; // Limpa a tabela antes de redesenhar

    if (estoque.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    estoque.forEach(produto => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td class="actions">
                <button class="btn-edit" onclick="alterarQuantidade('${produto.codigo}')">Qtd</button>
                <button class="btn-edit" onclick="alterarValor('${produto.codigo}')">Preço</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Inicializa a tabela vazia ao carregar a página
atualizarTabela();
