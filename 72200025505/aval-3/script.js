
const tarefas = [];
let codigoAtual = 0;

// Validar os dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
    }
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const tarefa = {
        codigo: ++codigoAtual,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada!");
    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Código não encontrado!");
    }

    return tarefa;
}

// Concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("A tarefa já está concluída!");
    }

    tarefa.status = false;

    console.log("Tarefa concluída!");
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada!");
}

// TESTES DO PROJETO

try {
    cadastrarTarefa("Estudar JavaScript", 1);
    cadastrarTarefa("Fazer atividade", 2);
    cadastrarTarefa("Organizar caderno", 3);

    console.log("Todas as tarefas:");
    console.log(listarTarefas());

    concluirTarefa(1);

    alterarPrioridade(2, 1);

    console.log("Tarefas atualizadas:");
    console.log(listarTarefas());

} catch (erro) {
    console.log("Erro: " + erro.message);
}
