// =========================
// ELEMENTOS
// =========================

const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("fecharModal");

const modal = document.getElementById("modal");

const formProduto = document.getElementById("formProduto");

const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const semProdutos = document.getElementById("semProdutos");

const pesquisa = document.getElementById("pesquisa");

const totalProdutos = document.getElementById("totalProdutos");
const totalEstoque = document.getElementById("totalEstoque");
const valorEstoque = document.getElementById("valorEstoque");


// =========================
// PRODUTOS
// =========================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// =========================
// ABRIR MODAL
// =========================

abrirModal.addEventListener("click", () => {

    modal.classList.add("aberto");

    descricao.focus();

});


// =========================
// FECHAR MODAL
// =========================

fecharModal.addEventListener("click", () => {

    fecharModalFuncao();

});


// Fechar clicando fora da caixa
modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        fecharModalFuncao();

    }

});


// Fechar com ESC
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        fecharModalFuncao();

    }

});


function fecharModalFuncao() {

    modal.classList.remove("aberto");

    formProduto.reset();

}


// =========================
// CADASTRAR PRODUTO
// =========================

formProduto.addEventListener("submit", (event) => {

    event.preventDefault();


    const nome = descricao.value.trim();

    const qtd = Number(quantidade.value);

    const preco = Number(valor.value);


    if (!nome || qtd < 1 || preco < 0) {

        alert("Preencha os dados corretamente.");

        return;

    }


    const produto = {

        id: Date.now(),

        codigo: gerarCodigo(),

        nome: nome,

        quantidade: qtd,

        valor: preco

    };


    produtos.push(produto);


    salvarProdutos();

    renderizarProdutos();

    fecharModalFuncao();

});


// =========================
// GERAR CÓDIGO
// =========================

function gerarCodigo() {

    const numero = produtos.length + 1;

    return "PROD-" + String(numero).padStart(3, "0");

}


// =========================
// SALVAR NO LOCALSTORAGE
// =========================

function salvarProdutos() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}


// =========================
// RENDERIZAR PRODUTOS
// =========================

function renderizarProdutos(lista = produtos) {

    listaProdutos.innerHTML = "";


    if (lista.length === 0) {

        semProdutos.style.display = "block";

    } else {

        semProdutos.style.display = "none";

    }


    lista.forEach((produto) => {

        const tr = document.createElement("tr");


        tr.innerHTML = `

            <td>
                <strong>${produto.codigo}</strong>
            </td>

            <td>
                ${produto.nome}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                ${formatarMoeda(produto.valor)}
            </td>

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})"
                >
                    Excluir
                </button>

            </td>

        `;


        listaProdutos.appendChild(tr);

    });


    atualizarResumo();

}


// =========================
// EXCLUIR PRODUTO
// =========================

function excluirProduto(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );


    if (!confirmar) {

        return;

    }


    produtos = produtos.filter(
        produto => produto.id !== id
    );


    salvarProdutos();

    renderizarProdutos();

}


// =========================
// PESQUISA
// =========================

pesquisa.addEventListener("input", () => {

    const termo = pesquisa.value
        .toLowerCase()
        .trim();


    const resultado = produtos.filter((produto) => {

        return (
            produto.nome.toLowerCase().includes(termo) ||
            produto.codigo.toLowerCase().includes(termo)
        );

    });


    renderizarProdutos(resultado);

});


// =========================
// ATUALIZAR RESUMO
// =========================

function atualizarResumo() {

    const quantidadeProdutos = produtos.length;


    const quantidadeEstoque = produtos.reduce(
        (total, produto) => {

            return total + produto.quantidade;

        },
        0
    );


    const valorTotal = produtos.reduce(
        (total, produto) => {

            return total +
                (produto.quantidade * produto.valor);

        },
        0
    );


    totalProdutos.textContent = quantidadeProdutos;

    totalEstoque.textContent = quantidadeEstoque;

    valorEstoque.textContent = formatarMoeda(valorTotal);

}


// =========================
// FORMATAR MOEDA
// =========================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// =========================
// INICIALIZAÇÃO
// =========================

renderizarProdutos();