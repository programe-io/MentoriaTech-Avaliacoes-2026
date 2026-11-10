
// 3. Armazenamento das tarefas com arrays
let tarefas = [];

// 7. Geração automática de códigos
// Contador independente, iniciado em zero
let proximoCodigo = 0;

// 5. Validação dos dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
  // Validação do título
  if (titulo.length < 5) {
    throw new Error("Título deve ter no mínimo cinco caracteres");
  }

  // Validação da prioridade
  // Prioridade deve estar entre 1 e 3, sendo 1 a mais alta e 3 a mais baixa
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Prioridade deve estar entre 1 e 3");
  }
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  // Incrementa o código antes de atribuir
  proximoCodigo++;

  // Objeto como representação da tarefa
  // status = true -> ainda em execução / não concluída
  // status = false -> concluída
  let novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true
  };

  // Inserção no array
  tarefas.push(novaTarefa);
}

// 8. Listagem das tarefas cadastradas
// Retornar não é o mesmo que exibir
function listarTarefas() {
  return tarefas;
}

// 9. Busca de tarefas com find
function buscarTarefa(codigo) {
  let tarefa = tarefas.find(function (t) {
    return t.codigo === codigo;
  });

  // Tratamento de tarefa inexistente
  if (!tarefa) {
    throw new Error("Código não foi encontrado");
  }

  return tarefa;
}

// 10. Conclusão de uma tarefa
function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);

  // Validação de conclusão duplicada
  if (tarefa.status === false) {
    throw new Error("A tarefa já estava concluída");
  }

  tarefa.status = false;
}

// 11. Alteração da prioridade
function alterarPrioridade(codigo, novaPrioridade) {
  let tarefa = buscarTarefa(codigo);

  // Reaproveitamento da validação
  // Reutiliza o próprio título já validado da tarefa
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// Testes
try {
  cadastrarTarefa("Estudar JavaScript", 1);
  cadastrarTarefa("Fazer exercícios", 2);
  cadastrarTarefa("Revisar projeto", 3);

  console.log(listarTarefas());

  concluirTarefa(1);
  alterarPrioridade(2, 1);

  console.log(listarTarefas());

} catch (erro) {
  console.log("Erro: " + erro.message);
}