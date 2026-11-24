
let tarefas = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== GERENCIADOR DE TAREFAS =====\n\n" +
        "1 - Adicionar tarefa\n" +
        "2 - Listar tarefas\n" +
        "3 - Concluir tarefa\n" +
        "4 - Excluir tarefa\n" +
        "5 - Ver tarefas pendentes\n" +
        "6 - Ver tarefas concluídas\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            let descricao = prompt("Digite a descrição da tarefa:");

            if (descricao && descricao.trim() !== "") {
                tarefas.push({
                    descricao: descricao,
                    concluida: false
                });

                alert("Tarefa adicionada com sucesso!");
            } else {
                alert("Digite uma tarefa válida!");
            }
            break;

        case 2:
            if (tarefas.length === 0) {
                alert("Nenhuma tarefa cadastrada.");
            } else {
                let lista = "===== TODAS AS TAREFAS =====\n";

                for (let i = 0; i < tarefas.length; i++) {
                    lista +=
                        "\n" + (i + 1) + " - " +
                        tarefas[i].descricao +
                        "\nStatus: " +
                        (tarefas[i].concluida ? "Concluída" : "Pendente") +
                        "\n----------------------";
                }

                alert(lista);
            }
            break;

        case 3:
            if (tarefas.length === 0) {
                alert("Não existem tarefas cadastradas.");
                break;
            }

            let numero = Number(prompt(
                "Digite o número da tarefa que deseja concluir:\n" +
                tarefas.map((t, i) => (i + 1) + " - " + t.descricao).join("\n")
            ));

            if (numero >= 1 && numero <= tarefas.length) {
                tarefas[numero - 1].concluida = true;
                alert("Tarefa concluída com sucesso!");
            } else {
                alert("Número de tarefa inválido!");
            }
            break;

        case 4:
            if (tarefas.length === 0) {
                alert("Não existem tarefas para excluir.");
                break;
            }

            let excluir = Number(prompt(
                "Digite o número da tarefa que deseja excluir:\n" +
                tarefas.map((t, i) => (i + 1) + " - " + t.descricao).join("\n")
            ));

            if (excluir >= 1 && excluir <= tarefas.length) {
                tarefas.splice(excluir - 1, 1);
                alert("Tarefa excluída com sucesso!");
            } else {
                alert("Número inválido!");
            }
            break;

        case 5:
            let pendentes = "===== TAREFAS PENDENTES =====\n";
            let encontrouPendente = false;

            for (let i = 0; i < tarefas.length; i++) {
                if (!tarefas[i].concluida) {
                    pendentes += "\n" + tarefas[i].descricao;
                    encontrouPendente = true;
                }
            }

            alert(encontrouPendente ? pendentes : "Não existem tarefas pendentes.");
            break;

        case 6:
            let concluidas = "===== TAREFAS CONCLUÍDAS =====\n";
            let encontrouConcluida = false;

            for (let i = 0; i < tarefas.length; i++) {
                if (tarefas[i].concluida) {
                    concluidas += "\n" + tarefas[i].descricao;
                    encontrouConcluida = true;
                }
            }

            alert(encontrouConcluida ? concluidas : "Nenhuma tarefa concluída.");
            break;

        case 0:
            alert("Gerenciador encerrado. Até mais!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 0);
