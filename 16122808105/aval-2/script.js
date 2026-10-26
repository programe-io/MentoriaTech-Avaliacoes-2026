```javascript
let tarefas = [];

function mostrarMensagem(texto) {
    document.getElementById("mensagem").textContent = texto;
}

function cadastrarTarefa() {
    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (!codigo || titulo.length < 5) {
        mostrarMensagem("Informe o código e um título com pelo menos 5 caracteres.");
        return;
    }

    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        mostrarMensagem("Já existe uma tarefa com esse código.");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    listarTarefas();
    mostrarMensagem("Tarefa cadastrada com sucesso!");
}

function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.replaceChildren();

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {
        const item = document.createElement("div");
        item.className = tarefa.concluida ? "tarefa concluida" : "tarefa";

        const detalhes = document.createElement("p");
        detalhes.textContent =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        item.appendChild(detalhes);

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";
        botaoConcluir.disabled = tarefa.concluida;
        botaoConcluir.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        item.appendChild(botaoConcluir);

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        item.appendChild(botaoPrioridade);
        lista.appendChild(item);
    });
}

function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
    mostrarMensagem("Tarefa marcada como concluída!");
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.");
        return;
    }

    const entrada = prompt("Digite a nova prioridade: 1 (alta), 2 (média) ou 3 (baixa).");

    if (entrada === null) {
        return;
    }

    const novaPrioridade = Number(entrada);

    if (!["1", "2", "3"].includes(entrada.trim())) {
        mostrarMensagem("Prioridade inválida. Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
    mostrarMensagem("Prioridade alterada com sucesso!");
}

listarTarefas();
```