let tarefas = [];

function adicionarTarefa(descricao) {
    let tarefa = {
        id: Date.now(),
        descricao: descricao,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log("Tarefa adicionada com sucesso!");
}

function listarTarefas() {
    console.log("\n===== LISTA DE TAREFAS =====");

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log(
            `ID: ${tarefa.id} | ${tarefa.descricao} | ${
                tarefa.concluida ? "Concluída" : "Pendente"
            }`
        );
    });
}

function concluirTarefa(id) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa concluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function removerTarefa(id) {
    let tamanhoInicial = tarefas.length;

    tarefas = tarefas.filter(t => t.id !== id);

    if (tarefas.length < tamanhoInicial) {
        console.log("Tarefa removida com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function buscarTarefa(descricao) {
    let resultado = tarefas.filter(t =>
        t.descricao.toLowerCase().includes(descricao.toLowerCase())
    );

    console.log("\n===== RESULTADO DA BUSCA =====");
    console.log(resultado);
}

function listarPendentes() {
    console.log("\n===== TAREFAS PENDENTES =====");

    tarefas
        .filter(t => !t.concluida)
        .forEach(t => console.log(t.descricao));
}

function listarConcluidas() {
    console.log("\n===== TAREFAS CONCLUÍDAS =====");

    tarefas
        .filter(t => t.concluida)
        .forEach(t => console.log(t.descricao));
}

// TESTANDO O SISTEMA

adicionarTarefa("Estudar JavaScript");
adicionarTarefa("Fazer atividade de programação");
adicionarTarefa("Organizar os estudos");

listarTarefas();

concluirTarefa(tarefas[0].id);

listarPendentes();
listarConcluidas();

buscarTarefa("JavaScript");

removerTarefa(tarefas[1].id);

listarTarefas();