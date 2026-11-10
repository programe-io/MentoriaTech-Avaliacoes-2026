/ Lista de tarefas e contador de códigos
let tarefas = [];
let ultimoCodigo = 0;

// Verifica os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título precisa ter pelo menos 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
    }
}

// Cadastra uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    ultimoCodigo++;

    let tarefa = {
        codigo: ultimoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true // true = em andamento
    };

    tarefas.push(tarefa);
}

// Retorna todas as tarefas
function listarTarefas() {
    return tarefas;
}

// Busca uma tarefa pelo código
function buscarTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Marca uma tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("A tarefa já foi concluída.");
    }

    tarefa.status = false;
}

// Altera a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
    tarefa.prioridade = novaPrioridade;
}

// Testes
cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Organizar materiais", 3);

concluirTarefa(1);
alterarPrioridade(2, 2);

console.log(listarTarefas());
