```javascript
// ===============================
// SISTEMA DE ESTOQUE
// ===============================

// Carrega produtos salvos
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let editandoId = null;


// ELEMENTOS

const modal = document.getElementById("modal");
const formProduto = document.getElementById("formProduto");

const listaProdutos = document.getElementById("listaProdutos");
const semProdutos = document.getElementById("semProdutos");

const campoBusca = document.getElementById("campoBusca");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroStatus = document.getElementById("filtroStatus");


// INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", () => {

    atualizarInterface();

    document.getElementById("dataCadastro").value =
        new Date().toISOString().split("T")[0];

});


// ===============================
// SALVAR NO LOCALSTORAGE
// ===============================

function salvarProdutos() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}


// ===============================
// GERAR CÓDIGO
// ===============================

function gerarCodigo() {

    if (produtos.length === 0) {
        return 1;
    }

    return Math.max(
        ...produtos.map(produto => produto.codigo)
    ) + 1;

}


// ===============================
// VALIDAR PRODUTO
// ===============================

function validarProduto(produto) {

    if (!produto.nome || produto.nome.trim().length < 2) {

        alert("O nome deve possuir pelo menos 2 caracteres.");

        return false;
    }

    if (
        !produto.descricao ||
        produto.descricao.trim().length < 5
    ) {

        alert(
            "A descrição deve possuir pelo menos 5 caracteres."
        );

        return false;
    }

    if (produto.quantidade < 0) {

        alert("A quantidade não pode ser negativa.");

        return false;
    }

    if (produto.preco < 0) {

        alert("O preço não pode ser negativo.");

        return false;
    }

    if (!produto.categoria) {

        alert("Selecione uma categoria.");

        return false;
    }

    if (!produto.fornecedor.trim()) {

        alert("Informe o fornecedor.");

        return false;
    }

    return true;

}


// ===============================
// ABRIR MODAL
// ===============================

function abrirModal(produto = null) {

    modal.classList.add("ativo");

    if (produto) {

        editandoId = produto.id;

        document.getElementById("tituloModal").textContent =
            "Editar produto";

        document.getElementById("produtoId").value =
            produto.id;

        document.getElementById("nome").value =
            produto.nome;

        document.getElementById("descricao").value =
            produto.descricao;

        document.getElementById("categoria").value =
            produto.categoria;

        document.getElementById("quantidade").value =
            produto.quantidade;

        document.getElementById("preco").value =
            produto.preco;

        document.getElementById("estoqueMinimo").value =
            produto.estoqueMinimo;

        document.getElementById("fornecedor").value =
            produto.fornecedor;

        document.getElementById("dataCadastro").value =
            produto.dataCadastro;

    } else {

        editandoId = null;

        formProduto.reset();

        document.getElementById("tituloModal").textContent =
            "Novo produto";

        document.getElementById("estoqueMinimo").value = 5;

        document.getElementById("dataCadastro").value =
            new Date().toISOString().split("T")[0];

    }

}


// ===============================
// FECHAR MODAL
// ===============================

function fecharModal() {

    modal.classList.remove("ativo");

    formProduto.reset();

    editandoId = null;

}


// ===============================
// CADASTRAR / EDITAR
// ===============================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const produto = {

        id: editandoId || Date.now(),

        codigo: editandoId
            ? produtos.find(p => p.id === editandoId).codigo
            : gerarCodigo(),

        nome:
            document.getElementById("nome").value.trim(),

        descricao:
            document.getElementById("descricao").value.trim(),

        categoria:
            document.getElementById("categoria").value,

        quantidade:
            Number(document.getElementById("quantidade").value),

        preco:
            Number(document.getElementById("preco").value),

        estoqueMinimo:
            Number(document.getElementById("estoqueMinimo").value),

        fornecedor:
            document.getElementById("fornecedor").value.trim(),

        dataCadastro:
            document.getElementById("dataCadastro").value

    };


    if (!validarProduto(produto)) {
        return;
    }


    if (editandoId) {

        const indice = produtos.findIndex(
            p => p.id === editandoId
        );

        produtos[indice] = produto;

    } else {

        produtos.push(produto);

    }


    salvarProdutos();

    atualizarInterface();

    fecharModal();

});


// ===============================
// EXCLUIR PRODUTO
// ===============================

function excluirProduto(id) {

    const produto = produtos.find(
        p => p.id === id
    );

    if (!produto) return;


    const confirmar = confirm(
        `Deseja realmente excluir "${produto.nome}"?`
    );


    if (!confirmar) return;


    produtos = produtos.filter(
        p => p.id !== id
    );


    salvarProdutos();

    atualizarInterface();

}


// ===============================
// ENTRADA DE ESTOQUE
// ===============================

function entradaEstoque(id) {

    const produto = produtos.find(
        p => p.id === id
    );

    if (!produto) return;


    const quantidade = Number(
        prompt(
            `Quantas unidades deseja adicionar de "${produto.nome}"?`
        )
    );


    if (!Number.isFinite(quantidade) || quantidade <= 0) {

        alert("Digite uma quantidade válida.");

        return;
    }


    produto.quantidade += quantidade;

    salvarProdutos();

    atualizarInterface();

}


// ===============================
// SAÍDA DE ESTOQUE
// ===============================

function saidaEstoque(id) {

    const produto = produtos.find(
        p => p.id === id
    );

    if (!produto) return;


    const quantidade = Number(
        prompt(
            `Quantas unidades deseja retirar de "${produto.nome}"?`
        )
    );


    if (!Number.isFinite(quantidade) || quantidade <= 0) {

        alert("Digite uma quantidade válida.");

        return;
    }


    if (quantidade > produto.quantidade) {

        alert(
            "Não é possível retirar mais produtos do que existem no estoque."
        );

        return;
    }


    produto.quantidade -= quantidade;

    salvarProdutos();

    atualizarInterface();

}


// ===============================
// STATUS
// ===============================

function obterStatus(produto) {

    if (produto.quantidade === 0) {

        return {
            texto: "Sem estoque",
            classe: "zerado"
        };

    }


    if (produto.quantidade <= produto.estoqueMinimo) {

        return {
            texto: "Estoque baixo",
            classe: "baixo"
        };

    }


    return {
        texto: "Normal",
        classe: "normal"
    };

}


// ===============================
// RENDERIZAR PRODUTOS
// ===============================

function renderizarProdutos() {

    const busca =
        campoBusca.value.toLowerCase().trim();

    const categoria =
        filtroCategoria.value;

    const statusFiltro =
        filtroStatus.value;


    const filtrados = produtos.filter(produto => {

        const correspondeBusca =
            produto.nome.toLowerCase().includes(busca) ||
            produto.descricao.toLowerCase().includes(busca) ||
            produto.fornecedor.toLowerCase().includes(busca) ||
            String(produto.codigo).includes(busca);


        const correspondeCategoria =
            !categoria ||
            produto.categoria === categoria;


        const status =
            obterStatus(produto);

        const correspondeStatus =
            !statusFiltro ||
            status.classe === statusFiltro;


        return (
            correspondeBusca &&
            correspondeCategoria &&
            correspondeStatus
        );

    });


    listaProdutos.innerHTML = "";


    if (filtrados.length === 0) {

        semProdutos.style.display = "block";

        return;

    }


    semProdutos.style.display = "none";


    filtrados.forEach(produto => {

        const status =
            obterStatus(produto);


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>#${produto.codigo}</td>

            <td>
                <strong>${escaparHTML(produto.nome)}</strong>
                <br>
                <small>
                    ${escaparHTML(produto.descricao)}
                </small>
            </td>

            <td>
                ${escaparHTML(produto.categoria)}
            </td>

            <td>
                <strong>${produto.quantidade}</strong>
            </td>

            <td>
                ${formatarMoeda(produto.preco)}
            </td>

            <td>
                ${escaparHTML(produto.fornecedor)}
            </td>

            <td>
                <span class="status ${status.classe}">
                    ${status.texto}
                </span>
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="btn entrada"
                        onclick="entradaEstoque(${produto.id})"
                        title="Entrada"
                    >
                        + 
                    </button>

                    <button
                        class="btn saida"
                        onclick="saidaEstoque(${produto.id})"
                        title="Saída"
                    >
                        -
                    </button>

                    <button
                        class="btn editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn excluir"
                        onclick="excluirProduto(${produto.id})"
                    >
                        Excluir
                    </button>

                </div>

            </td>

        `;


        listaProdutos.appendChild(tr);

    });

}


// ===============================
// EDITAR
// ===============================

function editarProduto(id) {

    const produto = produtos.find(
        p => p.id === id
    );

    if (produto) {

        abrirModal(produto);

    }

}


// ===============================
// ATUALIZAR DASHBOARD
// ===============================

function atualizarDashboard() {

    const quantidadeTotal =
        produtos.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );


    const valorTotal =
        produtos.reduce(
            (total, produto) =>
                total +
                produto.quantidade *
                produto.preco,
            0
        );


    const produtosBaixos =
        produtos.filter(
            produto =>
                produto.quantidade <=
                produto.estoqueMinimo
        ).length;


    document.getElementById("totalProdutos")
        .textContent = produtos.length;


    document.getElementById("totalQuantidade")
        .textContent = quantidadeTotal;


    document.getElementById("valorEstoque")
        .textContent = formatarMoeda(valorTotal);


    document.getElementById("estoqueBaixo")
        .textContent = produtosBaixos;

}


// ===============================
// CATEGORIAS
// ===============================

function atualizarCategorias() {

    const categorias = [
        ...new Set(
            produtos.map(
                produto => produto.categoria
            )
        )
    ];


    const categoriaAtual =
        filtroCategoria.value;


    filtroCategoria.innerHTML =
        `<option value="">Todas as categorias</option>`;


    categorias.forEach(categoria => {

        const option =
            document.createElement("option");

        option.value = categoria;

        option.textContent = categoria;

        filtroCategoria.appendChild(option);

    });


    filtroCategoria.value =
        categoriaAtual;

}


// ===============================
// ATUALIZAR TUDO
// ===============================

function atualizarInterface() {

    atualizarDashboard();

    atualizarCategorias();

    renderizarProdutos();

}


// ===============================
// MOEDA
// ===============================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ===============================
// SEGURANÇA HTML
// ===============================

function escaparHTML(texto) {

    return texto
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ===============================
// EVENTOS
// ===============================

document
    .getElementById("btnNovoProduto")
    .addEventListener(
        "click",
        () => abrirModal()
    );


document
    .getElementById("fecharModal")
    .addEventListener(
        "click",
        fecharModal
    );


document
    .getElementById("cancelar")
    .addEventListener(
        "click",
        fecharModal
    );


campoBusca.addEventListener(
    "input",
    renderizarProdutos
);


filtroCategoria.addEventListener(
    "change",
    renderizarProdutos
);


filtroStatus.addEventListener(
    "change",
    renderizarProdutos
);


// Fecha o modal clicando fora dele

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            fecharModal();

        }

    }
);
```
