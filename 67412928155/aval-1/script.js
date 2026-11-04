// Array para armazenar o stock em memória
let estoque = [];

// Seleção de elementos do DOM
const formCadastro = document.getElementById('form-cadastro');
const tabelaProdutos = document.getElementById('tabela-produtos');

// Evento de submissão do formulário (Cadastrar Produto)
formCadastro.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    const codigo = document.getElementById('codigo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    // Validação de código duplicado
    const existe = estoque.find(p => p.codigo.toLowerCase() === codigo.toLowerCase());
    if (existe) {
        alert(`Erro: Já existe um produto com o código ${codigo}.`);
        return;
    }

    // Criar o objeto do novo produto
    const novoProduto = { codigo, descricao, quantidade, valor };
    
    // Adicionar ao array
    estoque.push(novoProduto);
    
    // Limpar o formulário e atualizar o ecrã
    formCadastro.reset();
    atualizarTabela();
});

// Função para renderizar/listar os produtos na tabela HTML
function atualizarTabela() {
    tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de redesenhar

    if (estoque.length === 0) {
        tabelaProdutos.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum produto em stock.</td></tr>`;
        return;
    }

    estoque.forEach(p => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><strong>${p.codigo}</strong></td>
            <td>${p.descricao}</td>
            <td>${p.quantidade} un</td>
            <td>€${p.valor.toFixed(2)}</td>
            <td>
                <button class="btn-acao btn-qtd" onclick="alterarQuantidade('${p.codigo}')">Alt. Qtd</button>
                <button class="btn-acao btn-preco" onclick="alterarValor('${p.codigo}')">Alt. Preço</button>
            </td>
        `;

        tabelaProdutos.appendChild(tr);
    });
}

// Função para Alterar a Quantidade
function alterarQuantidade(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) return;

    const novaQtd = prompt(`Alterar quantidade de "${produto.descricao}":`, produto.quantidade);
    
    // Validação básica do input
    if (novaQtd !== null && novaQtd.trim() !== "" && !isNaN(novaQtd)) {
        const qtdInt = parseInt(novaQtd);
        if (qtdInt >= 0) {
            produto.quantidade = qtdInt;
            atualizarTabela();
        } else {
            alert("A quantidade não pode ser negativa.");
        }
    }
}

// Função para Alterar o Valor
function alterarValor(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) return;

    const novoPreco = prompt(`Alterar preço de "${produto.descricao}" (€):`, produto.valor);
    
    // Validação básica do input
    if (novoPreco !== null && novoPreco.trim() !== "" && !isNaN(novoPreco)) {
        const precoFloat = parseFloat(novoPreco);
        if (precoFloat >= 0) {
            produto.valor = precoFloat;
            atualizarTabela();
        } else {
            alert("O preço não pode ser negativo.");
        }
    }
}

// Inicializa a tabela (mostra a mensagem de stock vazio no início)
atualizarTabela();
