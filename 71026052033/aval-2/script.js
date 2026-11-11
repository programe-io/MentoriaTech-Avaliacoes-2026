// CONCLUIR TAREFA
function concluirTarefa(codigo) {
let tarefa = buscarTarefa(codigo);
let tarefas = [];
let geradorCodigo = 0;

// VALIDAR DADOS DA TAREFA
function validarDadosTarefa(titulo, prioridade) {
if (titulo.length < 5) {
throw new Error("O título deve ter no mínimo 5 caracteres");
}

if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
throw new Error("Informe uma prioridade entre 1 e 3");
}
}

// BUSCAR TAREFA
function buscarTarefa(codigoTarefa) {
return tarefas.find(tarefa => tarefa.codigo === codigoTarefa);
}

// CADASTRAR TAREFA
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

// LISTAR TAREFAS
function listarTarefas() {
return tarefas;
}

if (!tarefa) {
throw new Error("Tarefa não encontrada!");
}

if (tarefa.status === false) {
throw new Error("Tarefa já está concluída!");
}

tarefa.status = false;
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo, novaPrioridade) {
let tarefa = buscarTarefa(codigo);

if (!tarefa) {
throw new Error("Tarefa não encontrada!");
}

validarDadosTarefa(tarefa.titulo, novaPrioridade);

tarefa.prioridade = novaPrioridade;
}

// CADASTRAR TAREFA
cadastrarTarefa("Cadastrar Clientes", 1);

// MOSTRAR TAREFA ORIGINAL
console.log(buscarTarefa(1));

// ALTERAR PRIORIDADE
alterarPrioridade(1, 2);

// MOSTRAR TAREFA ATUALIZADA
console.log(buscarTarefa(1));