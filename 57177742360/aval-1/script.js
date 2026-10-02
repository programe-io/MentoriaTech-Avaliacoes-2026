let produtos = [];

// Adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("produto").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (nome === "" || quantidade <= 0 || preco <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    produtos.push({
        nome: nome,
        quantidade: quantidade,
        preco: preco
    });

    // Limpar campos
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

    mostrarProdutos();
}

// Mostrar produtos na tabela
function mostrarProdutos(lista = produtos) {
    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    lista.forEach((produto) => {
        const index = produtos.indexOf(produto);

        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button class="excluir" onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    atualizarResumo();
}

// Excluir produto
function excluirProduto(index) {
    produtos.splice(index, 1);
    mostrarProdutos();
}

// Pesquisar produto
function pesquisarProduto() {
    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const resultado = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    );

    mostrarProdutos(resultado);
}

// Atualizar resumo
function atualizarResumo() {
    document.getElementById("totalProdutos").textContent =
        produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("totalItens").textContent =
        totalItens;
}