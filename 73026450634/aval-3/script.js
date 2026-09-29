// Sistema de Gerenciamento de Tarefas

let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

    // Validação do título
    if (titulo.length < 5) {
        console.log("Erro: o título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: a prioridade deve ser entre 1 e 3.");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    console.log("Tarefa cadastrada com sucesso!");
}


// Listar as tarefas cadastradas
function listarTarefas() {

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("===== LISTA DE TAREFAS =====");

    tarefas.forEach(function(tarefa) {
        console.log(
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente")
        );
    });
}


// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        console.log("Erro: tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    console.log("Tarefa marcada como concluída!");
}


// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {

    // Validação da nova prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Erro: a prioridade deve ser entre 1 e 3.");
        return;
    }

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        console.log("Erro: tarefa não encontrada.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}


// ===============================
// TESTANDO O SISTEMA
// ===============================

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Ler um livro", 3);

// Tentativa com título inválido
cadastrarTarefa("JS", 1);

// Tentativa com prioridade inválida
cadastrarTarefa("Aprender programação", 4);

// Listar tarefas
listarTarefas();

// Marcar tarefa 1 como concluída
concluirTarefa(1);

// Alterar prioridade da tarefa 2
alterarPrioridade(2, 1);

// Listar novamente
listarTarefas();
