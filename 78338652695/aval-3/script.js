
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");
const adicionar = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const aviso = document.getElementById("aviso");

const saldoElemento = document.getElementById("saldo");
const receitasElemento = document.getElementById("receitas");
const despesasElemento = document.getElementById("despesas");

let movimentacoes = [];

function formatarMoeda(numero) {
    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarResumo() {
    const receitas = movimentacoes
        .filter(item => item.tipo === "receita")
        .reduce((total, item) => total + item.valor, 0);

    const despesas = movimentacoes
        .filter(item => item.tipo === "despesa")
        .reduce((total, item) => total + item.valor, 0);

    saldoElemento.textContent = formatarMoeda(receitas - despesas);
    receitasElemento.textContent = formatarMoeda(receitas);
    despesasElemento.textContent = formatarMoeda(despesas);
}

function mostrarMovimentacoes() {
    lista.innerHTML = "";

    movimentacoes.forEach(item => {
        const li = document.createElement("li");
        const detalhes = document.createElement("span");
        const valorItem = document.createElement("span");
        const botaoExcluir = document.createElement("button");

        detalhes.className = "detalhes";
        detalhes.textContent = item.descricao;

        valorItem.textContent =
            (item.tipo === "receita" ? "+ " : "- ") +
            formatarMoeda(item.valor);

        valorItem.className = item.tipo === "receita"
            ? "valor-receita"
            : "valor-despesa";

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function () {
            movimentacoes = movimentacoes.filter(
                movimento => movimento.id !== item.id
            );

            mostrarMovimentacoes();
            atualizarResumo();
        });

        li.appendChild(detalhes);
        li.appendChild(valorItem);
        li.appendChild(botaoExcluir);

        lista.appendChild(li);
    });
}

adicionar.addEventListener("click", function () {
    const nome = descricao.value.trim();
    const quantia = Number(valor.value);

    if (nome === "" || !Number.isFinite(quantia) || quantia <= 0) {
        aviso.textContent =
            "Preencha a descrição e informe um valor maior que zero.";
        return;
    }

    movimentacoes.push({
        id: Date.now() + Math.random(),
        descricao: nome,
        valor: Math.round(quantia * 100) / 100,
        tipo: tipo.value
    });

    aviso.textContent = "";
    descricao.value = "";
    valor.value = "";

    mostrarMovimentacoes();
    atualizarResumo();
});

atualizarResumo();
mostrarMovimentacoes();
