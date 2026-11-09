// Array global que armazena o estoque de produtos
let estoque = [];

/**
 * Renderiza e atualiza a tabela de produtos na tela.
 * Esta função reconstrói as linhas do HTML dinamicamente com base no array 'estoque'.
 */
function atualizarTabela() {
    const tbody = document.getElementById("tabelaEstoque");
    
    // Se não houver elementos na tabela, exibe uma mensagem amigável
    if (!tbody) return;
    tbody.innerHTML = ""; 

    if (estoque.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding: 20px;">Nenhum produto cadastrado no estoque.</td></tr>`;
        return;
    }

    // Varre o array e cria as linhas estruturadas de acordo com as classes do CSS
    estoque.forEach((produto, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td class="actions">
                <!-- Controle de Alteração de Quantidade -->
                <div class="action-row">
                    <input type="number" id="novaQtd-${index}" placeholder="Qtd" min="0">
                    <button onclick="alterarQuantidade(${index})">Atualizar Qtd</button>
                </div>
                <!-- Controle de Alteração de Valor -->
                <div class="action-row">
                    <input type="number" id="novoVal-${index}" placeholder="R$" step="0.01" min="0">
                    <button onclick="alterarValor(${index})">Atualizar R$</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Captura os dados digitados no formulário, valida e cadastra um novo produto.
 */
function cadastrarProduto() {
    const inputCodigo = document.getElementById("codigo");
    const inputDescricao = document.getElementById("descricao");
    const inputQuantidade = document.getElementById("quantidade");
    const inputValor = document.getElementById("valor");

    const codigo = inputCodigo.value.trim();
    const descricao = inputDescricao.value.trim();
    const quantidade = parseInt(inputQuantidade.value, 10);
    const valor = parseFloat(inputValor.value);

    // 1. Validação de Campos Vazios ou Inválidos
    if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
        alert("Preencha todos os campos corretamente antes de cadastrar.");
        return;
    }

    // 2. Validação de Valores Negativos
    if (quantidade < 0 || valor < 0) {
        alert("Quantidade e valor não podem ser negativos.");
        return;
    }

    // 3. Validação de Código Duplicado
    const codigoExiste = estoque.some(produto => produto.codigo === codigo);
    if (codigoExiste) {
        alert(`Erro: O código "${codigo}" já está cadastrado em outro produto.`);
        return;
    }

    // Inserção no Array de estoque
    estoque.push({ codigo, descricao, quantidade, valor });

    // Limpa os campos de entrada após sucesso
    inputCodigo.value = "";
    inputDescricao.value = "";
    inputQuantidade.value = "";
    inputValor.value = "";

    // Atualiza a visualização da tabela
    atualizarTabela();
}

/**
 * Altera a quantidade de um produto específico com base no seu índice no array.
 * @param {number} index - O índice do produto dentro do array 'estoque'
 */
function alterarQuantidade(index) {
    const inputQtd = document.getElementById(`novaQtd-${index}`);
    const novaQuantidade = parseInt(inputQtd.value, 10);

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        alert("Insira uma nova quantidade válida (maior ou igual a zero).");
        return;
    }

    estoque[index].quantidade = novaQuantidade;
    atualizarTabela();
}

/**
 * Altera o valor de um produto específico com base no seu índice no array.
 * @param {number} index - O índice do produto dentro do array 'estoque'
 */
function alterarValor(index) {
    const inputVal = document.getElementById(`novoVal-${index}`);
    const novoValor = parseFloat(inputVal.value);

    if (isNaN(novoValor) || novoValor < 0) {
        alert("Insira um novo valor válido (maior ou igual a zero).");
        return;
    }

    estoque[index].valor = novoValor;
    atualizarTabela();
}

// Execução inicial para desenhar o estado vazio na tela ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarTabela);
