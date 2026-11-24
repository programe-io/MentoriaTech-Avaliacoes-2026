let lancamentos = [];

const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const filtro = document.getElementById("filtro");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const valor = Number(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;

    if (!descricao || !Number.isFinite(valor) || valor <= 0) {
        alert("Informe dados válidos.");
        return;
    }

    lancamentos.push({
        id: Date.now() + Math.random(),
        descricao,
        valor,
        tipo
    });

    formulario.reset();
    atualizarTela();
});

function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarTela() {
    const receitas = lancamentos
        .filter(item => item.tipo === "Receita")
        .reduce((total, item) => total + item.valor, 0);

    const despesas = lancamentos
        .filter(item => item.tipo === "Despesa")
        .reduce((total, item) => total + item.valor, 0);

    document.getElementById("receitas").textContent = formatar(receitas);
    document.getElementById("despesas").textContent = formatar(despesas);
    document.getElementById("saldo").textContent = formatar(receitas - despesas);

    mostrarLancamentos();
}

function mostrarLancamentos() {
    lista.innerHTML = "";

    const tipoFiltro = filtro.value;

    const filtrados = lancamentos.filter(item =>
        tipoFiltro === "Todos" || item.tipo === tipoFiltro
    );

    if (filtrados.length === 0) {
        lista.textContent = "Nenhum lançamento encontrado.";
        return;
    }

    filtrados.forEach(item => {
        const li = document.createElement("li");
        li.className = item.tipo === "Receita" ? "receita" : "despesa";

        const conteudo = document.createElement("div");
        conteudo.className = "item";

        const texto = document.createElement("span");
        texto.textContent =
            `${item.descricao} - ${item.tipo}: ${formatar(item.valor)}`;

        const botao = document.createElement("button");
        botao.textContent = "Excluir";
        botao.className = "excluir";

        botao.addEventListener("click", function() {
            lancamentos = lancamentos.filter(
                registro => registro.id !== item.id
            );
            atualizarTela();
        });

        conteudo.append(texto, botao);
        li.appendChild(conteudo);
        lista.appendChild(li);
    });
}

filtro.addEventListener("change", mostrarLancamentos);

atualizarTela();