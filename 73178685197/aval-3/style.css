let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa(codigo, titulo, prioridade) {

    if (titulo.length < 5) {
        console.log("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// Listar as tarefas
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

// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa concluída com sucesso!");
    } else {
        console.log("Tarefa não encontrada.");
    }
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        console.log("Prioridade alterada com sucesso!");
    } else {
        console.log("Tarefa não encontrada.");
    }
}


// Exemplos de uso

cadastrarTarefa(1, "Estudar JavaScript", 1);
cadastrarTarefa(2, "Fazer atividade", 2);
cadastrarTarefa(3, "Ler livro", 3);

listarTarefas();

concluirTarefa(1);

alterarPrioridade(2, 1);

listarTarefas();
