
// ==========================================
// 1. LISTA INICIAL DE PRODUTOS
// ==========================================

let produtos = [
    { codigo: 1, descricao: "Borracha", quantidade: 50, valor: 2.50 },
    { codigo: 2, descricao: "Lápis", quantidade: 100, valor: 1.50 },
    { codigo: 3, descricao: "Pratos", quantidade: 30, valor: 15.00 },
    { codigo: 4, descricao: "Tablet", quantidade: 10, valor: 850.00 },
    { codigo: 5, descricao: "Computador", quantidade: 5, valor: 2500.00 }
];

// Próximo código automático
let proximoCodigo = 6;


// ==========================================
// 2. FUNÇÃO PARA VALIDAR PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {

    // Validar descrição
    if (descricao.trim() === "") {
        alert("Informe a descrição do produto!");
        return false;
    }

    // Validar quantidade
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira maior que zero!");
        return false;
    }

    // Validar valor
    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Informe um valor válido!");
        return false;
    }

    return true;
}


// ==========================================
// 3. FUNÇÃO PARA CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    // Capturar dados do formulário
    const descricao = document.getElementById("descricao").value;

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );

    // Validar dados
    if (!validarProduto(descricao, quantidade, valor)) {
        return;
    }

    // Criar objeto produto
    const produto = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto ao array
    produtos.push(produto);

    // Gerar próximo código
    proximoCodigo++;

    alert("Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizar listagem
    listarProdutos();
}


// ==========================================
// 4. FUNÇÃO PARA LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    // Limpar tabela
    lista.innerHTML = "";

    // Percorrer produtos cadastrados
    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>

                <td>${produto.descricao}</td>

                <td>${produto.quantidade}</td>

                <td>R$ ${produto.valor.toFixed(2).replace(".", ",")}</td>
            </tr>
        `;

    });
}


// ==========================================
// 5. FUNÇÃO PARA ATUALIZAR VALOR
// ==========================================

function atualizarValor() {

    // Capturar código e novo valor
    const codigo = Number(
        document.getElementById("codigoAtualizar").value
    );

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    // Buscar produto pelo código
    const produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    // Verificar se produto existe
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    // Validar novo valor
    if (!Number.isFinite(novoValor) || novoValor <= 0) {
        alert("Informe um valor válido!");
        return;
    }

    // Atualizar valor do produto
    produto.valor = novoValor;

    alert("Valor atualizado com sucesso!");

    // Limpar campos
    document.getElementById("codigoAtualizar").value = "";
    document.getElementById("novoValor").value = "";

    // Atualizar tabela
    listarProdutos();
}


// ==========================================
// 6. FUNÇÃO PARA ATUALIZAR QUANTIDADE
// ==========================================

function atualizarQuantidade() {

    // Capturar código e quantidade
    const codigo = Number(
        document.getElementById("codigoQuantidade").value
    );

    const quantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    // Buscar produto pelo código
    const produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    // Verificar se produto existe
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    // Validar quantidade
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira maior que zero!");
        return;
    }

    // Somar quantidade ao estoque
    produto.quantidade += quantidade;

    alert("Quantidade atualizada com sucesso!");

    // Limpar campos
    document.getElementById("codigoQuantidade").value = "";
    document.getElementById("novaQuantidade").value = "";

    // Atualizar tabela
    listarProdutos();
}


// ==========================================
// 7. INICIALIZAÇÃO DO SISTEMA
// ==========================================

// Exibir produtos ao abrir a página
listarProdutos();
