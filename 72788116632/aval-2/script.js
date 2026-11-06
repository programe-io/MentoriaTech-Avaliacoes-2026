let tarefas=[];
let geradorCodigo=0;
function validarDadosTarefa(tituo, prioridade){
    if(titulo.length<5){
        throw new Error('O titulo deve ter no minimo 5 caracteres');
    }
    if (prioridade<1|| prioridade>3){
        throw new Error('Informe uma prioriade entre 1 e 3');
    }
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscada=tarefas.find(t=>t.codigo===codigoTarefa);
    if(!tarefaBuscada){
        throw new Error('Codigo de tarefa nao encontrado');
    }
    return tarefaBuscada;
}
function cadastrarTarefa(titulo, prioridade){
    validarDadosTaref(titulo, prioridade);
    
        let tarefa={
            'codigo':++geradorCodigo,
            'titulo':titulo,
            'prioridade':prioridade,
            'status':true
        }
        tarefas.push(tarefa);
    }
    function listartarefas(){
        return tarefas;
    }

function concluirTarefa(Codigo){
    let tarefa=buscarTarefa(codigo);
    if(tarefa.status===false){
        throw new Error('Tarefa ja estava como concluida');
    }
    tarefa.status=false;
}
function alterarPrioridade(codigo, novaPrioridade){
    let tarefa=buscarTarefa(codigo);
    validarDadosTarefas(tarefa.titulo,novaPrioridade);
    tarefa.prioridade=novaPrioridade;
}
cadastrarTarefa('Cadastrar Clientes',1);
console.long(listarTarefa())
alterarPrioridade(1,2);
console.log(listarTarefas())