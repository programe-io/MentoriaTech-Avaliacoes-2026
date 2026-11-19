
// Sistema de Gerenciamento de Tarefas

let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa() {
    let titulo = prompt("Digite o título da tarefa:");

    if (titulo === null) return;

    titulo = titulo.trim();

    if (titulo.length < 5) {
        alert("Erro: o título deve ter no mínimo 5 caracteres!");
        return;
    }

    let prioridade = Number(prompt(
        "Digite a prioridade:\n1 - Baixa\n2 - Média\n3 - Alta"
    ));

    if (![1, 2, 3].includes(prioridade)) {
        alert("Erro: a prioridade deve ser 1, 2 ou 3!");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");
}

// 2. Listar todas as tarefas
function listarTarefas() {
    if (tarefas.length === 0) {
        alert("Nenhuma tarefa cadastrada!");
        return;
    }

    let resultado = "LISTA DE TAREFAS:\n\n";

    tarefas.forEach(tarefa => {
        resultado +=
            "Código: " + tarefa.codigo +
            "\nTítulo: " + tarefa.titulo +
            "\nPrioridade: " + tarefa.prioridade +
            "\nStatus: " + tarefa.status +
            "\n----------------------\n";
    });

    alert(resultado);
}

// 3. Marcar tarefa como concluída
function concluirTarefa() {
    let codigo = Number(prompt("Digite o código da tarefa:"));

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.status = "Concluída";

    alert("Tarefa marcada como concluída!");
}

// 4. Alterar prioridade de uma tarefa
function alterarPrioridade() {
    let codigo = Number(prompt("Digite o código da tarefa:"));

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(prompt(
        "Digite a nova prioridade:\n1 - Baixa\n2 - Média\n3 - Alta"
    ));

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");
}

// Menu principal do sistema
let opcao;

do {
    opcao = prompt(
        "SISTEMA DE GERENCIAMENTO DE TAREFAS\n\n" +
        "1 - Cadastrar tarefa\n" +
        "2 - Listar tarefas\n" +
        "3 - Concluir tarefa\n" +
        "4 - Alterar prioridade\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {
        case "1":
            cadastrarTarefa();
            break;

        case "2":
            listarTarefas();
            break;

        case "3":
            concluirTarefa();
            break;

        case "4":
            alterarPrioridade();
            break;

        case "5":
            alert("Sistema encerrado!");
            break;

        case null:
            opcao = "5";
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== "5");
