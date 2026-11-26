
let produtos = [];

function cadastrar() {
    let nome = document.getElementById("produto").value;
    let quantidade = Number(
        document.getElementById("quantidade").value
    );

    if (nome.trim() === "" || !Number.isInteger(quantidade)
        || quantidade < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        nome: nome,
        quantidade: quantidade
    });

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";

    mostrarProdutos();
}

function mostrarProdutos() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        lista.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>
                    <button onclick="entrada(${indice})">
                        Entrada
                    </button>

                    <button onclick="saida(${indice})">
                        Saída
                    </button>

                    <button onclick="excluir(${indice})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

function entrada(indice) {
    produtos[indice].quantidade++;
    mostrarProdutos();
}

function saida(indice) {
    if (produtos[indice].quantidade > 0) {
        produtos[indice].quantidade--;
        mostrarProdutos();
    } else {
        alert("Estoque vazio!");
    }
}

function excluir(indice) {
    produtos.splice(indice, 1);
    mostrarProdutos();
}
