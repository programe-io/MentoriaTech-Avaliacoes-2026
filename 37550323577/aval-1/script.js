// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("produtoForm");
const produtoId = document.getElementById("produtoId");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const descricao = document.getElementById("descricao");

const listaProdutos = document.getElementById("listaProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");
const pesquisa = document.getElementById("pesquisa");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

const contador = document.getElementById("contador");
const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");
const valorEstoque = document.getElementById("valorEstoque");


// Salva os produtos no LocalStorage
function salvarNoLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// Formata valores para moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Exibe os produtos na tabela
function renderizarProdutos(filtro = "") {
    listaProdutos.innerHTML = "";

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(filtro.toLowerCase())
    );

    if (produtosFiltrados.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    produtosFiltrados.forEach(produto => {
        const tr = document.createElement("tr");

        const total = produto.preco * produto.quantidade;

        tr.innerHTML = `
            <td>
                <strong>${produto.nome}</strong>
                <br>
                <small>${produto.descricao || ""}</small>
            </td>

            <td>${produto.categoria}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(total)}</td>

            <td>
                <div class="acoes">
                    <button class="btn-editar"
                        onclick="editarProduto(${produto.id})">
                        Editar
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${produto.id})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        listaProdutos.appendChild(tr);
    });

    atualizarResumo();
}


// Atualiza os números do resumo
function atualizarResumo() {
    const quantidadeProdutos = produtos.length;

    const quantidadeItens = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.preco * produto.quantidade,
        0
    );

    totalProdutos.textContent = quantidadeProdutos;
    totalItens.textContent = quantidadeItens;
    valorEstoque.textContent = formatarMoeda(valorTotal);

    contador.textContent =
        `${quantidadeProdutos} ${quantidadeProdutos === 1 ? "produto" : "produtos"}`;
}


// Cadastra ou atualiza um produto
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const produto = {
        id: produtoId.value
            ? Number(produtoId.value)
            : Date.now(),

        nome: nome.value.trim(),
        categoria: categoria.value,
        preco: Number(preco.value),
        quantidade: Number(quantidade.value),
        descricao: descricao.value.trim()
    };

    // Se existir ID, atualiza
    if (produtoId.value) {
        const indice = produtos.findIndex(
            item => item.id === Number(produtoId.value)
        );

        produtos[indice] = produto;
    } else {
        // Caso contrário, adiciona um novo produto
        produtos.push(produto);
    }

    salvarNoLocalStorage();
    renderizarProdutos();

    limparFormulario();
});


// Editar produto
function editarProduto(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    produtoId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    preco.value = produto.preco;
    quantidade.value = produto.quantidade;
    descricao.value = produto.descricao;

    btnSalvar.textContent = "Salvar Alterações";
    btnCancelar.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Excluir produto
function excluirProduto(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(item => item.id !== id);

    salvarNoLocalStorage();
    renderizarProdutos();
}


// Limpa o formulário
function limparFormulario() {
    form.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar Produto";
    btnCancelar.style.display = "none";
}


// Botão cancelar edição
btnCancelar.addEventListener("click", limparFormulario);


// Pesquisa produtos
pesquisa.addEventListener("input", function () {
    renderizarProdutos(this.value);
});


// Primeira renderização
renderizarProdutos();