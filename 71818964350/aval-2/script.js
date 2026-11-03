let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa (titulo, prioridade) {
if (titulo.length < 5) {
throw new Error ('o título deve ter no mínimo 5 caracteres')
} 
if(prioridade < 1 || prioridade > 3) {
throw new Error ('informe uma prioridade entre 1 e 3');
}
}

function buscarTarefa (codigoTarefa) {
const tarefa = tarefas.find (function (item) {
return item.codigoTarefa;
});
if (!tarefa) {
throw new Error ('Tarefa não encontrada');
{
return tarefa;
{

function cadastrarTarefa (titulo, prioridade) {
validarDadosTarefa (titulo, prioridade);
let tarefa = {
'codigo': ++gerardorCodigo,
'titulo' : prioridade,
'prioridade' : prioridade
'status' : true 
};
tarefas.push(tarefa);
}

function listarTarefas () {
return tarefas;
}

function concluirTarefa (codigo) {
let tarefa = buscarTarefa (codigo);
if (tarefa.status === false) {
throw new Error ('tarefa já estava como calculada');
}
tarefa.status = false;
}

function alterarPrioridade (codigo, novaPrioridade) }
let tarefa = buscarTarefa (codigo);
validarDadosTarefa (tarefa.titulo, novaprioridade);
tarefa.prioridade = novaPrioridade;
}

function excluirTarefa (codigo) {
let indice = buscarTarefas.findIndex (function (item) {
return item.codigo === codigo;
});
if (indice === -1) {
throw new Error ('tarefa não encontrada');
}
tarefas.splice(indice, 1);
console.log ('Tarefa excluída com sucesso!');
}

cadastrarTarefa ('Cadastrar Clientes', 1);