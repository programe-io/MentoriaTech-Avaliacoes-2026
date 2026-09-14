    // Sistema de Gerenciamento de Tarefas

let tarefas = [];
let proximoCodigo = 1;

// Função para cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

    // Validação do título
    if (titulo.length < 5) {
        console.log("Erro: o título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: a prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    // Criando a tarefa
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

// Função para listar as tarefas
function listarTarefas() {

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n--- TAREFAS CADASTRADAS ---");

    tarefas.forEach(function(tarefa) {
        console.log(
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente")
        );
    });
}

// Função para marcar uma tarefa como concluída
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

// Função para alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {

    // Validação da nova prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Erro: a prioridade deve ser um valor entre 1 e 3.");
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


// ================================
// EXEMPLO DE USO
// ================================

// Cadastrando tarefas
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar os estudos", 3);

// Tentativa de cadastro inválido
cadastrarTarefa("Oi", 1);
cadastrarTarefa("Outra tarefa", 4);

// Listando as tarefas
listarTarefas();

// Marcando a tarefa de código 1 como concluída
concluirTarefa(1);

// Alterando a prioridade da tarefa de código 2
alterarPrioridade(2, 1);

// Listando novamente para conferir as alterações
listarTarefas();
