const tarefas = []; 
let codigo = 0;


function validar(titulo, prioridade) { 
    if  (titulo.trim)().length < 5) { 
         throw new Error("O titulo deve ter no minimo 5 caracteres!");
    } 

    if (prioridade < 1  || prioridade > 3 ||
       !Number.isInteger(prioridade)) {
      throw new Error("prioridade deve ser de 1 a 3!");
       } 
}  


function cadastrar(titulo, prioridade)  { 
    validar(titulo, prioridade);

    const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true 
    }; 

       tarefas.push(tarefa);
       console.log("Tarefa cadastrada com sucesso!");
}


function listar() {
    if (tarefas.length === 0 ) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    } 

    tarefas.forEach(t => { 
    console.log( 
         codigo: ${t.codigo} | titulo: ${t.titulo} |
        prioridade: ${t.prioridade} |
        status: ${t.status ? "Em andamento" : "Concluída"}
    ); 
    });
} 


 
 
