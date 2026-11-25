
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let indiceEdicao = null;

const form = document.getElementById("formProduto");
const codigo = document.getElementById("codigo");
const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

const tabela = document.getElementById("tabelaProdutos");
const pesquisa = document.getElementById("pesquisa");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// Formatação de valores monetários
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar no armazenamento local
function salvarLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Atualizar indicadores
function atualizarDashboard() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + (produto.quantidade * produto.valor), 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalUnidades").textContent = totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

// Limpar formulário
function limparFormulario() {
    form.reset();
    indiceEdicao = null;

    btnSalvar.textContent = "Cadastrar produto";
    btnCancelar.hidden = true;
}

// Cadastrar ou atualizar produto
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const produto = {
        codigo: codigo.value.trim(),
        descricao: descricao.value.trim(),
        quantidade: Number(quantidade.value),
        valor: Number(valor.value)
    };

    if (!produto.codigo || !produto.descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    if (
        produto.quantidade < 0 ||
        !Number.isInteger(produto.quantidade) ||
        !Number.isFinite(produto.valor) ||
        produto.valor < 0
    ) {
        alert("Informe uma quantidade inteira e valores válidos.");
        return;
    }

    // Verificar se o código já existe
    const codigoExistente = produtos.some((p, i) =>
        p.codigo.toLowerCase() === produto.codigo.toLowerCase() &&
        i !== indiceEdicao
    );

    if (codigoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    if (indiceEdicao === null) {
        produtos.push(produto);
        alert("Produto cadastrado com sucesso!");
    } else {
        produtos[indiceEdicao] = produto;
        alert("Produto atualizado com sucesso!");
    }

    salvarLocalStorage();
    renderizarProdutos();
    limparFormulario();
});

// Listar produtos
function renderizarProdutos(filtro = "") {
    tabela.innerHTML = "";

    const produtosFiltrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    document.getElementById("mensagemVazia").hidden =
        produtosFiltrados.length !== 0;

    produtosFiltrados.forEach(produto => {
        const indiceReal = produtos.indexOf(produto);

        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        dados.forEach(dado => {
            const td = document.createElement("td");
            td.textContent = dado;
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");

        divAcoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "editar";
        btnEditar.addEventListener("click", () => editarProduto(indiceReal));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "excluir";
        btnExcluir.addEventListener("click", () => excluirProduto(indiceReal));

        divAcoes.append(btnEditar, btnExcluir);
        tdAcoes.appendChild(divAcoes);
        linha.appendChild(tdAcoes);

        tabela.appendChild(linha);
    });

    atualizarDashboard();
}

// Editar produto
function editarProduto(indice) {
    const produto = produtos[indice];

    codigo.value = produto.codigo;
    descricao.value = produto.descricao;
    quantidade.value = produto.quantidade;
    valor.value = produto.valor;

    indiceEdicao = indice;

    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Excluir produto
function excluirProduto(indice) {
    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(indice, 1);

        salvarLocalStorage();
        renderizarProdutos();
        limparFormulario();

        alert("Produto excluído com sucesso!");
    }
}

// Cancelar edição
btnCancelar.addEventListener("click", limparFormulario);

// Pesquisar produtos
pesquisa.addEventListener("input", function() {
    renderizarProdutos(pesquisa.value);
});

// Inicializar sistema
renderizarProdutos();
