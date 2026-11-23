
const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const totalEstoque = document.getElementById("totalEstoque");

// Lista para armazenar os produtos
let produtos = [];

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados
    const nome = document.getElementById("nome").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);
    const categoria = document.getElementById("categoria").value;

    // Validar os dados
    if (!nome || !codigo || !categoria ||
        !Number.isFinite(preco) || preco <= 0 ||
        !Number.isInteger(quantidade) || quantidade <= 0) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    const existe = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (existe) {
        alert("Este código de produto já está cadastrado!");
        return;
    }

    // Criar objeto do produto
    const produto = {
        nome,
        codigo,
        preco,
        quantidade,
        categoria
    };

    // Adicionar produto na lista
    produtos.push(produto);

    // Atualizar a tabela
    exibirProdutos();

    // Limpar formulário
    formulario.reset();

});

// Exibir produtos na tabela
function exibirProdutos() {

    listaProdutos.innerHTML = "";

    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        const valores = [
            produto.nome,
            produto.codigo,
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
            produto.quantidade,
            produto.categoria
        ];

        valores.forEach(valor => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaAcao = document.createElement("td");

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");

        botaoExcluir.addEventListener("click", function() {
            excluirProduto(index);
        });

        colunaAcao.appendChild(botaoExcluir);
        linha.appendChild(colunaAcao);

        listaProdutos.appendChild(linha);

    });

    calcularEstoque();
}

// Excluir produto
function excluirProduto(index) {

    const confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {
        produtos.splice(index, 1);
        exibirProdutos();
    }

}

// Calcular valor total do estoque
function calcularEstoque() {

    let total = 0;

    produtos.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });

    totalEstoque.textContent =
        "Valor total do estoque: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

}
