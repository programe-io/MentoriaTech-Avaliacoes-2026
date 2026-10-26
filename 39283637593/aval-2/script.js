
const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const filtro = document.getElementById("filtro");
const mensagem = document.getElementById("mensagem");
const vazio = document.getElementById("vazio");

let tarefas = carregarTarefas();
let proximoCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, tarefa.codigo),
    0
) + 1;

function carregarTarefas() {
    try {
        const dados = JSON.parse(
            localStorage.getItem("tarefas") || "[]"
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function salvarTarefas() {
    try {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        return true;
    } catch {
        mostrarMensagem(
            "Não foi possível salvar os dados neste navegador.",
            false
        );
        return false;
    }
}

function mostrarMensagem(texto, sucesso) {
    mensagem.textContent = texto;
    mensagem.className = sucesso
        ? "mensagem-sucesso"
        : "mensagem-erro";
}

function nomePrioridade(prioridade) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return nomes[prioridade];
}

function classePrioridade(prioridade) {
    const classes = {
        1: "alta",
        2: "media",
        3: "baixa"
    };

    return classes[prioridade];
}

// 1. Cadastrar uma nova tarefa
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            false
        );
        campoTitulo.focus();
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            false
        );
        return;
    }

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    if (!salvarTarefas()) {
        tarefas.pop();
        return;
    }

    proximoCodigo++;

    form.reset();
    campoPrioridade.value = "2";

    mostrarMensagem("Tarefa cadastrada com sucesso!", true);
    listarTarefas();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    listaTarefas.replaceChildren();

    const tarefasFiltradas = tarefas.filter(function (tarefa) {
        if (filtro.value === "pendente") {
            return !tarefa.concluida;
        }

        if (filtro.value === "concluida") {
            return tarefa.concluida;
        }

        return true;
    });

    tarefasFiltradas.forEach(function (tarefa) {
        const linha = document.createElement("tr");

        const colunaCodigo = document.createElement("td");
        colunaCodigo.textContent = tarefa.codigo;

        const colunaTitulo = document.createElement("td");
        colunaTitulo.textContent = tarefa.titulo;

        const colunaPrioridade = document.createElement("td");
        const etiquetaPrioridade = document.createElement("span");

        etiquetaPrioridade.className =
            "prioridade " + classePrioridade(tarefa.prioridade);

        etiquetaPrioridade.textContent =
            tarefa.prioridade + " - " +
            nomePrioridade(tarefa.prioridade);

        colunaPrioridade.appendChild(etiquetaPrioridade);

        const colunaStatus = document.createElement("td");
        colunaStatus.className = "status " +
            (tarefa.concluida
                ? "status-concluida"
                : "status-pendente");

        colunaStatus.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");

        botaoConcluir.type = "button";
        botaoConcluir.className = tarefa.concluida
            ? "btn-desfazer"
            : "btn-concluir";

        botaoConcluir.textContent = tarefa.concluida
            ? "Desfazer"
            : "Concluir";

        botaoConcluir.setAttribute(
            "aria-label",
            (tarefa.concluida
                ? "Desfazer conclusão da tarefa "
                : "Concluir tarefa ") + tarefa.codigo
        );

        botaoConcluir.addEventListener("click", function () {
            alterarConclusao(tarefa.codigo);
        });

        const botaoPrioridade = document.createElement("button");

        botaoPrioridade.type = "button";
        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function () {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoPrioridade);
        colunaAcoes.appendChild(acoes);

        linha.append(
            colunaCodigo,
            colunaTitulo,
            colunaPrioridade,
            colunaStatus,
            colunaAcoes
        );

        listaTarefas.appendChild(linha);
    });

    vazio.hidden = tarefasFiltradas.length > 0;

    if (tarefasFiltradas.length === 0) {
        vazio.textContent = tarefas.length === 0
            ? "Nenhuma tarefa cadastrada."
            : "Nenhuma tarefa encontrada neste filtro.";
    }

    atualizarResumo();
}

// 3. Marcar uma tarefa como concluída
function alterarConclusao(codigo) {
    const tarefa = tarefas.find(function (item) {
        return item.codigo === codigo;
    });

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    if (!salvarTarefas()) {
        tarefa.concluida = !tarefa.concluida;
        return;
    }

    mostrarMensagem(
        tarefa.concluida
            ? "Tarefa marcada como concluída!"
            : "Tarefa voltou para pendente.",
        true
    );

    listarTarefas();
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function (item) {
        return item.codigo === codigo;
    });

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null) return;

    const prioridade = Number(novaPrioridade.trim());

    if (!["1", "2", "3"].includes(novaPrioridade.trim())) {
        mostrarMensagem(
            "Prioridade inválida! Digite 1, 2 ou 3.",
            false
        );
        return;
    }

    const prioridadeAnterior = tarefa.prioridade;
    tarefa.prioridade = prioridade;

    if (!salvarTarefas()) {
        tarefa.prioridade = prioridadeAnterior;
        return;
    }

    mostrarMensagem("Prioridade alterada com sucesso!", true);
    listarTarefas();
}

// Atualizar os contadores do sistema
function atualizarResumo() {
    document.getElementById("total").textContent = tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(function (tarefa) {
            return !tarefa.concluida;
        }).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(function (tarefa) {
            return tarefa.concluida;
        }).length;
}

// Aplicar filtro
filtro.addEventListener("change", listarTarefas);

// Mostrar as tarefas ao abrir a página
listarTarefas();
