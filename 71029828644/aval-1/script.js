
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

function salvarDados() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

function atualizarSistema() {
    lista.innerHTML = "";

    let totalUnidades = 0;
    let baixo = 0;

    const termo = pesquisa.value.toLowerCase();

    produtos.forEach((produto, index) => {

        totalUnidades += produto.quantidade;

        if (produto.quantidade <= 5) {
            baixo++;
        }

        if (
            !produto.nome.toLowerCase().includes(termo) &&
            !produto.categoria.toLowerCase().includes(termo)
        ) {
            return;
        }

        const status = produto.quantidade <= 5
            ? '<span class="status-baixo">Estoque Baixo</span>'
            : '<span class="status-ok">Disponível</span>';

        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = produto.nome;

        const categoria = document.createElement("td");
        categoria.textContent = produto.categoria;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const preco = document.createElement("td");
        preco.textContent = produto.preco.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        );

        const situacao = document.createElement("td");
        situacao.innerHTML = status;

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const entrada = document.createElement("button");
        entrada.textContent = "+";
        entrada.className = "btn-entrada";
        entrada.title = "Adicionar estoque";
        entrada.onclick = () => alterarEstoque(index, 1);

        const saida = document.createElement("button");
        saida.textContent = "-";
        saida.className = "btn-saida";
        saida.title = "Retirar estoque";
        saida.onclick = () => alterarEstoque(index, -1);

        const excluir = document.createElement("button");
        excluir.textContent = "X";
        excluir.className = "btn-excluir";
        excluir.title = "Excluir produto";
        excluir.onclick = () => excluirProduto(index);

        acoes.append(entrada, saida, excluir);

        linha.append(
            nome,
            categoria,
            quantidade,
            preco,
            situacao,
            acoes
        );

        lista.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("estoqueBaixo").textContent =
        baixo;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (
        !nome ||
        !categoria ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(preco) ||
        preco < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        nome,
        categoria,
        quantidade,
        preco
    });

    salvarDados();
    atualizarSistema();

    form.reset();

    alert("Produto cadastrado com sucesso!");
});

function alterarEstoque(index, operacao) {
    if (operacao === 1) {
        const valor = Number(
            prompt("Quantas unidades deseja adicionar?")
        );

        if (!Number.isInteger(valor) || valor <= 0) {
            alert("Informe uma quantidade válida!");
            return;
        }

        produtos[index].quantidade += valor;

    } else {
        const valor = Number(
            prompt("Quantas unidades deseja retirar?")
        );

        if (!Number.isInteger(valor) || valor <= 0) {
            alert("Informe uma quantidade válida!");
            return;
        }

        if (valor > produtos[index].quantidade) {
            alert("Estoque insuficiente!");
            return;
        }

        produtos[index].quantidade -= valor;
    }

    salvarDados();
    atualizarSistema();
}

function excluirProduto(index) {
    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(index, 1);

        salvarDados();
        atualizarSistema();
    }
}

pesquisa.addEventListener("input", atualizarSistema);

atualizarSistema();
