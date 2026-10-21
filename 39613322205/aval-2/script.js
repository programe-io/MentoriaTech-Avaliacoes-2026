// Estrutura para armazenar a lista de tarefas
const tarefas = [];
let proximoCodigo = 1;

/**
 * 1. Cadastrar uma nova tarefa
 * @param {string} titulo - Título da tarefa (mínimo 5 caracteres)
 * @param {number} prioridade - Prioridade entre 1 (alta) e 3 (baixa)
 */
function cadastrarTarefa(titulo, prioridade) {
  // Regra de Validação: Título deve ter no mínimo 5 caracteres
  if (!titulo || titulo.trim().length < 5) {
    console.error("❌ Erro: O título deve ter no mínimo 5 caracteres.");
    return;
  }

  // Regra de Validação: Prioridade deve ser entre 1 (alta) e 3 (baixa)
  if (![1, 2, 3].includes(prioridade)) {
    console.error("❌ Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    return;
  }

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  console.log(`✅ Tarefa "${novaTarefa.titulo}" cadastrada com sucesso! (Código: ${novaTarefa.codigo})`);
}

/**
 * 2. Listar as tarefas cadastradas
 */
function listarTarefas() {
  console.log("\n--- LISTA DE TAREFAS ---");
  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }

  const textoPrioridade = { 1: "1 (Alta)", 2: "2 (Média)", 3: "3 (Baixa)" };

  tarefas.forEach((tarefa) => {
    const status = tarefa.concluida ? "[✔] Concluída" : "[ ] Pendente";
    console.log(
      `ID: ${tarefa.codigo} | Título: ${tarefa.titulo} | Prioridade: ${textoPrioridade[tarefa.prioridade]} | Status: ${status}`
    );
  });
  console.log("------------------------\n");
}

/**
 * 3. Marcar uma tarefa como concluída
 * @param {number} codigo - Código da tarefa a ser concluída
 */
function marcarComoConcluida(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    console.error(`❌ Erro: Tarefa com código ${codigo} não foi encontrada.`);
    return;
  }

  tarefa.concluida = true;
  console.log(`✅ Tarefa ID ${codigo} ("${tarefa.titulo}") marcada como concluída!`);
}

/**
 * 4. Alterar a prioridade de uma tarefa
 * @param {number} codigo - Código da tarefa
 * @param {number} novaPrioridade - Nova prioridade entre 1 e 3
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    console.error(`❌ Erro: Tarefa com código ${codigo} não foi encontrada.`);
    return;
  }

  // Regra de Validação
  if (![1, 2, 3].includes(novaPrioridade)) {
    console.error("❌ Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    return;
  }

  tarefa.prioridade = novaPrioridade;
  console.log(`✅ Prioridade da tarefa ID ${codigo} alterada para ${novaPrioridade}!`);
}

// ===================================================
// DEMONSTRAÇÃO / TESTES DAS FUNCIONALIDADES E REGRAS
// ===================================================

console.log("=== EXECUTANDO TESTES DO GERENCIADOR DE TAREFAS ===\n");

// 1. Testando Validações de Cadastro
cadastrarTarefa("Ler", 1);           // Falha: Título < 5 caracteres
cadastrarTarefa("Estudar JS", 5);     // Falha: Prioridade inválida

// Cadastros válidos
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Praticar Exercícios", 2);
cadastrarTarefa("Revisar Código", 3);

// 2. Listar tarefas
listarTarefas();

// 3. Marcar tarefa como concluída
marcarComoConcluida(1);

// 4. Alterar prioridade da tarefa
alterarPrioridade(3, 1);

// Listar novamente para ver o resultado final
listarTarefas();