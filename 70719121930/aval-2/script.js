
const form = document.getElementById("taskForm");
const lista = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");
const mensagemVazia = document.getElementById("mensagemVazia");
const toast = document.getElementById("toast");

const CHAVE = "taskFlowPro";

let tarefas = [];
let timerToast;

try {
    const dados = JSON.parse(localStorage.getItem(CHAVE));

    if (Array.isArray(dados)) {
        tarefas = dados.filter(t =>
            t &&
            typeof t.codigo === "string" &&
            typeof t.titulo === "string" &&
            t.titulo.trim().length >= 5 &&
            [1, 2, 3].includes(t.prioridade) &&
            typeof t.concluida === "boolean"
        );
    }
} catch (erro) {
    tarefas = [];
}

function salvar() {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(tarefas));
        return true;
    } catch (erro) {
        mostrarMensagem("Erro ao salvar os dados!");
        return false;
    }
}

function mostrarMensagem(texto) {
    toast.textContent = texto;
    toast.classList.add("show");

    clearTimeout(timerToast);

    timerToast = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function atualizarDashboard() {
    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("totalPendentes").textContent =
        tarefas.filter(t => !t.concluida).length;

    document.getElementById("totalConcluidas").textContent =
        tarefas.filter(t => t.concluida).length;

    document.getElementById("totalAlta").textContent =
        tarefas.filter(t => t.prioridade === 1).length;
}

function listarTarefas() {
    lista.replaceChildren();

    const termo = pesquisa.value.trim().toLowerCase();

    const filtradas = tarefas.filter(t =>
        t.codigo.toLowerCase().includes(termo) ||
        t.titulo.toLowerCase().includes(termo)
    );

    mensagemVazia.style.display =
        filtradas.length === 0 ? "block" : "none";

    mensagemVazia.querySelector("h3").textContent =
        tarefas.length === 0
            ? "Nenhuma tarefa cadastrada"
            : "Nenhuma tarefa encontrada";

    mensagemVazia.querySelector("p").textContent =
        tarefas.length === 0
            ? "Cadastre sua primeira tarefa para começar."
            : "Tente pesquisar outro código ou título.";

    document.querySelector(".table-container").style.display =
        filtradas.length === 0 ? "none" : "block";

    filtradas.forEach(tarefa => {
        const linha = document.createElement("tr");

        linha.appendChild(criarCelula(tarefa.codigo));
        linha.appendChild(criarCelula(tarefa.titulo));

        // Prioridade
        const tdPrioridade = document.createElement("td");
        const badgePrioridade = document.createElement("span");

        badgePrioridade.className = "badge";

        const nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        const classes = {
            1: "priority-high",
            2: "priority-medium",
            3: "priority-low"
        };

        badgePrioridade.classList.add(classes[tarefa.prioridade]);

        badgePrioridade.textContent =
            tarefa.prioridade + " - " + nomes[tarefa.prioridade];

        tdPrioridade.appendChild(badgePrioridade);
        linha.appendChild(tdPrioridade);

        // Status
        const tdStatus = document.createElement("td");
        const badgeStatus = document.createElement("span");

        badgeStatus.className = tarefa.concluida
            ? "badge status-done"
            : "badge status-pending";

        badgeStatus.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        tdStatus.appendChild(badgeStatus);
        linha.appendChild(tdStatus);

        // Ações
        const tdAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");

        divAcoes.className = "actions";

        const concluir = document.createElement("button");
        concluir.type = "button";
        concluir.className = "action-btn action-complete";
        concluir.dataset.action = "concluir";
        concluir.dataset.codigo = tarefa.codigo;
        concluir.textContent = tarefa.concluida
            ? "Finalizada"
            : "Concluir";
        concluir.disabled = tarefa.concluida;

        const alterar = document.createElement("button");
        alterar.type = "button";
        alterar.className = "action-btn action-priority";
        alterar.dataset.action = "prioridade";
        alterar.dataset.codigo = tarefa.codigo;
        alterar.textContent = "Prioridade";

        divAcoes.append(concluir, alterar);
        tdAcoes.appendChild(divAcoes);

        linha.appendChild(tdAcoes);
        lista.appendChild(linha);
    });

    document.getElementById("contador").textContent =
        filtradas.length +
        (filtradas.length === 1
            ? " tarefa encontrada"
            : " tarefas encontradas");
}

function atualizarTela() {
    listarTarefas();
    atualizarDashboard();
}

// CADASTRAR TAREFA
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridadeTexto =
        document.getElementById("prioridade").value;

    const prioridade = Number(prioridadeTexto);

    if (!codigo) {
        mostrarMensagem("Digite o código da tarefa!");
        return;
    }

    if (titulo.length < 5) {
        mostrarMensagem("O título precisa ter pelo menos 5 caracteres!");
        return;
    }

    if (prioridadeTexto === "" ||
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3) {

        mostrarMensagem("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    const repetido = tarefas.some(t =>
        t.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (repetido) {
        mostrarMensagem("Este código já está cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    if (!salvar()) {
        tarefas.pop();
        return;
    }

    form.reset();
    atualizarTela();

    mostrarMensagem("Tarefa cadastrada com sucesso!");
});

// CONCLUIR E ALTERAR PRIORIDADE
lista.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-action]");

    if (!botao) return;

    const codigo = botao.dataset.codigo;

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    if (botao.dataset.action === "concluir") {
        if (tarefa.concluida) return;

        tarefa.concluida = true;

        salvar();
        atualizarTela();

        mostrarMensagem("Tarefa concluída com sucesso!");
    }

    if (botao.dataset.action === "prioridade") {
        const entrada = prompt(
            "ALTERAR PRIORIDADE\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (entrada === null || entrada.trim() === "") return;

        const novaPrioridade = Number(entrada);

        if (!Number.isInteger(novaPrioridade) ||
            novaPrioridade < 1 ||
            novaPrioridade > 3) {

            mostrarMensagem("Digite uma prioridade entre 1 e 3!");
            return;
        }

        const anterior = tarefa.prioridade;
        tarefa.prioridade = novaPrioridade;

        if (!salvar()) {
            tarefa.prioridade = anterior;
            return;
        }

        atualizarTela();
        mostrarMensagem("Prioridade alterada com sucesso!");
    }
});

// PESQUISAR TAREFAS
pesquisa.addEventListener("input", listarTarefas);

// INICIAR SISTEMA
atualizarTela();
