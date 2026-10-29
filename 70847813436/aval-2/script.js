let tarefas=[];
let geradorCodigo=0;

function validarDadosTareafa(titulo,prioridade){}
    if (titulo.length<5){
        throw new Error ('o titulo deve tewr no minimo 5 caracteres');
        if(prioridade<1 || prioridade>3){
            throw new Error ("informe uma prioridade entre 1 e 3");
        }
    }
function cadastrarTarefa(titulo,prioridade){


}

    let tarefa={
        'codigo':++geradorCodigo,
    'titulo': titulo,
    'prioridade':prioridade,
    'status': true
    };
    tarefas.push(tarefa);
    function listartarefas(){}
return tarefas;
    

//implementacao icluinda para completar o codigo
function buscarTarefa(codigo){
    let tarefa= tarefas.find(t=> t.codigo===codigo);
    if(!tarefa){
    throw new Error('Tarefa nao encontrada');

}
return tarefa;
}
function cocluirTarefa(cpdigo){
    let tarefa=buscarTarefa(codigo);
    if (tarefa.status=== false){
        throw new Error('Tarefa ja estava com concluida');
    }
    tarefa.status= false;
}
function alterarPrioridade(codigo, novaPrioridade){
    let tarefa= buscarTarefa(codigo);
    validarDadosTareafa(tarefa.titulo,novaPrioridade);

    tarefa.prioridade=novaPrioridade;
}
// Testes
cadastrarTarefa('Cadastrar Clientes', 1);
console.log(listarTarefas());
alterarPrioridade(1,2);

console.log(listarTarefas())