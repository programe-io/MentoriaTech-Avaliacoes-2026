/ Gera um código diferente para cada tarefa
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

// Lista de tarefas
const tarefas = [
    { id: gerarCodigo(), titulo: "Montar o slide de apresentação do trabalho", concluida: true },
    { id: gerarCodigo(), titulo: "Estudar JavaScript", concluida: false }
];

// Elementos do HTML
const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("input-titulo");
const listaTarefas = document.getElementById("lista-tarefas");

// Mostra as tarefas na página
function render() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa) {
        const item = document.createElement("li");
        item.textContent = tarefa.titulo;

        if (tarefa.concluida) {
            item.style.textDecoration = "line-through";
            item.classList.add("concluida");
        }

        listaTarefas.appendChild(item);
    });
}

// Adiciona uma tarefa ao enviar o formulário
formTarefa.addEventListener("submit", function (event) {
    event.preventDefault();

    const novoTitulo = inputTitulo.value.trim();

    if (novoTitulo === "") {
        return;
    }

    const novaTarefa = {
        id: gerarCodigo(),
        titulo: novoTitulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    inputTitulo.value = "";
    render();
});

// Mostra as tarefas iniciais
render();
