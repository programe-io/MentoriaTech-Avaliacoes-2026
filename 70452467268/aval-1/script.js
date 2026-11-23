const formulario = document.getElementById("movimentacaoForm");
const historico = document.getElementById("historico");

let movimentacoes = [];

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const valor = Number(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;

    if (!descricao || !tipo || !categoria || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const novaMovimentacao = {
        descricao: descricao,
        valor: valor,
        tipo: tipo,
        categoria: categoria
    };

    movimentacoes.push(novaMovimentacao);

    atualizarSistema();
    formulario.reset();
});

function atualizarSistema() {
    let receitas = 0;
    let despesas = 0;

    for (let i = 0; i < movimentacoes.length; i++) {
        if (movimentacoes[i].tipo === "receita") {
            receitas += movimentacoes[i].valor;
        } else {
            despesas += movimentacoes[i].valor;
        }
    }

    const saldo = receitas - despesas;

    document.getElementById("saldoAtual").textContent =
        formatarMoeda(saldo);

    document.getElementById("totalReceitas").textContent =
        formatarMoeda(receitas);

    document.getElementById("totalDespesas").textContent =
        formatarMoeda(despesas);

    mostrarHistorico();
}

function mostrarHistorico() {
    historico.replaceChildren();

    if (movimentacoes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma movimentação registrada.";
        historico.appendChild(aviso);
        return;
    }

    for (let i = 0; i < movimentacoes.length; i++) {
        const item = movimentacoes[i];

        const card = document.createElement("article");
        card.className = "movimentacao";

        const titulo = document.createElement("h3");
        titulo.textContent = item.descricao;
        titulo.classList.add(item.tipo);

        const valor = document.createElement("p");
        valor.textContent = "Valor: " + formatarMoeda(item.valor);

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + item.categoria;

        const tipo = document.createElement("p");
        tipo.textContent = "Tipo: " +
            (item.tipo === "receita" ? "Receita" : "Despesa");

        card.append(titulo, valor, categoria, tipo);
        historico.appendChild(card);
    }
}

atualizarSistema();