let tarefas = [];

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;

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

    formulario.reset();
    mostrarTarefas();
});

function mostrarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const item = document.createElement("li");

        if (tarefa.status === "Concluída") {
            item.classList.add("concluida");
        }

        const informacoes = document.createElement("span");
        informacoes.textContent =
            `Código: ${tarefa.codigo} | Título: ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} | Status: ${tarefa.status}`;

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.className = "concluir";

        botaoConcluir.addEventListener("click", function() {
            tarefa.status = "Concluída";
            mostrarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function() {
            tarefas.splice(indice, 1);
            mostrarTarefas();
        });

        item.appendChild(informacoes);
        item.appendChild(botaoConcluir);
        item.appendChild(botaoExcluir);

        lista.appendChild(item);
    });
}