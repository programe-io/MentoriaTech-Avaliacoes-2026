function adicionarTarefa() {
    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(document.getElementById("prioridade").value);

    try {
        cadastrarTarefa(titulo, prioridade);

        document.getElementById("titulo").value = "";

        mostrarTarefas();
    } catch (erro) {
        alert(erro.message);
    }
}

function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const div = document.createElement("div");

        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <strong>${tarefa.descricao}</strong><br>
            Código: ${tarefa.codigo}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${tarefa.status ? "Pendente" : "Concluída"}
            <br><br>

            ${
                tarefa.status
                ? `<button onclick="concluirTarefa(${tarefa.codigo}); mostrarTarefas();">
                    Concluir
                   </button>`
                : ""
            }
        `;

        lista.appendChild(div);
    });
}