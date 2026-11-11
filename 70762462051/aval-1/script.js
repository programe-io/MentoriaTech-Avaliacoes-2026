
let tarefas = [];

// Função para adicionar tarefa
function adicionarTarefa(nome) {
    const tarefa = {
        id: tarefas.length + 1,
        nome: nome,
        concluida: false
    };

    tarefas.push(tarefa);

    console.log("Tarefa adicionada com sucesso!");
}

// Função para listar tarefas
function listarTarefas() {
    console.log("\n===== LISTA DE TAREFAS =====");

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(tarefa => {
        console.log(
            `ID: ${tarefa.id} | ${tarefa.nome} | ` +
            `${tarefa.concluida ? "Concluída" : "Pendente"}`
        );
    });
}

// Função para concluir tarefa
function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = true;
        console.log("Tarefa concluída com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Função para excluir tarefa
function excluirTarefa(id) {
    const indice = tarefas.findIndex(t => t.id === id);

    if (indice !== -1) {
        tarefas.splice(indice, 1);
        console.log("Tarefa excluída com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Função para executar o menu
function gerenciarTarefas(opcao) {

    switch (opcao) {

        case 1:
            adicionarTarefa("Estudar JavaScript");
            break;

        case 2:
            listarTarefas();
            break;

        case 3:
            concluirTarefa(1);
            break;

        case 4:
            excluirTarefa(1);
            break;

        case 5:
            console.log("Encerrando o gerenciador de tarefas...");
            break;

        default:
            console.log("Opção inválida!");
            break;
    }
}

// =================================
// TESTANDO O GERENCIADOR
// =================================

let numero = 1;

gerenciarTarefas(numero);

gerenciarTarefas(1);
gerenciarTarefas(2);
gerenciarTarefas(3);
gerenciarTarefas(2);
gerenciarTarefas(4);
gerenciarTarefas(2);
gerenciarTarefas(5);
