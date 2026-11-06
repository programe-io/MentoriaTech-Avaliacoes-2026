let tarefas = [];
let codigo = 1;
function cadastrar() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);
    if (titulo.trim().lenght < 5) {
        alert("Titulo muito curto!");
        return;
    }
    tarefas.push({
        codigo: codigo++,
        titulo,
        prioridade,
        status: true 
    });
    listar();
}
function buscar(codigo) {
    return tarefas.find(t => t.codigo === codigo);
}
function concluir(codigo) {
    buscar(codigo).status = false;
    listar();
}
 function listar ()