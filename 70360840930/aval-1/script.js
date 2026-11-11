
const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

let produtos = JSON.parse(
    localStorage.getItem("estoque")
) || [];

function salvar() {
    localStorage.setItem(
        "estoque",
        JSON.stringify(produtos)
    );
}

function atualizar() {
    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    filtrados.forEach(produto => {
        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = produto.nome;

        const tdCategoria = document.createElement("td");
        tdCategoria.textContent = produto.categoria;

        const tdQuantidade = document.createElement("td");
        tdQuantidade.textContent = produto.quantidade;

        if (produto.quantidade <= 5) {
            tdQuantidade.classList.add("baixo");
        }

        const tdPreco = document.createElement("td");
        tdPreco.textContent = produto.preco.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        );

        const tdAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const mais = document.createElement("button");
        mais.textContent = "+";
        mais.className = "mais";

        mais.addEventListener("click", () => {
            produto.quantidade++;
            salvar();
            atualizar();
        });

        const menos = document.createElement("button");
        menos.textContent = "-";
        menos.className = "menos";

        menos.addEventListener("click", () => {
            if (produto.quantidade > 0) {
                produto.quantidade--;
                salvar();
                atualizar();
            }
        });

        const excluir = document.createElement("button");
        excluir.textContent = "X";
        excluir.className = "excluir";

        excluir.addEventListener("click", () => {
            if (confirm("Deseja excluir este produto?")) {
                produtos = produtos.filter(
                    p => p.id !== produto.id
                );

                salvar();
                atualizar();
            }
        });

        acoes.append(mais, menos, excluir);
        tdAcoes.appendChild(acoes);

        tr.append(
            tdNome,
            tdCategoria,
            tdQuantidade,
            tdPreco,
            tdAcoes
        );

        lista.appendChild(tr);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        produtos.reduce((total, p) => total + p.quantidade, 0);

    const valor = produtos.reduce(
        (total, p) => total + p.quantidade * p.preco,
        0
    );

    document.getElementById("valorEstoque").textContent =
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("estoqueBaixo").textContent =
        produtos.filter(p => p.quantidade <= 5).length;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (
        !nome ||
        !categoria ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(preco) ||
        preco < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        id: Date.now(),
        nome,
        categoria,
        quantidade,
        preco
    });

    salvar();
    atualizar();
    form.reset();
});

pesquisa.addEventListener("input", atualizar);

atualizar();
