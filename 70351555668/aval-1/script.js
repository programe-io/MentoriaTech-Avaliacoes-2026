
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = [];
let proximoCodigo = 1;

// Função para receber dados do usuário
function perguntar(mensagem) {
    return new Promise(resolve => {
        rl.question(mensagem, resposta => {
            resolve(resposta.trim());
        });
    });
}

// Cadastrar tarefa
async function cadastrarTarefa() {
    let titulo = await perguntar("Digite o título da tarefa: ");

    if (titulo.length < 5) {
        console.log("Erro: O título precisa ter no mínimo 5 caracteres.");
        return;
    }

    let prioridade = Number(
        await perguntar("Digite a prioridade (1-Alta, 2-Média, 3-Baixa): ")
    );

    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve estar entre 1 e 3.");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    console.log("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n===== LISTA DE TAREFAS =====");

    tarefas.forEach(tarefa => {
        console.log("----------------------------");
        console.log("Código: " + tarefa.codigo);
        console.log("Título: " + tarefa.titulo);

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        console.log("Prioridade: " + prioridadeTexto);
        console.log("Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente"));
    });

    console.log("----------------------------");
}

// Concluir tarefa
async function concluirTarefa() {
    let codigo = Number(
        await perguntar("Digite o código da tarefa: ")
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa marcada como concluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Alterar prioridade
async function alterarPrioridade() {
    let codigo = Number(
        await perguntar("Digite o código da tarefa: ")
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        await perguntar("Nova prioridade (1-Alta, 2-Média, 3-Baixa): ")
    );

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// Menu principal
async function menu() {
    let opcao;

    do {
        console.log("\n==============================");
        console.log("    GERENCIADOR DE TAREFAS");
        console.log("==============================");
        console.log("1 - Cadastrar tarefa");
        console.log("2 - Listar tarefas");
        console.log("3 - Concluir tarefa");
        console.log("4 - Alterar prioridade");
        console.log("0 - Sair");
        console.log("==============================");

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
                console.log("Sistema encerrado. Até mais!");
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
        }

    } while (opcao !== "0");

    rl.close();
}

// Iniciar o sistema
menu();