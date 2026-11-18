
// CARREGAR PRODUTOS SALVOS
let produtos = JSON.parse(
    localStorage.getItem("estoque")
) || [];

let indiceEdicao = null;


// ELEMENTOS
const formulario = document.getElementById("formProduto");

const campoCodigo = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");

const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

const botaoCadastrar = document.getElementById("btnCadastrar");


// SALVAR ESTOQUE
function salvarEstoque() {
    localStorage.setItem(
        "estoque",
        JSON.stringify(produtos)
    );
}


// FORMATAÇÃO DE DINHEIRO
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// NOTIFICAÇÕES
function mostrarMensagem(texto) {
    const toast = document.getElementById("toast");

    toast.textContent = texto;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// CADASTRAR E EDITAR
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = campoCodigo.value.trim();
    const descricao = campoDescricao.value.trim();
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    if (
        !codigo ||
        !descricao ||
        campoQuantidade.value === "" ||
        campoValor.value === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        mostrarMensagem("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código duplicado
    const duplicado = produtos.some((produto, index) => {
        return produto.codigo === codigo && index !== indiceEdicao;
    });

    if (duplicado) {
        mostrarMensagem("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    if (indiceEdicao !== null) {

        produtos[indiceEdicao] = produto;

        mostrarMensagem("Produto atualizado com sucesso!");

        indiceEdicao = null;

    } else {

        produtos.push(produto);

        mostrarMensagem("Produto cadastrado com sucesso!");

    }

    salvarEstoque();

    formulario.reset();

    botaoCadastrar.textContent = "＋ Cadastrar produto";

    renderizarProdutos();

});


// MOSTRAR PRODUTOS
function renderizarProdutos() {

    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();

    const filtrados = produtos
        .map((produto, index) => ({ ...produto, index }))
        .filter(produto =>
            produto.codigo.toLowerCase().includes(termo) ||
            produto.descricao.toLowerCase().includes(termo)
        );

    document.getElementById("semProdutos").style.display =
        filtrados.length === 0 ? "block" : "none";

    filtrados.forEach(produto => {

        const tr = document.createElement("tr");

        let status = "Em estoque";
        let classe = "status-ok";

        if (produto.quantidade === 0) {
            status = "Sem estoque";
            classe = "status-out";
        } else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classe = "status-low";
        }

        const dados = [
            { texto: produto.codigo, classe: "code-tag" },
            { texto: produto.descricao, classe: "product-name" },
            { texto: produto.quantidade },
            { texto: formatarMoeda(produto.valor) },
            { texto: formatarMoeda(produto.valor * produto.quantidade) }
        ];

        dados.forEach(dado => {
            const td = document.createElement("td");
            const span = document.createElement("span");

            span.textContent = dado.texto;

            if (dado.classe) {
                span.className = dado.classe;
            }

            td.appendChild(span);
            tr.appendChild(td);
        });

        // STATUS
        const tdStatus = document.createElement("td");
        const badge = document.createElement("span");

        badge.textContent = status;
        badge.className = `badge-status ${classe}`;

        tdStatus.appendChild(badge);
        tr.appendChild(tdStatus);

        // AÇÕES
        const tdAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");

        divAcoes.className = "actions";

        const editar = document.createElement("button");
        editar.textContent = "✎";
        editar.className = "action-btn edit-btn";
        editar.title = "Editar produto";
        editar.onclick = () => editarProduto(produto.index);

        const excluir = document.createElement("button");
        excluir.textContent = "✕";
        excluir.className = "action-btn delete-btn";
        excluir.title = "Excluir produto";
        excluir.onclick = () => excluirProduto(produto.index);

        divAcoes.append(editar, excluir);
        tdAcoes.appendChild(divAcoes);
        tr.appendChild(tdAcoes);

        lista.appendChild(tr);

    });

    atualizarDashboard();
}


// ATUALIZAR INDICADORES
function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.valor),
        0
    );

    const estoqueBaixo = produtos.filter(
        produto => produto.quantidade <= 5
    ).length;

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo;

    document.getElementById("contadorProdutos").textContent =
        `${totalProdutos} ${totalProdutos === 1 ? "produto" : "produtos"}`;

}


// EDITAR PRODUTO
function editarProduto(index) {

    const produto = produtos[index];

    campoCodigo.value = produto.codigo;
    campoDescricao.value = produto.descricao;
    campoQuantidade.value = produto.quantidade;
    campoValor.value = produto.valor;

    indiceEdicao = index;

    botaoCadastrar.textContent = "✓ Salvar alterações";

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });

    mostrarMensagem("Editando produto: " + produto.descricao);

}


// EXCLUIR PRODUTO
function excluirProduto(index) {

    const produto = produtos[index];

    const confirmar = confirm(
        `Deseja realmente excluir ${produto.descricao}?`
    );

    if (!confirmar) return;

    produtos.splice(index, 1);

    salvarEstoque();

    if (indiceEdicao === index) {
        indiceEdicao = null;
        formulario.reset();
        botaoCadastrar.textContent = "＋ Cadastrar produto";
    } else if (indiceEdicao !== null && indiceEdicao > index) {
        indiceEdicao--;
    }

    renderizarProdutos();

    mostrarMensagem("Produto excluído com sucesso!");

}


// PESQUISAR PRODUTOS
pesquisa.addEventListener("input", renderizarProdutos);


// CANCELAR EDIÇÃO / LIMPAR
document.getElementById("cancelarEdicao").addEventListener("click", () => {

    indiceEdicao = null;

    botaoCadastrar.textContent = "＋ Cadastrar produto";

    mostrarMensagem("Campos limpos!");

});


// MENU ATIVO
document.querySelectorAll(".menu-item").forEach(item => {

    item.addEventListener("click", () => {

        document.querySelectorAll(".menu-item").forEach(link => {
            link.classList.remove("active");
        });

        item.classList.add("active");

    });

});


// INICIAR SISTEMA
renderizarProdutos();
