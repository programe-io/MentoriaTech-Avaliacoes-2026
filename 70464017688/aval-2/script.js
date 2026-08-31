let estoque = [
    { codigo: "1", descricao: "Caneta Azul", quantidade: 100, valor: 2.50 },
    { codigo: "2", descricao: "Caderno Universitário", quantidade: 50, valor: 15.00 },
    { codigo: "3", descricao: "Lápis HB", quantidade: 200, valor: 1.20 },
    { codigo: "4", descricao: "Borracha Branca", quantidade: 80, valor: 0.80 }
];

// Função para cadastrar novo produto
function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);
    let valor = parseFloat(document.getElementById("valor").value);

    let produto = { codigo, descricao, quantidade, valor };
    estoque.push(produto);

    alert("Produto cadastrado com sucesso!");
    listarProdutos();
}

// Função para listar produtos
function listarProdutos() {
    let lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";
    estoque.forEach(p => {
        let item = document.createElement("li");
        item.textContent = `Código: ${p.codigo} | ${p.descricao} | Quantidade: ${p.quantidade} | Valor: R$${p.valor.toFixed(2)}`;
        lista.appendChild(item);
    });
}

// Função para alterar valor
function alterarValor() {
    let codigo = document.getElementById("codigoAlterar").value;
    let novoValor = parseFloat(document.getElementById("novoValor").value);

    let produto = estoque.find(p => p.codigo === codigo);
    if (produto) {
        produto.valor = novoValor;
        alert("Valor alterado com sucesso!");
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}

// Função para alterar quantidade
function alterarQuantidade() {
    let codigo = document.getElementById("codigoAlterar").value;
    let novaQuantidade = parseInt(document.getElementById("novaQuantidade").value);

    let produto = estoque.find(p => p.codigo === codigo);
    if (produto) {
        produto.quantidade = novaQuantidade;
        alert("Quantidade alterada com sucesso!");
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}

// Exibir produtos iniciais ao carregar a página
window.onload = listarProdutos;
