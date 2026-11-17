const tarefas = [];
let codigo = 0;

// Validar dados
function validar(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Erro("O titulo deve ter no mínimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3  ||
        !Number.isInteger(prioridade)) {
        throw new Error("Prioridade deve ser de 1 a 3!");
        }
}  

// Cadastrar tarefa
function cadastrar(titulo, prioridade) {
    validar(titulo, prioridade);

    const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true
    };

    tarefas.push(tarefas);
    console.log("Tarefas cadastra com sucesso!");


//Listar tarefas
function litar() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    }

    tarefas.forEach(+ => {
        console.log(
            Codigo: ${t.codigo} | Titulo: ${t.titulo} |
           Prioriddade: ${t.prioridade} |
           Status: ${t.status ?}
    )