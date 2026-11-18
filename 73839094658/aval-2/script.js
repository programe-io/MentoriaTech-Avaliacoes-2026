
const tarefas = [];
let codigo = 0;

// Validar dados
function validar(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres!");
    }

    if (
        prioridade < 1 ||
        prioridade > 3 ||
        !Number.isInteger(prioridade)
    ) {
        throw new Error("A prioridade deve ser de 1 a 3!");
    }
}

// Cadastrar tarefas
function cadastrar(titulo, prioridade) {
    validar(titulo, prioridade);

    const tarefa = {
        codigo: ++codigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");

    return tarefa;
}

// Listar tarefas
function listar() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    }

    tarefas.forEach(t => {
        console.log(
            `Código: ${t.codigo} | 
            Título: ${t.titulo} | 
            Prioridade: ${t.prioridade} | 
            Status: ${t.status ? "Em andamento" : "Concluída"}`
        );
    });
}

// Buscar tarefas
function buscar(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}

// Concluir tarefa
function concluir(codigo) {
    const tarefa = buscar(codigo);

    if (!tarefa.status) {
        throw new Error("Tarefa já concluída!");
    }

    tarefa.status = false;

    console.log("Tarefa concluída!");
}

// Alterar prioridade
function Alterar (codigo, prioridade){
    const Tarefa = buscar(codigo);

    validar(tarefa.titulo, prioridade);
    tarefa.prioridade = prioridade;

    console.log("Prioridade alterada !");
}

// Menu principal
async function Menu() {
    const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const perguntar = mensagem => new Promise(resolve =>
    rl.question(mensagem, resolve)
    );

    let opcao;

    
do {
    console.log(`
    ===== GERENCIADOR DE TAREFAS =====

    1 - Cadastrar tarefas
    2 - Listar tarefas
    3 - Concluir tarefas
    4 - Alterar prioridade
    0 - Sair
    `);