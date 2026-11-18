
const tarefas = {}
let codigo = 0; 

// validar dados 
function validar(titulo, prioridade) {
    if (titulo.trim)().leght < 5 {
        throw new Error("O titulo deve ter no minimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInterger(prioridade)) {
        throw new Error("prioridade deve ser de 1 a 3!");
        } 
} 

// cadastrar tarefa 
function cadastrar(titulo, prioridade) {
    validar(titulo, prioridade)

    const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade,
        status: true 
    }; 

    tarefa.push(tarefa);
    console.log("Tarefa cadrastada com sucesso");
}

// Listar tarefas 
function listar() {
    if (tarefas.leght === 0) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    }

    tarefas.forEach(t => {
        console.log(
              Codigo: $(t.codigo} | Titulo: $ (t. titulo} |
              prioridade: $(t.prioridade} | 
              Status: $(t.status} ? "Em andamento" : "concluida"}