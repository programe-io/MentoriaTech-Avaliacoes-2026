v// ==========================================
// CONTROLE DE ESTOQUE
// ==========================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let produtoEditando = null;

// Elementos do HTML
const form = document.getElementById("produtoForm");

const codigoInput = document.getElementById("codigo");
const nomeInput = document.getElementById("nome");
const categoriaInput = document.getElementById("categoria");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const estoqueMinimoInput = document.getElementById("estoqueMinimo");

const listaProdutos = document.getElementById("listaProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");

const buscarInput = document.getElementById("buscar");

const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");
const estoqueBaixo = document.getElementById("estoqueBaixo");
const valorEstoque = document.getElementById("valorEstoque");

const tituloFormulario = document.getElementById("tituloFormulario");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");


// ==========================================
// SALVAR NO LOCAL STORAGE
// ==========================================

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// ==========================================
// FORMATAÇÃO DE MOEDA
// ==========================================

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// STATUS DO ESTOQUE
// ==========================================

function obterStatus(produto) {

    if (produto.quantidade === 0) {
        return {
            texto: "Esgotado",
            classe: "status-esgotado"
        };
    }

    if (produto.quantidade <= produto.estoqueMinimo) {
        return {
            texto: "Estoque baixo",
            classe: "status-baixo"
        };
    }

    return {
        texto: "Normal",
        classe: "status-normal"
    };
}


// ==========================================
// RENDERIZAR PRODUTOS
// ==========================================

function renderizarProdutos(filtro = "") {

    listaProdutos.innerHTML = "";

    const termo = filtro.toLowerCase().trim();

    const produtosFiltrados = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(termo) ||
            produto.codigo.toLowerCase().includes(termo) ||
            produto.categoria.toLowerCase().includes(termo)
        );

    });

    if (produtosFiltrados.length === 0) {
        mensagemVazia.style.display = "block";
        atualizarResumo();
        return;
    }

    mensagemVazia.style.display = "none";

    produtosFiltrados.forEach(produto => {

        const status = obterStatus(produto);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${produto.codigo}</td>

            <td>
                <strong>${produto.nome}</strong>
            </td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>
                <span class="status ${status.classe}">
                    ${status.texto}
                </span>
            </td>

            <td>
                <div class="acoes">

                    <button
                        class="btn-editar"
                        onclick="editarProduto('${produto.id}')"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto('${produto.id}')"
                    >
                        Excluir
                    </button>

                </div>
            </td>
        `;

        listaProdutos.appendChild(tr);
    });

    atualizarResumo();
}


// ==========================================
// ATUALIZAR RESUMO
// ==========================================

function atualizarResumo() {

    const quantidadeProdutos = produtos.length;

    const quantidadeItens = produtos.reduce(
        (total, produto) => total + Number(produto.quantidade),
        0
    );

    const quantidadeEstoqueBaixo = produtos.filter(
        produto => produto.quantidade <= produto.estoqueMinimo
    ).length;

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total +
            Number(produto.quantidade) *
            Number(produto.preco),
        0
    );

    totalProdutos.textContent = quantidadeProdutos;

    totalItens.textContent = quantidadeItens;

    estoqueBaixo.textContent = quantidadeEstoqueBaixo;

    valorEstoque.textContent = formatarMoeda(valorTotal);
}


// ==========================================
// CADASTRAR / ATUALIZAR PRODUTO
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = codigoInput.value.trim();
    const nome = nomeInput.value.trim();
    const categoria = categoriaInput.value;
    const quantidade = Number(quantidadeInput.value);
    const preco = Number(precoInput.value);
    const estoqueMinimo = Number(estoqueMinimoInput.value);


    // Verificar código duplicado
    const codigoExistente = produtos.some(produto =>
        produto.codigo.toLowerCase() === codigo.toLowerCase() &&
        produto.id !== produtoEditando
    );

    if (codigoExistente) {
        alert("Já existe um produto com esse código.");
        return;
    }


    // EDIÇÃO
    if (produtoEditando) {

        const produto = produtos.find(
            produto => produto