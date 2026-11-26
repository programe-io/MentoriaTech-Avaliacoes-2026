// Array para armazenar as tarefas
let tarefas = [];

// Função auxiliar para gerar um código único (ID)
let proximoId = 1;

/**
 * 1. Cadastrar uma nova tarefa
 * Regras: Título com no mínimo 5 caracteres; Prioridade entre 1 e 3.
 */
function cadastrarTarefa(titulo, prioridade) {
    // Validação do título
    if (!titulo || titulo.trim().length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres.");
        return false;
    }

    // Validação da prioridade (1 = alta, 2 = média, 3 = baixa)
    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return false;
    }

    const novaTarefa = {
        codigo: proximoId++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        statusConclusao: false // false = pendente, true = concluída
    };

    tarefas.push(novaTarefa);
    console.log(`Sucesso: Tarefa "${novaTarefa.titulo}" cadastrada com o código ${novaTarefa.codigo}.`);
    return true;
}

/**
 * 2. Listar as tarefas cadastradas
 */
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("--- LISTA DE TAREFAS ---");
    tarefas.forEach(tarefa => {
        let status = tarefa.statusConclusao ? "Concluída" : "Pendente";
        let textoPrioridade;
        
        if (tarefa.prioridade === 1) textoPrioridade = "Alta (1)";
        else if (tarefa.prioridade === 2) textoPrioridade = "Média (2)";
        else textoPrioridade = "Baixa (3)";

        console.log(`[Código: ${tarefa.codigo}] ${tarefa.titulo} | Prioridade: ${textoPrioridade} | Status: ${status}`);
    });
    console.log("------------------------");
}

/**
 * 3. Marcar uma tarefa como concluída
 */
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log(`Erro: Tarefa com o código ${codigo} não foi encontrada.`);
        return false;
    }

    tarefa.statusConclusao = true;
    console.log(`Sucesso: Tarefa "${tarefa.titulo}" marcada como concluída.`);
    return true;
}

/**
 * 4. Alterar a prioridade de uma tarefa
 * Regras: Nova prioridade deve ser um valor entre 1 e 3.
 */
function alterarPrioridade(codigo, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.