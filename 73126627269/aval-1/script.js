```javascript
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo === "" || descricao === "" || quantidade === 0 || valor === 0) {
        alert("Preencha todos os campos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// Listar produtos
function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach((produto, index) => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>

                <div class="botoes">
                    <button class="btn-valor" onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button class="btn-quantidade" onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>
                </div>
            </div>
        `;
    });
}

// Alterar valor
function alterarValor(index) {
    let novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (novoValor > 0) {
        produtos[index].valor = novoValor;
        listarProdutos();
        alert("Valor alterado com sucesso!");
    } else {
        alert("Valor inválido!");
    }
}

// Alterar quantidade
function alterarQuantidade(index) {
    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade >= 0) {
        produtos[index].quantidade = novaQuantidade;
        listarProdutos();
        alert("Quantidade alterada com sucesso!");
    } else {
        alert("Quantidade inválida!");
    }
}

// Mostrar lista ao abrir a página
listarProdutos();
```
