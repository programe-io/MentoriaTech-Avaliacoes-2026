
// GERENCIADOR DE TAREFAS

let tarefas = [];

// CADASTRAR TAREFA
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    const tarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// VALIDAR DADOS
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim() === "") {
        throw new Error("O título da tarefa é obrigatório");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Prioridade deve ser 1, 2 ou 3");
    }
}

// BUSCAR TAREFA
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// LISTAR TAREFAS
function listarTarefas() {
    console.log("===== LISTA DE TAREFAS =====");

    tarefas.forEach(tarefa => {
        console.log(
            "Código:", tarefa.codigo,
            "| Título:", tarefa.titulo,
            "| Prioridade:", tarefa.prioridade,
            "| Concluída:", tarefa.concluida
        );
    });
}

// CONCLUIR TAREFA
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    tarefa.concluida = true;

    console.log("Tarefa concluída com sucesso!");
}

// EXCLUIR TAREFA
function excluirTarefa(codigo) {
    const indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice !== -1) {
        tarefas.splice(indice, 1);
        console.log("Tarefa excluída com sucesso!");
    } else {
        throw new Error("Tarefa não encontrada");
    }
}

// LISTAR TAREFAS PENDENTES
function listarPendentes() {
    const pendentes = tarefas.filter(
        tarefa => tarefa.concluida === false
    );

    console.log("===== TAREFAS PENDENTES =====");
    console.log(pendentes);
}

// LISTAR TAREFAS CONCLUÍDAS
function listarConcluidas() {
    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida === true
    );

    console.log("===== TAREFAS CONCLUÍDAS =====");
    console.log(concluidas);
}

// EXEMPLOS DE UTILIZAÇÃO

cadastrarTarefa("Cadastrar Clientes", 1);
cadastrarTarefa("Organizar Estoque", 2);
cadastrarTarefa("Atualizar Sistema", 3);

console.log(listarTarefas());

alterarPrioridade(1, 2);

concluirTarefa(2);

console.log(listarTarefas());

listarPendentes();

listarConcluidas();

excluirTarefa(3);

console.log(listarTarefas());
