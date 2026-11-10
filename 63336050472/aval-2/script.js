
let tarefas = [];
let codigo = 1;

function cadastrarTarefa() {
    let titulo = prompt("Digite o título da tarefa:");

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    let prioridade = Number(prompt("Prioridade (1-Alta, 2-Média, 3-Baixa):"));

    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    codigo++;

    alert("Tarefa cadastrada com sucesso!");
}

function listarTarefas() {
    if (tarefas.length === 0) {
        alert("Nenhuma tarefa cadastrada!");
        return;
    }

    tarefas.forEach(t => {
        console.log(
            "Código:", t.codigo,
            "| Título:", t.titulo,
            "| Prioridade:", t.prioridade,
            "| Status:", t.concluida ? "Concluída" : "Pendente"
        );
    });
}

function concluirTarefa() {
    let cod = Number(prompt("Digite o código da tarefa:"));

    let tarefa = tarefas.find(t => t.codigo === cod);

    if (tarefa) {
        tarefa.concluida = true;
        alert("Tarefa concluída!");
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {
    let cod = Number(prompt("Digite o código da tarefa:"));

    let tarefa = tarefas.find(t => t.codigo === cod);

    if (tarefa) {
        let nova = Number(prompt("Nova prioridade (1 a 3):"));

        if (nova >= 1 && nova <= 3 && Number.isInteger(nova)) {
            tarefa.prioridade = nova;
            alert("Prioridade alterada!");
        } else {
            alert("Prioridade inválida!");
        }
    } else {
        alert("Tarefa não encontrada!");
    }
}

let opcao;

do {
    opcao = Number(prompt(
        "1 - Cadastrar tarefa\n" +
        "2 - Listar tarefas\n" +
        "3 - Concluir tarefa\n" +
        "4 - Alterar prioridade\n" +
        "0 - Sair"
    ));

    if (opcao === 1) {
        cadastrarTarefa();
    } else if (opcao === 2) {
        listarTarefas();
    } else if (opcao === 3) {
        concluirTarefa();
    } else if (opcao === 4) {
        alterarPrioridade();
    } else if (opcao !== 0) {
        alert("Opção inválida!");
    }

} while (opcao !== 0);

alert("Sistema encerrado!");
