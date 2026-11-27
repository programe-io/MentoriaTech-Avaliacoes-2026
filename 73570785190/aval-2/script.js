
const formProduto = document.querySelector("#form-produto");
const formMovimentacao = document.querySelector("#form-movimentacao");

const nome = document.querySelector("#nome");
const categoria = document.querySelector("#categoria");
const quantidade = document.querySelector("#quantidade");
const preco = document.querySelector("#preco");
const produtoId = document.querySelector("#produto-id");

const listaProdutos = document.querySelector("#lista-produtos");
const produtoMovimento = document.querySelector("#produto-movimento");
const tipoMovimento = document.querySelector("#tipo-movimento");
const qtdMovimento = document.querySelector("#qtd-movimento");

const totalProdutos = document.querySelector("#total-produtos");
const totalItens = document.querySelector("#total-itens");
const estoqueBaixo = document.querySelector("#estoque-baixo");

const busca = document.querySelector("#busca");
const listaHistorico = document.querySelector("#lista-historico");

const btnSalvar = document.querySelector("#btn-salvar");
const btnCancelar = document.querySelector("#btn-cancelar");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];

// Salvar dados
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("historico", JSON.stringify(historico));
}

// Formatar moeda
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Registrar histórico
function registrarHistorico(produto, tipo, qtd) {
    historico.unshift({
        produto: produto,
        tipo: tipo,
        quantidade: qtd,
        data: new Date().toLocaleString("pt-BR")
    });

    historico = historico.slice(0, 20);
}

// Cadastrar ou editar produto
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeProduto = nome.value.trim();
    const categoriaProduto = categoria.value.trim();
    const qtd = Number(quantidade.value);
    const valor = Number(preco.value);

    if (
        !nomeProduto ||
        !categoriaProduto ||
        quantidade.value === "" ||
        preco.value === "" ||
        !Number.isInteger(qtd) ||
        qtd < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (produtoId.value) {
        const produto = produtos.find(
            p => p.id === Number(produtoId.value)
        );

        if (!produto) return;

        produto.nome = nomeProduto;
        produto.categoria = categoriaProduto;
        produto.quantidade = qtd;
        produto.preco = valor;

        alert("Produto atualizado com sucesso!");

    } else {
        const produto = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            nome: nomeProduto,
            categoria: categoriaProduto,
            quantidade: qtd,
            preco: valor
        };

        produtos.push(produto);

        registrarHistorico(nomeProduto, "Cadastro", qtd);

        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();
    formProduto.reset();
    produtoId.value = "";
    btnSalvar.textContent = "Cadastrar produto";
    btnCancelar.hidden = true;

    render();
});

// Editar produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    produtoId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    quantidade.value = produto.quantidade;
    preco.value = produto.preco;

    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    formProduto.scrollIntoView({ behavior: "smooth" });
}

// Cancelar edição
btnCancelar.addEventListener("click", function() {
    formProduto.reset();
    produtoId.value = "";
    btnSalvar.textContent = "Cadastrar produto";
    btnCancelar.hidden = true;
});

// Excluir produto
function excluirProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    if (!confirm(`Deseja excluir ${produto.nome}?`)) return;

    produtos = produtos.filter(p => p.id !== id);

    registrarHistorico(produto.nome, "Exclusão", produto.quantidade);

    salvarDados();
    render();
}

// Registrar entrada ou saída
formMovimentacao.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = Number(produtoMovimento.value);
    const tipo = tipoMovimento.value;
    const qtd = Number(qtdMovimento.value);

    if (
        !Number.isInteger(qtd) ||
        qtd <= 0
    ) {
        alert("Informe uma quantidade válida!");
        return;
    }

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Selecione um produto válido!");
        return;
    }

    if (tipo === "entrada") {
        produto.quantidade += qtd;
    } else {
        if (qtd > produto.quantidade) {
            alert("Estoque insuficiente!");
            return;
        }

        produto.quantidade -= qtd;
    }

    registrarHistorico(produto.nome, tipo, qtd);

    salvarDados();
    formMovimentacao.reset();
    render();

    alert("Movimentação registrada com sucesso!");
});

// Atualizar indicadores
function atualizarResumo() {
    totalProdutos.textContent = produtos.length;

    totalItens.textContent = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    estoqueBaixo.textContent = produtos.filter(
        produto => produto.quantidade <= 5
    ).length;
}

// Renderizar produtos
function renderProdutos() {
    listaProdutos.innerHTML = "";

    const termo = busca.value.trim().toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        listaProdutos.innerHTML = `
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

        let status = "Normal";
        let classe = "normal";

        if (produto.quantidade === 0) {
            status = "Esgotado";
            classe = "esgotado";
        } else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classe = "baixo";
        }

        tr.innerHTML = `
            <td>${escapeHTML(produto.nome)}</td>
            <td>${escapeHTML(produto.categoria)}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td>${formatarMoeda(produto.preco * produto.quantidade)}</td>
            <td>
                <span class="status ${classe}">
                    ${status}
                </span>
            </td>
            <td>
                <div class="acoes">
                    <button class="editar"
                        data-acao="editar"
                        data-id="${produto.id}">
                        Editar
                    </button>

                    <button class="excluir"
                        data-acao="excluir"
                        data-id="${produto.id}">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        listaProdutos.appendChild(tr);
    });
}

// Escapar textos para evitar inserção de HTML
function escapeHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// Delegação de eventos nos botões da tabela
listaProdutos.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao || !listaProdutos.contains(botao)) return;

    const id = Number(botao.dataset.id);

    if (botao.dataset.acao === "editar") {
        editarProduto(id);
    }

    if (botao.dataset.acao === "excluir") {
        excluirProduto(id);
    }
});

// Atualizar opções de produtos
function atualizarSelect() {
    produtoMovimento.innerHTML = `
        <option value="">Selecione um produto</option>
    `;

    produtos.forEach(produto => {
        const option = document.createElement("option");

        option.value = produto.id;
        option.textContent = produto.nome;

        produtoMovimento.appendChild(option);
    });
}

// Renderizar histórico
function renderHistorico() {
    listaHistorico.innerHTML = "";

    if (historico.length === 0) {
        listaHistorico.innerHTML = `
            <li class="vazio">Nenhuma movimentação registrada.</li>
        `;
        return;
    }

    historico.forEach(item => {
        const li = document.createElement("li");

        li.textContent =
            `${item.data} — ${item.tipo}: ${item.quantidade} unidade(s) de ${item.produto}`;

        listaHistorico.appendChild(li);
    });
}

// Renderização geral
function render() {
    atualizarResumo();
    renderProdutos();
    atualizarSelect();
    renderHistorico();
}

// Busca em tempo real
busca.addEventListener("input", renderProdutos);

// Inicializar aplicação
render();
