// Banco de dados em memória e controle de ID incremental
const listaProdutos = [];
let proximoId = 1;

// Mapeamento dos elementos do HTML
const formProduto = document.getElementById('form-produto');
const tabelaProdutos = document.getElementById('tabela-produtos');

// --- MÓDULO DE VALIDAÇÃO ---
function validarDescricao(descricao) {
    return typeof descricao === 'string' && descricao.trim().length >= 3;
}

function validarQuantidade(quantidade) {
    return Number.isInteger(quantidade) && quantidade >= 0;
}

function validarValor(valor) {
    return typeof valor === 'number' && !isNaN(valor) && valor > 0;
}

// --- MÓDULO DE GERENCIAMENTO DE ESTOQUE ---
function cadastrarProduto(descricao, quantidade, valor) {
    if (!validarDescricao(descricao) || !validarQuantidade(quantidade) || !validarValor(valor)) {
        alert("❌ Dados inválidos! Verifique os campos informados.");
        return;
    }

    const novoProduto = {
        codigo: proximoId++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    listaProdutos.push(novoProduto);
    atualizarInterface();
}

function alterarValor(codigo) {
    const produto = listaProdutos.find(p => p.codigo === codigo);
    if (!produto) return;

    const novoValorStr = prompt(`Digite o novo valor para [${produto.descricao}]:`, produto.valor);
    const novoValor = parseFloat(novoValorStr);

    if (validarValor(novoValor)) {
        produto.valor = novoValor; // Substituição direta de valor
        atualizarInterface();
    } else if (novoValorStr !== null) {
        alert("❌ Valor inválido!");
    }
}

function somarQuantidade(codigo) {
    const produto = listaProdutos.find(p => p.codigo === codigo);
    if (!produto) return;

    const qtdAdicionalStr = prompt(`Quantas unidades deseja ADICIONAR ao estoque de [${produto.descricao}]?`, "0");
    const qtdAdicional = parseInt(qtdAdicionalStr);

    if (validarQuantidade(qtdAdicional) && qtdAdicional > 0) {
        produto.quantidade += qtdAdicional; // Operação aditiva acumulativa
        atualizarInterface();
    } else if (qtdAdicionalStr !== null) {
        alert("❌ Quantidade inválida!");
    }
}

// --- MÓDULO DE INTERFACE (ATUALIZAÇÃO DA TELA) ---
function atualizarInterface() {
    // Limpa as linhas atuais da tabela
    tabelaProdutos.innerHTML = '';

    if (listaProdutos.length === 0) {
        tabelaProdutos.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #9ca3af;">Nenhum produto em estoque.</td></tr>`;
        return;
    }

    // Renderiza cada produto dentro da tabela HTML
    listaProdutos.forEach(produto => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td><strong>#${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade} un</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <button class="btn-action" onclick="alterarValor(${produto.codigo})">💲 Alterar Preço</button>
                <button class="btn-action" onclick="somarQuantidade(${produto.codigo})">📦 + Estoque</button>
            </td>
        `;

        tabelaProdutos.appendChild(linha);
    });
}

// --- ESCUTADORES DE EVENTOS ---
formProduto.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    const descricao = document.getElementById('descricao').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    cadastrarProduto(descricao, quantidade, valor);

    // Reseta os campos do formulário após o cadastro bem-sucedido
    formProduto.reset();
    document.getElementById('descricao').focus();
});

// Inicializa a tabela vazia na primeira execução
atualizarInterface();
