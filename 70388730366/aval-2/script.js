
let tarefas = [];

// CADASTRAR TAREFA
function cadastrarTarefa() {

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (codigo === "" || titulo === "" || prioridade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (!["1", "2", "3"].includes(prioridade)) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    const existe = tarefas.some(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}


// LISTAR TAREFAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let prioridadeTexto;

        switch (tarefa.prioridade) {
            case 1:
                prioridadeTexto = "Alta";
                break;
            case 2:
                prioridadeTexto = "Média";
                break;
            case 3:
                prioridadeTexto = "Baixa";
                break;
        }

        const p1 = document.createElement("p");
        p1.textContent = "Código: " + tarefa.codigo;

        const p2 = document.createElement("p");
        p2.textContent = "Título: " + tarefa.titulo;

        const p3 = document.createElement("p");
        p3.textContent = "Prioridade: " + prioridadeTexto;

        const p4 = document.createElement("p");
        p4.textContent = "Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);

        lista.appendChild(div);
    });
}


// MARCAR COMO CONCLUÍDA
function concluirTarefa() {

    const codigo = document.getElementById("codigoAlterar").value.trim();

    if (codigo === "") {
        alert("Digite o código da tarefa!");
        return;
    }

    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Esta tarefa já está concluída!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");

    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade() {

    const codigo = document.getElementById("codigoAlterar").value.trim();
    const prioridade = document.getElementById("novaPrioridade").value;

    if (codigo === "" || prioridade === "") {
        alert("Preencha o código e a nova prioridade!");
        return;
    }

    if (!["1", "2", "3"].includes(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.prioridade = Number(prioridade);

    alert("Prioridade alterada com sucesso!");

    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}


// CONECTAR OS BOTÕES
document.getElementById("btnCadastrar")
    .addEventListener("click", cadastrarTarefa);

document.getElementById("btnConcluir")
    .addEventListener("click", concluirTarefa);

document.getElementById("btnAlterar")
    .addEventListener("click", alterarPrioridade);

document.getElementById("btnListar")
    .addEventListener("click", listarTarefas);
