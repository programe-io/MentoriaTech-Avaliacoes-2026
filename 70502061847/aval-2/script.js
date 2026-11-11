
// =====================================
// SISTEMA DE GERENCIAMENTO DE TAREFAS
// =====================================

let tarefas = [];
let proximoCodigo = 1;

// =====================================
// 1. CADASTRAR TAREFA
// =====================================

function cadastrarTarefa(titulo, prioridade) {

    if (titulo.trim() === "") {
        throw new Error("O título não pode ficar vazio");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Prioridade deve ser 1, 2 ou 3");
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// =====================================
// 2. LISTAR TAREFAS
// =====================================

function listarTarefas() {

    return tarefas;
}

// =====================================
// 3. BUSCAR TAREFA
// =====================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        t => t.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}

// =====================================
// 4. CONCLUIR TAREFA
// =====================================

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava concluída");
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");
}

// =====================================
// 5. EXCLUIR TAREFA
// =====================================

function excluirTarefa(codigo) {

    const indice = tarefas.findIndex(
        t => t.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada");
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");
}

// =====================================
// 6. ATUALIZAR TAREFA
// =====================================

function atualizarTarefa(codigo, novoTitulo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    if (novoTitulo.trim() === "") {
        throw new Error("O título não pode ficar vazio");
    }

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error("Prioridade deve ser 1, 2 ou 3");
    }

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;

    console.log("Tarefa atualizada com sucesso!");
}

// =====================================
// 7. FILTRAR POR PRIORIDADE
// =====================================

function filtrarPrioridade(prioridade) {

    return tarefas.filter(
        t => t.prioridade === prioridade
    );
}

// =====================================
// 8. LISTAR TAREFAS PENDENTES
// =====================================

function listarPendentes() {

    return tarefas.filter(
        t => t.status === true
    );
}

// =====================================
// 9. LISTAR TAREFAS CONCLUÍDAS
// =====================================

function listarConcluidas() {

    return tarefas.filter(
        t => t.status === false
    );
}

// =====================================
// TESTANDO O SISTEMA
// =====================================

// Cadastrar tarefas
cadastrarTarefa("Cadastrar Clientes", 1);
cadastrarTarefa("Limpar banco de dados", 3);
cadastrarTarefa("Desenvolver sistema", 2);
cadastrarTarefa("Estudar JavaScript", 1);

// Listar tarefas
console.log("===== TODAS AS TAREFAS =====");
console.log(listarTarefas());

// Concluir tarefa
concluirTarefa(2);

// Buscar tarefa
console.log("===== BUSCAR TAREFA =====");
console.log(buscarTarefa(1));

// Atualizar tarefa
atualizarTarefa(3, "Desenvolver site", 1);

// Filtrar prioridade
console.log("===== PRIORIDADE 1 =====");
console.log(filtrarPrioridade(1));

// Listar pendentes
console.log("===== TAREFAS PENDENTES =====");
console.log(listarPendentes());

// Listar concluídas
console.log("===== TAREFAS CONCLUÍDAS =====");
console.log(listarConcluidas());

// Excluir tarefa
// excluirTarefa(4);

// Mostrar lista final
console.log("===== LISTA FINAL =====");
console.log(listarTarefas());
