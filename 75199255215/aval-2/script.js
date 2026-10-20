let tarefas = [];
let proximoId = 1;

function validarTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter pelo menos 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser entre 1 e 3.");
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarTarefa(titulo, prioridade);

  let novaTarefa = {
    id: proximoId,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  proximoId++;
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(id) {
  let tarefaEncontrada = tarefas.find(function(tarefa) {
    return tarefa.id === id;
  });

  if (!tarefaEncontrada) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefaEncontrada;
}

function concluirTarefa(id) {
  let tarefa = buscarTarefa(id);
  tarefa.concluida = true;
  return tarefa;
}

function alterarPrioridade(id, novaPrioridade) {
  let tarefa = buscarTarefa(id);
  
  if (novaPrioridade < 1 || novaPrioridade > 3) {
    throw new Error("A prioridade deve ser entre 1 e 3.");
  }

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

cadastrarTarefa("Estudar Matemática", 1);
cadastrarTarefa("Fazer o trabalho", 2);

console.log(listarTarefas());

concluirTarefa(1);

console.log(listarTarefas());