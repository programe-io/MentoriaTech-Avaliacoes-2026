
let tarefas = [];

function adicionarTarefa() {
    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (!codigo || !titulo || !prioridade) {
        alert("Preencha todos os campos!");
        return;
    }

    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Esse código já existe!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    mostrarTarefas();
}

function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.prioridade}</td>
            <td class="${tarefa.status === "Concluída" ? "concluida" : "pendente"}">
                ${tarefa.status}
            </td>
            <td>
                <button class="concluir" onclick="concluirTarefa(${indice})">
                    Concluir
                </button>

                <button class="excluir" onclick="excluirTarefa(${indice})">
                    Excluir
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });

    document.getElementById("contador").textContent =
        "Total de tarefas: " + tarefas.length +
        " | Concluídas: " +
        tarefas.filter(t => t.status === "Concluída").length;
}

function concluirTarefa(indice) {
    tarefas[indice].status = "Concluída";
    mostrarTarefas();
}

function excluirTarefa(indice) {
    if (confirm("Deseja excluir esta tarefa?")) {
        tarefas.splice(indice, 1);
        mostrarTarefas();
    }
}

mostrarTarefas();
