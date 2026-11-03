
// Lista (Array) de tarefas
let tarefas = [];
let geradorCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

// Função para cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

// Função para listar as tarefas
function listarTarefa() {
    return tarefas;
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    return tarefa;
}

// Função para concluir uma tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('A tarefa já estava concluída');
    }

    tarefa.status = false;
}

// Função para alterar a prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }

    tarefa.prioridade = novaPrioridade;
}

// Testes
cadastrarTarefa('Cadastrar Clientes', 1);

console.log(listarTarefa());

alterarPrioridade(1, 2);

console.log(listarTarefa());
