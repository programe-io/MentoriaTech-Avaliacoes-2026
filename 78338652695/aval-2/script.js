
const campoTarefa = document.getElementById("campoTarefa");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const aviso = document.getElementById("aviso");

function atualizarContador() {
    const tarefas = listaTarefas.querySelectorAll("li");
    const concluidas = listaTarefas.querySelectorAll(".concluida");

    contador.textContent =
        `Tarefas concluídas: ${concluidas.length} de ${tarefas.length}`;
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        aviso.textContent = "Digite uma tarefa antes de adicionar!";
        campoTarefa.focus();
        return;
    }

    aviso.textContent = "";

    const item = document.createElement("li");
    const nome = document.createElement("span");
    const concluir = document.createElement("button");
    const excluir = document.createElement("button");

    nome.textContent = texto;

    concluir.textContent = "Concluir";
    concluir.className = "concluir";

    excluir.textContent = "Excluir";
    excluir.className = "excluir";

    concluir.addEventListener("click", function () {
        nome.classList.toggle("concluida");

        concluir.textContent = nome.classList.contains("concluida")
            ? "Desfazer"
            : "Concluir";

        atualizarContador();
    });

    excluir.addEventListener("click", function () {
        item.remove();
        atualizarContador();
    });

    item.appendChild(nome);
    item.appendChild(concluir);
    item.appendChild(excluir);

    listaTarefas.appendChild(item);

    campoTarefa.value = "";
    campoTarefa.focus();

    atualizarContador();
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

atualizarContador();
