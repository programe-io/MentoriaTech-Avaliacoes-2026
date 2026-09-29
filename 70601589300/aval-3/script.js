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

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': false
    };

    tarefas.push(tarefa);
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    tarefa.status = true;
}

function alterarPrioridade(codigo, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error('Tarefa não encontrada');
    }

    tarefa.prioridade = novaPrioridade;
}


// Testes
cadastrarTarefa('Cadastrar Clientes', 1);
cadastrarTarefa('Limpar banco de dados', 3);

concluirTarefa(1);
alterarPrioridade(2, 2);

console.log(listarTarefas());