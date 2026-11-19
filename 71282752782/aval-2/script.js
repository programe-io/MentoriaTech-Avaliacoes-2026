
/* Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];
function validarDadosTarefa(titulo,prioridade) {
    if(titulo.length < 5) {
        throw new Error("o titulo deve ter no minimo 5 caracteres");    
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("informe uma prioridade entre 1 e 3");    
    }
    
}


function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find( t =>t.codigo=== codigotarefa);
    if(buscarTarefa){
     throw new Error("codigo de tarefa nao encontrado");
     }
     return tarefaBuscada;
}


function cadastrarTarefa(titulo ,prioridade) {   validarDadosTarefa(titulo,prioridade);  
let tarefa = {
    'codigo': ++geradorCodigo,
    'titulo' :titulo,
    'prioridade':prioridade,
    'status':true
}

   tarefa.push(tarefa);
}


function alterarPrioridade(codigo,novaprioridade) {
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa,titulo,novaPrioridade);

    tarefa.prioridade = novaprioridade;
}






cadastrarTarefa('cadastrar clientes',1);
console.log(liatarTarefas());


alterarPrioridade(1,2);


console.log(listarTarefa());






function listarTarefa(){
    return tarefas;
}
function concluirTarefas(codigo) {
    let tarefa = buscarTarefa(codigo);

   if( tarefa.status = false){
    throw new Error("tarefa ja estava como concluida");  
   }
   tarefa.status = false;
}

cadastrarTarefa('Cadastrar Clientes',1);
cadastrarTarefa('limpar banco de dados',3);
console.log(listarTarefa());