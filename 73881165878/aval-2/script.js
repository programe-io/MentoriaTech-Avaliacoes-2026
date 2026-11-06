let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;

    let titulo = document.getElementById("titulo").value;

    let prioridade = Number(document.getElementById("prioridade").value);

    if (!codigo || titulo.length < 5 || prioridade < 1 || prioridade > 3) {

        alert("Preencha os campos corretamente! O título deve ter pelo menos 5 caracteres.");

        return;

    }

    if (tarefas.some(t => t.codigo === codigo)) {

        alert("Código já cadastrado!");

        return;

    }

    tarefas.push({

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    });

    alert("Tarefa cadastrada com sucesso!");

    listarTarefas();

}

function listarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        let div = document.createElement("div");

        div.className = "tarefa";

        let texto = document.createElement("p");

        texto.textContent =

            "Código: " + tarefa.codigo +

            " | Título: " + tarefa.titulo +

            " | Prioridade: " + tarefa.prioridade +

            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        div.appendChild(texto);

        let botao = document.createElement("button");

        botao.textContent = "Marcar como concluída";

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

    let codigo = document.getElementById("codigoAlterar").value;

    let prioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {

        alert("Tarefa não encontrada!");

        return;

    }

    if (prioridade < 1 || prioridade > 3) {

        alert("Escolha uma prioridade entre 1 e 3!");

        return;

    }

    tarefa.prioridade = prioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();

}