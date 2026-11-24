
let tarefas = [];

function adicionarTarefa(nome, descricao, prazo, prioridade) {
    const tarefa = {
        id: Date.now(),
        nome: nome,
        descricao: descricao,
        prazo: prazo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);
    console.log("Tarefa adicionada com sucesso!");
}

function listarTarefas() {
    console.log("\n=== LISTA DE TAREFAS ===");

    tarefas.forEach(tarefa => {
        console.log("-------------------------");
        console.log("ID:", tarefa.id);
        console.log("Nome:", tarefa.nome);
        console.log("Descrição:", tarefa.descricao);
        console.log("Prazo:", tarefa.prazo);
        console.log("Prioridade:", tarefa.prioridade);
        console.log("Status:", tarefa.status);
    });
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.status = "Concluída";
        console.log("Tarefa concluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function excluirTarefa(id) {
    const tamanhoAnterior = tarefas.length;

    tarefas = tarefas.filter(t => t.id !== id);

    if (tarefas.length < tamanhoAnterior) {
        console.log("Tarefa excluída com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function pesquisarTarefa(nome) {
    const resultado = tarefas.filter(t =>
        t.nome.toLowerCase().includes(nome.toLowerCase())
    );

    console.log("Resultado da pesquisa:", resultado);
}

function filtrarPorStatus(status) {
    const resultado = tarefas.filter(t => t.status === status);

    console.log("Tarefas encontradas:", resultado);
}

function editarTarefa(id, novoNome, novaDescricao, novoPrazo, novaPrioridade) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.nome = novoNome;
        tarefa.descricao = novaDescricao;
        tarefa.prazo = novoPrazo;
        tarefa.prioridade = novaPrioridade;

        console.log("Tarefa editada com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function resumoTarefas() {
    const total = tarefas.length;

    const pendentes = tarefas.filter(
        t => t.status === "Pendente"
    ).length;

    const concluidas = tarefas.filter(
        t => t.status === "Concluída"
    ).length;

    console.log("\n=== RESUMO ===");
    console.log("Total de tarefas:", total);
    console.log("Tarefas pendentes:", pendentes);
    console.log("Tarefas concluídas:", concluidas);
}

// EXEMPLO DE UTILIZAÇÃO

adicionarTarefa(
    "Estudar JavaScript",
    "Estudar funções e arrays",
    "30/11/2026",
    "Alta"
);

adicionarTarefa(
    "Fazer atividade",
    "Concluir atividade da faculdade",
    "28/11/2026",
    "Média"
);

listarTarefas();

concluirTarefa(tarefas[0].id);

pesquisarTarefa("JavaScript");

resumoTarefas();
