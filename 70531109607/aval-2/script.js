const tarefaForm = document.getElementById("tarefaForm");
const listaTarefas = document.getElementById("listaTarefas");

let tarefas = [];

tarefaForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const materia = document.getElementById("materia").value.trim();
    const prazo = document.getElementById("prazo").value;

    if (!titulo || !materia || !prazo) {
        alert("Preencha todos os campos!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        materia: materia,
        prazo: prazo,
        concluida: false
    };

    tarefas.push(tarefa);

    mostrarTarefas();
    tarefaForm.reset();
});

function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {
        const div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const materia = document.createElement("p");
        materia.textContent = "Matéria: " + tarefa.materia;

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " + tarefa.prazo;

        const concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        concluir.addEventListener("click", function() {
            tarefa.concluida = !tarefa.concluida;
            mostrarTarefas();
        });

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", function() {
            tarefas = tarefas.filter(function(item) {
                return item.id !== tarefa.id;
            });

            mostrarTarefas();
        });

        div.append(titulo, materia, prazo, concluir, excluir);
        listaTarefas.appendChild(div);
    });
}

mostrarTarefas();