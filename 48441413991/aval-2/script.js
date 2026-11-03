const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = [];
let proximoCodigo = 1;

function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resolve);
    });
}

async function cadastrar() {
    let titulo = await perguntar("Título: ");

    if (titulo.trim().length < 5) {
        console.log("Erro: mínimo de 5 caracteres!");
        return;
    }

    let prioridade = Number(await perguntar("Prioridade (1-Alta, 2-Média, 3-Baixa): "));

    if (![1, 2, 3].includes(prioridade)) {
        console.log("Prioridade inválida!");
        return;
    }

    tarefas.push({
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    console.log("Tarefa cadastrada com sucesso!");
}

function listar() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(t => {
        console.log("\nCódigo:", t.codigo);
        console.log("Título:", t.titulo);
        console.log("Prioridade:", t.prioridade);
        console.log("Status:", t.concluida ? "Concluída" : "Pendente");
    });
}

async function concluir() {
    let codigo = Number(await perguntar("Código da tarefa: "));
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;
    console.log("Tarefa concluída!");
}

async function alterarPrioridade() {
    let codigo = Number(await perguntar("Código da tarefa: "));
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    let prioridade = Number(await perguntar("Nova prioridade (1, 2 ou 3): "));

    if (![1, 2, 3].includes(prioridade)) {
        console.log("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = prioridade;
    console.log("Prioridade alterada!");
}

async function menu() {
    let opcao;

    do {
        console.log("\n===== GERENCIADOR DE TAREFAS =====");
        console.log("1 - Cadastrar tarefa");
        console.log("2 - Listar tarefas");
        console.log("3 - Concluir tarefa");
        console.log("4 - Alterar prioridade");
        console.log("0 - Sair");

        opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await cadastrar();
                break;
            case "2":
                listar();
                break;
            case "3":
                await concluir();
                break;
            case "4":
                await alterarPrioridade();
                break;
            case "0":
                console.log("Programa encerrado!");
                break;
            default:
                console.log("Opção inválida!");
        }

    } while (opcao !== "0");

    rl.close();
}

menu();
