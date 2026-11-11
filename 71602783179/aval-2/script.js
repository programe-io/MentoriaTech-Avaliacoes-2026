/* Array que vai guardar o conjunto de todas as tarefas */
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
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': false // Inicia como false (pendente)
    };

    tarefas.push(tarefa);
}

function listarTarefas(){
    return tarefas;
}

function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    // Correção: lança erro se a tarefa JÁ estiver concluída (true)
    if (tarefa.status === true) {
        throw new Error('Tarefa já estava como concluída');
    }

  
    // Correção: altera o status para concluída (true)
    tarefa.status = true;
}

function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Exemplo de uso:
cadastrarTarefa('Cadastrar Clientes', 1);
console.log(listarTarefas());

concluirTarefa(1); // Conclui a tarefa
console.log(listarTarefas());

alterarPrioridade(1, 2);
console.log(listarTarefas());$0