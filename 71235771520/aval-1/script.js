```javascript
let produtos = [];

// Cadastrar um novo produto
function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    if (codigo === "" || descricao === "" ||
        quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    });

    alert("Produto cadastrado com sucesso!");
}

// Listar os produtos cadastrados
function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<li>Nenhum produto cadastrado.</li>";
        return;
    }

    produtos.forEach(function(p) {
        let item = document.createElement("li");

        item.textContent =
            "Código: " + p.codigo +
            " | Descrição: " + p.descricao +
            " | Quantidade: " + p.quantidade +
            " | Valor: R$ " + p.valor.toFixed(2);

        lista.appendChild(item);
    });
}

// Alterar o valor de um produto
function alterarValor() {
    let codigo = document.getElementById("codigoValor").value;
    let novoValor = document.getElementById("novoValor").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor === "" || Number(novoValor) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = Number(novoValor);

    alert("Valor alterado com sucesso!");
    listar();
}

// Alterar a quantidade de um produto
function alterarQuantidade() {
    let codigo = document.getElementById("codigoQuantidade").value;
    let novaQuantidade = document.getElementById("novaQuantidade").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade === "" || Number(novaQuantidade) < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada com sucesso!");
    listar();
}
```
