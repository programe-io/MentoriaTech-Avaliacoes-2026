let produtos = [];

const formulario = document.getElementById("formProduto");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor) || valor < 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    const existe = produtos.some(produto => produto.codigo === codigo);

    if (existe) {
        alert("Já existe um produto com esse código!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formulario.reset();
    mostrarProdutos();
});

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const item = document.createElement("div");
        item.className = "produto";

        const informacoes = document.createElement("p");

        informacoes.textContent =
            `Código: ${produto.codigo} | Descrição: ${produto.descricao} | Quantidade: ${produto.quantidade} | Valor: ${produto.valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`;

        const botao = document.createElement("button");
        botao.textContent = "Excluir Produto";
        botao.className = "excluir";

        botao.addEventListener("click", function() {
            produtos.splice(indice, 1);
            mostrarProdutos();
        });

        item.appendChild(informacoes);
        item.appendChild(botao);

        lista.appendChild(item);
    });

    const totalQuantidade = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("totalEstoque").textContent =
        "Total de produtos: " + totalQuantidade;

    document.getElementById("valorEstoque").textContent =
        "Valor total: " + valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}