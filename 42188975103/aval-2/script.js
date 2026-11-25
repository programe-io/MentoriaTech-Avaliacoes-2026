let tarefas = [];
let proximoCodigo = 1;

function cadastrar() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    tarefas.push({
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    });

    alert("Tarefa cadastrada!");
}

function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        let item = document.createElement("li");

        item.textContent = `Código: ${tarefa.codigo} | 
        Título: ${tarefa.titulo} | 
        Prioridade: ${tarefa.prioridade} | 
        Status: ${tarefa.status}`;

        lista.appendChild(item);
    });
}

function concluir() {
    let codigo = Number(document.getElementById("codigo").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.status = "Concluída";
        alert("Tarefa concluída!");
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {
    let codigo = Number(document.getElementById("codigo").value);
    let prioridade = Number(document.getElementById("novaPrioridade").value);

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = prioridade;
        alert("Prioridade alterada!");
    } else {
        alert("Tarefa não encontrada!");
    }
}