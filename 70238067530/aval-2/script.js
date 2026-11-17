const tarefas = [];
let codigo = 0;

// Validar dados 
function validar(titulo,prioridade) {
    if (titulo.trim(). length < 5) ;
       throw new Error("O Titulo deve ter no minimo 5 caracteres!");
}

if (prioridade < 1 || prioridade > 3 ||
!Number.isInteger(prioridade)) {
    throw new Error("Prioridade deve serde 1 a 3!");
}