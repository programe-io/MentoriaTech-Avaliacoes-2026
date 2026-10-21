
const form = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

let produtos = JSON.parse(
    localStorage.getItem("produtosCuidadosPessoais") || "[]"
);

function salvarProdutos() {
    localStorage.setItem(
        "produtosCuidadosPessoais",
        JSON.stringify(produtos)
    );
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function formatarValor(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach((produto) => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarValor(produto.valor)
        ];

        dados.forEach((dado) => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");

        const btnValor = document.createElement("button");
        btnValor.textContent = "Alterar valor";
        btnValor.className = "btn-alterar";
        btnValor.addEventListener("click", () => alterarValor(produto.codigo));

        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Alterar quantidade";
        btnQuantidade.className = "btn-alterar";
        btnQuantidade.addEventListener("click", () =>
            alterarQuantidade(produto.codigo)
        );

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.addEventListener("click", () =>
            excluirProduto(produto.codigo)
        );

        celulaAcoes.append(btnValor, btnQuantidade, btnExcluir);
        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(document.getElementById("valor").value);

    if (
        !Number.isSafeInteger(codigo) || codigo <= 0 ||
        descricao === "" ||
        !Number.isSafeInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0
    ) {
        mostrarMensagem("Verifique os dados informados.");
        return;
    }

    const existe = produtos.some(p => p.codigo === codigo);

    if (existe) {
        mostrarMensagem("Já existe um produto com esse código.");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    salvarProdutos();
    listarProdutos();
    form.reset();

    mostrarMensagem("Produto cadastrado com sucesso!");
});

function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const entrada = prompt(
        `Novo valor para ${produto.descricao}:`,
        produto.valor.toFixed(2)
    );

    if (entrada === null || entrada.trim() === "") return;

    const novoValor = Number(entrada.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        mostrarMensagem("Informe um valor válido.");
        return;
    }

    produto.valor = novoValor;
    salvarProdutos();
    listarProdutos();
    mostrarMensagem("Valor alterado com sucesso!");
}

function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const entrada = prompt(
        `Nova quantidade para ${produto.descricao}:`,
        produto.quantidade
    );

    if (entrada === null || entrada.trim() === "") return;

    const novaQuantidade = Number(entrada);

    if (
        !Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        mostrarMensagem("Informe uma quantidade inteira válida.");
        return;
    }

    produto.quantidade = novaQuantidade;
    salvarProdutos();
    listarProdutos();
    mostrarMensagem("Quantidade alterada com sucesso!");
}

function excluirProduto(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    if (!confirm(`Deseja excluir ${produto.descricao}?`)) return;

    produtos = produtos.filter(p => p.codigo !== codigo);

    salvarProdutos();
    listarProdutos();
    mostrarMensagem("Produto excluído com sucesso!");
}

listarProdutos();
