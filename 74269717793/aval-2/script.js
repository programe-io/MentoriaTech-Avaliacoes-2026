
/* Array que vai guardar todas as tarefas */

let tarefas = [];
let geradorCodigo = 0;

// Validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

// Buscar tarefa pelo código
function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado");
    }

    return tarefaBuscada;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava como concluída");
    }

    tarefa.status = false;
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Testes / Execução

cadastrarTarefa("Cadastrar Clientes", 1);

console.log("Lista inicial:");
console.log(listarTarefas());

alterarPrioridade(1, 2);

console.log("Lista após alterar a prioridade:");
console.log(listarTarefas());

concluirTarefa(1);

console.log("Lista após concluir a tarefa:");
console.log(listarTarefas());
