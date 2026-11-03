let tarefas = [];
let geradorCodigo = ();

function validarDadosTarefa (titulo, prioridade) {
if (titulo.length < 5) {
    throw new Error('o titulo deve ter no minimo 5 caracteres');
}
if (prioridade < 1 || prioridade > 3) {
    throw new Error('informe uma prioridade ente 1 e 3');
}
}

function buscarTarefa(codigoTarefa) {
const tarefa = tarefas.find(function(item) {
return item.codigo === codigoTarefa;
});
if (!tarefa) {
throw new Error ('Tarefa nao encontrada');
}
return tarefa;
}

function cadastrarTarefa (titulo, prioridade) {
validarDadosTarefa(titulo, prioridade);
let tarefa = {
'codigo': ++geradorCodigo,
'titulo' : titulo,
'prioridade': prioridade,
'status' : true
};
tarefas.push(tarefa);
}

function listarTarefas() {
return tarefas;
}

function concluirTarefa (codigo) {
let tarefa = buscarTarefa(codigo);
if(tarefa.status === false) {
throw new error('Tarefa ja estava como concluida');
}
tarefa.status = false;
}

function alterPrioridade(codigo, novaPrioridade) {
let tarefa = buscarTarefa(codigo);
validarDadosTarefa(tarefa.titulo, novaPrioridade);
tarefa.prioridade = novaPrioridade;
}

function excluirTarefa(codigo) {
let indice = tarefas.findIndex (function(item) {
return item.codigo === codigo;
});
if (indice === -1) {
throw new Error('tarefa nao encontrada');
}
tarefas.slice(indice, 1);
console.log('Tarefa excluida com sucesso!');
}