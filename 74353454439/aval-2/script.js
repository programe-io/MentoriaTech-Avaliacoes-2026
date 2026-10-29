
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        console.log("Erro: o título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        console.log("Erro: a prioridade deve ser 1, 2 ou 3.");
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

// Listar todas as tarefas
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

// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Erro: tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    console.log("Tarefa marcada como concluída!");
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Erro: tarefa não encontrada.");
        return;
    }

    if (![1, 2, 3].includes(novaPrioridade)) {
        console.log("Erro: a prioridade deve ser 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    console.log("Prioridade alterada com sucesso!");
}

// Exemplos de utilização
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios", 2);
cadastrarTarefa("Ler um livro", 3);

console.log("\n--- LISTA DE TAREFAS ---");
listarTarefas();

console.log("\n--- CONCLUIR TAREFA ---");
concluirTarefa(1);

console.log("\n--- ALTERAR PRIORIDADE ---");
alterarPrioridade(2, 1);

console.log("\n--- LISTA ATUALIZADA ---");
listarTarefas();
