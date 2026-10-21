
let tarefas = [];

function cadastrarTarefa() {
    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (!codigo || !titulo) {
        alert("Preencha todos os campos!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        alert("Prioridade inválida! Digite um valor entre 1 e 3.");
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
    document.getElementById("prioridade").value = "1";

    listarTarefas();
}

function listarTarefas() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (tarefas.length === 0) {
        resultado.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    let prioridades = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    tarefas.forEach(tarefa => {
        let div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let titulo = document.createElement("p");
        titulo.textContent = "Título: " + tarefa.titulo;

        let prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + prioridades[tarefa.prioridade];

        let status = document.createElement("p");
        status.textContent = "Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        status.className = tarefa.concluida
            ? "status-concluida"
            : "status-pendente";

        div.append(codigo, titulo, prioridade, status);
        resultado.appendChild(div);
    });
}

function concluirTarefa() {
    let codigo = document.getElementById("codigoAlterar").value.trim();

    if (!codigo) {
        alert("Digite o código da tarefa!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Essa tarefa já está concluída!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}

function alterarPrioridade() {
    let codigo = document.getElementById("codigoAlterar").value.trim();

    let novaPrioridade = Number(
        document.getElementById("novaPrioridade").value
    );

    if (!codigo) {
        alert("Digite o código da tarefa!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}
