let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let movimentacoes =
    JSON.parse(localStorage.getItem("movimentacoes")) || [];


/* =========================
   NAVEGAÇÃO
========================= */

function mostrarPagina(pagina) {

    document.querySelectorAll(".pagina").forEach(secao => {
        secao.classList.add("escondido");
    });

    document.getElementById(pagina).classList.remove("escondido");

    atualizarSistema();
}


/* =========================
   MODAL
========================= */

function abrirModal(id = null) {

    document.getElementById("modal").classList.remove("escondido");

    if (id !== null) {

        const produto = produtos.find(p => p.id === id);

        document.getElementById("tituloModal").textContent =
            "Editar Produto";

        document.getElementById("produtoId").value = produto.id;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("categoria").value = produto.categoria;
        document.getElementById("preco").value = produto.preco;
        document.getElementById("quantidade").value = produto.quantidade;
        document.getElementById("minimo").value = produto.minimo;

    } else {

        document.getElementById("tituloModal").textContent =
            "Novo Produto";

        document.getElementById("formProduto").reset();

        document.getElementById("produtoId").value = "";
    }
}


function fecharModal() {
    document.getElementById("modal").classList.add("escondido");
}


/* =========================
   CADASTRO / EDIÇÃO
========================= */

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const id = document.getElementById("produtoId").value;

        const nome = document.getElementById("nome").value.trim();
        const categoria = document.getElementById("categoria").value.trim();
        const preco = Number(document.getElementById("preco").value);
        const quantidade = Number(document.getElementById("quantidade").value);
        const minimo = Number(document.getElementById("minimo").value);

        if (id) {

            const produto = produtos.find(p => p.id == id);

            produto.nome = nome;
            produto.categoria = categoria;
            produto.preco = preco;
            produto.quantidade = quantidade;
            produto.minimo = minimo;

        } else {

            const novoProduto = {
                id: Date.now(),
                nome,
                categoria,
                preco,
                quantidade,
                minimo
            };

            produtos.push(novoProduto);

            registrarMovimentacao(
                novoProduto.nome,
                "Entrada",
                quantidade
            );
        }

        salvarDados();

        fecharModal();

        atualizarSistema();
    });


/* =========================
   LISTAR PRODUTOS
========================= */

function listarProdutos() {

    const tabela = document.getElementById("tabelaProdutos");

    const pesquisa =
        document.getElementById("pesquisa").value.toLowerCase();

    tabela.innerHTML = "";

    const lista = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(pesquisa) ||
        produto.categoria.toLowerCase().includes(pesquisa)
    );

    if (lista.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(produto => {

        const estoqueBaixo =
            produto.quantidade <= produto.minimo;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${produto.quantidade}</td>

            <td>${produto.minimo}</td>

            <td>
                <span class="status ${estoqueBaixo ? "baixo" : "ok"}">
                    ${estoqueBaixo ? "Estoque baixo" : "Normal"}
                </span>
            </td>

            <td>
                <button
                    class="btn-editar"
                    onclick="abrirModal(${produto.id})">
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}


/* =========================
   EXCLUIR
========================= */

function excluirProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const confirmar = confirm(
        `Deseja excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();

    atualizarSistema();
}


/* =========================
   MOVIMENTAÇÕES
========================= */

function registrarMovimentacao(produto, tipo, quantidade) {

    movimentacoes.unshift({
        id: Date.now(),
        data: new Date().toLocaleString("pt-BR"),
        produto,
        tipo,
        quantidade
    });

    salvarDados();
}


function listarMovimentacoes() {

    const tabela =
        document.getElementById("tabelaMovimentacoes");

    tabela.innerHTML = "";

    if (movimentacoes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">
                    Nenhuma movimentação registrada.
                </td>
            </tr>
        `;

        return;
    }

    movimentacoes.forEach(mov => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${mov.data}</td>
            <td>${mov.produto}</td>
            <td>${mov.tipo}</td>
            <td>${mov.quantidade}</td>
        `;

        tabela.appendChild(linha);
    });
}


/* =========================
   DASHBOARD
========================= */

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalEstoque = produtos.reduce(
        (total, produto) =>
            total + Number(produto.quantidade),
        0
    );

    const produtosBaixos = produtos.filter(
        produto =>
            produto.quantidade <= produto.minimo
    );

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total +
            Number(produto.preco) *
            Number(produto.quantidade),
        0
    );

    document.getElementById("totalProdutos")
        .textContent = totalProdutos;

    document.getElementById("totalEstoque")
        .textContent = totalEstoque;

    document.getElementById("estoqueBaixo")
        .textContent = produtosBaixos.length;

    document.getElementById("valorEstoque")
        .textContent = formatarMoeda(valorEstoque);


    const tabela =
        document.getElementById("tabelaBaixoEstoque");

    tabela.innerHTML = "";

    if (produtosBaixos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">
                    Nenhum produto com estoque baixo.
                </td>
            </tr>
        `;

        return;
    }

    produtosBaixos.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.minimo}</td>
        `;

        tabela.appendChild(linha);
    });
}


/* =========================
   UTILITÁRIOS
========================= */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


function salvarDados() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );
}


function atualizarSistema() {

    listarProdutos();
    listarMovimentacoes();
    atualizarDashboard();
}


/* =========================
   INICIALIZAÇÃO
========================= */

atualizarSistema();
