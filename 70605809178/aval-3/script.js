
let tarefas = [];

function adicionarTarefa() {
    let campo = document.getElementById("tarefa");

    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push(texto);

    campo.value = "";

    renderizarTarefas();
}

function removerTarefa() {
    if (tarefas.length === 0) {
        alert("Não existem tarefas para remover!");
        return;
    }

    tarefas.pop();

    renderizarTarefas();
}

function renderizarTarefas() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        let item = document.createElement("li");

        item.textContent = tarefa;

        lista.appendChild(item);
    });

    document.getElementById("contador").textContent =
        "Total de tarefas: " + tarefas.length;
}
