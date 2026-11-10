
let tarefas = [];
let codigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.trim().length < 5) {
        alert("O título precisa ter no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    codigo++;

    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");
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

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    let novaPrioridade = Number(
        prompt("Digite 1 (Alta), 2 (Média) ou 3 (Baixa):")
    );

    if ([1, 2, 3].includes(novaPrioridade)) {
        tarefa.prioridade = novaPrioridade;
        listarTarefas();
    } else {
        alert("Prioridade inválida!");
    }
}
