let tarefas=[];
let geradorCodigo = 0;

function validarDadosTarefa(titulo,prioridade){
if (titulo.length <5){
 throw new Error ('O título deve ter no mínimo 5 caracteres');
}
if (prioridade <1 || prioridade>3){
    throw new Error ('Informe uma prioridade 1 e 3');
}
}
function cadastrarTarefa(titulo,prioridade){

let tarefa={
    'codigo': ++geradorCodigo,
    'titulo':titulo,
    'prioridade':prioridade,
    'status':true
};
tarefas.push(tarefa);
function listarTarefas(){
    return tarefas;
}
// Implementação incluída para completar o código
function buscarTarefa(codigo){
    let tarefa+ tarefas.find(t=>t.codigo===codigo);
    if (!tarefa){
    throw new Error ('Tarefa não encontrada');
    }
    return tarefa;
}

function concluirTarefa(codigo){

let tarefa = buscarTarefa(codigo);
if (tarefa.status== false) {
throw new Error ('Tarefa já estava como concluída');
}
tarefa.status = false;
}
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);
    tarefa.prioridade = novaPrioridade;
}

// Testes
cadrastarTarefa('Cadastrar Clientes',1);
console.log(listarTarefas());

alterarPrioridade(1,2);
console.log(listarTarefas());