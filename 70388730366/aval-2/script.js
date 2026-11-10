
let tarefas = [];

// CADASTRAR TAREFA
function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    if (codigo === "" || titulo === "" || prioridade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres!");
        return;
    }

    if (![ "1", "2", "3" ].includes(prioridade)) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    if (tarefas.some(function(t) {
        return t.codigo === codigo;
    })) {
        alert("Este código já está cadastrado!");
        return;
    }

    let tarefa = {
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

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        let div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let p1 = document.createElement("p");
        p1.textContent = "Código: " + tarefa.codigo;

        let p2 = document.createElement("p");
        p2.textContent = "Título: " + tarefa.titulo;

        let p3 = document.createElement("p");
        p3.textContent = "Prioridade: " + prioridadeTexto;

        let p4 = document.createElement("p");
        p4.textContent = "Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);

        lista.appendChild(div);
    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa() {

    let codigo = document.getElementById("codigoAlterar").value;

    if (codigo === "") {
        alert("Digite o código da tarefa!");
        return;
    }

    let tarefa = tarefas.find(function(t) {
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

    let codigo = document.getElementById("codigoAlterar").value;
    let prioridade = document.getElementById("novaPrioridade").value;

    if (codigo === "" || prioridade === "") {
        alert("Preencha o código e a nova prioridade!");
        return;
    }

    if (![ "1", "2", "3" ].includes(prioridade)) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(function(t) {
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


// CONECTAR BOTÕES
document.getElementById("cadastrar").addEventListener("click", cadastrarTarefa);

document.getElementById("concluir").addEventListener("click", concluirTarefa);

document.getElementById("alterar").addEventListener("click", alterarPrioridade);

document.getElementById("listar").addEventListener("click", listarTarefas);
