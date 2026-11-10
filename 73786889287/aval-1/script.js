
let produtos = [
    {
        codigo: 1,
        descricao: "SmartDesk LED",
        quantidade: 25,
        valor: 149.90
    }
];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
            (produto.quantidade * produto.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(dado => {
            const td = document.createElement("td");
            td.textContent = dado;
            linha.appendChild(td);
        });

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const btnValor = document.createElement("button");
        btnValor.className = "btn-valor";
        btnValor.textContent = "Alterar valor";
        btnValor.onclick = () => atualizarValor(produto.codigo);

        const btnQuantidade = document.createElement("button");
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.textContent = "Adicionar estoque";
        btnQuantidade.onclick = () => atualizarQuantidade(produto.codigo);

        acoes.append(btnValor, btnQuantidade);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        produtos.reduce((total, p) => total + p.quantidade, 0);
}

function atualizarValor(codigoProduto) {
    const produto = produtos.find(p => p.codigo === codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novoValor = Number(prompt("Digite o novo valor:"));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
    alert("Valor atualizado!");
}

function atualizarQuantidade(codigoProduto) {
    const produto = produtos.find(p => p.codigo === codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novaQuantidade = Number(
        prompt("Digite a quantidade que deseja adicionar:")
    );

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
    alert("Estoque atualizado!");
}

document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        this.reset();

        alert("Produto cadastrado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
});

// Mostrar produto já cadastrado ao abrir a página.
listarProdutos();
