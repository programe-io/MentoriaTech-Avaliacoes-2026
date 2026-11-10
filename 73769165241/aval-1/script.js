
// Lista inicial de produtos
let produtos = [
    { codigo: 1, descricao: "Borracha", quantidade: 50, valor: 2.50 },
    { codigo: 2, descricao: "Lápis", quantidade: 100, valor: 1.50 },
    { codigo: 3, descricao: "Pratos", quantidade: 30, valor: 15.00 },
    { codigo: 4, descricao: "Tablet", quantidade: 10, valor: 850.00 },
    { codigo: 5, descricao: "Computador", quantidade: 5, valor: 2500.00 }
];

// Próximo código automático
let proximoCodigo = 6;

// Função para validar produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim() === "") {
        alert("Informe a descrição do produto!");
        return false;
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        alert("Informe uma quantidade inteira maior que zero!");
        return false;
    }

    if (valor <= 0 || !Number.isFinite(valor)) {
        alert("Informe um valor válido!");
        return false;
    }

    return true;
}

// Função para cadastrar produto
function cadastrarProduto() {

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!validarProduto(descricao, quantidade, valor)) {
        return;
    }

    const produto = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    proximoCodigo++;

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Função para listar produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;

    });
}

// Função para atualizar o valor
function atualizarValor() {

    const codigo = Number(document.getElementById("codigoAtualizar").value);
    const novoValor = Number(document.getElementById("novoValor").value);

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isFinite(novoValor) || novoValor <= 0) {
        alert("Informe um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor atualizado com sucesso!");

    listarProdutos();
}

// Função para atualizar quantidade
function atualizarQuantidade() {

    const codigo = Number(document.getElementById("codigoQuantidade").value);
    const quantidade = Number(document.getElementById("novaQuantidade").value);

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira maior que zero!");
        return;
    }

    produto.quantidade += quantidade;

    alert("Quantidade atualizada com sucesso!");

    listarProdutos();
}

// Exibir produtos ao abrir a página
listarProdutos();
