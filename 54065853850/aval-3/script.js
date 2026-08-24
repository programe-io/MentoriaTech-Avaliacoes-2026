// Banco de dados em memória
let tarefas = [];
let proximoId = 1;

// --- FUNÇÕES PRINCIPAIS ---

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  const erro = validarTarefa(titulo, prioridade);
  if (erro) {
    console.error(`Erro ao cadastrar: ${erro}`);
    return null;
  }

  const novaTarefa = {
    codigo: proximoId++,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    concluida: false
  };

  tarefas.push(novaTarefa);
  console.log(`Tarefa "#${novaTarefa.codigo} - ${novaTarefa.titulo}" cadastrada com sucesso!`);
  return novaTarefa;
}

// 2. Listar as tarefas cadastradas
function listarTarefas() {
  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }

  console.log("--- LISTA DE TAREFAS ---");
  tarefas.forEach(t => {
    const status = t.concluida ? "[X] Concluída" : "[ ] Pendente";
    console.log(`Cód: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${status}`);
  });
}

// 3. Marcar uma tarefa como concluída
function alternarStatusConclusao(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    console.error(`Tarefa com código ${codigo} não encontrada.`);
    return;
  }

  tarefa.concluida = !tarefa.concluida;
  const statusTexto = tarefa.concluida ? "concluída" : "pendente";
  console.log(`Tarefa #${codigo} marcada como ${statusTexto}.`);
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
  const prioNum = Number(novaPrioridade);

  if (prioNum < 1 || prioNum > 3 || isNaN(prioNum)) {
    console.error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    return;
  }

  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    console.error(`Tarefa com código ${codigo} não encontrada.`);
    return;
  }

  tarefa.prioridade = prioNum;
  console.log(`Prioridade da tarefa #${codigo} alterada para ${prioNum}.`);
}

// --- REGRAS DE VALIDAÇÃO ---

function validarTarefa(titulo, prioridade) {
  if (!titulo || titulo.trim().length < 5) {
    return "O título deve ter no mínimo 5 caracteres.";
  }

  const prioNum = Number(prioridade);
  if (isNaN(prioNum) || prioNum < 1 || prioNum > 3) {
    return "A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).";
  }

  return null; // Sem erros
}

// --- EXEMPLO DE USO ---

// Testando validação (Título curto demais)
cadastrarTarefa("Ler", 1); 

// Cadastrando tarefas válidas
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios de CSS", 2);
cadastrarTarefa("Revisar estrutura HTML", 3);

// Listando tarefas
listarTarefas();

// Concluindo uma tarefa
alternarStatusConclusao(1);

// Alterando a prioridade de outra tarefa
alterarPrioridade(2, 3);

// Listando novamente para conferir as alterações
listarTarefas();