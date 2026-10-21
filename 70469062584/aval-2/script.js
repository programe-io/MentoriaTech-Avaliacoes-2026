
const formulario = document.getElementById("taskForm");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

let tarefas = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    const tituloErro = document.getElementById("tituloErro");
    const prioridadeErro = document.getElementById("prioridadeErro");

    tituloErro.textContent = "";
    prioridadeErro.textContent = "";

    if (titulo.length < 3) {
        tituloErro.textContent =
            "O título deve ter pelo menos 3 caracteres.";
        return;
    }

    if (!prioridade) {
        prioridadeErro.textContent =
            "Selecione uma prioridade.";
        return;
    }

    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade
    };

    tarefas.push(tarefa);

    mostrarTarefas();
    formulario.reset();
});

function mostrarTarefas() {
    listaTarefas.replaceChildren();

    if (tarefas.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(vazio);
    }

    tarefas.forEach(function(tarefa, indice) {
        const item = document.createElement("div");
        item.className = "tarefa";

        const titulo = document.createElement("strong");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");

        const nomesPrioridade = {
            "1": "Alta",
            "2": "Média",
            "3": "Baixa"
        };

        prioridade.textContent =
            "Prioridade: " + nomesPrioridade[tarefa.prioridade];

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.className = "btn btn-primary";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            tarefas.splice(indice, 1);
            mostrarTarefas();
        });

        item.appendChild(titulo);
        item.appendChild(codigo);
        item.appendChild(prioridade);
        item.appendChild(botaoExcluir);

        listaTarefas.appendChild(item);
    });

    contador.textContent =
        tarefas.length + (tarefas.length === 1
            ? " tarefa"
            : " tarefas");
}

mostrarTarefas();
