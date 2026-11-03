// Array global que armazenará todas as tarefas do sistema
const listaDeTarefas = [];
let proximoCodigo = 1;

/**
 * 1. Cadastrar uma nova tarefa
 * @param {string} titulo - Título da tarefa (mínimo 5 caracteres)
 * @param {number} prioridade - Valor entre 1 (alta) e 3 (baixa)
 */
function cadastrarTarefa(titulo, prioridade) {
    // Regra de validação: Título deve ter no mínimo 5 caracteres
    if (!titulo || titulo.trim().length < 5) {
        console.error("Erro: O título deve ter no mínimo 5 caracteres.");
        return false;
    }

    // Regra de validação: Prioridade deve ser entre 1 e 3
    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        console.error("Erro: A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
        return false;
    }

    // Criando o objeto da nova tarefa
    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false // Status inicial de conclusão
    };

    listaDeTarefas.push(novaTarefa);
    console.log(`Sucesso: Tarefa "${novaTarefa.titulo}" cadastrada com código ${novaTarefa.codigo}.`);
    return true;
}

/**
 * 2. Listar as tarefas cadastradas
 */
function listarTarefas() {
    if (listaDeTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada no momento.");
        return;
    }

    console.log("\n=== LISTA DE TAREFAS ===");
    listaDeTarefas.forEach(tarefa => {
        const status = tarefa.concluida ? "[Concluída]" : "[Pendente]";
        console.log(`Cód: ${tarefa.codigo} | Título: ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} | Status: ${status}`);
    });
    console.log("========================\n");
}

/**
 * 3. Marcar uma tarefa como concluída
 * @param {number} codigo - Código da tarefa
 */
function marcarComoConcluida(codigo) {
    const tarefa = listaDeTarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.error(`Erro: Tarefa com código ${codigo} não encontrada.`);
        return false;
    }

    tarefa.concluida = true;
    console.log(`Sucesso: Tarefa ${codigo} marcada como concluída.`);
    return true;
}

/**
 * 4. Alterar a prioridade de uma tarefa
 * @param {number} codigo - Código da tarefa
 * @param {number} novaPrioridade - Novo valor de prioridade (1 a 3)
 */
function alterarPrioridade(codigo, novaPrioridade) {
    // Regra de validação: Prioridade deve ser entre 1 e 3
    if (novaPrioridade < 1 || novaPrioridade > 3 || !Number.isInteger(novaPrioridade)) {
        console.error("Erro: A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
        return false;
    }

    const tarefa = listaDeTarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.error(`Erro: Tarefa com código ${codigo} não encontrada.`);
        return false;
    }

    tarefa.prioridade = novaPrioridade;
    console.log(`Sucesso: Prioridade da tarefa ${codigo} alterada para ${novaPrioridade}.`);
    return true;
}

// --- EXEMPLO DE USO / TESTES ---

console.log("--- Testando Cadastros ---");
cadastrarTarefa("Estudar JavaScript", 1); // Sucesso
cadastrarTarefa("Academia", 2);           // Sucesso
cadastrarTarefa("Ler", 3);                // Erro: menos de 5 caracteres
cadastrarTarefa("Comprar mantimentos", 5); // Erro: prioridade inválida

listarTarefas();

console.log("--- Testando Modificações ---");
marcarComoConcluida(1);      // Conclui a primeira tarefa
alterarPrioridade(2, 1);     // Altera prioridade da tarefa 2 para alta

listarTarefas();
