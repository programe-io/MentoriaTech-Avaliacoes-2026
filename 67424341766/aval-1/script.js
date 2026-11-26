// Array que simula o banco de dados em memória
let estoque = [];

// Referências aos elementos do HTML (DOM)
const formCadastro = document.getElementById('form-cadastro');
const tabelaProdutos = document.getElementById('tabela-produtos');

// 1. CADASTRAR UM NOVO PRODUTO
formCadastro.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    const codigo = document.getElementById('codigo').value.trim().toUpperCase();
    const descricao = document.getElementById('descricao').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    // Validação: impede cadastrar dois produtos com o mesmo código
    const produtoExiste = estoque.some(item => item.codigo === codigo);
    if (produtoExiste) {
        alert('Erro: Já existe um produto cadastrado com este código!');
        return;
    }

    // Cria o objeto produto e adiciona ao array
    const novoProduto = { codigo, descricao, quantidade, valor };
    estoque.push(novoProduto);

    formCadastro.reset(); // Limpa o formulário
    listarProdutos();     // Atualiza a tabela na tela
});

// 2. LISTAR OS PRODUTOS CADASTRADOS
function listarProdutos() {
    tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de redesenhar

    if (estoque.length === 0) {
        tabelaProdutos.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #777;">Nenhum produto cadastrado no estoque.</td>
            </tr>
        `;
        return;
    }

    estoque.forEach(produto => {
        const tr = document.createElement('tr');
        
        // Formata o valor para o padrão monetário brasileiro (R$)
        const valorFormatado = produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        tr.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade} un.</td>
            <td>${valorFormatado}</td>
            <td>
                <button class="btn-edit" onclick="alterarQuantidade('${produto.codigo}')">Alterar Qtd</button>
                <button class="btn-edit" onclick="alterarValor('${produto.codigo}')">Alterar Valor</button>
            </td>
        `;

        tabelaProdutos.appendChild(tr);
    });
}

// 3. ALTERAR A QUANTIDADE DE UM PRODUTO
function alterarQuantidade(codigo) {
    const produto = estoque.find(item => item.codigo === codigo);
    if (!produto) return;

    const novaQtd = prompt(`Digite a nova quantidade para "${produto.descricao}" (Atual: ${produto.quantidade}):`);
    
    // Verifica se o usuário não cancelou e se digitou um número válido
    if (novaQtd !== null && novaQtd.trim() !== '') {
        const qtdNumero = parseInt(novaQtd);
        if (!isNaN(qtdNumero) && qtdNumero >= 0) {
            produto.quantidade = qtdNumero;
            listarProdutos();
        } else {
            alert('Por favor, insira uma quantidade válida (número inteiro maior ou igual a zero).');
        }
    }
}

// 4. ALTERAR O VALOR DE UM PRODUTO
function alterarValor(codigo) {
    const produto = estoque.find(item => item.codigo === codigo);
    if (!produto) return;

    const novoValor = prompt(`Digite o novo valor (R$) para "${produto.descricao}" (Atual: R$ ${produto.valor.toFixed(2)}):`);
    
    if (novoValor !== null && novoValor.trim() !== '') {
        // Substitui vírgula por ponto caso o usuário digite no formato brasileiro
        const valorNumero = parseFloat(novoValor.replace(',', '.'));
        if (!isNaN(valorNumero) && valorNumero >= 0) {
            produto.valor = valorNumero;
            listarProdutos();
        } else {
            alert('Por favor, insira um valor válido.');
        }
    }
}

// Inicializa a tabela vazia ao carregar a página
listarProdutos();
