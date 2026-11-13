
let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        console.log("Erro: o título deve ter no mínimo 5 caracteres.");
        return;
    }

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

// 2. Listar tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log(
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente")
        );
    });
}

// 3. Marcar tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa concluída com sucesso!");
    } else {
        console.log("Erro: tarefa não encontrada.");
    }
}

// 4. Alterar prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Erro: a prioridade deve ser entre 1 e 3.");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        console.log("Prioridade alterada com sucesso!");
    } else {
        console.log("Erro: tarefa não encontrada.");
    }
}

// Exemplos de utilização
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios", 2);
cadastrarTarefa("Organizar quarto", 3);

console.log("\n--- LISTA DE TAREFAS ---");
listarTarefas();

console.log("\n--- CONCLUINDO TAREFA ---");
concluirTarefa(1);

console.log("\n--- ALTERANDO PRIORIDADE ---");
alterarPrioridade(2, 1);

console.log("\n--- LISTA ATUALIZADA ---");
listarTarefas();
