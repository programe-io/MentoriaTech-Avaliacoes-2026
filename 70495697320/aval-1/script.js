
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

function salvarDados() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const preco = Number(
        document.getElementById("preco").value
    );

    if (!nome || quantidade < 1 || preco <= 0 ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(preco)) {
        alert("Informe dados válidos!");
        return;
    }

    const produto = {
        id: Date.now(),
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };

    produtos.push(produto);

    salvarDados();
    mostrarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
}

function mostrarProdutos(filtro = "") {
    lista.innerHTML = "";

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(
            filtro.toLowerCase()
        )
    );

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = produto.nome;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const preco = document.createElement("td");
        preco.textContent = produto.preco.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        );

        const acoes = document.createElement("td");

        const botao = document.createElement("button");
        botao.textContent = "Excluir";
        botao.className = "excluir";

        botao.addEventListener("click", () => {
            excluirProduto(produto.id);
        });

        acoes.appendChild(botao);

        linha.append(nome, quantidade, preco, acoes);
        lista.appendChild(linha);
    });

    document.getElementById("total").textContent =
        produtos.length;

    document.getElementById("unidades").textContent =
        produtos.reduce(
            (soma, produto) => soma + produto.quantidade,
            0
        );
}

function excluirProduto(id) {
    if (confirm("Deseja excluir este produto?")) {
        produtos = produtos.filter(
            produto => produto.id !== id
        );

        salvarDados();
        mostrarProdutos(pesquisa.value);
    }
}

formulario.addEventListener(
    "submit",
    cadastrarProduto
);

pesquisa.addEventListener("input", () => {
    mostrarProdutos(pesquisa.value);
});

mostrarProdutos();
