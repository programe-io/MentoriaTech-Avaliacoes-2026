// Array para armazenar as tarefas cadastradas
const tarefas = [];
let proximoCodigo = 1;

/**
 * 1. Cadastrar uma nova tarefa
 * Valida o título (mín. 5 caracteres) e a prioridade (1 a 3).
 */
function cadastrarTarefa(titulo, prioridade) {
  if (typeof titulo !== 'string' || titulo.trim().length < 5) {
    console.error('Erro ao cadastrar: O título deve ter no mínimo 5 caracteres.');
    return null;
  }

  if (![1, 2, 3].includes(prioridade)) {
    console.error('Erro ao cadastrar: A prioridade deve ser 1 (alta), 2 (média) ou 3 (baixa).');
    return null;
  }

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  console.log(`Tarefa "${novaTarefa.titulo}" cadastrada com sucesso (Código: ${novaTarefa.codigo}).`);
  return novaTarefa;
}

/**
 * 2. Listar as tarefas cadastradas
 */
function listarTarefas() {
  if (tarefas.length === 0) {
    console.log('Nenhuma tarefa cadastrada.');
    return;
  }

  const nomesPrioridade = { 1: 'Alta', 2: 'Média', 3: 'Baixa' };

  console.log('\n================ LISTA DE TAREFAS ================');
  tarefas.forEach(t => {
    const status = t.concluida ? '[X] Concluída' : '[ ] Pendente';
    const prioridadeTexto = nomesPrioridade[t.prioridade] || t.prioridade;
    console.log(`[ID: ${t.codigo}] ${t.titulo} | Prioridade: ${prioridadeTexto} (${t.prioridade}) | Status: ${status}`);
  });
  console.log('==================================================\n');
}

/**
 * 3. Marcar uma tarefa como concluída
 */
function concluirTarefa(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    console.error(`Erro: Tarefa com código ${codigo} não encontrada.`);
    return false;
  }

  tarefa.concluida = true;
  console.log(`Sucesso: Tarefa [ID: ${codigo}] "${tarefa.titulo}" foi marcada como concluída.`);
  return true;
}

/**
 * 4. Alterar a prioridade de uma tarefa
 * Valida se a nova prioridade está entre 1 e 3.
 */
function alterarPrioridade(codigo, novaPrioridade) {
  if (![1, 2, 3].includes(novaPrioridade)) {
    console.error('Erro ao alterar: A nova prioridade deve ser 1 (alta), 2 (média) ou 3 (baixa).');
    return false;
  }

  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    console.error(`Erro: Tarefa com código ${codigo} não encontrada.`);
    return false;
  }

  tarefa.prioridade = novaPrioridade;
  console.log(`Sucesso: Prioridade da tarefa [ID: ${codigo}] alterada para ${novaPrioridade}.`);
  return true;
}

// ============================================================================
// EXEMPLOS DE USO E TESTES
// ============================================================================

// Testes de cadastro com validações
cadastrarTarefa('Est', 1); // Falha: título muito curto
cadastrarTarefa('Corrigir bugs do sistema', 5); // Falha: prioridade inválida
cadastrarTarefa('Elaborar relatório final', 1); // Sucesso (ID: 1)
cadastrarTarefa('Revisar documentação', 2); // Sucesso (ID: 2)
cadastrarTarefa('Atualizar dependências', 3); // Sucesso (ID: 3)

// Listar tarefas após cadastros
listarTarefas();

// Marcar tarefa como concluída
concluirTarefa(2);

// Alterar prioridade de uma tarefa
alterarPrioridade(3, 1);

// Listar tarefas para conferir as alterações
listarTarefas();