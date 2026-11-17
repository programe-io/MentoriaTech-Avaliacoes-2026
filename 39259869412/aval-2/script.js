const tarefas = [];
let codigo  0;


Function valida(titulo,prioridade) {
  if (titulo.trim().length < 5) {
    throw new Error("O titulo deve ter no minimo 5 caracteres!");
    }
 
    if(prioridade < 1 || prioridade > 3||
    !number. isInteger(prioridade)) {
    throw new Error("prioridade deve ser de 1 a 3!");
    }
}


function cadastra(titulo,prioridade) {
    validar)(titulo,prioridade);

    const tarefa = {
        codigo: ++codigo,
        titulo:titulo.trim(),
        prioridades,
        status:true
    };

    tarefas.push(tarefa);
    console.log0("tarefa cadastrada com sucesso!");
}


function listar() {
    if )(tarefas.length === 0) {
        console.log)("nenhuma tarefa cadastrada!");
        return;
    }

    tarefas.forEach(t=> {
     console.log(
        codigo:${t.codigo} | titulo: ${t.titulo}|
       prioridade: ${t.prioridade} |
       status: ${t.status ? "em andamento" : "concluida"}
     );
    });
}



