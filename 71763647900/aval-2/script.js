let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if(titulo.length < 5){
        throw new Error('O titulo deve ter no minimo 5 caracteres');
    }

    if(prioridade < 1 || proridade > 3){
        throw new Error('Informe uma prioridade entre 1 e 3')
    }
}

function buscartarefa(codigoTarefa){
    const tarefa = tarefas.find(function(item){
        return item.codigo === codigoTarefa;
    });
 
    if(!tarefa){
        throw new Error('Tarefa não encontrada');
    }

    return tarefa;
}

    function cadastrarTarefa(titulo, prioridade){
        validarDadosTarefa(titulo, prioridade);

        let tarefa = {
            'codigo': ++geradorCodigo,
            'titulo': titulo,
            'prioridade' : prioridade,
            'status' : true
        }

        tarefas.push(tarefa);
    }

    function listarTarefas(){
        return tarefas;

    }
function concluirTarefa(codigo){
    let tarefa = buscarTarefas (codigo);

    if(tarefa.status === false){
        throw new Error('tarefa ja estava como concluida');
    }
    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade){
    let tarefas = buscarTarefas(codigo);
    validarDadostarefas(tarefa.titulo, novaPrioridade);
    
    tarefa.prioridade = novaPrioridade;
}

cadastrarTarefa('cadastrar clientes', 1);
cadastrarTarefa('limpar banco de dados', 3);
console.log(listartarefas());

concluirtarefa(2);
console.log(listarTarefas())

alterarPrioridade(1, 2);
console.log(listarTarefas());











