
let tarefas = [];

function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (!titulo || titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já existe!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Escolha uma prioridade de 1 a 3!");
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

    listar();
}

function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas.forEach(t => {
        let item = document.createElement("li");

        item.textContent =
            "Código: " + t.codigo +
            " | Título: " + t.titulo +
            " | Prioridade: " + t.prioridade +
            " | Status: " + (t.concluida ? "Concluída" : "Pendente");

        lista.appendChild(item);
    });
}

function concluir() {
    let codigo = Number(document.getElementById("codigoAlterar").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        alert("Tarefa concluída!");
        listar();
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let prioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Escolha uma prioridade válida!");
        return;
    }

    tarefa.prioridade = prioridade;

    alert("Prioridade alterada com sucesso!");
    listar();
}
