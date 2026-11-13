
const form = document.getElementById("formProduto");

const campoId = document.getElementById("produtoId");
const campoCodigo = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");

// Recuperar produtos salvos no navegador
let produtos = JSON.parse(
    localStorage.getItem("estoqueProdutos")
) || [];

// Salvar produtos no navegador
function salvarNoNavegador() {
    localStorage.setItem(
        "estoqueProdutos",
        JSON.stringify(produtos)
    );
}

// Formatar valores em reais
function dinheiro(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualizar informações do estoque
function atualizarResumo() {

    const unidades = produtos.reduce(
        (soma, produto) =>
            soma + Number(produto.quantidade), 0
    );

    const total = produtos.reduce(
        (soma, produto) =>
            soma + Number(produto.quantidade) *
            Number(produto.valor), 0
    );

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        unidades;

    document.getElementById("valorEstoque").textContent =
        dinheiro(total);
}

// Mostrar produtos cadastrados
function renderizarProdutos() {

    const termo = pesquisa.value.trim().toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    listaProdutos.innerHTML = "";

    if (filtrados.length === 0) {

        listaProdutos.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

    } else {

        filtrados.forEach(produto => {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${escaparHTML(produto.codigo)}</td>

                <td>${escaparHTML(produto.descricao)}</td>

                <td>${produto.quantidade}</td>

                <td>${dinheiro(produto.valor)}</td>

                <td>
                    <strong>
                        ${dinheiro(
                            produto.quantidade * produto.valor
                        )}
                    </strong>
                </td>

                <td>
                    <div class="acoes-tabela">

                        <button class="acao editar"
                            data-acao="editar"
                            data-id="${produto.id}">
                            Editar
                        </button>

                        <button class="acao excluir"
                            data-acao="excluir"
                            data-id="${produto.id}">
                            Excluir
                        </button>

                    </div>
                </td>
            `;

            listaProdutos.appendChild(linha);

        });
    }

    atualizarResumo();
}

// Proteger textos exibidos na tabela
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

// Cadastrar ou atualizar produto
form.addEventListener("submit", evento => {

    evento.preventDefault();

    const codigo = campoCodigo.value.trim();
    const descricao = campoDescricao.value.trim();
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);
    const idAtual = campoId.value;

    if (
        !codigo ||
        !descricao ||
        quantidade < 0 ||
        valor < 0 ||
        !Number.isInteger(quantidade) ||
        !Number.isFinite(valor)
    ) {
        alert("Confira os dados informados!");
        return;
    }

    // Verificar código duplicado
    const codigoDuplicado = produtos.some(produto =>
        produto.codigo.toLowerCase() === codigo.toLowerCase() &&
        produto.id !== idAtual
    );

    if (codigoDuplicado) {
        alert("Já existe um produto com esse código!");
        campoCodigo.focus();
        return;
    }

    if (idAtual) {

        // Atualizar produto existente
        const indice = produtos.findIndex(
            produto => produto.id === idAtual
        );

        if (indice !== -1) {

            produtos[indice] = {
                id: idAtual,
                codigo,
                descricao,
                quantidade,
                valor
            };

        }

    } else {

        // Cadastrar novo produto
        produtos.push({
            id: String(Date.now()),
            codigo,
            descricao,
            quantidade,
            valor
        });

    }

    salvarNoNavegador();
    renderizarProdutos();
    limparFormulario();

});

// Editar ou excluir produtos
listaProdutos.addEventListener("click", evento => {

    const botao = evento.target.closest(
        "button[data-acao]"
    );

    if (!botao) return;

    const produto = produtos.find(
        item => item.id === botao.dataset.id
    );

    if (!produto) return;

    if (botao.dataset.acao === "editar") {

        campoId.value = produto.id;
        campoCodigo.value = produto.codigo;
        campoDescricao.value = produto.descricao;
        campoQuantidade.value = produto.quantidade;
        campoValor.value = produto.valor;

        document.getElementById(
            "tituloFormulario"
        ).textContent = "Alterar produto";

        botaoSalvar.textContent = "Salvar alterações";

        botaoCancelar.classList.remove("oculto");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    if (botao.dataset.acao === "excluir") {

        if (confirm(
            `Deseja realmente excluir o produto "${produto.descricao}"?`
        )) {

            produtos = produtos.filter(
                item => item.id !== produto.id
            );

            salvarNoNavegador();
            renderizarProdutos();

            if (campoId.value === produto.id) {
                limparFormulario();
            }

        }

    }

});

// Limpar formulário
function limparFormulario() {

    form.reset();

    campoId.value = "";

    document.getElementById(
        "tituloFormulario"
    ).textContent = "Cadastrar produto";

    botaoSalvar.textContent = "Cadastrar produto";

    botaoCancelar.classList.add("oculto");

}

// Cancelar edição
botaoCancelar.addEventListener(
    "click",
    limparFormulario
);

// Pesquisar produtos
pesquisa.addEventListener(
    "input",
    renderizarProdutos
);

// Carregar produtos ao abrir o sistema
renderizarProdutos();

