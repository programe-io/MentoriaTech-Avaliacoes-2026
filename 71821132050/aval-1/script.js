let produtos = JSON.parse(localStorage.getItem("estoque")) || [];
let editando = null;

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("estoque", JSON.stringify(produtos));
}

// CADASTRAR PRODUTO
function salvarProduto() {
    const nome = document.getElementById("nome").value.trim();
    const codigo = document.getElementById("codigo").value.trim();
    const quantidadeTexto = document.getElementById("quantidade").value;
    const precoTexto = document.getElementById("preco").value;

    const quantidade = Number(quantidadeTexto);
    const preco = Number(precoTexto);

    if (!nome || !codigo || quantidadeTexto === "" || precoTexto === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (!Number.isFinite(quantidade) ||
        !Number.isFinite(preco) ||
        quantidade < 0 || preco < 0) {
        alert("Informe valores válidos!");
        return;
    }

    const duplicado = produtos.some((p, i) =>
        p.codigo.toLowerCase() === codigo.toLowerCase() &&
        i !== editando
    );

    if (duplicado) {
        alert("Código já cadastrado!");
        return;
    }

    const produto = {
        nome,
        codigo,
        quantidade,
        preco
    };

    if (editando !== null) {
        produtos[editando] = produto;
        editando = null;
    } else {
        produtos.push(produto);
    }

    salvarDados();
    limparFormulario();
    mostrarProdutos();

    alert("Produto salvo com sucesso!");
}

// MOSTRAR PRODUTOS
function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        if (
            !produto.nome.toLowerCase().includes(pesquisa) &&
            !produto.codigo.toLowerCase().includes(pesquisa)
        ) return;

        const total = produto.quantidade * produto.preco;

        const status = produto.quantidade <= 5
            ? '<span class="baixo">Estoque baixo</span>'
            : '<span class="normal">Normal</span>';

        const linha = document.createElement("tr");

        const valores = [
            produto.nome,
            produto.codigo,
            produto.quantidade,
            formatarMoeda(produto.preco),
            formatarMoeda(total)
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const statusTd = document.createElement("td");
        statusTd.innerHTML = status;
        linha.appendChild(statusTd);

        const acoes = document.createElement("td");

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.onclick = () => editarProduto(index);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirProduto(index);

        acoes.append(editar, excluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });

    atualizarResumo();
}

// EDITAR PRODUTO
function editarProduto(index) {
    const produto = produtos[index];

    document.getElementById("nome").value = produto.nome;
    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("preco").value = produto.preco;

    editando = index;

    document.getElementById("tituloFormulario").textContent =
        "Editar produto";

    document.getElementById("cancelar").style.display =
        "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// EXCLUIR PRODUTO
function excluirProduto(index) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(index, 1);

        salvarDados();
        mostrarProdutos();
    }
}

// REGISTRAR ENTRADA
function registrarEntrada(index, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade += quantidade;

    salvarDados();
    mostrarProdutos();

    alert("Entrada registrada!");
}

// REGISTRAR SAÍDA
function registrarSaida(index, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira válida!");
        return;
    }

    if (quantidade > produtos[index].quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    produtos[index].quantidade -= quantidade;

    salvarDados();
    mostrarProdutos();

    alert("Saída registrada!");
}

// ATUALIZAR INDICADORES
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (soma, p) => soma + p.quantidade, 0
    );

    const valorEstoque = produtos.reduce(
        (soma, p) => soma + p.quantidade * p.preco, 0
    );

    const estoqueBaixo = produtos.filter(
        p => p.quantidade <= 5
    ).length;

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo;
}

// FORMATAR VALORES
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// LIMPAR FORMULÁRIO
function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar produto";

    document.getElementById("cancelar").style.display =
        "none";
}

// CANCELAR EDIÇÃO
function cancelarEdicao() {
    editando = null;
    limparFormulario();
}

// INICIAR SISTEMA
document.addEventListener("DOMContentLoaded", () => {
    mostrarProdutos();
});