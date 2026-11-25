let tarefas = [];

function adicionarTarefa(titulo) {
    let tarefa = {
        id: Date.now(),
        titulo: titulo,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log("Tarefa adicionada!");
}

function listarTarefas() {
    console.log("\n=== GERENCIADOR DE TAREFAS ===");

    tarefas.forEach(tarefa => {
        console.log(
            `${tarefa.id} - ${tarefa.titulo} - ${
                tarefa.concluida ? "Concluída" : "Pendente"
            }`
        );
    });
}

function concluirTarefa(id) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        console.log("Tarefa atualizada!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function editarTarefa(id, novoTitulo) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.titulo = novoTitulo;
        console.log("Tarefa editada!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    console.log("Tarefa excluída!");
}

function buscarTarefa(nome) {
    let resultado = tarefas.filter(t =>
        t.titulo.toLowerCase().includes(nome.toLowerCase())
    );

    console.log("Resultado:", resultado);
}

// TESTES

adicionarTarefa("Estudar JavaScript");
adicionarTarefa("Fazer atividades");
adicionarTarefa("Revisar programação");

listarTarefas();

let primeiroId = tarefas[0].id;

concluirTarefa(primeiroId);

editarTarefa(primeiroId, "Estudar JavaScript avançado");

buscarTarefa("JavaScript");

listarTarefas();

excluirTarefa(tarefas[1].id);

listarTarefas();