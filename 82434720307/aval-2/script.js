let tarefas = [];

function cadastrarTarefa() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let existe = tarefas.find(tarefa => tarefa.codigo === codigo);

    if (existe) {
        alert("Já existe uma tarefa com esse código!");
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

    listarTarefas();
}

function listarTarefas() {
    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (tarefas.length === 0) {
        resultado.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {

        let status = tarefa.concluida ? "Concluída" : "Pendente";

        let classe = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        resultado.innerHTML += `
            <div class="${classe}">
                <p><strong>Código:</strong> ${tarefa.codigo}</p>
                <p><strong>Título:</strong> ${tarefa.titulo}</p>
                <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                <p><strong>Status:</strong> ${status}</p>
            </div>
        `;
    });
}

function concluirTarefa() {
    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}

function alterarPrioridade() {
    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let novaPrioridade = Number(
        document.getElementById("novaPrioridade").value
    );

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}
