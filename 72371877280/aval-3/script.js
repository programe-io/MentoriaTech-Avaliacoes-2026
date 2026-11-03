
// ======================================
// 3.01 - INTRODUÇÃO AO DOM
// ======================================

const taskForm = document.querySelector("#task-form");

const taskInput = document.querySelector("#task-input");

const taskList = document.querySelector("#task-list");

const taskCounter = document.querySelector("#task-counter");

const errorMessage = document.querySelector("#error-message");

const clearCompletedButton = document.querySelector("#clear-completed");

const clearAllButton = document.querySelector("#clear-all");


// ======================================
// 3.02 - EVENTOS NO JAVASCRIPT
// ======================================

// Array que armazena as tarefas.

let tasks = [];


// Evento de envio do formulário.

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    addTask();

});


// ======================================
// 3.03 - CRIAÇÃO E REMOÇÃO DE ELEMENTOS
// ======================================

function addTask() {

    const taskText = taskInput.value.trim();

    // Verifica se o campo está vazio.

    if (taskText === "") {

        errorMessage.textContent =
            "Digite uma tarefa antes de adicionar.";

        taskInput.focus();

        return;
    }

    // Cria um objeto para a tarefa.

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Adiciona a tarefa ao array.

    tasks.push(newTask);

    // Atualiza a lista na tela.

    renderTasks();

    // Limpa o campo.

    taskInput.value = "";

    errorMessage.textContent = "";

    taskInput.focus();

}


// ======================================
// 3.04 - CLASSES E ESTILOS VIA JAVASCRIPT
// ======================================

function renderTasks() {

    // Remove os elementos anteriores.

    taskList.innerHTML = "";

    // Percorre o array de tarefas.

    tasks.forEach(function(task) {

        // Cria um elemento li.

        const li = document.createElement("li");

        li.classList.add("task-item");

        // Adiciona classe se estiver concluída.

        if (task.completed) {

            li.classList.add("completed");

        }

        // Cria o texto da tarefa.

        const span = document.createElement("span");

        span.textContent = task.text;

        // Cria a área dos botões.

        const buttons = document.createElement("div");

        buttons.classList.add("task-buttons");

        // Botão de concluir.

        const completeButton = document.createElement("button");

        completeButton.textContent = task.completed
            ? "Desfazer"
            : "Concluir";

        completeButton.classList.add("complete-btn");

        completeButton.dataset.action = "complete";

        completeButton.dataset.id = task.id;

        // Botão de excluir.

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Excluir";

        deleteButton.classList.add("delete-btn");

        deleteButton.dataset.action = "delete";

        deleteButton.dataset.id = task.id;

        // Adiciona os botões ao elemento.

        buttons.appendChild(completeButton);

        buttons.appendChild(deleteButton);

        // Adiciona os elementos à tarefa.

        li.appendChild(span);

        li.appendChild(buttons);

        // Adiciona a tarefa à lista.

        taskList.appendChild(li);

    });

    updateCounter();

}


// ======================================
// 3.05 - INPUTS E VALIDAÇÃO SIMPLES
// ======================================

// Valida o campo enquanto o usuário digita.

taskInput.addEventListener("input", function() {

    errorMessage.textContent = "";

    if (taskInput.value.length > 80) {

        errorMessage.textContent =
            "A tarefa deve ter no máximo 80 caracteres.";

    }

});


// ======================================
// 3.06 - DELEGAÇÃO DE EVENTOS
// ======================================

// Um único evento controla os botões
// de todas as tarefas.

taskList.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    // Verifica se o clique foi em um botão.

    if (!button || !taskList.contains(button)) {

        return;

    }

    // Obtém os dados do botão.

    const action = button.dataset.action;

    const id = Number(button.dataset.id);

    // Verifica qual ação deve executar.

    if (action === "complete") {

        toggleTask(id);

    }

    if (action === "delete") {

        deleteTask(id);

    }

});


// ======================================
// 3.07 - ATRIBUTOS E DATASET
// ======================================

// Os atributos data-action e data-id
// identificam a ação e a tarefa.

// Alterna o estado da tarefa.

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    renderTasks();

}


// Remove uma tarefa.

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    renderTasks();

}


// ======================================
// 3.08 - ARRAYS E RENDERIZAÇÃO
// ======================================

function updateCounter() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    taskCounter.textContent =
        `${total} tarefas | ${completed} concluídas`;

}


// Remove todas as tarefas concluídas.

clearCompletedButton.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });

    renderTasks();

});


// Remove todas as tarefas.

clearAllButton.addEventListener("click", function() {

    if (tasks.length === 0) {

        return;

    }

    const confirmation = confirm(
        "Deseja realmente excluir todas as tarefas?"
    );

    if (confirmation) {

        tasks = [];

        renderTasks();

    }

});


// ======================================
// INICIALIZAÇÃO DO PROJETO
// ======================================

renderTasks();
