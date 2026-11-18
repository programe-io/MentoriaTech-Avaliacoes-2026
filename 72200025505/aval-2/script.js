
// Array para armazenar as tarefas
const tarefas = [];

// Gerador de códigos
let proximoCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// Função para cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const tarefa = {
        codigo: ++proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");
    return tarefa;
}

// Função para listar tarefas
function listarTarefas() {
    return tarefas;
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Função para concluir uma tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Essa tarefa já está concluída.");
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");
}

// Função para alterar a prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// TESTANDO O SISTEMA

try {
    cadastrarTarefa("Estudar JavaScript", 1);
    cadastrarTarefa("Fazer atividade", 2);
    cadastrarTarefa("Organizar materiais", 3);

    console.log("Lista de tarefas:");
    console.log(listarTarefas());

    concluirTarefa(1);

    alterarPrioridade(2, 1);

    console.log("Lista atualizada:");
    console.log(listarTarefas());

} catch (erro) {
    console.log("Erro:", erro.message);
}
