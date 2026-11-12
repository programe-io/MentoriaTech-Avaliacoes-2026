
let tarefas = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = document.getElementById("prioridade").value;

    if (codigo === "" || titulo.trim() === "" || prioridade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.trim().length < 5) {
        alert("O título precisa ter no mínimo 5 caracteres!");
        return;
    }

    if (Number(prioridade) < 1 || Number(prioridade) > 3) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        status: "Pendente"
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listar();
}

function listar() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        let item = document.createElement("li");

        item.textContent =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + tarefa.status;

        lista.appendChild(item);
    });
}

function concluir() {
    let codigo = document.getElementById("codigoConcluir").value;

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.status = "Concluída";
        alert("Tarefa concluída!");
        listar();
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {
    let codigo = document.getElementById("codigoAlterar").value;
    let prioridade = document.getElementById("novaPrioridade").value;

    if (prioridade === "" || Number(prioridade) < 1 || Number(prioridade) > 3) {
        alert("Digite uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = Number(prioridade);
        alert("Prioridade alterada!");
        listar();
    } else {
        alert("Tarefa não encontrada!");
    }
}
