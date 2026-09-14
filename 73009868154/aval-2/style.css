// Array para armazenar o banco de dados de tarefas
const tarefas = [];
let proximoId = 1;

/**
 * 1. Cadastrar uma nova tarefa
 * @param {string} titulo - Título da tarefa (mínimo 5 caracteres)
 * @param {number} prioridade - Prioridade (1 = Alta, 2 = Média, 3 = Baixa)
 */
function cadastrarTarefa(titulo, prioridade) {
  // Validações
  if (!titulo || titulo.trim().length < 5) {
    console.error("Erro: O título deve ter no mínimo 5 caracteres.");
    return;
  }

  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    console.error("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    return;
  }

  // Criação do objeto
  const novaTarefa = {
    codigo: proximoId++,
    titulo: titulo.trim(),
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  console.log(`Sucesso: Tarefa "${novaTarefa.titulo}" cadastrada com o código ${novaTarefa.codigo}.`);
}

/**
 * 2. Listar todas as tarefas cadastradas
 */
function listarTarefas() {
  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }

  const nomesPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

  console.log("\n=== LISTA DE TAREFAS ===");
  tarefas.forEach(t => {
    const status = t.concluida ? "[X] Concluída" : "[ ] Pendente";
    const prio = nomesPrioridade[t.prioridade] || t.prioridade;
    console.log(`ID: ${t.codigo} | Status: ${status} | Prioridade: ${prio} (${t.prioridade}) | Título: ${t.titulo}`);
  });
  console.log("========================\n");
}

/**
 * 3. Marcar uma tarefa como concluída
 * @param {number} codigo - Código ID da tarefa
 */
function marcarComoConcluida(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    console.error(`Erro: Tarefa com código ${codigo} não encontrada.`);
    return;
  }

  tarefa.concluida = true;
  console.log(`Sucesso: Tarefa #${codigo} ("${tarefa.titulo}") marcada como concluída.`);
}

/**
 * 4. Alterar a prioridade de uma tarefa
 * @param {number} codigo - Código ID da tarefa
 * @param {number} novaPrioridade - Nova prioridade (1 a 3)
 */
function alterarPrioridade(codigo, novaPrioridade) {
  // Validação da nova prioridade
  if (!Number.isInteger(novaPrioridade) || novaPrioridade < 1 || novaPrioridade > 3) {
    console.error("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    return;
  }

  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    console.error(`Erro: Tarefa com código ${codigo} não encontrada.`);
    return;
  }

  tarefa.prioridade = novaPrioridade;
  console.log(`Sucesso: Prioridade da tarefa #${codigo} alterada para ${novaPrioridade}.`);
}

// ==========================================
// Exemplo prático de uso / testes das regras
// ==========================================

// Testando cadastros válidos
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer compras da semana", 2);
cadastrarTarefa("Limpar a mesa de trabalho", 3);

// Testando validações do cadastro (devem falhar)
cadastrarTarefa("Café", 1);           // Falha: menos de 5 caracteres
cadastrarTarefa("Ler livro novo", 5);  // Falha: prioridade fora do intervalo 1-3

// Listar tarefas atuais
listarTarefas();

// Marcar tarefa como concluída
marcarComoConcluida(1);

// Alterar prioridade
alterarPrioridade(2, 1);

// Testando validação na alteração de prioridade (deve falhar)
alterarPrioridade(3, 0);

// Listagem final para conferir os resultados
listarTarefas();