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
           …