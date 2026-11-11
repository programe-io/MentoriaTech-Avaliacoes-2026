
// =====================================
// GERENCIADOR DE TAREFAS
// =====================================

let tarefas = [];
let proximoCodigo = 1;

// =====================================
// 1. CADASTRAR TAREFA
// =====================================

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// =====================================
// 2. VALIDAR DADOS
// =====================================

function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim() === "") {
        throw new Error("O título não pode ficar vazio.");
    }

    if (![1, 2, 3].includes(prioridade)) {
        throw new Error("Prioridade inválida. Use 1, 2 ou 3.");
    }
}

// =====================================
// 3. BUSCAR TAREFA
// =====================================

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        item => item.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// =====================================
// 4. LISTAR TODAS AS TAREFAS
// =====================================

function listarTarefas() {
    if (tarefas.length === 0) {
        return "Nenhuma tarefa cadastrada.";
    }

    return tarefas.map(tarefa => ({
        codigo: tarefa.codigo,
        titulo: tarefa.titulo,
        prioridade: tarefa.prioridade,
        status: tarefa.concluida ? "Concluída" : "Pendente"
    }));
}

// =====================================
// 5. ALTERAR PRIORIDADE
// =====================================

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// =====================================
// 6. EDITAR TÍTULO DA TAREFA
// =====================================

function editarTarefa(codigo, novoTitulo) {
    let tarefa = buscarTarefa(codigo);

    if (!novoTitulo || novoTitulo.trim() === "") {
        throw new Error("Digite um título válido.");
    }

    tarefa.titulo = novoTitulo;

    console.log("Tarefa editada com sucesso!");
}

// =====================================
// 7. CONCLUIR TAREFA
// =====================================

function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    tarefa.concluida = true;

    console.log("Tarefa concluída!");
}

// =====================================
// 8. REABRIR TAREFA
// =====================================

function reabrirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    tarefa.concluida = false;

    console.log("Tarefa reaberta!");
}

// =====================================
// 9. EXCLUIR TAREFA
// =====================================

function excluirTarefa(codigo) {
    const indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada.");
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");
}

// =====================================
// 10. FILTRAR TAREFAS PENDENTES
// =====================================

function listarPendentes() {
    return tarefas.filter(
        tarefa => !tarefa.concluida
    );
}

// =====================================
// 11. FILTRAR TAREFAS CONCLUÍDAS
// =====================================

function listarConcluidas() {
    return tarefas.filter(
        tarefa => tarefa.concluida
    );
}

// =====================================
// 12. CONTAR TAREFAS
// =====================================

function contarTarefas() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    console.log("\n====== RESUMO ======");
    console.log("Total de tarefas:", total);
    console.log("Tarefas concluídas:", concluidas);
    console.log("Tarefas pendentes:", pendentes);
}

// =====================================
// 13. EXECUTAR O SISTEMA
// =====================================

// Cadastrar tarefas
cadastrarTarefa("Cadastrar Clientes", 1);
cadastrarTarefa("Organizar Documentos", 2);
cadastrarTarefa("Enviar Relatório", 3);
cadastrarTarefa("Atualizar Sistema", 1);

// Listar tarefas
console.log("\n====== TODAS AS TAREFAS ======");
console.table(listarTarefas());

// Alterar prioridade
alterarPrioridade(1, 2);

// Editar tarefa
editarTarefa(2, "Organizar Documentos da Empresa");

// Concluir tarefa
concluirTarefa(3);

// Listar pendentes
console.log("\n====== TAREFAS PENDENTES ======");
console.table(listarPendentes());

// Listar concluídas
console.log("\n====== TAREFAS CONCLUÍDAS ======");
console.table(listarConcluidas());

// Mostrar resumo
contarTarefas();

// Excluir tarefa
excluirTarefa(4);

// Listagem final
console.log("\n====== LISTAGEM FINAL ======");
console.table(listarTarefas());
