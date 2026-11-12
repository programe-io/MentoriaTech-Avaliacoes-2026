
// =====================================
// GERENCIADOR DE TAREFAS
// =====================================

let tarefas = [];
let proximoCodigo = 1;

// =====================================
// VALIDAR DADOS
// =====================================

function validarDadosTarefa(titulo, prioridade) {

    if (!titulo || titulo.trim() === "") {
        throw new Error("Digite o título da tarefa.");
    }

    if (!["Baixa", "Média", "Alta"].includes(prioridade)) {
        throw new Error("Prioridade inválida.");
    }

}

// =====================================
// CADASTRAR TAREFA
// =====================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true,
        dataCriacao: new Date().toLocaleDateString()
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");

    return tarefa;
}

// =====================================
// LISTAR TAREFAS
// =====================================

function listarTarefas() {

    console.log("===== LISTA DE TAREFAS =====");

    tarefas.forEach(tarefa => {

        console.log({
            codigo: tarefa.codigo,
            titulo: tarefa.titulo,
            prioridade: tarefa.prioridade,
            status: tarefa.status ? "Pendente" : "Concluída"
        });

    });

    return tarefas;
}

// =====================================
// BUSCAR TAREFA
// =====================================

function buscarTarefa(codigo) {

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// =====================================
// CONCLUIR TAREFA
// =====================================

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já está concluída.");
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");

}

// =====================================
// REABRIR TAREFA
// =====================================

function reabrirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === true) {
        throw new Error("A tarefa já está pendente.");
    }

    tarefa.status = true;

    console.log("Tarefa reaberta com sucesso!");

}

// =====================================
// EDITAR TAREFA
// =====================================

function editarTarefa(codigo, novoTitulo, novaPrioridade) {

    validarDadosTarefa(novoTitulo, novaPrioridade);

    let tarefa = buscarTarefa(codigo);

    tarefa.titulo = novoTitulo.trim();
    tarefa.prioridade = novaPrioridade;

    console.log("Tarefa editada com sucesso!");

}

// =====================================
// EXCLUIR TAREFA
// =====================================

function excluirTarefa(codigo) {

    let indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada.");
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");

}

// =====================================
// FILTRAR POR PRIORIDADE
// =====================================

function filtrarPrioridade(prioridade) {

    let resultado = tarefas.filter(
        tarefa => tarefa.prioridade === prioridade
    );

    console.log("Tarefas com prioridade:", prioridade);

    console.log(resultado);

    return resultado;

}

// =====================================
// LISTAR TAREFAS PENDENTES
// =====================================

function listarPendentes() {

    let pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    );

    console.log("===== TAREFAS PENDENTES =====");

    console.log(pendentes);

    return pendentes;

}

// =====================================
// LISTAR TAREFAS CONCLUÍDAS
// =====================================

function listarConcluidas() {

    let concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    );

    console.log("===== TAREFAS CONCLUÍDAS =====");

    console.log(concluidas);

    return concluidas;

}

// =====================================
// CONTAR TAREFAS
// =====================================

function contarTarefas() {

    let total = tarefas.length;

    let pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    let concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    console.log("Total de tarefas:", total);
    console.log("Tarefas pendentes:", pendentes);
    console.log("Tarefas concluídas:", concluidas);

    return {
        total,
        pendentes,
        concluidas
    };

}

// =====================================
// RELATÓRIO GERAL
// =====================================

function gerarRelatorio() {

    console.log("==============================");
    console.log("     RELATÓRIO DE TAREFAS");
    console.log("==============================");

    contarTarefas();

    console.log("------------------------------");

    console.log("PRIORIDADE ALTA:",
        filtrarPrioridade("Alta").length
    );

    console.log("PRIORIDADE MÉDIA:",
        filtrarPrioridade("Média").length
    );

    console.log("PRIORIDADE BAIXA:",
        filtrarPrioridade("Baixa").length
    );

    console.log("==============================");

}

// =====================================
// TESTANDO O SISTEMA
// =====================================

cadastrarTarefa("Estudar JavaScript", "Alta");

cadastrarTarefa("Fazer atividade escolar", "Média");

cadastrarTarefa("Organizar computador", "Baixa");

cadastrarTarefa("Criar projeto HTML", "Alta");

// Listar todas
listarTarefas();

// Concluir tarefa
concluirTarefa(1);

// Editar tarefa
editarTarefa(2, "Finalizar atividade escolar", "Alta");

// Reabrir tarefa
reabrirTarefa(1);

// Pesquisar tarefa
console.log(buscarTarefa(2));

// Mostrar pendentes
listarPendentes();

// Mostrar concluídas
listarConcluidas();

// Gerar relatório
gerarRelatorio();

// Excluir tarefa
// excluirTarefa(3);
