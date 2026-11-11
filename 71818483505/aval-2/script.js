
// Sistema de gerenciamento de tarefas

let tarefas = [];
let geradorCodigo = 0;

// Validar dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Defina uma prioridade entre 1 e 3");
    }
}

// Buscar tarefa pelo código
function buscarTarefa(codigoTarefa) {
    const tarefaEncontrada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaEncontrada) {
        throw new Error("Código de tarefa não encontrado");
    }

    return tarefaEncontrada;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");

    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    console.log("\n===== LISTA DE TAREFAS =====");

    tarefas.forEach(tarefa => {
        console.log(
            `Código: ${tarefa.codigo} | ` +
            `Título: ${tarefa.titulo} | ` +
            `Prioridade: ${tarefa.prioridade} | ` +
            `Concluída: ${tarefa.concluida ? "Sim" : "Não"}`
        );
    });
}

// Atualizar tarefa
function atualizarTarefa(codigoTarefa, novoTitulo, novaPrioridade) {
    validarDadosTarefa(novoTitulo, novaPrioridade);

    const tarefa = buscarTarefa(codigoTarefa);

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;

    console.log("Tarefa atualizada com sucesso!");
}

// Concluir tarefa
function concluirTarefa(codigoTarefa) {
    const tarefa = buscarTarefa(codigoTarefa);

    tarefa.concluida = true;

    console.log("Tarefa concluída com sucesso!");
}

// Excluir tarefa
function excluirTarefa(codigoTarefa) {
    buscarTarefa(codigoTarefa);

    tarefas = tarefas.filter(
        t => t.codigo !== codigoTarefa
    );

    console.log("Tarefa excluída com sucesso!");
}

// Buscar tarefas por prioridade
function listarPorPrioridade(prioridade) {
    const resultado = tarefas.filter(
        t => t.prioridade === prioridade
    );

    console.log("\n===== TAREFAS POR PRIORIDADE =====");

    console.log(resultado);
}

// ==============================
// TESTANDO O SISTEMA
// ==============================

cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer atividade", 2);
cadastrarTarefa("Organizar projetos", 3);

listarTarefas();

concluirTarefa(1);

atualizarTarefa(2, "Fazer atividade escolar", 1);

listarTarefas();

listarPorPrioridade(1);

excluirTarefa(3);

listarTarefas();
