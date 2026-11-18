const tarefas = [];
let codigo = 0;

// Validar dados
function validar(titulo,prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O titulo deve ter no minimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3 ||
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

    tarefas.push(tarefa);
    console.log("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listar(){
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada!");
        return;
    }

    tarefas.forEach(t => {
        console.log(
             `Código: ${t.codigo} | Título: ${t.titulo} |
             Prioridade: ${t.prioridade} |
             Status: ${t.status ? "Em andamento" : "Concluida"}`
          );
    });
}

// Buscar tarefa
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

    tarefas.status = false;
     console.log("Tarefa concluída!");
}

// Alterar prioridade
function alterar(codigo,prioridade) {
    const tarefa = buscar(codigo);

    validar(tarefa.titulo, prioridade);
    tarefa.prioridade = prioridade;

    console.log("Prioridade alterada!");
}

// Menu principal
async function menu() {
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
1 - Cadastrar tarefa
2 - Listar tarefa
3 - Concluir tarefa
4 - Alterar prioridade
0 - Sair
`);

    opcao = await perguntar("Escolha: ");
    }
};