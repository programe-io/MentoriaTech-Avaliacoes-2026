// --- LÓGICA EM JAVASCRIPT ---

// 3. Armazenamento das tarefas com array
let tarefas = [];

// 7. Geração automática de códigos independente
let proximoCodigo = 1;

// 5. Validação dos dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

// 9. Busca de tarefas com find
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((item) => item.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }

  return tarefa;
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = Em execução / não concluída
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

// 8. Listagem das tarefas cadastradas
function listarTarefas() {
  return tarefas;
}

// 10. Conclusão de uma tarefa
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");
  }

  tarefa.status = false; // false = Concluída
  return tarefa;
}

// 11. Alteração da prioridade
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// --- TESTES DE EXECUÇÃO NO CONSOLE ---
try {
  cadastrarTarefa("Estudar JavaScript", 1);
  cadastrarTarefa("Fazer compras da semana", 2);

  concluirTarefa(1);
  alterarPrioridade(2, 3);

  console.log("Tarefas cadastradas:", listarTarefas());
} catch (erro) {
  console.error("Erro no teste:", erro.message);
}
