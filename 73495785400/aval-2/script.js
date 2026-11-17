
let tarefas = [];

function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    if (!codigo || titulo.length < 5 || prioridade === "") {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
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

    tarefas.forEach(tarefa => {
        lista.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.prioridade}</td>
                <td>${tarefa.concluida ? "Concluída" : "Pendente"}</td>
            </tr>
        `;
    });
}

function concluir() {
    let codigo = Number(document.getElementById("codigoConcluir").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");
    listar();
}

function alterarPrioridade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let prioridade = document.getElementById("novaPrioridade").value;

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (prioridade === "") {
        alert("Selecione uma prioridade!");
        return;
    }

    tarefa.prioridade = Number(prioridade);

    alert("Prioridade alterada com sucesso!");
    listar();
}
