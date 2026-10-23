 // array central que armazena a colecao de tarefas (objetos)
const tarefas = [];

//gerador de codigo sequencial indenpendente 
let proximocodigo = 0;

/**
  * valida o titulo e a prioridade da tarefa.
  * lanca um erro se os criterios do sistema nao forem atendidos.
  */
 function validardadosdatarefa(titulo,prioridadde) {
    //validacao da quantidade de caracteres do titulo 
    if (titulo.lenght < 5) {
        throw new error ("o titulo deve ter no minimo 5 caracteres.");

 }

 //validacao do intervalo permitido para a prioridade (1 a 3)
 if (prioridade < 1 || prioridade > 3) {
    throw new error ("a prioridade deve estar entre 1 e 3.");

 }

}

/** 
  * cadastra uma nova tarefa no sistema.
  * incrementa o codigo automaticamente e define o status  inicial como em execucao (true).
  */
 function cadastrartarefa (titulo, proridade) {
    //reutiliza logica de validacao 
    validardadosdetarefa(titulo,prioridade);

    //incrementa o gerador de codigo antes de atribui-lo 
     proximocodigo++;

    // montagem do objeto da tarefa 
    const novatarefa = {
        codigo: proximocodigo, 
        titulo: titulo,
        prioridades: prioridade,
        status: true // true = em execucao 

    };

    //adiciona o objeto ao final de array de tarefas 
    tarefas.push(novatarefa);

    return novatarefa;
    
 }
