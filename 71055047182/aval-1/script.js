
let tarefas = [];
let proximoCodigo = 1;
let opcao;

do {
    opcao = prompt(
        "===== GERENCIADOR DE TAREFAS =====\n\n" +
        "1 - Cadastrar nova tarefa\n" +
        "2 - Listar tarefas cadastradas\n" +
        "3 - Marcar tarefa como concluída\n" +
        "4 - Alterar prioridade de uma tarefa\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {

        // 1 - Cadastrar tarefa
        case "1": {
            let titulo = prompt("Digite o título da tarefa:");

            if (titulo === null) break;

            if (titulo.trim().length < 5) {
                alert("Erro! O título deve ter no mínimo 5 caracteres.");
                break;
            }

            let prioridade = Number(prompt(
                "Escolha a prioridade:\n\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            ));

            if (![1, 2, 3].includes(prioridade)) {
                alert("Prioridade inválida! Escolha 1, 2 ou 3.");
                break;
            }

            let tarefa = {
                codigo: proximoCodigo++,
                titulo: titulo.trim(),
                prioridade: prioridade,
                concluida: false
            };

            tarefas.push(tarefa);

            alert("Tarefa cadastrada com sucesso!");
            break;
        }

        // 2 - Listar tarefas
        case "2": {
            if (tarefas.length === 0) {
                alert("Nenhuma tarefa cadastrada!");
                break;
            }

            let lista = "===== LISTA DE TAREFAS =====\n\n";

            tarefas.forEach(tarefa => {
                let nivel = "";

                if (tarefa.prioridade === 1) {
                    nivel = "Alta";
                } else if (tarefa.prioridade === 2) {
                    nivel = "Média";
                } else {
                    nivel = "Baixa";
                }

                lista +=
                    "Código: " + tarefa.codigo + "\n" +
                    "Título: " + tarefa.titulo + "\n" +
                    "Prioridade: " + nivel + "\n" +
                    "Status: " +
                    (tarefa.concluida ? "Concluída" : "Pendente") +
                    "\n\n";
            });

            alert(lista);
            break;
        }

        // 3 - Marcar tarefa como concluída
        case "3": {
            let codigo = Number(prompt(
                "Digite o código da tarefa que deseja concluir:"
            ));

            let tarefa = tarefas.find(t => t.codigo === codigo);

            if (tarefa) {
                tarefa.concluida = true;
                alert("Tarefa marcada como concluída!");
            } else {
                alert("Tarefa não encontrada!");
            }

            break;
        }

        // 4 - Alterar prioridade
        case "4": {
            let codigo = Number(prompt(
                "Digite o código da tarefa:"
            ));

            let tarefa = tarefas.find(t => t.codigo === codigo);

            if (!tarefa) {
                alert("Tarefa não encontrada!");
                break;
            }

            let novaPrioridade = Number(prompt(
                "Digite a nova prioridade:\n\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            ));

            if (![1, 2, 3].includes(novaPrioridade)) {
                alert("Prioridade inválida!");
                break;
            }

            tarefa.prioridade = novaPrioridade;

            alert("Prioridade alterada com sucesso!");
            break;
        }

        // 5 - Sair
        case "5":
            alert("Gerenciador de tarefas encerrado!");
            break;

        default:
            if (opcao !== null) {
                alert("Opção inválida! Tente novamente.");
            }
    }

} while (opcao !== "5" && opcao !== null);
