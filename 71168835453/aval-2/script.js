
let tarefas = [];
let codigo = 1;
let indiceSelecionado = -1;

// Pegando os elementos do HTML
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");

const btAdd = document.getElementById("btAdd");
const btConcluir = document.getElementById("btConcluir");
const btAlterar = document.getElementById("btAlterar");

const listaTarefas = document.getElementById("listaTarefas");

// Função para limpar os campos
function limparCampos() {
    titulo.value = "";
    prioridade.value = "";
    indiceSelecionado = -1;
}

// Função para mostrar as tarefas
function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa, indice) {

        const item = document.createElement("li");

        item.className = "item-tarefa";

        item.textContent =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        // Selecionar tarefa
        item.addEventListener("click", function() {

            indiceSelecionado = indice;

            titulo.value = tarefa.titulo;
            prioridade.value = tarefa.prioridade;

        });

        listaTarefas.appendChild(item);

    });
}

// Cadastrar tarefa
btAdd.addEventListener("click", function() {

    let nome = titulo.value.trim();
    let nivel = Number(prioridade.value);

    if (nome.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade.value === "" || ![1, 2, 3].includes(nivel)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: nome,
        prioridade: nivel,
        concluida: false
    };

    tarefas.push(tarefa);

    codigo++;

    mostrarTarefas();
    limparCampos();

    alert("Tarefa cadastrada com sucesso!");

});

// Marcar tarefa como concluída
btConcluir.addEventListener("click", function() {

    if (indiceSelecionado === -1) {
        alert("Selecione uma tarefa!");
        return;
    }

    tarefas[indiceSelecionado].concluida = true;

    mostrarTarefas();
    limparCampos();

    alert("Tarefa concluída com sucesso!");

});

// Alterar prioridade
btAlterar.addEventListener("click", function() {

    if (indiceSelecionado === -1) {
        alert("Selecione uma tarefa!");
        return;
    }

    let novaPrioridade = Number(prioridade.value);

    if (prioridade.value === "" || ![1, 2, 3].includes(novaPrioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    tarefas[indiceSelecionado].prioridade = novaPrioridade;

    mostrarTarefas();
    limparCampos();

    alert("Prioridade alterada com sucesso!");

});
