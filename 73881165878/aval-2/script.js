

let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value.trim();

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = document.getElementById("prioridade").value;

    if (codigo === "" || titulo.length < 5 || prioridade === "") {

        alert("Preencha corretamente! O título deve ter pelo menos 5 caracteres.");

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

    alert("Tarefa cadastrada!");

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";

    listarTarefas();

}

function listarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.textContent = "Nenhuma tarefa cadastrada.";

        return;

    }

    tarefas.forEach(tarefa => {

        let div = document.createElement("div");

        div.className = "tarefa";

        let texto = document.createElement("p");

        texto.textContent =

            "Código: " + tarefa.codigo +

            " | Título: " + tarefa.titulo +

            " | Prioridade: " + tarefa.prioridade +

            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        if (tarefa.concluida) {

            texto.className = "concluida";

        }

        div.appendChild(texto);

        let botao = document.createElement("button");

        botao.textContent = tarefa.concluida

            ? "Concluída"

            : "Marcar como Concluída";

        botao.disabled = tarefa.concluida;

        botao.onclick = function() {

            concluirTarefa(tarefa.codigo);

        };

        div.appendChild(botao);

        lista.appendChild(div);

    });

}

function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.concluida = true;

        alert("Tarefa concluída!");

        listarTarefas();

    }

}

function alterarPrioridade() {

    let codigo = document.getElementById("codigoAlterar").value.trim();

    let prioridade = document.getElementById("novaPrioridade").value;

    if (codigo === "" || prioridade === "") {

        alert("Preencha os campos!");

        return;

    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {

        alert("Tarefa não encontrada!");

        return;

    }

    tarefa.prioridade = Number(prioridade);

    alert("Prioridade alterada!");

    document.getElementById("codigoAlterar").value = "";

    document.getElementById("novaPrioridade").value = "";

    listarTarefas();

}