
let tarefas = [];
let opcao;

do {
    opcao = prompt(
        "===== GERENCIADOR DE TAREFAS =====\n\n" +
        "1 - Adicionar tarefa\n" +
        "2 - Listar tarefas\n" +
        "3 - Concluir tarefa\n" +
        "4 - Excluir tarefa\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {

        case "1":
            let nome = prompt("Digite o nome da tarefa:");

            if (nome && nome.trim() !== "") {
                tarefas.push({
                    nome: nome,
                    concluida: false
                });

                alert("Tarefa adicionada com sucesso!");
            } else {
                alert("Digite uma tarefa válida!");
            }
            break;

        case "2":
            if (tarefas.length === 0) {
                alert("Nenhuma tarefa cadastrada!");
            } else {
                let lista = "===== MINHAS TAREFAS =====\n\n";

                tarefas.forEach((tarefa, index) => {
                    lista += `${index + 1} - ${tarefa.nome} - ${
                        tarefa.concluida ? "Concluída" : "Pendente"
                    }\n`;
                });

                alert(lista);
            }
            break;

        case "3":
            let idConcluir = Number(prompt("Digite o número da tarefa:"));

            if (idConcluir >= 1 && idConcluir <= tarefas.length) {
                tarefas[idConcluir - 1].concluida = true;
                alert("Tarefa concluída!");
            } else {
                alert("Tarefa não encontrada!");
            }
            break;

        case "4":
            let idExcluir = Number(prompt("Digite o número da tarefa:"));

            if (idExcluir >= 1 && idExcluir <= tarefas.length) {
                tarefas.splice(idExcluir - 1, 1);
                alert("Tarefa excluída!");
            } else {
                alert("Tarefa não encontrada!");
            }
            break;

        case "0":
            alert("Gerenciador encerrado!");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== "0");
