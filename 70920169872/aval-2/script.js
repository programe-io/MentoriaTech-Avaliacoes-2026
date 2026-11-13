
let tarefas = [];

// Cadastrar nova tarefa
function cadastrarTarefa() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (
        document.getElementById("codigo").value === "" ||
        document.getElementById("titulo").value.trim() === "" ||
        document.getElementById("prioridade").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser de 1 a 3!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
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

    listarTarefas();
}

// Listar tarefas cadastradas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {
        let div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let titulo = document.createElement("strong");
        titulo.textContent = tarefa.titulo;

        let informacoes = document.createElement("p");
        informacoes.textContent =
            "Código: " + tarefa.codigo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        div.appendChild(titulo);
        div.appendChild(informacoes);
        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa() {
    let codigo = Number(
        document.getElementById("codigoGerenciar").value
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;

        alert("Tarefa concluída com sucesso!");

        listarTarefas();
    } else {
        alert("Tarefa não encontrada!");
    }
}

// Alterar prioridade da tarefa
function alterarPrioridade() {
    let codigo = Number(
        document.getElementById("codigoGerenciar").value
    );

    let prioridade = document.getElementById("novaPrioridade").value;

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (prioridade === "") {
        alert("Selecione uma nova prioridade!");
        return;
    }

    tarefa.prioridade = Number(prioridade);

    alert("Prioridade alterada com sucesso!");

    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}
