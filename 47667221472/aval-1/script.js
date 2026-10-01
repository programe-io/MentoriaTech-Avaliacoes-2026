const input = document.getElementById("tarefaInput");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

let tarefas = [];

function adicionarTarefa() {
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = {
        texto: texto,
        concluida: false
    };

    tarefas.push(tarefa);

    input.value = "";

    atualizarLista();
}

function atualizarLista() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const texto = document.createElement("span");
        texto.textContent = tarefa.texto;

        texto.onclick = function () {
            tarefas[index].concluida = !tarefas[index].concluida;
            atualizarLista();
        };

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");

        botaoExcluir.onclick = function () {
            tarefas.splice(index, 1);
            atualizarLista();
        };

        item.appendChild(texto);
        item.appendChild(botaoExcluir);

        lista.appendChild(item);
    });

    contador.textContent = `Tarefas: ${tarefas.length}`;
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});