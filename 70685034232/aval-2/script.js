
let tarefas = [];
let geradorCodigo = 1;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título da tarefa deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade da tarefa deve ser entre 1 e 3");
    }
}

function adicionarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: geradorCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function buscarTarefa(codigo) {
    let tarefa = tarefas.find(tarefa => tarefa.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava como concluída");
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Testes
adicionarTarefa("Cadastrar clientes", 1);
adicionarTarefa("Organizar arquivos", 3);

console.log("Lista de tarefas:");
console.log(listarTarefas());

alterarPrioridade(1, 2);

console.log("Após alterar a prioridade:");
console.log(listarTarefas());

concluirTarefa(1);

console.log("Após concluir a tarefa:");
console.log(listarTarefas());
