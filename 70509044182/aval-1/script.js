
let produtos = [];

function adicionarProduto() {
    const nome = document.getElementById("nome").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (nome === "" || !Number.isInteger(quantidade) ||
        quantidade <= 0 || !Number.isFinite(preco) || preco < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        nome: nome,
        quantidade: quantidade,
        preco: preco
    });

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

    mostrarProdutos();
}

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        if (!produto.nome.toLowerCase().includes(pesquisa)) {
            return;
        }

        const linha = document.createElement("tr");

        const status = produto.quantidade <= 5
            ? '<span class="baixo">Estoque baixo</span>'
            : '<span class="normal">Disponível</span>';

        linha.innerHTML = `
            <td></td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>
            <td>${status}</td>
            <td>
                <div class="acoes">
                    <button onclick="alterarQuantidade(${indice}, -1)">-</button>
                    <button onclick="alterarQuantidade(${indice}, 1)">+</button>
                    <button class="remover" onclick="excluirProduto(${indice})">🗑</button>
                </div>
            </td>
        `;

        linha.children[0].textContent = produto.nome;
        lista.appendChild(linha);
    });

    atualizarResumo();
}

function alterarQuantidade(indice, valor) {
    if (produtos[indice].quantidade + valor < 0) {
        alert("Não há quantidade suficiente no estoque!");
        return;
    }

    produtos[indice].quantidade += valor;
    mostrarProdutos();
}

function excluirProduto(indice) {
    if (confirm("Deseja realmente excluir este produto?")) {
        produtos.splice(indice, 1);
        mostrarProdutos();
    }
}

function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalQuantidade = produtos.reduce(
        (soma, produto) => soma + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (soma, produto) => soma + produto.quantidade * produto.preco, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalQuantidade").textContent =
        totalQuantidade;

    document.getElementById("valorEstoque").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

mostrarProdutos();
