let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo,prioridade){
    if(titulo.length<5){
        throw new Error('O titulo deve ter no minimo 5 caracteres');
    }

    if(prioridade <1||prioridade >3){
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
 }

 function cadastrarTarefa(titulo,prioridade){
    validarDadosTarefa(titulo,prioridade);

    let tarefa = {
        'codigo':++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status':true
    };

    tarefas.push(tarefa);
 }

 function listarTarefas(){
    return tarefas;
 }

 //Implementação incluída para completar o codigo 
 function buscarTarefas(codigo){
    let tarefa = tarefas.find(t=>t.codigo===codigo);

    if (!tarefa){
        throw new Error('Tarefa nao encontrada');
    }

    return tarefa;
 }

 function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);
    if (tarefa.status===false){
        throw new Error('tarefa ja estava como concluida');
    }

    tarefa.status=false;
 }

 function alterarPrioridade(codigo,novaPrioridade){
    let tarefa= buscarTarefa(codigo);
    validarDdadosTarefa(tarefa.titulo,novaPrioridade);
     tarefa.prioridade=novaPrioridade;
 }

 //testes
 cadastrarTarefa('Cadastrar Clientes',1);
 console.log(listarTarefas());

 alterarPrioridade(1,2);

 console.log(listarTarefas());