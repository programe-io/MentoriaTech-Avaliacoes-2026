
// ======================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ======================================

// CARREGAR PRODUTOS SALVOS
let produtos = JSON.parse(
    localStorage.getItem("estoqueProdutos")
) || [];

let editando = null;


// ======================================
// FUNÇÕES AUXILIARES
// ======================================

function salvarDados() {
    localStorage.setItem(
        "estoqueProdutos",
        JSON.stringify(produtos)
    );
}

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function escapar(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}


// ======================================
// CADASTRAR E EDITAR PRODUTOS
// ======================================

document.getElementById("produtoForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value.trim(),
        codigo: document.getElementById("codigo").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        quantidade: Number(
            document.getElementById("quantidade").value
        ),
        preco: Number(
            document.getElementById("preco").value
        ),
        minimo: Number(
            document.getElementById("minimo").value
        )
    };

    // VALIDAR CAMPOS
    if (
        !produto.nome ||
        !produto.codigo ||
        produto.quantidade < 0 ||
        produto.preco < 0 ||
        produto.minimo < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    // VERIFICAR CÓDIGO DUPLICADO
    const codigoExiste = produtos.some((p, i) =>
        p.codigo.toLowerCase() === produto.codigo.toLowerCase()
        && i !== editando
    );

    if (codigoExiste) {
        alert("Este código já está cadastrado!");
        return;
    }

    // SALVAR OU ATUALIZAR
    if (editando !== null) {

        produtos[editando] = produto;
        editando = null;

        alert("Produto atualizado com sucesso!");

    } else {

        produtos.push(produto);

        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();

    this.reset();

    document.getElementById("minimo").value = 5;

    document.getElementById("tituloForm").textContent =
        "Cadastrar Produto";

    document.getElementById("btnSalvar").textContent =
        "Cadastrar Produto";

    atualizar();
});


// ======================================
// LISTAR E PESQUISAR PRODUTOS
// ======================================

function listarProdutos() {

    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((p, i) => {

        if (
            !p.nome.toLowerCase().includes(busca) &&
            !p.codigo.toLowerCase().includes(busca)
        ) {
            return;
        }

        const status = p.quantidade <= p.minimo
            ? '<span class="status low">Estoque Baixo</span>'
            : '<span class="status ok">Normal</span>';

        lista.innerHTML += `
            <tr>
                <td>${escapar(p.codigo)}</td>
                <td>${escapar(p.nome)}</td>
                <td>${escapar(p.categoria)}</td>
                <td>${p.quantidade}</td>
                <td>${moeda(p.preco)}</td>
                <td>${status}</td>

                <td>
                    <div class="actions">

                        <button class="btn-edit"
                            onclick="editar(${i})">
                            Editar
                        </button>

                        <button class="btn-danger"
                            onclick="excluir(${i})">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    });
}


// ======================================
// EDITAR PRODUTO
// ======================================

function editar(i) {

    const p = produtos[i];

    document.getElementById("nome").value = p.nome;
    document.getElementById("codigo").value = p.codigo;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("quantidade").value = p.quantidade;
    document.getElementById("preco").value = p.preco;
    document.getElementById("minimo").value = p.minimo;

    editando = i;

    document.getElementById("tituloForm").textContent =
        "Editar Produto";

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ======================================
// EXCLUIR PRODUTO
// ======================================

function excluir(i) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {

        produtos.splice(i, 1);

        salvarDados();

        atualizar();

        alert("Produto excluído com sucesso!");
    }
}


// ======================================
// ENTRADA E SAÍDA DE MERCADORIAS
// ======================================

function movimentar() {

    const i = document.getElementById(
        "produtoMovimento"
    ).value;

    const quantidade = Number(
        document.getElementById("quantidadeMovimento").value
    );

    const tipo = document.getElementById(
        "tipoMovimento"
    ).value;

    if (
        i === "" ||
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    ) {
        alert("Selecione um produto e informe uma quantidade válida!");
        return;
    }

    if (tipo === "saida") {

        if (produtos[i].quantidade < quantidade) {

            alert("Estoque insuficiente!");

            return;
        }

        produtos[i].quantidade -= quantidade;

    } else {

        produtos[i].quantidade += quantidade;
    }

    salvarDados();

    document.getElementById(
        "quantidadeMovimento"
    ).value = "";

    atualizar();

    alert("Movimentação registrada com sucesso!");
}


// ======================================
// ATUALIZAR PAINEL DE INDICADORES
// ======================================

function atualizar() {

    // TOTAL DE PRODUTOS
    const totalProdutos = produtos.length;

    // TOTAL DE UNIDADES
    const totalItens = produtos.reduce(
        (s, p) => s + p.quantidade,
        0
    );

    // PRODUTOS COM ESTOQUE BAIXO
    const baixo = produtos.filter(
        p => p.quantidade <= p.minimo
    ).length;

    // VALOR TOTAL DO ESTOQUE
    const valor = produtos.reduce(
        (s, p) => s + p.quantidade * p.preco,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("estoqueBaixo").textContent =
        baixo;

    document.getElementById("valorEstoque").textContent =
        moeda(valor);


    // ATUALIZAR TABELA
    listarProdutos();


    // ATUALIZAR SELETOR DE PRODUTOS
    const select = document.getElementById(
        "produtoMovimento"
    );

    const selecionado = select.value;

    select.innerHTML =
        '<option value="">Selecione um produto</option>';

    produtos.forEach((p, i) => {

        select.innerHTML += `
            <option value="${i}">
                ${escapar(p.nome)} - ${escapar(p.codigo)}
            </option>
        `;
    });

    if (
        selecionado !== "" &&
        produtos[selecionado]
    ) {
        select.value = selecionado;
    }
}


// ======================================
// INICIALIZAR SISTEMA
// ======================================

atualizar();
