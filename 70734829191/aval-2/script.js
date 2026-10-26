let geradorCodigo = 0;
let tarefas = [];

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error('Tarefa não encontrada');
    }

    return tarefaBuscada;
}

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

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error('Tarefa já estava como concluída');
    }

    tarefa.status = false;
}

            function alterarPrioriedade(codigo,novaPrioridade) {
                 let tarefa=buscarTarefa(codigo);

                 validarDadosTarefa(tarefa.titulo,novaPrioridade);
             tarefa.prioridade=novaPrioridade    

    
            }