let tarefas = [];
let geradorcodigo = 0;

function validarDadosTarefas(titulo, prioridade){
    if(titulo.length < 5){
        throw new Error('o titulo deve ter no minimo 5 caracteres'),
    }

    if(prioridade < 1 || prioridade > 3){
        throw new Error('informe uma prioridade entre 1 e 3');
        }
}

function buscarTarefa(codigoTarefa){
    conet tarefas = tarefas.find(function(item){
        return item.codigo === codigoTarefa,
    });

    if(!tarefa){
        throw new error('tarefa nâo encontrada');
    }
    
    return tarefa;
}

function cadastrartarefa(titulo, prioridade){
    validarDadosTarefas(titulo, prioridade);

    let tarefa = { 
        'codigo': ++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
        }

        tarefas.push(tarefa),
}

function listarTarefas(){
    return tarefas,
}

function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    if(tarefa.status === false){
        throw new Error('Tarefa ja esteva como concluida');
    }
    tarefa.status = false;{
 }

 function alterarPrioridade(codigo, novaPrioridade){
    let tarefan = buscartarefa(codigo);
    validarDadosTarefas(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
 }

 cadastrarTarefa('cadastrar clientes', 1);
 cadastrarTarefa('limpar banco de dados', 3);
 console.log(listarTarefas());

 concluirTarefa(2);
 console.log(listarTarefas());
