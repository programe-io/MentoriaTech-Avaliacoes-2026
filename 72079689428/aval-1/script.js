
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("formProduto");

const lista = document.getElementById("listaProdutos");

const codigo = document.getElementById("codigo");
const descricao = document.getElementById("descricao");
const quantidade = document.getElementById("quantidade");
const valor = document.getElementById("valor");

// Cadastrar produto
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const novoProduto = {
        codigo: codigo.value.trim(),
        descricao: descricao.value.trim(),
        quantidade: Number(quantidade.value),
        valor: Number(valor.value)
    };

    if (!novoProduto.codigo || !novoProduto.descricao ||
        !Number.isFinite(novoProduto.quantidade) ||
        !Number.isFinite(novoProduto.valor) ||
        novoProduto.quantidade < 0 || novoProduto.valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const existe = produtos.some(function(produto) {
        return produto.codigo.toLowerCase() ===
            novoProduto.codigo.toLowerCase();
    });

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    produtos.push(novoProduto);

    salvarProdutos();

    form.reset();

    alert("Produto cadastrado com sucesso!");
});

// Salvar no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    mostrarProdutos();
}

// Listar produtos
function mostrarProdutos() {
    lista.innerHTML = "";

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    let totalQuantidade = 0;
    let totalValor = 0;

    produtos.forEach(function(produto, index) {

        totalQuantidade += produto.quantidade;
        totalValor += produto.quantidade * produto.valor;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${escaparHTML(produto.codigo)}</td>
            <td>${escaparHTML(produto.descricao)}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td>
                <div class="acoes">
                    <button class="btn-editar"
                        onclick="alterarValor(${index})">
                        Editar valor
                    </button>

                    <button class="btn-editar"
                        onclick="alterarQuantidade(${index})">
                        Editar quantidade
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        lista.appendChild(linha);
    });

    document.getElementById("totalQuantidade").textContent =
        totalQuantidade;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(totalValor);

    document.getElementById("mensagemVazia").style.display =
        produtos.length === 0 ? "block" : "none";
}

// Formatar valores em reais
function formatarMoeda(numero) {
    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Proteger textos exibidos na tabela
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, function(caractere) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[caractere];
    });
}

// Alterar valor do produto
function alterarValor(index) {
    const novoValor = prompt(
        "Digite o novo valor do produto:",
        produtos[index].valor
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const numero = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(numero) || numero < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = numero;

    salvarProdutos();

    alert("Valor atualizado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(index) {
    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produtos[index].quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const numero = Number(novaQuantidade);

    if (!Number.isInteger(numero) || numero < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade = numero;

    salvarProdutos();

    alert("Quantidade atualizada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {
    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(index, 1);

        salvarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Mostrar produtos ao abrir o sistema
mostrarProdutos();
