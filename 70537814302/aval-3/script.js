
const input = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const limparBtn = document.getElementById("limparBtn");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function atualizar() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        texto.addEventListener("click", () => {
            tarefas[index].concluida =
                !tarefas[index].concluida;

            salvar();
            atualizar();
        });

        const excluir = document.createElement("button");
        excluir.textContent = "X";
        excluir.className = "excluir";

        excluir.addEventListener("click", () => {
            tarefas.splice(index, 1);
            salvar();
            atualizar();
        });

        li.appendChild(texto);
        li.appendChild(excluir);

        lista.appendChild(li);
    });

    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    contador.textContent =
        `${pendentes} tarefas pendentes`;
}

function adicionarTarefa() {
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        nome: nome,
        concluida: false
    });

    input.value = "";

    salvar();
    atualizar();
}

adicionarBtn.addEventListener("click", adicionarTarefa);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

limparBtn.addEventListener("click", () => {
    tarefas = tarefas.filter(
        tarefa => !tarefa.concluida
    );

    salvar();
    atualizar();
});

atualizar();
