let tarefas = {};
let geradorCodigo = 0;

function validarDADOSTarefa(titulo, prioridade) {
  if (!titulo.length < 5) {
throw new Error(`Erro: O título "${titulo}" deve ter no mínimo 5 caracteres.`);   
}
if (prioridade < 1 || prioridade > 3) {
    throw new Error(`Erro: A prioridade (${prioridade}) deve ser um valor entre 1  e 3 .`);
    }
}

function buscarTarefa(codigoTarefa) {
  const tarefaBuscada = tarefas[codigoTarefa];
  if (!tarefaBuscada) {
    throw new Error('Código de tarefa não encontrado');
  }
  return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
validarDADOSTarefa(titulo, prioridade);
const tarefa = {
 'codigo': ++geradorCodigo,
  'titulo': titulo,
  'prioridade': prioridade,
  'status': true
};
tarefas[tarefa.codigo] = tarefa;
return tarefa;
}
function listarTarefas() {
  return tarefas;
}
function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);

  if(tarefa.status === false){
    throw new Error('tarefa já estava concluida');
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  let tarefa = buscarTarefa(codigo);
  validarDADOSTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}




cadastrarTarefa("cadastrar cliente", 1);
console.log(listarTarefas());


alterarPrioridade(1, 2);




console.log(listarTarefas());
