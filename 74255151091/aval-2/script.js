let tarefas = [];
let opcao;
let codigo = 1;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE TAREFAS =====\n" +
        "1 - Cadastrar nova tarefa\n" +
        "2 - Listar tarefas cadastradas\n" +
        "3 - Marcar tarefa como concluída\n" +
        "4 - Alterar prioridade de uma tarefa\n" +
        "5 - Sair"
    ));

    switch (opcao) {

        case 1:
            let titulo = prompt("Digite o título da tarefa:");

            if (titulo.length < 5) {
                alert("O título deve ter no mínimo 5 caracteres!");
                break;
            }

            let prioridade = Number(prompt(
                "Digite a prioridade:\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            ));

            if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
                alert("Prioridade inválida! Digite um valor entre 1 e 3.");
                break;
            }

            let tarefa = {
                codigo: codigo,
                titulo: titulo,
                prioridade: prioridade,
                concluida: false
            };

            tarefas.push(tarefa);
            codigo++;

            alert("Tarefa cadastrada com sucesso!");
            break;

        case 2:
            if (tarefas.length === 0) {
                alert("Nenhuma tarefa cadastrada!");
            } else {
                let lista = "===== TAREFAS CADASTRADAS =====\n";

                for (let i = 0; i < tarefas.length; i++) {
                    lista +=
                        "\nCódigo: " + tarefas[i].codigo +
                        "\nTítulo: " + tarefas[i].titulo +
                        "\nPrioridade: " + tarefas[i].prioridade +
                        "\nStatus: " + (tarefas[i].concluida ? "Concluída" : "Pendente") +
                        "\n-------------------------";
                }

                alert(lista);
            }
            break;

        case 3:
            let codConclusao = Number(prompt("Digite o código da tarefa:"));

            let tarefaConclusao = tarefas.find(t => t.codigo === codConclusao);

            if (tarefaConclusao) {
                tarefaConclusao.concluida = true;
                alert("Tarefa marcada como concluída!");
            } else {
                alert("Tarefa não encontrada!");
            }
            break;

        case 4:
            let codAlteracao = Number(prompt("Digite o código da tarefa:"));

            let tarefaAlteracao = tarefas.find(t => t.codigo === codAlteracao);

            if (tarefaAlteracao) {
                let novaPrioridade = Number(prompt(
                    "Digite a nova prioridade:\n" +
                    "1 - Alta\n" +
                    "2 - Média\n" +
                    "3 - Baixa"
                ));

                if (novaPrioridade >= 1 && novaPrioridade <= 3 && Number.isInteger(novaPrioridade)) {
                    tarefaAlteracao.prioridade = novaPrioridade;
                    alert("Prioridade alterada com sucesso!");
                } else {
                    alert("Prioridade inválida!");
                }
            } else {
                alert("Tarefa não encontrada!");
            }
            break;

        case 5:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== 5);