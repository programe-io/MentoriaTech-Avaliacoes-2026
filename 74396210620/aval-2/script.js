let tarefas = [];
let geradorCodigo = 0;

function validarDados(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3");
    }
}

function buscarTarefa(codigo) {

    for (let i = 0; i < tarefas.length; i++) {

        if (tarefas[i].codigo === codigo) {
            return tarefas[i];
        }
    }

    throw new Error("Código de tarefa não encontrado");
}

function cadastrarTarefa(titulo, prioridade) {

    validarDados(titulo, prioridade);

    geradorCodigo++;

    let tarefa = {
        codigo: geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
}

function listarTarefas() {

    return tarefas;
}

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.concluida === true) {
        throw new Error("A tarefa já está concluída");
    }

    tarefa.concluida = true;
}

function alterarPrioridade(codigo, novaPrioridade) {

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3");
    }

    let tarefa = buscarTarefa(codigo);

    tarefa.prioridade = novaPrioridade;
}


// =====================================
// TESTANDO
// =====================================

cadastrarTarefa("Cadastrar Clientes", 1);

cadastrarTarefa("Limpar banco de dados", 3);

console.log("Tarefas cadastradas:");
console.log(listarTarefas());


// Concluir tarefa 2
concluirTarefa(2);

console.log("Depois de concluir a tarefa 2:");
console.log(listarTarefas());


// Alterar prioridade da tarefa 1
alterarPrioridade(1, 2);

console.log("Depois de alterar a prioridade:");
console.log(listarTarefas());