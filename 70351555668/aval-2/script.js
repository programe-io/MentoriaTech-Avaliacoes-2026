
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

// 2. Listar tarefas cadastradas
function listarTarefas() {

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n===== LISTA DE TAREFAS =====");

    tarefas.forEach(tarefa => {

        console.log("-------------------------");
        console.log("Código:", tarefa.codigo);
        console.log("Título:", tarefa.titulo);
        console.log("Prioridade:", tarefa.prioridade);
        console.log("Status:", tarefa.concluida ? "Concluída" : "Pendente");

    });
}

// 3. Marcar uma tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    console.log("Tarefa concluída com sucesso!");
}

// 4. Alterar prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    if (![1, 2, 3].includes(novaPrioridade)) {
        console.log("Prioridade inválida! Use 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// ===== TESTANDO O SISTEMA =====

// Cadastrar tarefas
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar arquivos", 3);

// Listar tarefas
listarTarefas();

// Concluir tarefa de código 1
concluirTarefa(1);

// Alterar prioridade da tarefa de código 2
alterarPrioridade(2, 1);

// Listar novamente
listarTarefas();
