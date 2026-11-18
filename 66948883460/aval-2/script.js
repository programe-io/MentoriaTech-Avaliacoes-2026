
// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================

// Array que armazena todas as tarefas
const tarefas = [];

// Gerador de códigos automáticos
let proximoCodigo = 0;


// ==========================================
// 1. VALIDAÇÃO DOS DADOS
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve possuir no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }

}


// ==========================================
// 2. CADASTRAR TAREFA
// ==========================================

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

    return novaTarefa;
}


// ==========================================
// 3. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    return tarefas;

}


// ==========================================
// 4. BUSCAR TAREFA PELO CÓDIGO
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}


// ==========================================
// 5. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    return tarefa;
}


// ==========================================
// 6. ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}


// ==========================================
// 7. TESTANDO O GERENCIADOR
// ==========================================

// Cadastrando tarefas
try {

    cadastrarTarefa("Estudar JavaScript", 1);
    cadastrarTarefa("Fazer exercícios", 2);
    cadastrarTarefa("Organizar o quarto", 3);

    console.log("Tarefas cadastradas:");

    console.log(listarTarefas());


    // Buscando uma tarefa
    console.log("Buscando tarefa de código 2:");

    console.log(buscarTarefa(2));


    // Concluindo uma tarefa
    concluirTarefa(1);

    console.log("Tarefa concluída:");

    console.log(buscarTarefa(1));


    // Alterando a prioridade
    alterarPrioridade(2, 1);

    console.log("Prioridade alterada:");

    console.log(buscarTarefa(2));


    // Listagem final
    console.log("Lista final de tarefas:");

    console.log(listarTarefas());

} catch (erro) {

    console.log("Erro: " + erro.message);

}
