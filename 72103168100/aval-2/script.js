
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
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

// Listar tarefas cadastradas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {
        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>Código: ${tarefa.codigo}</p>

            <p>Prioridade: ${prioridadeTexto[tarefa.prioridade]}</p>

            <p>Status: ${tarefa.concluida
                ? "Concluída"
                : "Pendente"}</p>

            <div class="acoes">

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar Prioridade
                </button>

                <button class="excluir"
                    onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}

// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

// Excluir tarefa
function excluirTarefa(codigo) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);

    listarTarefas();
}

// Exibir lista inicial
listarTarefas();
