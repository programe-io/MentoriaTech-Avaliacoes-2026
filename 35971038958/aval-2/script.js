const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lista para armazenar as tarefas
let tarefas = [];

// Função para exibir o menu principal
function exibirMenu() {
    console.log("\n--- SISTEMA DE GERENCIAMENTO DE TAREFAS ---");
    console.log("1. Cadastrar uma nova tarefa");
    console.log("2. Listar as tarefas cadastradas");
    console.log("3. Marcar uma tarefa como concluída");
    console.log("4. Alterar a prioridade de uma tarefa");
    console.log("5. Sair");
    
    rl.question("\nEscolha uma opção: ", (opcao) => {
        switch (opcao.trim()) {
            case '1':
                cadastrarTarefa();
                break;
            case '2':
                listarTarefas();
                break;
            case '3':
                marcarConcluida();
                break;
            case '4':
                alterarPrioridade();
                break;
            case '5':
                console.log("Saindo do sistema. Até logo!");
                rl.close();
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
                exibirMenu();
                break;
        }
    });
}

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa() {
    rl.question("Digite o código da tarefa: ", (codigo) => {
        // Verifica se o código já existe
        if (tarefas.some(t => t.codigo === codigo)) {
            console.log("Erro: Já existe uma tarefa cadastrada com esse código!");
            return exibirMenu();
        }

        rl.question("Digite o título da tarefa (mínimo de 5 caracteres): ", (titulo) => {
            // Regra de validação: Título com no mínimo 5 caracteres
            if (!titulo || titulo.trim().length < 5) {
                console.log("Erro: O título deve ter no mínimo 5 caracteres!");
                return exibirMenu();
            }

            rl.question("Digite a prioridade (1 - Alta, 2 - Média, 3 - Baixa): ", (prioStr) => {
                const prioridade = parseInt(prioStr);

                // Regra de validação: Prioridade entre 1 e 3
                if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
                    console.log("Erro: A prioridade deve ser um valor numérico entre 1 e 3!");
                    return exibirMenu();
                }

                // Criação da tarefa com status de conclusão inicializado como falso (não concluída)
                tarefas.push({
                    codigo: codigo.trim(),
                    titulo: titulo.trim(),
                    prioridade: prioridade,
                    concluida: false
                });

                console.log("Tarefa cadastrada com sucesso!");
                exibirMenu();
            });
        });
    });
}

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    console.log("\n--- LISTA DE TAREFAS ---");
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada no momento.");
    } else {
        tarefas.forEach((t, index) => {
            // Traduzindo o número da prioridade para texto legível
            let textoPrioridade = "";
            if (t.prioridade === 1) textoPrioridade = "1 (Alta)";
            else if (t.prioridade === 2) textoPrioridade = "2 (Média)";
            else if (t.prioridade === 3) textoPrioridade = "3 (Baixa)";

            // Traduzindo o status de conclusão
            const statusTexto = t.concluida ? "[CONCLUÍDA]" : "[PENDENTE]";

            console.log(`${index + 1}. Código: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${textoPrioridade} | Status: ${statusTexto}`);
        });
    }
    exibirMenu();
}

// 3. Marcar uma tarefa como concluída
function marcarConcluida() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada para alterar.");
        return exibirMenu();
    }

    rl.question("Digite o código da tarefa que deseja marcar como concluída: ", (codigo) => {
        const tarefa = tarefas.find(t => t.codigo === codigo.trim());

        if (!tarefa) {
            console.log("Erro: Tarefa não encontrada com esse código!");
            return exibirMenu();
        }

        if (tarefa.concluida) {
            console.log("Aviso: Esta tarefa já estava marcada como concluída.");
        } else {
            tarefa.concluida = true;
            console.log("Tarefa marcada como concluída com sucesso!");
        }

        exibirMenu();
    });
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada para alterar.");
        return exibirMenu();
    }

    rl.question("Digite o código da tarefa que deseja alterar a prioridade: ", (codigo) => {
        const tarefa = tarefas.find(t => t.codigo === codigo.trim());

        if (!tarefa) {
            console.log("Erro: Tarefa não encontrada com esse código!");
            return exibirMenu();
        }

        rl.question(`Prioridade atual (${tarefa.prioridade}). Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa): `, (prioStr) => {
            const novaPrioridade = parseInt(prioStr);

            // Regra de validação: Prioridade entre 1 e 3
            if (isNaN(novaPrioridade) || novaPrioridade < 1 || novaPrioridade > 3) {
                console.log("Erro: A nova prioridade deve ser um valor numérico entre 1 e 3!");
            } else {
                tarefa.prioridade = novaPrioridade;
                console.log("Prioridade alterada com sucesso!");
            }

            exibirMenu();
        });
    });
}

// Inicializa o programa chamando o menu
exibirMenu();