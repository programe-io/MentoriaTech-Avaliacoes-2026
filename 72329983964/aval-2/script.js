
// Sistema de Gerenciamento de Tarefas

let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve ser entre 1 e 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    console.log("Tarefa cadastrada com sucesso!");
}

// 2. Listar todas as tarefas
function listarTarefas() {

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("===== LISTA DE TAREFAS =====");

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

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
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

// ===== TESTANDO O SISTEMA =====

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar arquivos", 3);

// Listar tarefas
listarTarefas();

// Concluir uma tarefa
concluirTarefa(1);

// Alterar prioridade da tarefa
alterarPrioridade(2, 1);

// Listar novamente para verificar alterações
listarTarefas();
