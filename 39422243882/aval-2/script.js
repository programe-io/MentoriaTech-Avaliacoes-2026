let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        console.log("Erro: A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log("Tarefa cadastrada com sucesso!");
}

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log(
            `Código: ${tarefa.codigo} | ` +
            `Título: ${tarefa.titulo} | ` +
            `Prioridade: ${tarefa.prioridade} | ` +
            `Status: ${tarefa.concluida ? "Concluída" : "Pendente"}`
        );
    });
}

// 3. Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Erro: Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    console.log("Tarefa marcada como concluída!");
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    if (![1, 2, 3].includes(novaPrioridade)) {
        console.log("Erro: A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Erro: Tarefa não encontrada.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    console.log("Prioridade alterada com sucesso!");
}

// Exemplos de utilização
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios", 2);
cadastrarTarefa("Ler um livro", 3);

console.log("\n--- Lista de tarefas ---");
listarTarefas();

console.log("\n--- Concluir tarefa ---");
concluirTarefa(1);

console.log("\n--- Alterar prioridade ---");
alterarPrioridade(2, 1);

console.log("\n--- Lista atualizada ---");
listarTarefas();