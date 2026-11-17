
let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa() {
    alert("CADASTRO DE NOVA TAREFA");

    let titulo;

    do {
        titulo = prompt("Digite o título da tarefa (mínimo 5 caracteres):");

        if (titulo === null) return;

        titulo = titulo.trim();

        if (titulo.length < 5) {
            alert("O título precisa ter pelo menos 5 caracteres!");
        }

    } while (titulo.length < 5);

    let prioridade;

    do {
        let entrada = prompt(
            "Escolha a prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (entrada === null) return;

        prioridade = Number(entrada);

        if (
            entrada.trim() === "" ||
            !Number.isInteger(prioridade) ||
            prioridade < 1 ||
            prioridade > 3
        ) {
            alert("Prioridade inválida! Digite 1, 2 ou 3.");
        }

    } while (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    );

    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    alert("Tarefa cadastrada com sucesso!");
}

// 2. Listar tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        alert("Nenhuma tarefa cadastrada!");
        return;
    }

    let lista = "===== LISTA DE TAREFAS =====\n\n";

    tarefas.forEach(tarefa => {
        let prioridadeTexto;

        switch (tarefa.prioridade) {
            case 1:
                prioridadeTexto = "Alta";
                break;
            case 2:
                prioridadeTexto = "Média";
                break;
            case 3:
                prioridadeTexto = "Baixa";
                break;
        }

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        lista +=
            "Código: " + tarefa.codigo +
            "\nTítulo: " + tarefa.titulo +
            "\nPrioridade: " + prioridadeTexto +
            "\nStatus: " + status +
            "\n--------------------------\n";
    });

    alert(lista);
}

// 3. Marcar tarefa como concluída
function concluirTarefa() {
    let codigo = Number(
        prompt("Digite o código da tarefa que deseja concluir:")
    );

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Código inválido!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Essa tarefa já está concluída!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa marcada como concluída com sucesso!");
}

// 4. Alterar prioridade de uma tarefa
function alterarPrioridade() {
    let codigo = Number(
        prompt("Digite o código da tarefa:")
    );

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Código inválido!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade;

    do {
        let entrada = prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (entrada === null) return;

        novaPrioridade = Number(entrada);

        if (
            entrada.trim() === "" ||
            !Number.isInteger(novaPrioridade) ||
            novaPrioridade < 1 ||
            novaPrioridade > 3
        ) {
            alert("Prioridade inválida! Escolha 1, 2 ou 3.");
        }

    } while (
        !Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    );

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");
}

// MENU PRINCIPAL
function menu() {
    let opcao;

    do {
        opcao = prompt(
            "===== GERENCIADOR DE TAREFAS =====\n\n" +
            "1 - Cadastrar nova tarefa\n" +
            "2 - Listar tarefas cadastradas\n" +
            "3 - Marcar tarefa como concluída\n" +
            "4 - Alterar prioridade de uma tarefa\n" +
            "0 - Sair do sistema\n\n" +
            "Escolha uma opção:"
        );

        if (opcao === null) break;

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

            case "0":
                alert("Sistema encerrado. Até mais!");
                break;

            default:
                alert("Opção inválida! Tente novamente.");
        }

    } while (opcao !== "0");
}

// INICIAR O PROGRAMA
menu();
