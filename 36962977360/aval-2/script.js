// 3. Armazenamento das tarefas com arrays
const tarefas = [];

// 7. Geração automática de códigos
let proximoCodigo = 1;

// 5. Validação dos dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
  // Validação do título (mínimo 5 caracteres)
  if (!titulo || titulo.length < 5) {
    throw new Error("O título da tarefa deve ter no mínimo 5 caracteres.");
  }

  // Validação da prioridade (deve estar entre 1 e 3)
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um número entre 1 (alta) e 3 (baixa).");
  }
}

// 9. Busca de tarefas com find
function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find(t => t.codigo === codigo);

  // Tratamento de tarefa inexistente com negação lógica
  if (!tarefaEncontrada) {
    throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);
  }

  return tarefaEncontrada;
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(titulo, prioridade) {
  // Valida os dados antes de prosseguir
  validarDadosDaTarefa(titulo, prioridade);

  // Criação do objeto da tarefa
  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução / não concluída
  };

  // Inserção no array
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

  // Validação de conclusão duplicada
  if (!tarefa.status) {
    throw new Error(`A tarefa de código ${codigo} já está concluída.`);
  }

  // Altera o status para falso (concluída)
  tarefa.status = false;
  return tarefa;
}

// 11. Alteração da prioridade
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  // Reutiliza a validação passando o título atual da tarefa
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// 13. Sugestão de evolução: Exibição formatada das tarefas
function exibirTarefasFormatadas() {
  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }

  console.log("\n=================== LISTA DE TAREFAS ===================");
  tarefas.forEach(t => {
    const statusTexto = t.status ? "Em Execução" : "Concluída";
    console.log(`[ID: ${t.codigo}] ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${statusTexto}`);
  });
  console.log("========================================================\n");
}