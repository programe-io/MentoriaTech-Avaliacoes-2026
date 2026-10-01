// =========================
// ELEMENTOS DO DOM
// =========================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompleted = document.getElementById("clearCompleted");
const emptyMessage = document.getElementById("emptyMessage");

// =========================
// ARMAZENAMENTO
// =========================

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

// =========================
// SALVAR TAREFAS
// =========================

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// =========================
// RENDERIZAR TAREFAS
// =========================

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach((task) => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        // Texto
        const span = document.createElement("span");

        span.className = "task-text";
        span.textContent = task.text;

        // Botão excluir
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "🗑";

        deleteButton.title = "Excluir tarefa";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateCounter();
}

// =========================
// ADICIONAR TAREFA
// =========================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Digite uma tarefa antes de adicionar.");
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskInput.focus();
});

// =========================
// CONCLUIR TAREFA
// =========================

function toggleTask(id) {

    tasks = tasks.map((task) => {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();
}

// =========================
// EXCLUIR TAREFA
// =========================

function deleteTask(id) {

    tasks = tasks.filter(
        (task) => task.id !== id
    );

    saveTasks();

    renderTasks();
}

// =========================
// LIMPAR CONCLUÍDAS
// =========================

clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(
        (task) => !task.completed
    );

    saveTasks();

    renderTasks();
});

// =========================
// CONTADOR
// =========================

function updateCounter() {

    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    const pending = total - completed;

    if (total === 0) {
        taskCounter.textContent = "0 tarefas";
        return;
    }

    taskCounter.textContent =
        `${pending} pendente${pending !== 1 ? "s" : ""} • ` +
        `${completed} concluída${completed !== 1 ? "s" : ""}`;
}

// =========================
// INICIALIZAÇÃO
// =========================

renderTasks();