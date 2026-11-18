
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// NAVEGAÇÃO
document.querySelectorAll(".sidebar nav a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelectorAll(".sidebar nav a").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const destino = this.getAttribute("href");

        document.querySelector(destino).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ABRIR MODAL
function abrirModal() {
    document.getElementById("formProduto").reset();
    document.getElementById("produtoId").value = "";
    document.getElementById("tituloModal").textContent = "Novo Produto";

    document.getElementById("modal").style.display = "flex";
}

// FECHAR MODAL
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// FECHAR AO CLICAR FORA
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});

// CADASTRAR E EDITAR
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("produtoId").value;
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (
        nome.length < 2 ||
        categoria.length === 0 ||
        !Number.isFinite(preco) ||
        preco <= 0 ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (id !== "") {
        const produto = produtos.find(p => p.id === Number(id));

        if (!produto) {
            alert("Produto não encontrado!");
            return;
        }

        produto.nome = nome;
        produto.categoria = categoria;
        produto.preco = preco;
        produto.quantidade = quantidade;

        alert("Produto atualizado com sucesso!");

    } else {
        produtos.push({
            id: Date.now(),
            nome,
            categoria,
            preco,
            quantidade
        });

        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();
    listarProdutos();
    fecharModal();
});

// LISTAR PRODUTOS
function listarProdutos() {
    const tabela = document.getElementById("tabelaProdutos");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const filtro = document.getElementById("filtro").value;

    tabela.innerHTML = "";

    const filtrados = produtos.filter(produto => {
        const correspondePesquisa =
            produto.nome.toLowerCase().includes(pesquisa) ||
            produto.categoria.toLowerCase().includes(pesquisa);

        let correspondeFiltro = true;

        if (filtro === "normal") {
            correspondeFiltro = produto.quantidade > 5;
        }

        if (filtro === "baixo") {
            correspondeFiltro =
                produto.quantidade > 0 && produto.quantidade <= 5;
        }

        if (filtro === "zerado") {
            correspondeFiltro = produto.quantidade === 0;
        }

        return correspondePesquisa && correspondeFiltro;
    });

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        let status;
        let classe;

        if (produto.quantidade === 0) {
            status = "Sem estoque";
            classe = "zerado";
        } else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classe = "baixo";
        } else {
            status = "Normal";
            classe = "normal";
        }

        function criarCelula(valor) {
            const td = document.createElement("td");
            td.textContent = valor;
            return td;
        }

        linha.appendChild(criarCelula(produto.nome));
        linha.appendChild(criarCelula(produto.categoria));
        linha.appendChild(criarCelula(formatarMoeda(produto.preco)));
        linha.appendChild(criarCelula(produto.quantidade));

        const tdStatus = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = `status ${classe}`;
        etiqueta.textContent = status;

        tdStatus.appendChild(etiqueta);
        linha.appendChild(tdStatus);

        const tdAcoes = document.createElement("td");
        const botoes = document.createElement("div");

        botoes.className = "action-buttons";

        // BOTÃO EDITAR
        const btnEditar = document.createElement("button");

        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-edit";

        btnEditar.addEventListener("click", function() {
            editarProduto(produto.id);
        });

        // BOTÃO EXCLUIR
        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-delete";

        btnExcluir.addEventListener("click", function() {
            excluirProduto(produto.id);
        });

        botoes.appendChild(btnEditar);
        botoes.appendChild(btnExcluir);

        tdAcoes.appendChild(botoes);
        linha.appendChild(tdAcoes);

        tabela.appendChild(linha);
    });

    document.getElementById("mensagemVazia").style.display =
        filtrados.length === 0 ? "block" : "none";

    atualizarDashboard();
}

// EDITAR PRODUTO
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    document.getElementById("produtoId").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;

    document.getElementById("tituloModal").textContent = "Editar Produto";

    document.getElementById("modal").style.display = "flex";
}

// EXCLUIR PRODUTO
function excluirProduto(id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos = produtos.filter(p => p.id !== id);

        salvarDados();
        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// ATUALIZAR DASHBOARD
function atualizarDashboard() {
    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (soma, produto) => soma + produto.quantidade, 0
    );

    const estoqueBaixo = produtos.filter(
        produto => produto.quantidade > 0 && produto.quantidade <= 5
    ).length;

    const valorEstoque = produtos.reduce(
        (soma, produto) => soma + produto.preco * produto.quantidade, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;
    document.getElementById("totalItens").textContent = totalItens;
    document.getElementById("estoqueBaixo").textContent = estoqueBaixo;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

// FORMATAR MOEDA
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// INICIAR SISTEMA
listarProdutos();
