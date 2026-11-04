// Aluno: Davi
let tarefas = [];
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
        descricao: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

function listaTarefas() {
    return tarefas;
}

function concluirTarefas(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.descricao, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefa('cadastrar clientes', 1);

console.log(listaTarefas());

alterarPrioridade(1, 2);

console.log(listaTarefas());











