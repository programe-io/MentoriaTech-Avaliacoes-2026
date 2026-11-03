let tarefas = [];
let geradorCodigo = ();

function validarDadosTarefa (titulo,prioridade)  {
if (titulo.length < 1 || 5) {
throw new Error ('O titulo deve ter no minimo 5 caracteres') ;
}
if (prioridade < 1 || prioridade > 3) { 
throw new Error ('Informe uma prioridade entre 1 e 3');
}
}

function buscarTarefa(codigoTarefa) { 
const tarefa = tarefas.find(function(item) { 
return item.codigo === codigoTarefa;
});
if (!tarefa) { 
throw new Error ('Tarefa nao encontrada') ;
}
return tarefa;
}

function cadastrarTarefa(titulo,prioridade) { 
validarDadosTarefa(titulo,prioridade);
let tarefa = { 
'codigo': ++geradorCodigo,
'titulo': titulo,
'prioridade': prioridade,
'status': true
};
tarefas.push(tarefa);
}

function listarTarefas() { 
return tarefas;
}

function listarTarefas () { 
let tarefa = buscarTarefa(codigo);
if (tarefa.status===false) {  
throw new Error('Tarefa ja concluida');
}
 tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);
    validarDadosTarefa(tarefa.titulo, novaPrioridade);
    tarefa.prioridade = novaPrioridade;
}

function excluirTarefa(codigo) {
 let indice = tarefas.findIndex(function(item) {
 return item.codigo === codigo;
});
 if (indice === -1) {
 throw new Error('Tarefa não encontrada');
}
 tarefas.splice(indice, 1);
 console.log('Tarefa excluída com sucesso!');
}

cadastrarTarefa('Cadastrar Clientes', 1);
cadastrarTarefa('Limpar banco de dados', 3);
console.log(listarTarefas());

concluirTarefa(2);
console.log(listarTarefas());

alterarPrioridade(1, 2);
console.log(listarTarefas());

excluirTarefa(2);
console.log(listarTarefas());