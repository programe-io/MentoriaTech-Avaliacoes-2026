
let produtos = [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Validar os dados
    if (descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    // Verificar código duplicado
    const existe = produtos.some(
        produto => produto.codigo === codigo
    );

    if (existe) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formulario.reset();
    listarProdutos();
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td class="acoes">
                <button class="btn-valor"
                    onclick="alterarValor(${indice})">
                    Valor
                </button>

                <button class="btn-quantidade"
                    onclick="alterarQuantidade(${indice})">
                    Estoque
                </button>

                <button class="btn-excluir"
                    onclick="excluirProduto(${indice})">
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// Alterar valor do produto
function alterarValor(indice) {
    const novoValor = prompt("Digite o novo valor:");

    if (novoValor !== null && novoValor.trim() !== "") {
        const valor = Number(novoValor);

        if (Number.isFinite(valor) && valor >= 0) {
            produtos[indice].valor = valor;
            listarProdutos();
        } else {
            alert("Valor inválido!");
        }
    }
}

// Alterar quantidade
function alterarQuantidade(indice) {
    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade.trim() !== "") {
        const quantidade = Number(novaQuantidade);

        if (Number.isInteger(quantidade) && quantidade >= 0) {
            produtos[indice].quantidade = quantidade;
            listarProdutos();
        } else {
            alert("Quantidade inválida!");
        }
    }
}

// Excluir produto
function excluirProduto(indice) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(indice, 1);
        listarProdutos();
    }
}

// Atualizar os indicadores
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorTotal").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}
