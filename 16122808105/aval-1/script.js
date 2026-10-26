```javascript
let produtos = [];

function mostrarMensagem(texto) {
    document.getElementById("mensagem").textContent = texto;
}

function cadastrarProduto() {
    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao) {
        mostrarMensagem("Informe o código e a descrição do produto.");
        return;
    }

    if (produtos.some(produto => produto.codigo === codigo)) {
        mostrarMensagem("Já existe um produto com esse código.");
        return;
    }

    if (
        document.getElementById("quantidade").value === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {
        mostrarMensagem("Informe uma quantidade inteira válida.");
        return;
    }

    if (
        document.getElementById("valor").value === "" ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        mostrarMensagem("Informe um valor válido.");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
    mostrarMensagem("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.replaceChildren();

    if (produtos.length === 0) {
        lista.textContent = "Nenhum produto cadastrado.";
        return;
    }

    produtos.forEach(produto => {
        const item = document.createElement("div");
        item.className = "produto";

        const detalhes = document.createElement("p");
        detalhes.textContent =
            "Código: " + produto.codigo +
            " | Descrição: " + produto.descricao +
            " | Quantidade: " + produto.quantidade +
            " | Valor: " +
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        item.appendChild(detalhes);
        lista.appendChild(item);
    });
}

function alterarValor() {
    const codigo = document.getElementById("codigoAlteracao").value.trim();
    const campoValor = document.getElementById("novoValor");
    const novoValor = Number(campoValor.value);

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.");
        return;
    }

    if (campoValor.value === "" || !Number.isFinite(novoValor) || novoValor < 0) {
        mostrarMensagem("Informe um novo valor válido.");
        return;
    }

    produto.valor = novoValor;
    campoValor.value = "";

    listarProdutos();
    mostrarMensagem("Valor alterado com sucesso!");
}

function alterarQuantidade() {
    const codigo = document.getElementById("codigoAlteracao").value.trim();
    const campoQuantidade = document.getElementById("novaQuantidade");
    const novaQuantidade = Number(campoQuantidade.value);

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.");
        return;
    }

    if (
        campoQuantidade.value === "" ||
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        mostrarMensagem("Informe uma quantidade inteira válida.");
        return;
    }

    produto.quantidade = novaQuantidade;
    campoQuantidade.value = "";

    listarProdutos();
    mostrarMensagem("Quantidade alterada com sucesso!");
}
```