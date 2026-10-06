let tarefas = [];

function cadastrar() {

    let titulo = prompt("Digite o título da tarefa:");

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    let prioridade = Number(
        prompt("Digite a prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada!");
}

function listar() {

    let resultado = document.getElementById("resultado");

    if (tarefas.length === 0) {
        resultado.innerHTML = "Nenhuma tarefa cadastrada.";
        return;
    }

    resultado.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        resultado.innerHTML += `
            <p>
            Código: ${tarefa.codigo}<br>
            Título: ${tarefa.titulo}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${status}
            </p>
            <hr>
        `;
    });
}

function concluir() {

    let codigo = Number(
        prompt("Digite o código da tarefa:")
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        alert("Tarefa marcada como concluída!");
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {

    let codigo = Number(
        prompt("Digite o código da tarefa:")
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        let novaPrioridade = Number(
            prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
        );

        if (novaPrioridade < 1 || novaPrioridade > 3) {
            alert("A prioridade deve ser entre 1 e 3!");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        alert("Prioridade alterada!");

    } else {
        alert("Tarefa não encontrada!");
   </Body>
    HTML
    }
}