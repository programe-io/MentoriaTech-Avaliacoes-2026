let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa(codigo, titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres.");
        return false;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return false;
    }

    const tarefaExistente = tarefas.find(t => t.codigo === codigo);
    if (tarefaExistente) {
        console.log("Erro: Já existe uma tarefa com este código.");
        return false;
    }

    const novaTarefa = {
        codigo: codigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    console.log(`Tarefa "${titulo}" cadastrada com sucesso!`);
    return true;
}

// Listar as tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n--- Lista de Tarefas ---");
    tarefas.forEach(t => {
        const status = t.concluida ? "[Concluída]" : "[Pendente]";
        console.log(`Código: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${status}`);
    });
    console.log("------------------------\n");
}

// Marcar uma tarefa como concluída
function marcarComoConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (!tarefa) {
        console.log("Erro: Tarefa não encontrada.");
        return false;
    }

    tarefa.concluida = true;
    console.log(`Tarefa ${codigo} marcada como concluída.`);
    return true;
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return false;
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (!tarefa) {
        console.log("Erro: Tarefa não encontrada.");
        return false;
    }

    tarefa.prioridade = novaPrioridade;
    console.log(`Prioridade da tarefa ${codigo} alterada para ${novaPrioridade}.`);
    return true;
}

// Exemplos de uso:
cadastrarTarefa(1, "Estudar JavaScript", 1); // Sucesso
cadastrarTarefa(2, "Ler", 2);                 // Erro: título curto
cadastrarTarefa(2, "Ler um livro", 4);        // Erro: prioridade inválida
cadastrarTarefa(2, "Ler um livro", 3);        // Sucesso

listarTarefas();

marcarComoConcluida(1);
alterarPrioridade(2, 1);

listarTarefas();