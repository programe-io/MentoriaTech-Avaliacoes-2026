
const CHAVE = "gerenciadorTarefas";

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

const campo = id => document.getElementById(id);

let tarefas = [];

try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) || "[]");

    if (Array.isArray(dados)) {
        tarefas = dados.filter(t =>
            t &&
            typeof t.id === "string" &&
            typeof t.titulo === "string" &&
            ["Pendente", "Em andamento", "Concluída"].includes(t.status) &&
            ["Baixa", "Média", "Alta"].includes(t.prioridade) &&
            typeof t.prazo === "string" &&
            typeof t.criadaEm === "number"
        );
    }
} catch {
    tarefas = [];
}

function salvar() {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(tarefas));
    } catch {
        alert("Não foi possível salvar os dados neste navegador.");
    }
}

function criarId() {
    return typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Date.now() + "-" + Math.random().toString(16).slice(2);
}

function dataFormatada(data) {
    if (!data) return "Sem prazo";

    const partes = data.split("-");

    if (partes.length !== 3) return data;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function atualizarResumo() {
    campo("totalTarefas").textContent = tarefas.length;

    campo("totalPendentes").textContent =
        tarefas.filter(t => t.status === "Pendente").length;

    campo("totalAndamento").textContent =
        tarefas.filter(t => t.status === "Em andamento").length;

    campo("totalConcluidas").textContent =
        tarefas.filter(t => t.status === "Concluída").length;
}

function adicionarEtiqueta(container, texto, classe) {
    const etiqueta = document.createElement("span");

    etiqueta.className = "etiqueta " + classe;
    etiqueta.textContent = texto;

    container.appendChild(etiqueta);
}

function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    return botao;
}

function renderizar() {
    const termo = campo("pesquisa").value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const statusFiltro = campo("filtroStatus").value;
    const prioridadeFiltro = campo("filtroPrioridade").value;
    const ordenacao = campo("ordenacao").value;

    let resultado = tarefas.filter(t => {
        const texto = [
            t.titulo,
            t.categoria,
            t.descricao
        ].join(" ").toLocaleLowerCase("pt-BR");

        return texto.includes(termo) &&
            (!statusFiltro || t.status === statusFiltro) &&
            (!prioridadeFiltro || t.prioridade === prioridadeFiltro);
    });

    const peso = { Alta: 3, Média: 2, Baixa: 1 };

    resultado.sort((a, b) => {
        if (ordenacao === "prioridade") {
            return peso[b.prioridade] - peso[a.prioridade];
        }

        if (ordenacao === "recente") {
            return b.criadaEm - a.criadaEm;
        }

        // Tarefas sem prazo ficam no final.
        if (!a.prazo && !b.prazo) return 0;
        if (!a.prazo) return 1;
        if (!b.prazo) return -1;

        return a.prazo.localeCompare(b.prazo);
    });

    lista.replaceChildren();

    resultado.forEach(t => {
        const cartao = document.createElement("article");
        cartao.className = `tarefa prioridade-${t.prioridade}`;

        const topo = document.createElement("div");
        topo.className = "tarefa-topo";

        const conteudo = document.createElement("div");
        const titulo = document.createElement("h3");
        titulo.textContent = t.titulo;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + t.categoria;

        conteudo.append(titulo, categoria);

        const etiquetas = document.createElement("div");
        etiquetas.className = "etiquetas";

        adicionarEtiqueta(
            etiquetas,
            "Prioridade: " + t.prioridade,
            "prioridade-tag-" + t.prioridade
        );

        const classeStatus = t.status.replace(" ", "-");

        adicionarEtiqueta(
            etiquetas,
            t.status,
            "status-tag-" + classeStatus
        );

        topo.append(conteudo, etiquetas);
        cartao.appendChild(topo);

        if (t.descricao) {
            const descricao = document.createElement("p");
            descricao.textContent = t.descricao;
            cartao.appendChild(descricao);
        }

        const prazo = document.createElement("p");

        const hoje = new Date();
        const hojeLocal = [
            hoje.getFullYear(),
            String(hoje.getMonth() + 1).padStart(2, "0"),
            String(hoje.getDate()).padStart(2, "0")
        ].join("-");

        const estaAtrasada =
            t.prazo &&
            t.prazo < hojeLocal &&
            t.status !== "Concluída";

        prazo.textContent = "Prazo: " + dataFormatada(t.prazo);

        if (estaAtrasada) {
            prazo.textContent += " — ATRASADA";
            prazo.classList.add("atrasada");
        }

        cartao.appendChild(prazo);

        const acoes = document.createElement("div");
        acoes.className = "acoes-tarefa";

        if (t.status !== "Concluída") {
            acoes.appendChild(
                criarBotao("Avançar status", "btn-status", () =>
                    avancarStatus(t.id)
                )
            );
        }

        acoes.appendChild(
            criarBotao("Editar", "acao-editar", () =>
                editarTarefa(t.id)
            )
        );

        acoes.appendChild(
            criarBotao("Excluir", "acao-excluir", () =>
                excluirTarefa(t.id)
            )
        );

        cartao.appendChild(acoes);
        lista.appendChild(cartao);
    });

    campo("mensagemVazia").classList.toggle(
        "oculto",
        resultado.length > 0
    );

    campo("mensagemVazia").textContent = tarefas.length
        ? "Nenhuma tarefa encontrada com esses filtros."
        : "Nenhuma tarefa cadastrada.";

    atualizarResumo();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const id = campo("tarefaId").value;
    const titulo = campo("titulo").value.trim();
    const categoria = campo("categoria").value.trim();
    const prazo = campo("prazo").value;
    const prioridade = campo("prioridade").value;
    const status = campo("status").value;
    const descricao = campo("descricao").value.trim();

    if (!titulo || !categoria || !prazo) {
        alert("Preencha o título, a categoria e o prazo.");
        return;
    }

    // Valida o formato e a existência da data.
    const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(prazo);
    const data = new Date(prazo + "T12:00:00");

    if (
        !dataValida ||
        Number.isNaN(data.getTime()) ||
        data.toISOString().slice(0, 10) !== prazo
    ) {
        alert("Informe uma data de vencimento válida.");
        return;
    }

    const tarefaAnterior = tarefas.find(t => t.id === id);

    const tarefa = {
        id: id || criarId(),
        titulo,
        categoria,
        prazo,
        prioridade,
        status,
        descricao,
        criadaEm: tarefaAnterior
            ? tarefaAnterior.criadaEm
            : Date.now()
    };

    if (id) {
        tarefas = tarefas.map(t =>
            t.id === id ? tarefa : t
        );
    } else {
        tarefas.push(tarefa);
    }

    salvar();
    limparFormulario();
    renderizar();
});

function editarTarefa(id) {
    const t = tarefas.find(item => item.id === id);
    if (!t) return;

    campo("tarefaId").value = t.id;
    campo("titulo").value = t.titulo;
    campo("categoria").value = t.categoria;
    campo("prazo").value = t.prazo;
    campo("prioridade").value = t.prioridade;
    campo("status").value = t.status;
    campo("descricao").value = t.descricao || "";

    campo("tituloFormulario").textContent = "Editar tarefa";
    campo("btnSalvar").textContent = "Salvar alterações";
    campo("btnCancelar").classList.remove("oculto");

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    campo("titulo").focus();
}

function excluirTarefa(id) {
    const t = tarefas.find(item => item.id === id);
    if (!t) return;

    if (!confirm(`Deseja excluir a tarefa "${t.titulo}"?`)) {
        return;
    }

    tarefas = tarefas.filter(item => item.id !== id);

    if (campo("tarefaId").value === id) {
        limparFormulario();
    }

    salvar();
    renderizar();
}

function avancarStatus(id) {
    const estados = [
        "Pendente",
        "Em andamento",
        "Concluída"
    ];

    tarefas = tarefas.map(t => {
        if (t.id !== id) return t;

        const indice = estados.indexOf(t.status);

        return {
            ...t,
            status: estados[Math.min(indice + 1, estados.length - 1)]
        };
    });

    salvar();
    renderizar();
}

function limparFormulario() {
    form.reset();

    campo("tarefaId").value = "";
    campo("prioridade").value = "Média";
    campo("status").value = "Pendente";

    campo("tituloFormulario").textContent = "Nova tarefa";
    campo("btnSalvar").textContent = "Adicionar tarefa";
    campo("btnCancelar").classList.add("oculto");
}

campo("btnCancelar").addEventListener("click", limparFormulario);

campo("pesquisa").addEventListener("input", renderizar);
campo("filtroStatus").addEventListener("change", renderizar);
campo("filtroPrioridade").addEventListener("change", renderizar);
campo("ordenacao").addEventListener("change", renderizar);

renderizar();
