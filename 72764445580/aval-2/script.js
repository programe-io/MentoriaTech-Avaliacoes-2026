let tarefas = [];
let geradorDeCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return false;
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3.");
        return false;
    }

    return true;
}

// Função para cadastrar uma tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (!validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    let tarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigo) {

    return tarefas.find(tarefa => tarefa.codigo === codigo);

}

// Função para listar as tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {

        let div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa concluida"
            : "tarefa";

        let titulo = document.createElement("strong");
        titulo.textContent = tarefa.titulo;

        let informacoes = document.createElement("p");

        informacoes.textContent =
            "Código: " + tarefa.codigo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.status ? "Concluída" : "Pendente");

        div.appendChild(titulo);
        div.appendChild(informacoes);

        lista.appendChild(div);

    });
}

// Função para concluir uma tarefa
function concluirTarefa() {

    let codigo = Number(
        document.getElementById("codigo").value
    );

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.status = true;

    alert("Tarefa concluída com sucesso!");

    listarTarefas();
}

// Função para alterar a prioridade
function alterarPrioridade() {

    let codigo = Number(
        document.getElementById("codigo").value
    );

    let novaPrioridade = Number(
        document.getElementById("novaPrioridade").value
    );

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (!validarDadosDaTarefa(tarefa.titulo, novaPrioridade)) {
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}