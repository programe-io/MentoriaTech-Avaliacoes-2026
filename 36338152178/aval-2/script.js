let tarefas = [];
 let geradorCodigo = 0;

 function validarDadosTarefas(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new error(' o titulo deve ter no mínimo 5 caracteres');
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new error('Informe uma prioridade entre 1 e 3 ');
    }
 }

 function cadastrarTarefas(titulo, prioridade);
    validarDadosTarefas(titulo, prioridade);

    let tarefas = {
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true,
    };

    tarefas.push(tarefas);
} 

funtion listarTarefas() {
    return tarefas;
} 

// Inplementação incluida para completar p código
function buscarTarefas(codigo) {
    let tarefa = tarefas.find(t=> t.codigo === codigo);

    if(!tarefa) {
        throw new error('tarefa não encontrada');
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new error ('tarefa já estava como concluida');
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {

    validarDadosTarefas(tarefa.titulo, novaPrioridade);
}

// teste
cadastrarTarefa('Cadatrar cliente', 1);
console.log(listarTarefas());

alterarPrioridade (1, 2);

console.log(listarTarefas());