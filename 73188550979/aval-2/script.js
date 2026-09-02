let tarefas = [];
let proximoId = 1;

function cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return false;
    }
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return false;
    }

    const novaTarefa = {
        codigo: proximoId++,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(novaTarefa);
    renderizarTarefas();
    return true;
}

function listarTarefas() {
    return tarefas;
}

function marcarConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarTarefas();
    }
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa && novaPrioridade >= 1 && novaPrioridade <= 3) {
        tarefa.prioridade = Number(novaPrioridade);
        renderizarTarefas();
    }
}

function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = `<div class="empty-state">Nenhuma tarefa cadastrada.</div>`;
        return;
    }

    tarefas.forEach(t => {
        const prioridadeDesc = t.prioridade === 1 ? "Alta" : t.prioridade === 2 ? "Média" : "Baixa";
        
        const li = document.createElement("li");
        li.className = `task-item ${t.concluida ? "concluida" : ""}`;
        
        li.innerHTML = `
            <div class="task-info">
                <span class="task-title">${t.titulo}</span>
                <div class="task-meta">
                    <span>ID: ${t.codigo}</span>
                    <span class="badge priority-${t.prioridade}">${prioridadeDesc}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-action" onclick="marcarConcluida(${t.codigo})">
                    ${t.concluida ? "Desfazer" : "Concluir"}
                </button>
                <select class="btn-action" onchange="alterarPrioridade(${t.codigo}, this.value)">
                    <option value="1" ${t.prioridade === 1 ? "selected" : ""}>Alta</option>
                    <option value="2" ${t.prioridade === 2 ? "selected" : ""}>Média</option>
                    <option value="3" ${t.prioridade === 3 ? "selected" : ""}>Baixa</option>
                </select>
            </div>
        `;
        lista.appendChild(li);
    });
}

function adicionar() {
    const tituloInput = document.getElementById("tituloInput");
    const prioridadeInput = document.getElementById("prioridadeInput");

    if (cadastrarTarefa(tituloInput.value.trim(), prioridadeInput.value)) {
        tituloInput.value = "";
        tituloInput.focus();
    }
}