
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

let editando = null;

function salvar() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

function atualizarDashboard() {
    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        produtos.reduce((s, p) => s + p.quantidade, 0);

    document.getElementById("estoqueBaixo").textContent =
        produtos.filter(p => p.quantidade <= 5).length;

    const valor = produtos.reduce(
        (s, p) => s + p.preco * p.quantidade, 0
    );

    document.getElementById("valorEstoque").textContent =
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function renderizar(filtro = "") {
    lista.innerHTML = "";

    const encontrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    encontrados.forEach(p => {
        const indice = produtos.indexOf(p);

        const status = p.quantidade <= 5
            ? '<span class="status-baixo">Estoque baixo</span>'
            : '<span class="status-ok">Disponível</span>';

        const linha = document.createElement("tr");

        const dados = [
            p.nome,
            p.categoria,
            p.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
            p.quantidade
        ];

        dados.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const tdStatus = document.createElement("td");
        tdStatus.innerHTML = status;
        linha.appendChild(tdStatus);

        const tdAcoes = document.createElement("td");
        tdAcoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = () => editarProduto(indice);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirProduto(indice);

        tdAcoes.append(editar, excluir);
        linha.appendChild(tdAcoes);

        lista.appendChild(linha);
    });

    atualizarDashboard();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || !categoria || preco <= 0 ||
        !Number.isFinite(preco) || !Number.isInteger(quantidade) ||
        quantidade < 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    const produto = {
        nome,
        categoria,
        preco,
        quantidade
    };

    if (editando !== null) {
        produtos[editando] = produto;
        editando = null;
        form.querySelector("button").textContent =
            "Adicionar produto";
    } else {
        produtos.push(produto);
    }

    salvar();
    renderizar();

    form.reset();
});

function editarProduto(indice) {
    const p = produtos[indice];

    document.getElementById("nome").value = p.nome;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("preco").value = p.preco;
    document.getElementById("quantidade").value = p.quantidade;

    editando = indice;

    form.querySelector("button").textContent =
        "Salvar alterações";

    form.scrollIntoView({ behavior: "smooth" });
}

function excluirProduto(indice) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(indice, 1);
        salvar();
        renderizar();
    }
}

document.getElementById("pesquisa")
    .addEventListener("input", function() {
        renderizar(this.value);
    });

renderizar();
