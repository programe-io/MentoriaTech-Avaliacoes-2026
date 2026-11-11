let produtos = [];
let geradorDeCodigo = 0;

// Cadastrar produto
function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.length < 5) {
        alert("A descrição deve ter no mínimo 5 caracteres.");
        return;
    }

    if (quantidade < 0 || valor <= 0 ||
        document.getElementById("quantidade").value === "") {
        alert("Quantidade ou valor inválido.");
        return;
    }

    let produto = {
        codigo: ++geradorDeCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(produto => {

        lista.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </div>
        `;

    });
}

// Buscar produto
function buscarProduto(codigo) {

    return produtos.find(produto => produto.codigo === codigo);

}

// Alterar valor
function alterarValor() {

    let codigo = Number(document.getElementById("codigo").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigo").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade <= 0) {
        alert("Digite uma quantidade válida.");
        return;
    }

    produto.quantidade += novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}