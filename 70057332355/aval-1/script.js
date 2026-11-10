
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        quantidade < 0 || valor < 0) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(p => {

        lista.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${p.codigo}<br>
                <strong>Descrição:</strong> ${p.descricao}<br>
                <strong>Quantidade:</strong> ${p.quantidade}<br>
                <strong>Valor:</strong> R$ ${p.valor.toFixed(2)}
            </div>
        `;

    });
}

// Alterar valor
function alterarValor() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = document.getElementById("novoValor").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor === "" || Number(novoValor) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = Number(novoValor);

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = document.getElementById("novaQuantidade").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade === "" || Number(novaQuantidade) < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}
