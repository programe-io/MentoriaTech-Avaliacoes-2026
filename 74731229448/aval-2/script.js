
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve ser entre 1 e 3!");
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

// Listar tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log("----------------------");
        console.log("Código: " + tarefa.codigo);
        console.log("Título: " + tarefa.titulo);
        console.log("Prioridade: " + tarefa.prioridade);
        console.log("Status: " + (tarefa.concluida ? "Concluída" : "Pendente"));
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa concluída com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Alterar prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Prioridade inválida! Digite de 1 a 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    console.log("Prioridade alterada com sucesso!");
}

// Exemplos de utilização
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar quarto", 3);

listarTarefas();

concluirTarefa(1);

alterarPrioridade(2, 1);

listarTarefas();
