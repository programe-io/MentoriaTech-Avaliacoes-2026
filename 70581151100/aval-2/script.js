
let tarefas = [];

function cadastrarTarefa() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (!codigo || titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefaExistente = tarefas.find(t => t.codigo === codigo);

    if (tarefaExistente) {
        alert("Esse código já está cadastrado!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";
}

function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">
                <p><strong>Código:</strong> ${tarefa.codigo}</p>
                <p><strong>Título:</strong> ${tarefa.titulo}</p>
                <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                <p><strong>Status:</strong> 
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </p>
            </div>
        `;
    });
}

function concluirTarefa() {
    let codigo = Number(document.getElementById("codigoAlterar").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        alert("Tarefa concluída com sucesso!");
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let prioridade = Number(document.getElementById("novaPrioridade").value);

    if (prioridade < 1 || prioridade > 3) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = prioridade;
        alert("Prioridade alterada com sucesso!");
    } else {
        alert("Tarefa não encontrada!");
    }
}
