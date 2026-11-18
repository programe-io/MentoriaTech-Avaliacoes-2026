
// ======================================
// PROJETO: GERENCIADOR DE TAREFAS
// Linguagem: JavaScript
// ======================================

// Array para armazenar as tarefas
let tarefas = [];

// Gerador automático de códigos
let proximoCodigo = 0;


// ======================================
// 1. VALIDAR DADOS DA TAREFA
// ======================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}


// ======================================
// 2. CADASTRAR UMA TAREFA
// ======================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    console.log("Tarefa cadastrada com sucesso!");
    return novaTarefa;
}


// ======================================
// 3. LISTAR TAREFAS
// ======================================

function listarTarefas() {
    return tarefas;
}


// ======================================
// 4. BUSCAR TAREFA PELO CÓDIGO
// ======================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Código da tarefa não encontrado.");
    }

    return tarefa;
}


// ======================================
// 5. CONCLUIR UMA TAREFA
// ======================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");
}


// ======================================
// 6. ALTERAR PRIORIDADE
// ======================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}


// ======================================
// 7. EXIBIR TAREFAS ORGANIZADAS
// ======================================

function exibirTarefas() {

    console.log("\n===== LISTA DE TAREFAS =====");

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {

        console.log("----------------------------");

        console.log("Código:", tarefa.codigo);
        console.log("Título:", tarefa.titulo);
        console.log("Prioridade:", tarefa.prioridade);

        console.log(
            "Status:",
            tarefa.status ? "Em andamento" : "Concluída"
        );

    });

    console.log("============================");
}


// ======================================
// 8. TESTANDO O GERENCIADOR
// ======================================

try {

    // Cadastrar tarefas
    cadastrarTarefa("Estudar JavaScript", 1);
    cadastrarTarefa("Fazer atividade", 2);
    cadastrarTarefa("Organizar caderno", 3);

    // Listar tarefas
    exibirTarefas();

    // Buscar uma tarefa
    console.log("\nBuscando tarefa de código 1:");
    console.log(buscarTarefa(1));

    // Concluir uma tarefa
    concluirTarefa(1);

    // Alterar prioridade
    alterarPrioridade(2, 1);

    // Exibir resultado final
    exibirTarefas();

} catch (erro) {

    console.log("Erro:", erro.message);

}
