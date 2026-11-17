
let tarefas = [];

// CADASTRAR TAREFA
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código
    if (!codigo || tarefas.some(t => t.codigo === codigo)) {
        alert("Código inválido ou já cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

}

// LISTAR TAREFAS
function listarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada!</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        lista.innerHTML += `
            <p>
                <strong>Código:</strong> ${tarefa.codigo}<br>
                <strong>Título:</strong> ${tarefa.titulo}<br>
                <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
                <strong>Status:</strong> 
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>
            <hr>
        `;

    });

}

// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa() {

    let codigo = Number(document.getElementById("codigoConcluir").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.concluida = true;

        alert("Tarefa marcada como concluída!");

        listarTarefas();

    } else {

        alert("Tarefa não encontrada!");

    }

}

// ALTERAR PRIORIDADE
function alterarPrioridade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let novaPrioridade = Number(document.getElementById("novaPrioridade").value);

    // Validar prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.prioridade = novaPrioridade;

        alert("Prioridade alterada com sucesso!");

        listarTarefas();

    } else {

        alert("Tarefa não encontrada!");

    }

}
