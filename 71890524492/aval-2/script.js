
let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve ser entre 1 e 3.");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    console.log("Tarefa cadastrada com sucesso!");
}

// 2. Listar todas as tarefas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log(
            "Código:", tarefa.codigo,
            "| Título:", tarefa.titulo,
            "| Prioridade:", tarefa.prioridade,
            "| Status:", tarefa.concluida ? "Concluída" : "Pendente"
        );
    });
}

// 3. Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;
    console.log("Tarefa marcada como concluída!");
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Erro: A prioridade deve ser entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    console.log("Prioridade alterada com sucesso!");
}

// Exemplos de utilização:

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar quarto", 3);

// Listar tarefas
console.log("\n--- LISTA DE TAREFAS ---");
listarTarefas();

// Concluir uma tarefa
concluirTarefa(1);

// Alterar prioridade
alterarPrioridade(2, 1);

// Listar novamente
console.log("\n--- LISTA ATUALIZADA ---");
listarTarefas();
