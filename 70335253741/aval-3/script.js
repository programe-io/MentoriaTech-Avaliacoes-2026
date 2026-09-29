// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];
let geradorCodigo = 0;


// Valida os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}


// Busca uma tarefa pelo código
function buscarTarefa(codigo) {

    return tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });
}


// Cadastra uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    geradorCodigo++;

    let tarefa = {
        codigo: geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}


// Lista todas as tarefas
function listarTarefas() {
    return tarefas;
}


// Conclui uma tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    tarefa.status = false;

    return tarefa;
}


// Edita uma tarefa
function editarTarefa(codigo, novoTitulo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    validarDadosTarefa(novoTitulo, novaPrioridade);

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;

    return tarefa;
}


// Exclui uma tarefa
function excluirTarefa(codigo) {

    let indice = tarefas.findIndex(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (indice === -1) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefas.splice(indice, 1)[0];
}


// =====================================
// TESTANDO O SISTEMA
// =====================================

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar projeto", 3);

console.log("Todas as tarefas:");
console.log(listarTarefas());

console.log("Buscar tarefa 2:");
console.log(buscarTarefa(2));

console.log("Concluindo tarefa 1:");
console.log(concluirTarefa(1));

console.log("Editando tarefa 2:");
console.log(editarTarefa(2, "Estudar HTML e CSS", 1));

console.log("Excluindo tarefa 3:");
console.log(excluirTarefa(3));

console.log("Resultado final:");
console.log(tarefas);
