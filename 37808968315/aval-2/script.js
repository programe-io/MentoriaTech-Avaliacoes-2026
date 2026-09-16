
let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    const codigo = Number(
        document.getElementById("codigo").value
    );

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    const status = document.getElementById("status").value;

    // Regras de validação
    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    if (!codigo || codigo < 1) {
        alert("Digite um código válido!");
        return;
    }

    const existe = tarefas.some(
        tarefa => tarefa.codigo === codigo
    );

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: status
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
}

// Listar as tarefas cadastradas
function listarTarefas() {

    const lista = document.getElementById("lista");

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const item = document.createElement("p");

        item.innerHTML =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + tarefa.status;

        lista.appendChild(item);

    });
}

// Marcar uma tarefa como concluída
function concluirTarefa() {

    const codigo = Number(
        document.getElementById("codigoConcluir").value
    );

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.status = "Concluída";

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade() {

    const codigo = Number(
        document.getElementById("codigoPrioridade").value
    );

    const novaPrioridade = Number(
        document.getElementById("novaPrioridade").value
    );

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}