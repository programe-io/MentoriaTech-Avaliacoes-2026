let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo,prioridade){
    if (titulo.length < 5){
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

function cadastrarTarefa(titulo,prioridade){
    validarDadosTarefa(titulo,prioridade);

    let tarefa = {
        'codigo': ++geradorCodigo,
        'titulo': true
    };

    tarefas.push(tarefa);
}

function listarTarefas(){
    return tarefas;
}

// implementação incluída para completar o código
function buscarTarefa(codigo){
    let tarefa = tarefas.find(t => t.codigo === codigo);
}
return