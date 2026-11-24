
let produtos = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!descricao || quantidade < 0 || valor < 0 ||
        !Number.isFinite(quantidade) || !Number.isFinite(valor)) {
        alert("Preencha os dados corretamente!");
        return;
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formulario.reset();
    renderizarProdutos();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function renderizarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td></td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td class="acoes">
                <button onclick="alterarValor(${produto.codigo})">
                    Alterar valor
                </button>
                <button onclick="alterarQuantidade(${produto.codigo})">
                    Alterar quantidade
                </button>
            </td>
        `;

        linha.children[1].textContent = produto.descricao;
        listaProdutos.appendChild(linha);
    });
}

// Alterar valor
function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = valor;
    renderizarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isFinite(quantidade) || quantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = quantidade;
    renderizarProdutos();

    alert("Quantidade alterada com sucesso!");
}
