const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const limparBtn = document.getElementById("limparBtn");

let tarefas = [];

// Adicionar tarefa
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

    atualizarLista();
}

// Mostrar tarefas
function atualizarLista() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const li = document.createElement("li");

        li.classList.add("tarefa");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        li.innerHTML = `
            <div class="tarefa-conteudo">

                <input
                    type="checkbox"
                    ${tarefa.concluida ? "checked" : ""}
                    onchange="alternarTarefa(${tarefa.id})"
                >

                <span class="tarefa-texto">
                    ${tarefa.texto}
                </span>

            </div>

            <button
                class="excluir"
                onclick="excluirTarefa(${tarefa.id})"
            >
                Excluir
            </button>
        `;

        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

// Marcar como concluída
function alternarTarefa(id) {

    tarefas = tarefas.map(function(tarefa) {

        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
        }

        return tarefa;
    });

    atualizarLista();
}

// Excluir tarefa
function excluirTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    atualizarLista();
}

// Limpar tarefas concluídas
limparBtn.addEventListener("click", function() {

    tarefas = tarefas.filter(function(tarefa) {
        return !tarefa.concluida;
    });

    atualizarLista();
});

// Contador
function atualizarContador() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(function(tarefa) {
        return tarefa.concluida;
    }).length;

    contador.textContent =
        `${total} tarefa${total !== 1 ? "s" : ""} | ${concluidas} concluída${concluidas !== 1 ? "s" : ""}`;
}

// Botão adicionar
adicionarBtn.addEventListener("click", adicionarTarefa);

// Adicionar pressionando Enter
tarefaInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarTarefa();
    }

});
