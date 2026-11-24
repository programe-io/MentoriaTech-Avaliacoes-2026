
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("formProduto");

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    atualizarTabela();
    atualizarDashboard();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || !codigo || preco < 0 ||
        quantidade < 0 || !Number.isInteger(quantidade)) {
        alert("Verifique os dados informados!");
        return;
    }

    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        id: Date.now(),
        nome,
        codigo,
        preco,
        quantidade
    };

    produtos.push(produto);

    salvar();
    form.reset();

    alert("Produto cadastrado com sucesso!");
});

function atualizarTabela() {
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    produtos
        .filter(p => p.nome.toLowerCase().includes(pesquisa) ||
                     p.codigo.toLowerCase().includes(pesquisa))
        .forEach(p => {
            const linha = document.createElement("tr");

            const valores = [
                p.nome,
                p.codigo,
                p.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }),
                p.quantidade,
                (p.preco * p.quantidade).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
            ];

            valores.forEach(valor => {
                const td = document.createElement("td");
                td.textContent = valor;
                linha.appendChild(td);
            });

            const acoes = document.createElement("td");

            const editar = document.createElement("button");
            editar.textContent = "Editar";
            editar.className = "editar";
            editar.onclick = () => editarProduto(p.id);

            const excluir = document.createElement("button");
            excluir.textContent = "Excluir";
            excluir.className = "excluir";
            excluir.style.marginLeft = "5px";
            excluir.onclick = () => excluirProduto(p.id);

            acoes.append(editar, excluir);
            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
}

function atualizarDashboard() {
    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        produtos.reduce((total, p) => total + p.quantidade, 0);

    const valor = produtos.reduce(
        (total, p) => total + p.preco * p.quantidade, 0
    );

    document.getElementById("valorEstoque").textContent =
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const novoNome = prompt("Nome:", produto.nome);
    if (novoNome === null || !novoNome.trim()) return;

    const novoPreco = prompt("Preço:", produto.preco);
    if (novoPreco === null) return;

    const novoCodigo = prompt("Código:", produto.codigo);
    if (novoCodigo === null || !novoCodigo.trim()) return;

    const novaQuantidade = prompt("Quantidade:", produto.quantidade);
    if (novaQuantidade === null) return;

    const preco = Number(novoPreco);
    const quantidade = Number(novaQuantidade);

    if (!Number.isFinite(preco) || preco < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        alert("Valores inválidos!");
        return;
    }

    if (produtos.some(p =>
        p.id !== id &&
        p.codigo.toLowerCase() === novoCodigo.trim().toLowerCase()
    )) {
        alert("Código já utilizado!");
        return;
    }

    produto.nome = novoNome.trim();
    produto.codigo = novoCodigo.trim();
    produto.preco = preco;
    produto.quantidade = quantidade;

    salvar();
}

function excluirProduto(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    produtos = produtos.filter(p => p.id !== id);

    salvar();
}

document.getElementById("pesquisa")
    .addEventListener("input", atualizarTabela);

atualizarTabela();
atualizarDashboard();
