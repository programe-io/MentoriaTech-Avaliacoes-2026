
let produtos = [];
let codigo = 1;

const formulario = document.getElementById("form");

function cadastrarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("O nome precisa ter 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade inválida.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor inválido.");
    }

    const produto = {
        codigo: codigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(produto);
    listarProdutos();
}

function listarProdutos() {
    const area = document.getElementById("produtos");
    area.innerHTML = "";

    produtos.forEach(produto => {
        const item = document.createElement("div");
        item.className = "produto";

        const nome = document.createElement("h3");
        nome.textContent = produto.descricao;

        const info = document.createElement("p");
        info.textContent =
            `Código: ${produto.codigo} | Quantidade: ${produto.quantidade} | Valor: ${produto.valor.toLocaleString("pt-BR", {style:"currency",currency:"BRL"})}`;

        const alterar = document.createElement("button");
        alterar.textContent = "Adicionar estoque";
        alterar.onclick = () => {
            const qtd = Number(prompt("Quantidade a adicionar:"));

            if (Number.isInteger(qtd) && qtd > 0) {
                produto.quantidade += qtd;
                listarProdutos();
            } else if (qtd !== 0) {
                alert("Informe uma quantidade inteira válida.");
            }
        };

        const excluir