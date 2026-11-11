
let produtos = [];
let codigo = 1;

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5 || quantidade < 0 || valor <= 0) {
        alert("Dados inválidos! Verifique as informações.");
        return;
    }

    let produto = {
        codigo: codigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    listarProdutos();
}

// Função para listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {

        let linha = `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;

        tabela.innerHTML += linha;
    });
}

// Evento do formulário
document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    cadastrarProduto(descricao, quantidade, valor);

    if (descricao.length >= 5 && quantidade >= 0 && valor > 0) {
        document.getElementById("formProduto").reset();
    }

});
