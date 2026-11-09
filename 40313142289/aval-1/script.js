const estoque = [];
let proximoId = 1;

function cadastrarProduto() {
    const nome = document.getElementById("nome").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (nome === "" || quantidade < 0 || !Number.isInteger(quantidade) ||
        preco <= 0 || !Number.isFinite(preco)) {
        alert("Preencha os campos corretamente!");
        return;
    }

    const produto = {
        id: proximoId++,
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };

    estoque.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

    listarEstoque();
}

function listarEstoque() {
    const lista = document.getElementById("listaEstoque");

    if (estoque.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    let tabela = `
        <table>
            <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Ações</th>
            </tr>
    `;

    estoque.forEach(produto => {
        tabela += `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button onclick="adicionarEstoque(${produto.id})">
                        +
                    </button>
                    <button onclick="removerEstoque(${produto.id})">
                        -
                    </button>
                </td>
            </tr>
        `;
    });

    tabela += "</table>";

    lista.innerHTML = tabela;
}

function adicionarEstoque(id) {
    const produto = estoque.find(item => item.id === id);

    if (produto) {
        produto.quantidade++;
        listarEstoque();
    }
}

function removerEstoque(id) {
    const produto = estoque.find(item => item.id === id);

    if (produto && produto.quantidade > 0) {
        produto.quantidade--;
        listarEstoque();
    } else {
        alert("Estoque insuficiente!");
    }
}

listarEstoque();
