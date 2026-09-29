const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");

const total = document.getElementById("total");
const concluidas = document.getElementById("concluidas");

let tarefas = [];

function adicionarTarefa() {

    const texto = tarefaInput.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefas.push(tarefa);

    tarefaInput.value = "";

    mostrarTarefas();
}

function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const li = document.createElement("li");

        li.classList.add("tarefa");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        const texto = document.createElement("span");

        texto.textContent = tarefa.texto;

        texto.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.classList.add("excluir");

        botaoExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        li.appendChild(texto);
        li.appendChild(botaoExcluir);

        listaTarefas.appendChild(li);
    });

    atualizarInformacoes();
}

function concluirTarefa(id) {

    tarefas.forEach(function(tarefa) {

        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }

    });

    mostrarTarefas();
}

function excluirTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    mostrarTarefas();
}

function atualizarInformacoes() {

    total.textContent = tarefas.length;

    const quantidadeConcluidas = tarefas.filter(function(tarefa) {
        return tarefa.concluida;
    }).length;

    concluidas.textContent = quantidadeConcluidas;
}

adicionarBtn.addEventListener("click", adicionarTarefa);

tarefaInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        adicionarTarefa();
    }

});