
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = [];
let proximoCodigo = 1;

// Função para fazer perguntas no terminal
function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resolve);
    });
}

// 1. Cadastrar uma nova tarefa
async function cadastrarTarefa() {
    let titulo = await perguntar("Digite o título da tarefa: ");

    if (titulo.trim().length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres!");
        return;
    }

    let prioridade = Number(
        await perguntar("Digite a prioridade (1 - Alta, 2 - Média, 3 - Baixa): ")
    );

    if (![1, 2, 3].includes(prioridade)) {
        console.log("Erro: A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n===== LISTA DE TAREFAS =====");

    tarefas.forEach(tarefa => {
        let status = tarefa.concluida ? "Concluída" : "Pendente";

        let prioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        console.log("----------------------------");
        console.log("Código:", tarefa.codigo);
        console.log("Título:", tarefa.titulo);
        console.log("Prioridade:", prioridade[tarefa.prioridade]);
        console.log("Status:", status);
    });

    console.log("----------------------------");
}

// 3. Marcar uma tarefa como concluída
async function concluirTarefa() {
    let codigo = Number(
        await perguntar("Digite o código da tarefa: ")
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    console.log("Tarefa marcada como concluída!");
}

// 4. Alterar a prioridade de uma tarefa
async function alterarPrioridade() {
    let codigo = Number(
        await perguntar("Digite o código da tarefa: ")
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    let prioridade = Number(
        await perguntar("Nova prioridade (1 - Alta, 2 - Média, 3 - Baixa): ")
    );

    if (![1, 2, 3].includes(prioridade)) {
        console.log("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = prioridade;

    console.log("Prioridade alterada com sucesso!");
}

// Menu principal
async function menu() {
    let opcao;

    do {
        console.log("\n===== GERENCIADOR DE TAREFAS =====");
        console.log("1 - Cadastrar nova tarefa");
        console.log("2 - Listar tarefas");
        console.log("3 - Concluir tarefa");
        console.log("4 - Alterar prioridade");
        console.log("0 - Sair");

        opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await cadastrarTarefa();
                break;

            case "2":
                listarTarefas();
                break;

            case "3":
                await concluirTarefa();
                break;

            case "4":
                await alterarPrioridade();
                break;

            case "0":
                console.log("Sistema encerrado!");
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
        }

    } while (opcao !== "0");

    rl.close();
}

// Executar o programa
menu();
