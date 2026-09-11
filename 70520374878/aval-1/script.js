const form = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const contador = document.getElementById("contador");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const preco = Number(document.getElementById("preco").value);
    const estoque = Number(document.getElementById("estoque").value);
    const descricao = document.getElementById("descricao").value.trim();

    const produto = {
        id: Date.now(),
        nome,
        categoria,
        preco,
        estoque,
        descricao
    };

    produtos.push(produto);

    salvarProdutos();
    mostrarProdutos();

    form.reset();

    alert("Produto cadastrado com sucesso!");
});

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mostrarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <p class="sem-produtos">
                Nenhum produto cadastrado.
            </p>
        `;

        atualizarContador();
        return;
    }

    produtos.forEach(function (produto) {
        const produtoElement = document.createElement("div");

        produtoElement.classList.add("produto");

        produtoElement.innerHTML = `
            <div class="produto-info">
                <h3>${produto.nome}</h3>

                <p>
                    <strong>Categoria:</strong>
                    ${produto.categoria}
                </p>

                <p>
                    <strong>Estoque:</strong>
                    ${produto.estoque} unidade(s)
                </p>

                <p class="produto-preco">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </p>

                ${
                    produto.descricao
                        ? `<p><strong>Descrição:</strong> ${produto.descricao}</p>`
                        : ""
                }
            </div>

            <div class="produto-acoes">
                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})"
                >
                    Excluir
                </button>
            </div>
        `;

        listaProdutos.appendChild(produtoElement);
    });

    atualizarContador();
}

function excluirProduto(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(function (produto) {
        return produto.id !== id;
    });

    salvarProdutos();
    mostrarProdutos();
}

function atualizarContador() {
    const quantidade = produtos.length;

    if (quantidade === 1) {
        contador.textContent = "1 produto";
    } else {
        contador.textContent = `${quantidade} produtos`;
    }
}

// Carrega os produtos salvos quando a página é aberta
mostrarProdutos();
