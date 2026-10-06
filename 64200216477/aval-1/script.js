const input = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const limparBtn = document.getElementById("limparBtn");

let tarefas = [];

function atualizarContador() {
    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;

    contador.textContent =
        pendentes === 1
            ? "1 tarefa pendente"
            : `${pendentes} tarefas pendentes`;
}

function mostrarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        li.innerHTML = `
            <label class="tarefa">
                <input type="checkbox" ${tarefa.concluida ? "checked" : ""}>
                <span>${tarefa.nome}</span>
            </label>
            <button class="excluir">Excluir</button>
        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {
            tarefas[index].concluida = checkbox.checked;
            mostrarTarefas();
        });

        const excluir = li.querySelector(".excluir");

        excluir.addEventListener("click", () => {
            tarefas.splice(index, 1);
            mostrarTarefas();
        });

        lista.appendChild(li);
    });

    atualizarContador();
}

function adicionarTarefa() {
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    tarefas.push({
        nome: nome,
        concluida: false
    });

    input.value = "";
    input.focus();

    mostrarTarefas();
}

adicionarBtn.addEventListener("click", adicionarTarefa);

input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

limparBtn.addEventListener("click", () => {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);
    mostrarTarefas();
});

mostrarTarefas();
