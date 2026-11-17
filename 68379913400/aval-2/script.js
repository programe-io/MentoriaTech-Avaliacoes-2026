const tarefas = [];

let ultimoCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (!titulo || titulo.length < 5) {
    throw new Error("O título da tarefa deve possuir mínimo 5 caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  ultimoCodigo++;

  const novaTarefa = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já está concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

cadastrarTarefa("Cadastrar Cliente", 1);
cadastrarTarefa("Cadastrar Cliente", 2);

console.log(listarTarefas());

alterarPrioridade(1, 3);

console.log(concluirTarefa(1));

console.log(listarTarefas());
