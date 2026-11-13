
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || !valor) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Código já cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
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

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        if (novaQuantidade < 0 || document.getElementById("novaQuantidade").value === "") {
            alert("Digite uma quantidade válida!");
            return;
        }

        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");

        listarProdutos();

    } else {

        alert("Produto não encontrado!");

    }
}
