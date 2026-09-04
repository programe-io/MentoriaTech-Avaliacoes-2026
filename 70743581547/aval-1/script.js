let produtos = [];

function cadastrarProduto() {
    let codigo = Number(prompt("Digite o código do produto:"));
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Digite informações válidas!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    let resultado = document.getElementById("resultado");

    if (produtos.length === 0) {
        resultado.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    resultado.innerHTML = "<h2>Produtos cadastrados:</h2>";

    produtos.forEach(produto => {
        resultado.innerHTML += `
            <div class="produto">
                <h3>${produto.descricao}</h3>
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;
    });
}

function alterarValor() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        let novoValor = Number(prompt("Digite o novo valor:"));

        if (novoValor >= 0) {
            produto.valor = novoValor;
            alert("Valor alterado com sucesso!");
            listarProdutos();
        } else {
            alert("Valor inválido!");
        }
    } else {
        alert("Produto não encontrado!");
    }
}

function alterarQuantidade() {
    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

        if (novaQuantidade >= 0) {
            produto.quantidade = novaQuantidade;
            alert("Quantidade alterada com sucesso!");
            listarProdutos();
        } else {
            alert("Quantidade inválida!");
        }
    } else {
        alert("Produto não encontrado!");
    }
}