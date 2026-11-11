// ==========================================
// 1. ESTRUTURA DE DADOS E GERADOR DE CÓDIGO
// ==========================================

// Array principal para armazenar as tarefas cadastradas[cite: 19]
let tarefas = [];

// Gerador de código independente para garantir identificadores únicos
let proximoCodigo = 1;

// ==========================================
// 2. FUNÇÕES DE VALIDAÇÃO E BUSCA (AUXILIARES)
// ==========================================

/**
 * Valida o título (mínimo de 5 caracteres) e a prioridade (entre 1 e 3)[cite: 19, 20].
 */
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título da tarefa deve ter no mínimo cinco caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

/**
 * Localiza e retorna uma tarefa pelo código informado, ou lança um erro se não existir[cite: 21].
 */
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  
  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }
  
  return tarefa;
}

// ==========================================
// 3. OPERAÇÕES PRINCIPAIS (CRUD / AÇÕES)
// ==========================================

/**
 * Cadastra uma nova tarefa após validar os dados[cite: 20].
 * O status inicial é true (não concluída/em execução)[cite: 20].
 */
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo++, // Incrementa o código automaticamente[cite: 20]
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução / não concluída[cite: 20]
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

/**
 * Retorna o array completo de tarefas cadastradas[cite: 20].
 */
function listarTarefas() {
  return tarefas;
}

/**
 * Altera o status da tarefa para concluída (false)[cite: 21].
 * Impede a conclusão duplicada[cite: 21].
 */
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("A tarefa já estava concluída.");
  }

  tarefa.status = false; // false = concluída
}

/**
 * Altera a prioridade de uma tarefa existente após validar a nova prioridade[cite: 21, 22].
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  // Reaproveita a validação passando o título atual e a nova prioridade[cite: 21, 22]
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// ==========================================
// 4. TESTES E EXECUÇÃO DO PROJETO
// ==========================================

try {
  console.log(">>> Cadastrando tarefas...");
  cadastrarTarefa("Estudar JavaScript", 1);
  cadastrarTarefa("Comprar mantimentos", 2);

  console.log("\n>>> Listando tarefas iniciais:");
  console.log(listarTarefas());

  console.log("\n>>> Concluindo a tarefa de código 1...");
  concluirTarefa(1);

  console.log("\n>>> Alterando a prioridade da tarefa 2 para 3...");
  alterarPrioridade(2, 3);

  console.log("\n>>> Listando tarefas atualizadas:");
  console.log(listarTarefas());

} catch (erro) {
  console.error("Erro no sistema:", erro.message);
}