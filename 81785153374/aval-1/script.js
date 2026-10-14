let produtos = [];
let proximoCodigo = 1;

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        alert("A descrição deve ter pelo menos 5 caracteres.");
        return false;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade válida.");
        return false;
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Informe um valor válido.");
        return false;
    }

    return true;
}

function cadastrarProduto(descricao, quantidade, valor) {
    if (!validarProduto(descricao, quantidade, valor)) {
        return;
    }

    const produto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    mostrarProdutos();
    form.reset();
}

function mostrarProdutos() {
    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.textContent = "Nenhum produto cadastrado.";
        return;
    }

    produtos.forEach(function(produto) {
        const div = document.createElement("div");
        div.className = "produto";

        const titulo = document.createElement("h3");
        titulo.textContent = produto.descricao;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            "Código: " + produto.codigo +
            " | Quantidade: " + produto.quantidade +
            " | Valor: " +
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        const botao = document.createElement("button");
        botao.textContent = "Remover produto";

        botao.addEventListener("click", function() {
            produtos = produtos.filter(function(item) {
                return item.codigo !== produto.codigo;
            });

            mostrarProdutos();
        });

        div.appendChild(titulo);
        div.appendChild(detalhes);
        div.appendChild(botao);
        lista.appendChild(div);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    cadastrarProduto(descricao, quantidade, valor);
});

mostrarProdutos();