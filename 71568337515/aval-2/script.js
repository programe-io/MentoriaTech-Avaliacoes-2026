let tarefas +[];
let geradorcodigo = 0;
 function validardadostarefa(titulo,prioridade){
    if(titulo.length < 5){
        throw new Error('informe a prioridade entre 1 e 3');
    }
 }
 function buscartarefa(codigotarefa){
    const tarefabuscada = tarefa.find(t => t.codigo === codigotarefa);
    if(!tarefabuscada){
        throw new Error('codigo nâo encontrado')
    }
    return tarefabuscada;
 }

 function cadastrartarefa(titulo,prioridade){
    validardadostarefa(titulo,prioridade)
    let tarefa = {
        'codigo':++geradorcodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }
    tarefas.push(tarefa);
 }

 Function listarTarefas(){
    return tarefas;
 }

function concluirtarefa(codigo){
    let tarefa = buscartarefa(codigo);
    if(tarefa.status === false){
        throw new Error('tareva já estava concluida');
    }
    tarefa.status = false;
}

function alterarpropriedade(codigo,novapropriedade){
    let tarefa = buscartarefa(codigo);
    tarefa.prioridade = novaprioridade;


cadastrartarefa('cadastrar clientes',1);
console.log(listarTarefas());
alterarpropriedade(1,2);
console.log(listarTarefas());