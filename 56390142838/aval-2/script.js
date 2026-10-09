"use strict";

/* ELEMENTOS */

const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const erroTitulo = document.getElementById("erroTitulo");
const mensagem = document.getElementById("mensagem");
const listaTarefas = document.getElementById("listaTarefas");
const resumo = document.getElementById("resumo");
const botoesFiltro = document.querySelectorAll(".filtro");
const campoOrdenar = document.getElementById("ordenar");
const botaoLimpar = document.getElementById("limparConcluidas");

/* CONSTANTES */

const CHAVE_TAREFAS = "tarefas";
const CHAVE_CODIGO = "proximoCodigo";
const TAMANHO_MINIMO_TITULO = 5;
const PRIORIDADES = { 1: "Alta", 2: "Média", 3: "Baixa" };

/* ESTADO */

let tarefas = carregarTarefas();
let proximoCodigo = calcularProximoCodigo();
let filtroAtual = "todas";
let ordemAtual = "recentes";
let temporizadorMensagem;

/* PERSISTÊNCIA */

function carregarTarefas() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_TAREFAS));

        if (!Array.isArray(dados)) return [];

        return dados
            .filter(t =>
                t &&
                Number.isInteger(t.codigo) &&
                typeof t.titulo === "string"
            )
            .map(t => ({
                codigo: t.codigo,
                titulo: t.titulo,
                prioridade: t.prioridade in PRIORIDADES
                    ? Number(t.prioridade)
                    : 2,
                concluida: Boolean(t.concluida)
            }));
    } catch {
        return [];
    }
}

function calcularProximoCodigo() {
    const salvo = Number(localStorage.getItem(CHAVE_CODIGO)) || 1;

    const maiorExistente = tarefas.reduce(
        (max, t) => Math.max(max, t.codigo),
        0
    );

    return Math.max(salvo, maiorExistente + 1);
}

function salvarDados() {
    try {
        localStorage.setItem(
            CHAVE_TAREFAS,
            JSON.stringify(tarefas)
        );

        localStorage.setItem(
            CHAVE_CODIGO,
            String(proximoCodigo)
        );
    } catch {
        mostrarMensagem(
            "Não foi possível salvar os dados neste navegador.",
            "erro"
        );
    }
}

/* FEEDBACK */

function mostrarMensagem(texto, tipo = "sucesso") {
    clearTimeout(temporizadorMensagem);

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;

    temporizadorMensagem = setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "mensagem";
    }, 3500);
}

function mostrarErroTitulo(texto) {
    erroTitulo.textContent = texto;

    campoTitulo.setAttribute(
        "aria-invalid",
        texto ? "true" : "false"
    );
}

/* REGRAS */

function validarTitulo(titulo) {
    if (titulo.length < TAMANHO_MINIMO_TITULO) {
        return `O título deve ter pelo menos ${TAMANHO_MINIMO_TITULO} caracteres.`;
    }

    return "";
}

function tarefasVisiveis() {
    let lista = tarefas.filter(t => {
        if (filtroAtual === "pendentes") return !t.concluida;
        if (filtroAtual === "concluidas") return t.concluida;

        return true;
    });

    if (ordemAtual === "prioridade") {
        lista.sort(
            (a, b) =>
                a.prioridade - b.prioridade ||
                a.codigo - b.codigo
        );
    } else if (ordemAtual === "recentes") {
        lista.sort((a, b) => b.codigo - a.codigo);
    } else {
        lista.sort((a, b) => a.codigo - b.codigo);
    }

    return lista;
}

/* RENDERIZAÇÃO */

function criarElemento(tag, classe, texto) {
    const el = document.createElement(tag);

    if (classe) el.className = classe;

    if (texto !== undefined) {
        el.textContent = texto;
    }

    return el;
}

function criarCartao(tarefa) {
    const artigo = criarElemento("article", "tarefa");

    artigo.classList.add(`prioridade-${tarefa.prioridade}`);

    if (tarefa.concluida) {
        artigo.classList.add("concluida");
    }

    const topo = criarElemento("div", "tarefa-topo");

    topo.append(
        criarElemento("h3", "", tarefa.titulo),
        criarElemento(
            "span",
            `selo selo-${tarefa.prioridade}`,
            PRIORIDADES[tarefa.prioridade]
        )
    );

    const info = criarElemento(
        "p",
        "info",
        `Código ${tarefa.codigo} • ${
            tarefa.concluida ? "Concluída" : "Pendente"
        }`
    );

    /* AÇÕES */

    const acoes = criarElemento("div", "acoes");

    const botaoConcluir = criarElemento(
        "button",
        "concluir",
        tarefa.concluida
            ? "Desmarcar conclusão"
            : "Concluir tarefa"
    );

    botaoConcluir.type = "button";
    botaoConcluir.dataset.acao = "concluir";
    botaoConcluir.dataset.codigo = tarefa.codigo;

    const botaoExcluir = criarElemento(
        "button",
        "excluir",
        "Excluir"
    );

    botaoExcluir.type = "button";
    botaoExcluir.dataset.acao = "excluir";
    botaoExcluir.dataset.codigo = tarefa.codigo;

    acoes.append(botaoConcluir, botaoExcluir);

    /* ALTERAR PRIORIDADE */

    const area = criarElemento("div", "area-prioridade");
    const idSeletor = `prioridade-${tarefa.codigo}`;

    const rotulo = criarElemento("label", "", "Prioridade:");
    rotulo.htmlFor = idSeletor;

    const seletor = document.createElement("select");

    seletor.id = idSeletor;
    seletor.dataset.acao = "prioridade";
    seletor.dataset.codigo = tarefa.codigo;

    Object.entries(PRIORIDADES).forEach(([valor, nome]) => {
        const opcao = criarElemento(
            "option",
            "",
            `${valor} - ${nome}`
        );

        opcao.value = valor;
        opcao.selected = Number(valor) === tarefa.prioridade;

        seletor.appendChild(opcao);
    });

    area.append(rotulo, seletor);

    artigo.append(topo, info, acoes, area);

    return artigo;
}

function textoVazio() {
    if (tarefas.length === 0) {
        return "Nenhuma tarefa cadastrada.";
    }

    if (filtroAtual === "pendentes") {
        return "Nenhuma tarefa pendente. 🎉";
    }

    return "Nenhuma tarefa concluída ainda.";
}

function renderizarTarefas() {
    const concluidas = tarefas.filter(t => t.concluida).length;

    resumo.textContent =
        `Total: ${tarefas.length} | ` +
        `Concluídas: ${concluidas} | ` +
        `Pendentes: ${tarefas.length - concluidas}`;

    botaoLimpar.hidden = concluidas === 0;

    const lista = tarefasVisiveis();

    listaTarefas.replaceChildren();

    if (lista.length === 0) {
        listaTarefas.appendChild(
            criarElemento("p", "vazio", textoVazio())
        );

        return;
    }

    const fragmento = document.createDocumentFragment();

    lista.forEach(tarefa => {
        fragmento.appendChild(criarCartao(tarefa));
    });

    listaTarefas.appendChild(fragmento);
}

/* CADASTRAR */

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = campoTitulo.value
        .trim()
        .replace(/\s+/g, " ");

    const prioridade = Number(campoPrioridade.value);

    const erro = validarTitulo(titulo);

    mostrarErroTitulo(erro);

    if (erro) {
        campoTitulo.focus();
        return;
    }

    if (!(prioridade in PRIORIDADES)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "erro"
        );

        return;
    }

    tarefas.push({
        codigo: proximoCodigo++,
        titulo,
        prioridade,
        concluida: false
    });

    salvarDados();
    renderizarTarefas();

    form.reset();
    campoPrioridade.value = "2";
    campoTitulo.focus();

    mostrarMensagem("Tarefa cadastrada com sucesso!");
});

campoTitulo.addEventListener("input", function () {
    if (erroTitulo.textContent) {
        mostrarErroTitulo("");
    }
});

/* CONCLUIR E EXCLUIR */

listaTarefas.addEventListener("click", function (event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    if (botao.dataset.acao === "concluir") {
        tarefa.concluida = !tarefa.concluida;

        salvarDados();
        renderizarTarefas();
    }

    if (botao.dataset.acao === "excluir") {
        if (!confirm(`Excluir a tarefa "${tarefa.titulo}"?`)) {
            return;
        }

        tarefas = tarefas.filter(t => t.codigo !== codigo);

        salvarDados();
        renderizarTarefas();

        mostrarMensagem("Tarefa excluída.");
    }
});

/* ALTERAR PRIORIDADE */

listaTarefas.addEventListener("change", function (event) {
    const seletor = event.target.closest(
        'select[data-acao="prioridade"]'
    );

    if (!seletor) return;

    const codigo = Number(seletor.dataset.codigo);
    const novaPrioridade = Number(seletor.value);

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa || !(novaPrioridade in PRIORIDADES)) {
        mostrarMensagem(
            "Escolha uma prioridade entre 1 e 3.",
            "erro"
        );

        return;
    }

    tarefa.prioridade = novaPrioridade;

    salvarDados();
    renderizarTarefas();

    mostrarMensagem("Prioridade alterada com sucesso!");
});

/* FILTROS */

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", function () {
        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(b => {
            const ativo = b === botao;

            b.classList.toggle("ativo", ativo);

            b.setAttribute("aria-pressed", String(ativo));
        });

        renderizarTarefas();
    });
});

/* ORDENAÇÃO */

campoOrdenar.addEventListener("change", function () {
    ordemAtual = campoOrdenar.value;

    renderizarTarefas();
});

/* LIMPAR CONCLUÍDAS */

botaoLimpar.addEventListener("click", function () {
    const quantidade = tarefas.filter(t => t.concluida).length;

    if (quantidade === 0) return;

    if (!confirm(`Remover ${quantidade} tarefa(s) concluída(s)?`)) {
        return;
    }

    tarefas = tarefas.filter(t => !t.concluida);

    salvarDados();
    renderizarTarefas();

    mostrarMensagem("Tarefas concluídas removidas.");
});

/* SINCRONIZAÇÃO ENTRE ABAS */

window.addEventListener("storage", function (event) {
    if (
        event.key === CHAVE_TAREFAS ||
        event.key === CHAVE_CODIGO
    ) {
        tarefas = carregarTarefas();
        proximoCodigo = calcularProximoCodigo();

        renderizarTarefas();
    }
});

/* INÍCIO */

renderizarTarefas();