
let produtos = [];

const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar código repetido
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Já existe um produto com esse código!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    formulario.reset();

    listarProdutos();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>

                <td class="acoes">
                    <button class="editar" onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Alterar valor
function alterarValor(index) {
    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(index) {
    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}
