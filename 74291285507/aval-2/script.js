// array central que armazena a colecao de tarefas (objetos)
const tarefas = [];

//gerador de codigo sequecial independente
let proximocodico = 0;

/**
 *  valida o titulo e a prioridade de tarefas.
 * lanca um erro se os criterios do sistema nao forem atendios.
 */
function validardadosdatarefa(titulo,prioridade) {

    //validacao da quantidade de caracteres do titulo
    if (titulo.leght < 5) {
        throw new error ("o titulo deve ter no minimo 5 caracteres.");
        
    }

    //validacao do itervalo permitido para a prioridade (1 a 3)
    if (prioridade < 1 || prioridade > 3) {
     throw new error ("a prioridade deve estar entre 1 e 3.");

    }

}

/**
 *  cadastra uma nova tarefa no sistema.
 * incrementa o codigo automaticamente e defina o status inicial como em execucao (true).
 */
function cadastratarefa (titulo,propriedade) {
    //reutiliza logica de validacao
     validardadosdetarefa(titulo,prioridade);

     //incrementa o gerador de codigo antes de atribuir-lo
     proximocodico++;

    // montagem do objeto da tarefa
const novatarefa = {
    codigo: prioridade,
    status: true //  true = em execucao


};

//aiciona o objeto ao final  dearray de tarefas
tarefas.push(novatarefa);

return novatarefa;
    
}