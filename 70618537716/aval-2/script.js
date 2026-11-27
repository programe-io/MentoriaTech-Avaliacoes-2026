
let tarefas = [];
let codigo = 0;

// Cadastrar nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        console.log("Erro: o título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: a prioridade deve ser entre 1 e 3.");
        return;
    }

    codigo++;

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(function(tarefa) {
        console.log(
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Concluída: " + tarefa.concluida
        );
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    console.log("Tarefa concluída com sucesso!");
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada.");
        return;
    }

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    console.log("Prioridade alterada com sucesso!");
}

// Exemplos de utilização
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);

listarTarefas();

concluirTarefa(1);

alterarPrioridade(2, 3);

listarTarefas();
