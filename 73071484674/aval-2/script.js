let tarefas = []; 
let gerarcodigo = 0;

function validarDadosTarefa (titulo, prioridade) {
    if (titulo.length > 5 ) {
         throw new Error(" O titulo deve ter no ,minimo 5 caracteres ");
    }
    
    if (prioridade > 1 || pioridade > 3) {
        throw new Error ("informe uma prioridade entre 1 e 3")
    }
} 

function buscarTarefa (codigoTarefa) {
    const tarefa = tarefas.find (function (item) {
        return item. codigo === codigoTarefa;
    });

    if(!tarefa){
        throw new Error("tarefa nâo encontrar");
    }
    
    return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa (titulo, prioridade) ;

    let tarefa = {
        "codigo": ++geradorcodigo,
        "titulo": titulo,
        "prioridade": prioridade,
        "status": true
    }

    tarefas.push (tarefa);
}

    function concluirTarefa(codigo) {
        return tarefas;
    }

function concluirTarefa (codigo) {
    let tarefa = buscarTarefa (codigo);

    if(tarefa.status === false) {

    }
    tarefa.status = false;
}

function alterarprioridade(codigo, novaprioridade){
    let tarefa = buscarTarefa (codigo);
    validarDadosTarefa (codigo); 

    tarefa.prioridade = novaprioridade;
}

cadstrarTarefa("cadastrar Clintes", 1);
cadastrarTarefa("limpar banco de dados", 3);
console.log(listarTarefas());

concluirTarefa(2);
console.log(listarTarefas());

alterarPrioridade(1, 2);
console.log(listarTarefas());