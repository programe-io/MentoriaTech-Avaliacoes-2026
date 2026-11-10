
let tarefas = [];
let codigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const tarefa = {
        codigo: codigo++,
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

    tarefas.forEach(tarefa => {
        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">
                <h3>${tarefa.titulo}</h3>
                <p>Código: ${tarefa.codigo}</p>
                <p>Prioridade: ${tarefa.prioridade}</p>
                <p>Status: ${tarefa.concluida ? 'Concluída' : 'Pendente'}</p>

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        const novaPrioridade = Number(
            prompt("Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):")
        );

        if ([1, 2, 3].includes(novaPrioridade)) {
            tarefa.prioridade = novaPrioridade;
            listarTarefas();
        } else {
            alert("Prioridade inválida!");
        }
    }
}
