```javascript
// ===============================
// DADOS
// ===============================

let produtos = JSON.parse(localStorage.getItem("stockpro_produtos")) || [];

let movimentacoes =
    JSON.parse(localStorage.getItem("stockpro_movimentacoes")) || [];


// ===============================
// SALVAR
// ===============================

function salvarDados() {
    localStorage.setItem(
        "stockpro_produtos",
        JSON.stringify(produtos)
    );

    localStorage.setItem(
        "stockpro_movimentacoes",
        JSON.stringify(movimentacoes)
    );
}


// ===============================
// FORMATAÇÃO
// ===============================

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function dataAtual() {
    return new Date().toLocaleString("pt-BR");
}


// ===============================
// NAVEGAÇÃO
// ===============================

function mostrarTela(id, botao) {

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.add("escondido");
    });

    document.getElementById(id).classList.remove("escondido");

    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    atualizarTudo();
}


// ===============================
// MODAL
// ===============================

function abrirModal(id = null) {

    document.getElementById("modal").classList.add("aberto");

    if (id !== null) {

        const produto = produtos.find(p => p.id === id);

        if (!produto) return;

        document.getElementById("tituloModal").textContent =
            "Editar produto";

        document.getElementById("produtoId").value = produto.id;
        document.getElementById("nomeProduto").value = produto.nome;
        document.getElementById("categoriaProduto").value = produto.categoria;
        document.getElementById("quantidadeProduto").value = produto.quantidade;
        document.getElementById("precoProduto").value = produto.preco;
        document.getElementById("minimoProduto").value = produto.minimo;

    } else {

        document.getElementById("tituloModal").textContent =
            "Novo produto";

        limparFormulario();
    }
}


function fecharModal() {

    document.getElementById("modal").classList.remove("aberto");

    limparFormulario();
}


function limparFormulario() {

    document.getElementById("produtoId").value = "";
    document.getElementById("nomeProduto").value = "";
    document.getElementById("categoriaProduto").value = "";
    document.getElementById("quantidadeProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("minimoProduto").value = "";
}


// ===============================
// SALVAR PRODUTO
// ===============================

function salvarProduto() {

    const id = document.getElementById("produtoId").value;

    const nome =
        document.getElementById("nomeProduto").value.trim();

    const categoria =
        document.getElementById("categoriaProduto").value.trim();

    const quantidade =
        Number(document.getElementById("quantidadeProduto").value);

    const preco =
        Number(document.getElementById("precoProduto").value);

    const minimo =
        Number(document.getElementById("minimoProduto").value);


    if (!nome) {
        alert("Digite o nome do produto.");
        return;
    }

    if (!categoria) {
        alert("Digite a categoria.");
        return;
    }

    if (quantidade < 0 || isNaN(quantidade)) {
        alert("Digite uma quantidade válida.");
        return;
    }

    if (preco < 0 || isNaN(preco)) {
        alert("Digite um preço válido.");
        return;
    }

    if (minimo < 0 || isNaN(minimo)) {
        alert("Digite um estoque mínimo válido.");
        return;
    }


    // EDITAR
    if (id) {

        const produto = produtos.find(
            p => p.id === Number(id)
        );

        if (produto) {

            produto.nome = nome;
            produto.categoria = categoria;
            produto.quantidade = quantidade;
            produto.preco = preco;
            produto.minimo = minimo;
        }

    }

    // NOVO
    else {

        const novoProduto = {

            id: Date.now(),

            nome: nome,

            categoria: categoria,

            quantidade: quantidade,

            preco: preco,

            minimo: minimo
        };

        produtos.push(novoProduto);

        movimentacoes.unshift({

            data: dataAtual(),

            produto: nome,

            tipo: "Cadastro",

            quantidade: quantidade
        });
    }


    salvarDados();

    fecharModal();

    atualizarTudo();
}


// ===============================
// EXCLUIR
// ===============================

function excluirProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const confirmar = confirm(
        `Deseja excluir "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();

    atualizarTudo();
}


// ===============================
// ENTRADA
// ===============================

function entradaProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const valor = prompt(
        `Digite a quantidade de entrada para "${produto.nome}":`
    );

    if (valor === null) return;

    const quantidade = Number(valor);

    if (!Number.isInteger(quantidade) || quantidade <= 0) {

        alert("Digite uma quantidade inteira maior que zero.");

        return;
    }

    produto.quantidade += quantidade;

    movimentacoes.unshift({

        data: dataAtual(),

        produto: produto.nome,

        tipo: "Entrada",

        quantidade: quantidade
    });

    salvarDados();

    atualizarTudo();
}


// ===============================
// SAÍDA
// ===============================

function saidaProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const valor = prompt(
        `Digite a quantidade de saída para "${produto.nome}":`
    );

    if (valor === null) return;

    const quantidade = Number(valor);

    if (!Number.isInteger(quantidade) || quantidade <= 0) {

        alert("Digite uma quantidade inteira maior que zero.");

        return;
    }

    if (quantidade > produto.quantidade) {

        alert("Não há quantidade suficiente no estoque.");

        return;
    }

    produto.quantidade -= quantidade;

    movimentacoes.unshift({

        data: dataAtual(),

        produto: produto.nome,

        tipo: "Saída",

        quantidade: quantidade
    });

    salvarDados();

    atualizarTudo();
}


// ===============================
// STATUS
// ===============================

function statusProduto(produto) {

    if (produto.quantidade <= produto.minimo) {

        return `
            <span class="status baixo">
                Estoque baixo
            </span>
        `;
    }

    return `
        <span class="status ok">
            Normal
        </span>
    `;
}


// ===============================
// PRODUTOS
// ===============================

function renderizarProdutos() {

    const tabela =
        document.getElementById("tabelaProdutos");

    const pesquisa =
        document.getElementById("pesquisa")
        .value
        .toLowerCase();

    const categoria =
        document.getElementById("filtroCategoria").value;


    tabela.innerHTML = "";


    const filtrados = produtos.filter(produto => {

        const nomeOK =
            produto.nome.toLowerCase().includes(pesquisa);

        const categoriaOK =
            categoria === "" ||
            produto.categoria === categoria;

        return nomeOK && categoriaOK;
    });


    if (filtrados.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }


    filtrados.forEach(produto => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>
                <strong>${produto.nome}</strong>
            </td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>${moeda(produto.preco)}</td>

            <td>
                ${moeda(produto.quantidade * produto.preco)}
            </td>

            <td>
                ${statusProduto(produto)}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="btn-entrada"
                        onclick="entradaProduto(${produto.id})">
                        +
                    </button>

                    <button
                        class="btn-saida"
                        onclick="saidaProduto(${produto.id})">
                        -
                    </button>

                    <button
                        class="btn-editar"
                        onclick="abrirModal(${produto.id})">
                        ✏️
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.id})">
                        🗑️
                    </button>

                </div>

            </td>
        `;

        tabela.appendChild(tr);
    });
}


// ===============================
// CATEGORIAS
// ===============================

function atualizarCategorias() {

    const select =
        document.getElementById("filtroCategoria");

    const categoriaAtual = select.value;

    const categorias = [
        ...new Set(
            produtos.map(produto => produto.categoria)
        )
    ];

    select.innerHTML =
        `<option value="">Todas as categorias</option>`;

    categorias.forEach(categoria => {

        const option =
            document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        select.appendChild(option);
    });

    select.value = categoriaAtual;
}


// ===============================
// DASHBOARD
// ===============================

function atualizarDashboard() {

    const totalProdutos =
        produtos.length;

    const totalItens =
        produtos.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );

    const valor =
        produtos.reduce(
            (total, produto) =>
                total +
                produto.quantidade *
                produto.preco,
            0
        );

    const baixo =
        produtos.filter(
            produto =>
                produto.quantidade <= produto.minimo
        ).length;


    document.getElementById("totalProdutos")
        .textContent = totalProdutos;

    document.getElementById("totalItens")
        .textContent = totalItens;

    document.getElementById("valorEstoque")
        .textContent = moeda(valor);

    document.getElementById("estoqueBaixo")
        .textContent = baixo;


    const tabela =
        document.getElementById("tabelaDashboard");

    tabela.innerHTML = "";


    produtos.slice(-5).reverse().forEach(produto => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>
                <strong>${produto.nome}</strong>
            </td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>${moeda(produto.preco)}</td>

            <td>${statusProduto(produto)}</td>
        `;

        tabela.appendChild(tr);
    });


    if (produtos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
    }
}


// ===============================
// MOVIMENTAÇÕES
// ===============================

function renderizarMovimentacoes() {

    const tabela =
        document.getElementById("tabelaMovimentacoes");

    tabela.innerHTML = "";


    if (movimentacoes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4" class="vazio">
                    Nenhuma movimentação registrada.
                </td>
            </tr>
        `;

        return;
    }


    movimentacoes.forEach(mov => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>${mov.data}</td>

            <td>${mov.produto}</td>

            <td>
                ${mov.tipo}
            </td>

            <td>
                ${mov.quantidade}
            </td>
        `;

        tabela.appendChild(tr);
    });
}


// ===============================
// ATUALIZA TUDO
// ===============================

function atualizarTudo() {

    atualizarDashboard();

    atualizarCategorias();

    renderizarProdutos();

    renderizarMovimentacoes();
}


// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    atualizarTudo
);


// Fechar modal clicando fora

document.getElementById("modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            fecharModal();
        }

    });
```
