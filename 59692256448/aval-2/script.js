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

    tarefas.forEach(t => {
        console.log(
            Codigo: ${t.codigo} |
            Titulo: ${t.titulo} |
           Prioriddade: ${t.prioridade} |
           Status: ${t.status ? "Em andamento" : "Concluída"}
        );
   });
}

// Buscar taresfas 
function buscar(codigo) {
    const tarefas = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Erro("Tarefa não encontrada!");
    }

    return tarefas;
}

//Concluir tarefa
function concluir(codigo) {
    const tarefa = buscar(codigo);

    if (!tarefas.status) {
        throw new Error("Tarefa já concluida!");
    }

    tarefa.status = false;

    console.log("Tarefa concluida!");
}

// Alterar prioridade
function Alterar (codigo, prioridade){
    const Tarefa = buscar (codigo);

    validar(tarefas.titulo,prioridade);
    Tarefas.prioridade = prioridade;

    console.log("Prioridade alterada !")
}

// Menu principal
async function Menu() {
    const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const perguntar = mensagem => new Promise(resolve =>
    rl.question(mensagem,resolve)
    );

    let opcao;


do {
    console.log(
    ===== GERENCIADOR DE TAREFAS =====