
let tarefas = [];
let codigo = 1;

function cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        console.log("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("A prioridade deve ser de 1 a 3!");
        return;
    }

    let tarefa = {
        codigo: codigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log("Tarefa cadastrada!");
}

function listarTarefas() {
    console.log(tarefas);
}

function concluirTarefa(codigoTarefa) {
    let tarefa = tarefas.find(t => t.codigo === codigoTarefa);

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa concluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function alterarPrioridade(codigoTarefa, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("A prioridade deve ser de 1 a 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigoTarefa);

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        console.log("Prioridade alterada!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Exemplos de uso
cadastrarTarefa("Fazer trabalho", 1);
cadastrarTarefa("Estudar JavaScript", 2);

listarTarefas();

concluirTarefa(1);
alterarPrioridade(2, 3);

listarTarefas();
