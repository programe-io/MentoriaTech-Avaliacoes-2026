
const formulario = document.getElementById("tarefaForm");
const listaTarefas = document.getElementById("listaTarefas");

let tarefas = JSON.parse(
    localStorage.getItem("gerenciadorTarefas") || "[]"
);

let editandoId = null;

// Salvar dados
function salvarDados() {
    localStorage.setItem(
        "gerenciadorTarefas",
        JSON.stringify(tarefas)
    );
}

// Proteger textos digitados pelo usuário
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

// Cadastrar ou editar tarefa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const status = document.getElementById("status").value;

    if (!codigo || !titulo || !prioridade || !status) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verificar código duplicado
    const duplicado = tarefas.find(t =>
        t.codigo.toLowerCase() === codigo.toLowerCase() &&
        t.id !== editandoId
    );

    if (duplicado) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    if (editandoId !== null) {

        const tarefa = tarefas.find(t => t.id === editandoId);

        if (!tarefa) return;

        tarefa.codigo = codigo;
        tarefa.titulo = titulo;
        tarefa.prioridade = prioridade;
        tarefa.status = status;

        alert("Tarefa atualizada com sucesso!");

    } else {

        tarefas.push({
            id: Date.now(),
            codigo,
            titulo,
            prioridade,
            status
        });

        alert("Tarefa cadastrada com sucesso!");
    }

    salvarDados();
    listarTarefas();
    atualizarDashboard();
    cancelarEdicao();

});

// Listar tarefas
function listarTarefas() {

    const termo = document.getElementById("pesquisa")
        .value.toLowerCase();

    const filtroPrioridade =
        document.getElementById("filtroPrioridade").value;

    const filtroStatus =
        document.getElementById("filtroStatus").value;

    listaTarefas.innerHTML = "";

    const filtradas = tarefas.filter(t => {

        const pesquisaOk =
            t.codigo.toLowerCase().includes(termo) ||
            t.titulo.toLowerCase().includes(termo);

        const prioridadeOk =
            !filtroPrioridade ||
            t.prioridade === filtroPrioridade;

        const statusOk =
            !filtroStatus ||
            t.status === filtroStatus;

        return pesquisaOk && prioridadeOk && statusOk;
    });

    filtradas.forEach(tarefa => {

        const linha = document.createElement("tr");

        let classePrioridade = {
            "Baixa": "prioridade-baixa",
            "Média": "prioridade-media",
            "Alta": "prioridade-alta"
        }[tarefa.prioridade];

        const classeStatus =
            tarefa.status === "Concluída"
                ? "status-concluida"
                : "status-pendente";

        const botaoStatus =
            tarefa.status === "Pendente"
                ? `<button class="btn-concluir"
                    onclick="alternarStatus(${tarefa.id})">
                    Concluir
                   </button>`
                : `<button class="btn-concluir"
                    onclick="alternarStatus(${tarefa.id})">
                    Reabrir
                   </button>`;

        linha.innerHTML = `
            <td>${escaparHTML(tarefa.codigo)}</td>

            <td>${escaparHTML(tarefa.titulo)}</td>

            <td>
                <span class="${classePrioridade}">
                    ${escaparHTML(tarefa.prioridade)}
                </span>
            </td>

            <td>
                <span class="${classeStatus}">
                    ${escaparHTML(tarefa.status)}
                </span>
            </td>

            <td>
                <div class="acoes">
                    ${botaoStatus}

                    <button class="btn-editar"
                        onclick="editarTarefa(${tarefa.id})">
                        Editar
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirTarefa(${tarefa.id})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        listaTarefas.appendChild(linha);

    });

    document.getElementById("mensagemVazia").hidden =
        filtradas.length > 0;
}

// Editar tarefa
function editarTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    document.getElementById("codigo").value = tarefa.codigo;
    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("prioridade").value = tarefa.prioridade;
    document.getElementById("status").value = tarefa.status;

    editandoId = id;

    document.getElementById("tituloFormulario").textContent =
        "Editar Tarefa";

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    document.getElementById("btnCancelar").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Cancelar edição
function cancelarEdicao() {

    editandoId = null;

    formulario.reset();

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Nova Tarefa";

    document.getElementById("btnSalvar").textContent =
        "Cadastrar Tarefa";

    document.getElementById("btnCancelar").hidden = true;
}

// Concluir ou reabrir tarefa
function alternarStatus(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.status = tarefa.status === "Pendente"
        ? "Concluída"
        : "Pendente";

    salvarDados();
    listarTarefas();
    atualizarDashboard();
}

// Excluir tarefa
function excluirTarefa(id) {

    if (confirm("Deseja realmente excluir esta tarefa?")) {

        tarefas = tarefas.filter(t => t.id !== id);

        if (editandoId === id) {
            cancelarEdicao();
        }

        salvarDados();
        listarTarefas();
        atualizarDashboard();
    }
}

// Atualizar indicadores
function atualizarDashboard() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        t => t.status === "Pendente"
    ).length;

    const concluidas = tarefas.filter(
        t => t.status === "Concluída"
    ).length;

    const altas = tarefas.filter(
        t => t.prioridade === "Alta" &&
             t.status === "Pendente"
    ).length;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;

    document.getElementById("prioridadeAlta").textContent =
        altas;
}

// Eventos dos filtros
document.getElementById("pesquisa")
    .addEventListener("input", listarTarefas);

document.getElementById("filtroPrioridade")
    .addEventListener("change", listarTarefas);

document.getElementById("filtroStatus")
    .addEventListener("change", listarTarefas);

// Inicialização
listarTarefas();
atualizarDashboard();
