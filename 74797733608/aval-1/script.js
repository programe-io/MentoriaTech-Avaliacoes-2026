// Array global para salvar os dados na memória do navegador
let estoque = [];

// Função que roda instantaneamente ao clicar no botão
function cadastrarNovoProduto() {
    // Captura os elementos diretamente
    const txtCodigo = document.getElementById('codigo');
    const txtDescricao = document.getElementById('descricao');
    const txtQuantidade = document.getElementById('quantidade');
    const txtValor = document.getElementById('valor');

    // Valida se todos os campos existem na tela
    if (!txtCodigo || !txtDescricao || !txtQuantidade || !txtValor) {
        alert("Erro no sistema: Verifique se os campos de texto possuem os IDs corretos no HTML.");
        return;
    }

    // Pega e trata os valores digitados
    const codigo = txtCodigo.value.trim();
    const descricao = txtDescricao.value.trim();
    const quantidade = parseInt(txtQuantidade.value);
    const valor = parseFloat(txtValor.value);

    // Validação de preenchimento obrigatório
    if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
        alert("⚠️ Por favor, preencha todos os campos antes de cadastrar!");
        return;
    }

    // Validação de duplicidade
    const existe = estoque.find(p => p.codigo === codigo);
    if (existe) {
        alert(`⚠️ Erro: Já existe um produto cadastrado com o código "${codigo}"!`);
        return;
    }

    // Cria e adiciona o objeto ao array
    const novoItem = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(novoItem);

    // Atualiza a tabela na tela
    atualizarTabelaVisual();

    // Limpa o formulário
    document.getElementById('form-produto').reset();
    
    // Alerta de sucesso
    alert(`✅ Produto "${descricao}" adicionado com sucesso!`);
}

// Renderiza a lista atualizada dentro do HTML
function atualizarTabelaVisual() {
    const listaProdutos = document.getElementById('lista-produtos');
    if (!listaProdutos) return;

    listaProdutos.innerHTML = ''; // Zera as linhas

    estoque.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade} u.</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <button class="btn-action btn-edit-val" onclick="alterarValor('${produto.codigo}')">💲 R$</button>
                <button class="btn-action btn-edit-qtd" onclick="alterarQuantidade('${produto.codigo}')">📦 Qtd</button>
            </td>
        `;
        listaProdutos.appendChild(tr);
    });
}

// Funções extras de edição
function alterarValor(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) return;
    const novoValorStr = prompt(`Novo valor para ${produto.descricao}:`, produto.valor);
    if (novoValorStr !== null) {
        const val = parseFloat(novoValorStr.replace(',', '.'));
        if (!isNaN(val) && val >= 0) {
            produto.valor = val;
            atualizarTabelaVisual();
        }
    }
}

function alterarQuantidade(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) return;
    const novaQtdStr = prompt(`Nova quantidade para ${produto.descricao}:`, produto.quantidade);
    if (novaQtdStr !== null) {
        const qtd = parseInt(novaQtdStr);
        if (!isNaN(qtd) && qtd >= 0) {
            produto.quantidade = qtd;
            atualizarTabelaVisual();
        }
    }
}
