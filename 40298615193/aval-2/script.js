
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {
        const div = document.createElement("div");
        div.className = "tarefa";

        div.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}<br>
            <strong>Título:</strong> ${tarefa.titulo}<br>
            <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
            <strong>Status:</strong>
            <span class="${tarefa.concluida ? 'concluida' : ''}">
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </span>
            <br>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa)")
    );

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

// Exibir a lista inicial
listarTarefas();
