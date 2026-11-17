const tarefas = [];
let ultimoCodigo = 0;

// Validar dados das tarefas
function validarDadosTarefas(titulo, prioridade) {
  if (!titulo || titulo.length < 5) {
    throw new Error("O título da tarefa deve possuir no mínimo 5 caracteres");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3");
  }
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Tarefa não encontrada");
  }

  return tarefa;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarDadosTarefas(titulo, prioridade);

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

// Listar tarefas
function listarTarefas() {
  return tarefas;
}

// Concluir tarefa
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já está concluída");
  }

  tarefa.status = false;

  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosTarefas(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;

  return tarefa;
}


cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios", 2);

console.log("Lista inicial:");
console.log(listarTarefas());

alterarPrioridade(1, 3);

console.log("Lista após alterar prioridade:");
console.log(listarTarefas());

concluirTarefa(1);

console.log("Lista após concluir tarefa:");
console.log(listarTarefas());