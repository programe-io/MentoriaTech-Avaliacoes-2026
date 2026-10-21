
const tarefas = [];
let proximoCodigo = 0;

// 1. Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (
        typeof prioridade !== "number" ||
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error("A prioridade deve ser um número entre 1 e 3.");
    }
}

// 2. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: ++proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

// 3. Listar as tarefas cadastradas
function listarTarefas() {
    return tarefas;
}

// 4. Buscar uma tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// 5. Concluir uma tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    return tarefa;
}

// 6. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}

// 7. Exibir as tarefas de forma organizada
function exibirTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log(
            `Código: ${tarefa.codigo} | ` +
            `Título: ${tarefa.titulo} | ` +
            `Prioridade: ${tarefa.prioridade} | ` +
            `Status: ${tarefa.status ? "Em andamento" : "Concluída"}`
        );
    });
}

// 8. Executar operações com tratamento de erros
function executarOperacao(operacao) {
    try {
        console.log(operacao());
    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

// EXEMPLOS DE UTILIZAÇÃO

executarOperacao(() =>
    cadastrarTarefa("Estudar JavaScript", 1)
);

executarOperacao(() =>
    cadastrarTarefa("Fazer exercícios", 2)
);

executarOperacao(() =>
    cadastrarTarefa("Ler um livro", 3)
);

console.log("\n--- LISTA DE TAREFAS ---");
exibirTarefas();

console.log("\n--- BUSCAR TAREFA ---");
executarOperacao(() => buscarTarefa(1));

console.log("\n--- CONCLUIR TAREFA ---");
executarOperacao(() => concluirTarefa(1));

console.log("\n--- ALTERAR PRIORIDADE ---");
executarOperacao(() => alterarPrioridade(2, 1));

console.log("\n--- LISTA ATUALIZADA ---");
exibirTarefas();