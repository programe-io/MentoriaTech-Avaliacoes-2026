
let produtos = [];

function cadastrarProduto() {
    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidadeTexto = document.getElementById("quantidade").value;
    const valorTexto = document.getElementById("valor").value;
    const mensagem = document.getElementById("mensagem");

    if (
        document.getElementById("codigo").value === "" ||
        descricao === "" ||
        quantidadeTexto === "" ||
        valorTexto === ""
    ) {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);

    if (
        !Number.isInteger(codigo) || codigo <= 0 ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0
    ) {
        mensagem.textContent = "Confira os valores informados!";
        return;
    }

    const existe = produtos.some(p => p.codigo === codigo);

    if (existe) {
        mensagem.textContent = "Este código já está cadastrado!";
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    mensagem.textContent = "Produto cadastrado com sucesso! 💗";

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.replaceChildren();

    if (produtos.length === 0) {
        lista.textContent = "Nenhum produto cadastrado.";
        return;
    }

    for (const produto of produtos) {
        const item = document.createElement("div");
        item.className = "produto";

        const descricao = document.createElement("p");
        descricao.textContent = "Código: " + produto.codigo;

        const nome = document.createElement("p");
        nome.textContent = "Descrição: " + produto.descricao;

        const quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + produto.quantidade;

        const valor = document.createElement("p");
        valor.textContent = "Valor: " +
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        item.append(descricao, nome, quantidade, valor);
        lista.appendChild(item);
    }
}

function alterarValor() {
    const codigo = Number(
        document.getElementById("codigoAlterar").value
    );
    const novoValorTexto = document.getElementById("novoValor").value;

    if (
        document.getElementById("codigoAlterar").value === "" ||
        novoValorTexto === ""
    ) {
        alert("Informe o código e o novo valor!");
        return;
    }

    const produto = produtos.find(p => p.codigo === codigo);
    const novoValor = Number(novoValorTexto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso! 💗");
    listarProdutos();
}

function alterarQuantidade() {
    const codigo = Number(
        document.getElementById("codigoAlterar").value
    );
    const novaQuantidadeTexto =
        document.getElementById("novaQuantidade").value;

    if (
        document.getElementById("codigoAlterar").value === "" ||
        novaQuantidadeTexto === ""
    ) {
        alert("Informe o código e a nova quantidade!");
        return;
    }

    const produto = produtos.find(p => p.codigo === codigo);
    const novaQuantidade = Number(novaQuantidadeTexto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Informe uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso! 💗");
    listarProdutos();
}
