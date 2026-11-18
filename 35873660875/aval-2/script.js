let tarefas = [];
let geradorCodigo = 0;

// ---------- VALIDAÇÃO ----------

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("Título deve ter, no mínimo, cinco caracteres");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Prioridade deve ser entre 1 e 3");
  }
}

// ---------- BUSCA ----------

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código não encontrado");
  }

  return tarefa;
}

// ---------- CADASTRAR ----------

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorCodigo = geradorCodigo + 1;

  let novaTarefa = {
    codigo: geradorCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução, false = concluída
  };

  tarefas.push(novaTarefa);
  console.log("Tarefa cadastrada com sucesso!");
  console.log(novaTarefa);
}

// ---------- LISTAR ----------

function listarTarefas() {
  return tarefas;
}

// ---------- CONCLUIR ----------

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Tarefa já estava concluída");
  }

  tarefa.status = false;
  console.log("Tarefa concluída com sucesso!");
  console.log(tarefa);
}

// ---------- ALTERAR PRIORIDADE ----------

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  // Reaproveita a validação usando o título já cadastrado
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  console.log("Prioridade alterada com sucesso!");
  console.log(tarefa);
}

// ---------- TESTES ----------

try {
  cadastrarTarefa("Estudar JavaScript", 1);
  cadastrarTarefa("Fazer projeto de estoque", 2);
  cadastrarTarefa("Revisar para a prova", 3);
} catch (erro) {
  console.log("Erro: " + erro.message);
}

console.log("--- LISTA DE TAREFAS ---");
console.log(listarTarefas());

try {
  alterarPrioridade(2, 1);
} catch (erro) {
  console.log("Erro: " + erro.message);
}

try {
  concluirTarefa(1);
} catch (erro) {
  console.log("Erro: " + erro.message);
}

console.log("--- LISTA ATUALIZADA ---");
console.log(listarTarefas());

// Teste de erro - título curto
try {
  cadastrarTarefa("Teste", 1);
} catch (erro) {
  console.log("Erro: " + erro.message);
}

// Teste de erro - prioridade inválida
try {
  cadastrarTarefa("Estudar para prova", 5);
} catch (erro) {
  console.log("Erro: " + erro.message);
}

// Teste de erro - código não encontrado
try {
  concluirTarefa(99);
} catch (erro) {
  console.log("Erro: " + erro.message);
}

// Teste de erro - concluir 2 vezes
try {
  concluirTarefa(1);
} catch (erro) {
  console.log("Erro: " + erro.message);
}