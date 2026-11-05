let tarefas = [];
let proximoCodigo =0;

//Validar dados
function validarDadosDaTarefa(titulo, priotidade) {

    if(titulo.trim().length < 5) {
        throw new Error ("O título precisa ter 5 caracteres.");
    }

    if (prioridade < 1|| prioridade > 3){
        throw new Error ("prioridade deve ser de 1 a 3.")
    }
}
//Cadastrar tarefa 
function cadastrarTarefa(titulo, prioridade){

    validaeDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    let tarefa +{
        codigo: proximoCodigo,
        titulo:titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    listarTarefas();

    return tarefas;
}

// Listar tarefas 
function listarTarefas() {

      const lista=document.getElementById("listaTarefas")
}
