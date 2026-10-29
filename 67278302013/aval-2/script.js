let tarefas = [];
let geradorcodigo = 0;
 
function validarDadostarefa(titulo,prioridade){
    if(titulo.length < 5){
        throw new error('o titulo deve ter no minimo 5 caracteres');
    }
    if(prioridade < 1 || priordade > 3){
        throw new error ('informe uma prioridade entre 1 e 3');
    }
}

function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find(t => t.coigo === codigoTarefa);
      
      if(!tarefaBuscada){
        throw new error ('codigo de tarefa não encontrado');

      }
      return tarefaBuscada;

}
 function cadrastarTarefa(titulo,prioridade){
    validarDadostarefa(titulo,prioridade);

    let tarefa = {
        'codigo': ++geradorcodigo,
        'titulo':titulo,
        'prioridade':prioridade,
        'status':true
    }

    tarefas.push(tarefa);

 }

 function listarTarefas(){
    return tarefas;

 }

 function concluirTarefa(codigo){
    let tarefa = buscarTarefa(codigo);

    if(tarefa.status ===false) {
        throw new error ('Tarefa já estava como concluida');

    }

    tarefa.status = false;

 }

 function alterarPrioridade(codigo, novaPrioridade){
    let tarefa = buscarTarefa(codigo);
    validarDadostarefa(tarefa.titulo,novaPrioridade);

    tarefa.prioridade = novaPrioridade;

 }

 cadrastarTarefa('cadastrar Clientes', 1);
 console.log(listarTarefas());

 alterarPrioridade(1,2);
  
  console.log(listarTarefas());