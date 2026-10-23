// Array pra guardar tarefas
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade){
  if(titulo.length < 5){
    throw new Error("Titulo deve conter no minimo 5 caracteres!");
  }
  if(prioridade.length < 1 || prioridade > 3){
    throw new Error("prioridade deve ser maior que 0 e menor que 4!")
  }
}

function buscarTarefa(codigoTarefa){
  const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);

  if(!tarefaBuscada){
    throw new Error('Codigo não encontrado');
  }
  return tarefaBuscada;
}

function concluirTarefa(codigo){
 let tarefa = buscarTarefa(codigo);
 tarefa.status = false;
}

function cadastrarTarefa(titulo, prioridade){
  validarDadosTarefa(titulo, prioridade);

  let tarefa = {
    'codigo': ++geradorCodigo,
    'descricao': titulo,
    'prioridade': prioridade,
    'status': true
    
  }
  
  tarefas.push(tarefa);
}

function listarTarefas(){
  return tarefas;
}

function alterarPrioridade(codigo, novaPrioridade){
  let tarefa = buscarTarefa(codigo);
  validarDadosTarefa(tarefa.descricao, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}


//testes do algoritmo
cadastrarTarefa('Repor estoque', 3);
cadastrarTarefa('Arrumar prateleiras', 2)
concluirTarefa(1);
alterarPrioridade(1, 2);
console.log(listarTarefas());

