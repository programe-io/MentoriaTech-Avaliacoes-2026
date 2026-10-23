Sistema de gerenciamento de tarefas 

let tarefas = [ ];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}
function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

    if (!tarefaBuscada) {
        throw new Error('Código de tarefa não encontrado');
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: false
    };
tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigoTarefa) {
    const tarefa = buscarTarefa(codigoTarefa);
    tarefa.status = true;
}

function alterarPrioridade(codigoTarefa, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
const tarefa = buscarTarefa(codigoTarefa);
    tarefa.prioridade = novaPrioridade;
}

// Testes
cadastrarTarefa('Cadastrar Clientes', 1);

concluirTarefa(1);

console.log(listarTarefas());

alterarPrioridade(1, 2);

console.log(listarTarefas());