let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('o titulo deve ter no minimo 5 caracteres');

    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('informe uma prioridade entre 1  e 3');
    }
}

function cadastrarTarefa(titulo,prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

// implementação incluída para completar o código
funtion buscarTarefa(codigo) {
    let tarefa = tarefa.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    return tarefa;
}

funtion concluirTarefa(codgo) {
    let tarefa = buscarTarefa(codigo):

    if (tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefas(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Testes
cadastrarTarefa('Cadastrar Clientes', 1);
console.log(listarTarefas());

alterarPrioridade(1, 2);

// console.log(listarTarefas())




