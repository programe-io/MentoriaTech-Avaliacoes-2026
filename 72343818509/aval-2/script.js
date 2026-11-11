
let tarefas = [];

function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("Prioridade inválida!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    tarefas.push({
        codigo,
        titulo,
        prioridade,
        concluida: false
    });

    alert("Tarefa cadastrada!");
}

function listar() {
    let resultado = "";

    tarefas.forEach(t => {
        resultado += `
            <p>
            Código: ${t.codigo}<br>
            Título: ${t.titulo}<br>
            Prioridade: ${t.prioridade}<br>
            Status: ${t.concluida ? "Concluída" : "Pendente"}
            </p><hr>
        `;
    });

    document.getElementById("resultado").innerHTML =
        resultado || "Nenhuma tarefa cadastrada.";
}

function concluir() {
    let codigo = Number(document.getElementById("codigoAlterar").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        alert("Tarefa concluída!");
    } else {
        alert("Tarefa não encontrada!");
    }
}

function alterarPrioridade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let prioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = prioridade;
        alert("Prioridade alterada!");
    } else {
        alert("Tarefa não encontrada!");
    }
}
