
const tarefas = [];
let proximoId = 1;

function adicionarTarefa(descricao) {
    if (!descricao.trim()) {
        console.log("Digite uma tarefa válida!");
        return;
    }

    const tarefa = {
        id: proximoId++,
        descricao: descricao,
        concluida: false
    };

    tarefas.push(tarefa);
    salvar();
    console.log("Tarefa adicionada!");
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvar();
        console.log("Status atualizado!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function excluirTarefa(id) {
    const indice = tarefas.findIndex(t => t.id === id);

    if (indice !== -1) {
        tarefas.splice(indice, 1);
        salvar();
        console.log("Tarefa excluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

function listarTarefas() {
    console.log("\n=== MINHAS TAREFAS ===");

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(t => {
        console.log(
            `${t.id} - ${t.descricao} | ${
                t.concluida ? "Concluída" : "Pendente"
            }`
        );
    });
}

function filtrarTarefas(status) {
    const resultado = tarefas.filter(t =>
        status === "todas" ||
        (status === "concluidas" && t.concluida) ||
        (status === "pendentes" && !t.concluida)
    );

    console.log("\n=== FILTRO ===");
    resultado.forEach(t => console.log(t.descricao));
}

function salvar() {
    console.log("Alterações salvas!");
}

// MENU PRINCIPAL
function menu() {
    let opcao;

    do {
        opcao = prompt(
            "GERENCIADOR DE TAREFAS\n\n" +
            "1 - Adicionar tarefa\n" +
            "2 - Listar tarefas\n" +
            "3 - Concluir tarefa\n" +
            "4 - Excluir tarefa\n" +
            "5 - Ver tarefas pendentes\n" +
            "6 - Ver tarefas concluídas\n" +
            "0 - Sair"
        );

        switch (opcao) {
            case "1":
                adicionarTarefa(prompt("Digite a tarefa:") || "");
                break;

            case "2":
                listarTarefas();
                break;

            case "3":
                concluirTarefa(Number(prompt("ID da tarefa:")));
                break;

            case "4":
                excluirTarefa(Number(prompt("ID da tarefa:")));
                break;

            case "5":
                filtrarTarefas("pendentes");
                break;

            case "6":
                filtrarTarefas("concluidas");
                break;

            case "0":
                alert("Até logo!");
                break;

            default:
                alert("Opção inválida!");
        }

    } while (opcao !== "0");
}

menu();
