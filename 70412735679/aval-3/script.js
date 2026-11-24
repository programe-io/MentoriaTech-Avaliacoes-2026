const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtro");

let lancamentos = JSON.parse(
    localStorage.getItem("finanFacilLancamentos") || "[]"
);

if (!Array.isArray(lancamentos)) {
    lancamentos = [];
}

let idEdicao = null;

function salvarDados() {
    localStorage.setItem(
        "finanFacilLancamentos",
        JSON.stringify(lancamentos)
    );
}

function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document
        .getElementById("descricao").value.trim();

    const valor = Number(
        document.getElementById("valor").value
    );

    const tipo = document.getElementById("tipo").value;

    if (!descricao || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    if (idEdicao !== null) {
        const item = lancamentos.find(
            registro => registro.id === idEdicao
        );

        if (item) {
            item.descricao = descricao;
            item.valor = valor;
            item.tipo = tipo;
        }

        idEdicao = null;
    } else {
        lancamentos.push({
            id: Date.now() + Math.random(),
            descricao: descricao,
            valor: valor,
            tipo: tipo
        });
    }

    salvarDados();
    formulario.reset();
    restaurarFormulario();
    atualizarSistema();
});

function restaurarFormulario() {
    document.getElementById("tituloFormulario").textContent =
        "Adicionar lançamento";

    document.getElementById("botaoSalvar").textContent =
        "Cadastrar lançamento";

    document.getElementById("cancelar").hidden = true;
}

function editarLancamento(id) {
    const item = lancamentos.find(
        registro => registro.id === id
    );

    if (!item) return;

    idEdicao = id;

    document.getElementById("descricao").value = item.descricao;
    document.getElementById("valor").value = item.valor;
    document.getElementById("tipo").value = item.tipo;

    document.getElementById("tituloFormulario").textContent =
        "Editar lançamento";

    document.getElementById("botaoSalvar").textContent =
        "Salvar alterações";

    document.getElementById("cancelar").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function excluirLancamento(id) {
    const confirmar = confirm(
        "Deseja realmente excluir este lançamento?"
    );

    if (!confirmar) return;

    lancamentos = lancamentos.filter(
        item => item.id !== id
    );

    if (idEdicao === id) {
        idEdicao = null;
        formulario.reset();
        restaurarFormulario();
    }

    salvarDados();
    atualizarSistema();
}

document.getElementById("cancelar").addEventListener(
    "click",
    function() {
        idEdicao = null;
        formulario.reset();
        restaurarFormulario();
    }
);

function atualizarResumo() {
    const receitas = lancamentos
        .filter(item => item.tipo === "Receita")
        .reduce((total, item) => total + item.valor, 0);

    const despesas = lancamentos
        .filter(item => item.tipo === "Despesa")
        .reduce((total, item) => total + item.valor, 0);

    const saldo = receitas - despesas;

    document.getElementById("receitas").textContent =
        formatar(receitas);

    document.getElementById("despesas").textContent =
        formatar(despesas);

    document.getElementById("saldo").textContent =
        formatar(saldo);

    document.getElementById("quantidade").textContent =
        lancamentos.length;

    document.getElementById("totalReceitas").textContent =
        lancamentos.filter(item => item.tipo === "Receita").length;

    document.getElementById("totalDespesas").textContent =
        lancamentos.filter(item => item.tipo === "Despesa").length;

    document.getElementById("resultado").textContent =
        formatar(saldo);
}

function mostrarLancamentos() {
    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();
    const tipoFiltro = filtro.value;

    const encontrados = lancamentos.filter(item => {
        const correspondeTexto =
            item.descricao.toLowerCase().includes(termo);

        const correspondeTipo =
            tipoFiltro === "Todos" || item.tipo === tipoFiltro;

        return correspondeTexto && correspondeTipo;
    });

    if (encontrados.length === 0) {
        const mensagem = document.createElement("li");
        mensagem.textContent = "Nenhum lançamento encontrado.";
        lista.appendChild(mensagem);
        return;
    }

    encontrados.forEach(item => {
        const li = document.createElement("li");

        li.className =
            item.tipo === "Receita" ? "receita" : "despesa";

        const conteudo = document.createElement("div");
        conteudo.className = "item";

        const informacoes = document.createElement("div");
        informacoes.className = "item-info";

        const descricao = document.createElement("strong");
        descricao.textContent = item.descricao;

        const detalhes = document.createElement("small");
        detalhes.textContent =
            `${item.tipo} • ${formatar(item.valor)}`;

        informacoes.append(descricao, detalhes);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "editar";

        botaoEditar.addEventListener("click", function() {
            editarLancamento(item.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirLancamento(item.id);
        });

        acoes.append(botaoEditar, botaoExcluir);
        conteudo.append(informacoes, acoes);
        li.appendChild(conteudo);
        lista.appendChild(li);
    });
}

function atualizarSistema() {
    atualizarResumo();
    mostrarLancamentos();
}

pesquisa.addEventListener("input", mostrarLancamentos);
filtro.addEventListener("change", mostrarLancamentos);

atualizarSistema();