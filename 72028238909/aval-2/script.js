let tarefas = [] ;
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if(titulo.length < 5) {
        throw new Error('o título deve ter no mínimo 5 caracteres');
    }

    if(prioridade < 1 || prioridade > 3) {
        throw new Error ('Informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa){
    const tarefa = tarefas.find (function(item){
        return item.codigo === codigoTarefa;
    });

    if(!tarefa){
        throw new Error('tarefa não encontrada');
    }

    return tarefa;
}

function cadastrarTarefa (título, prioridade){
    validarDadosTarefa(título; prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'título': título,
        'prioridade': prioridade,
        'status': true
    }

    tarefas.push(tarefa);
}

function listarTArefas(){
    return tarefas;
} 

function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    if(tarefa.status === false){
        throw new Error('tarefa já estava como concluída');
    }
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade){
    let atrefa = buscartaref(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefa('Cadastrar Clientes', 1);
cadastrarTarefa('Limpar banco de dados', 3);
console.log(listarTarefas());

concluirTarefas(2)
console.log(listarTarefaS());

alterarPrioridade(1, 2);
console.log(listarTarefas());