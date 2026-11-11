
let tarefas = [];
let opcao;

do {
    opcao = Number(prompt(
        "GERENCIADOR DE TAREFAS\n\n" +
        "1 - Cadastrar tarefa\n" +
        "2 - Listar tarefas\n" +
        "3 - Concluir tarefa\n" +
        "4 - Alterar prioridade\n" +
        "0 - Sair"
    ));

    switch (opcao) {

        case 1: {
            let codigo = Number(prompt("Código:"));

            if (tarefas.some(t => t.codigo === codigo)) {
                alert("Código já cadastrado!");
                break;
            }

            let titulo = prompt("Título:");

            if (!titulo || titulo.trim().length < 5) {
                alert("O título deve ter no mínimo 5 caracteres!");
                break;
            }

            let prioridade = Number(prompt(
                "Prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
            ));

            if (![1, 2, 3].includes(prioridade)) {
                alert("Prioridade inválida!");
                break;
            }

            tarefas.push({
                codigo,
                titulo,
                prioridade,
                concluida: false
            });

            alert("Tarefa cadastrada!");
            break;
        }

        case 2:
            if (tarefas.length === 0) {
                alert("Nenhuma tarefa cadastrada!");
            } else {
                let lista = tarefas.map(t =>
                    `Código: ${t.codigo}\n` +
                    `Título: ${t.titulo}\n` +
                    `Prioridade: ${t.prioridade}\n` +
                    `Status: ${t.concluida ? "Concluída" : "Pendente"}`
                ).join("\n\n");

                alert(lista);
            }
            break;

        case 3: {
            let codigo = Number(prompt("Código da tarefa:"));
            let tarefa = tarefas.find(t => t.codigo === codigo);

            if (tarefa) {
                tarefa.concluida = true;
                alert("Tarefa concluída!");
            } else {
                alert("Tarefa não encontrada!");
            }
            break;
        }

        case 4: {
            let codigo = Number(prompt("Código da tarefa:"));
            let tarefa = tarefas.find(t => t.codigo === codigo);

            if (tarefa) {
                let prioridade = Number(prompt(
                    "Nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
                ));

                if ([1, 2, 3].includes(prioridade)) {
                    tarefa.prioridade = prioridade;
                    alert("Prioridade alterada!");
                } else {
                    alert("Prioridade inválida!");
                }
            } else {
                alert("Tarefa não encontrada!");
            }
            break;
        }

        case 0:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== 0);
