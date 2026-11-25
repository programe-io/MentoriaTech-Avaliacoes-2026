// REVISÃO - SISTEMA DE TAREFAS

let tarefas = [];

function adicionarTarefa(titulo) {
    tarefas.push({
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false
    });

    console.log("Tarefa adicionada com sucesso!");
}

function listarTarefas() {
    console.log("\n=== LISTA DE TAREFAS ===");

    tarefas.forEach(tarefa => {
        console.log(
            `${tarefa.id} - ${tarefa.titulo} | ${
                tarefa.concluida ? "Concluída" : "Pendente"
            }`
        );
    });
}

function concluirTarefa(id) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        console.log("Status da tarefa atualizado!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    console.log("Tarefa excluída!");
}

function buscarTarefa(pesquisa) {
    let resultado = tarefas.filter(t =>
        t.titulo.toLowerCase().includes(pesquisa.toLowerCase())
    );

    console.log("Resultado da busca:", resultado);
}

// TESTANDO O SISTEMA
adicionarTarefa("Estudar JavaScript");
adicionarTarefa("Fazer atividade");
adicionarTarefa("Revisar programação");

listarTarefas();

concluirTarefa(1);

listarTarefas();

buscarTarefa("JavaScript");

excluirTarefa(2);

listarTarefas();