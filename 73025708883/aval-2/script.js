let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
  if (!titulo || titulo.length < 5) {
    throw new Error('o titulo deve ter no minimo 5 caracteres');
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error('informe uma prioridade entre 1 a 3');
  }
}

function buscarTarefa(codigoTarefa) {
  const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);
  if (!tarefaBuscada) {
    throw new Error('Codigo de tarefa não encontrada');
  }
  return tarefaBuscada;
}

function cadastraTarefa(titulo, prioridade) {
  validarDadosTarefa(titulo, prioridade);
  let tarefa = {
    'codigo': ++geradorCodigo,
    'titulo': titulo,
    'prioridade': prioridade,
    'status': true
  };
  tarefas.push(tarefa);
}

function listarTarefa() {
  return tarefas;
}

function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);

  if(tarefa.status == false){
      throw new Error('Tarefa já estava como concluida');
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade){
  let tarefa = buscarTarefa(codigo);
  validarDadosTarefa(tarefa.titulo, prioridade);

  tarefa.prioridade = novaPrioridade;
}

cadastraTarefa('Cadastrar Clientes', 1);
cadastraTarefa('limpar banco de dados', 3);
console.log(listarTarefa());

concluirTarefa(2);

console.log(listarTarefa());


