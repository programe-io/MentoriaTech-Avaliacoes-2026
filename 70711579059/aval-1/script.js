
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const emptyMessage = document.getElementById("emptyMessage");

const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Salvar tarefas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Excluir tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// Concluir tarefa
function toggleTask(id) {
    tasks = tasks.map(task => {
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

// Filtrar tarefas
function filterTasks() {
    if (currentFilter === "pending") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

// Atualizar contadores
function updateCounters() {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    totalTasks.textContent = `Total: ${tasks.length}`;
    completedTasks.textContent = `Concluídas: ${completed}`;
    pendingTasks.textContent = `Pendentes: ${pending}`;
}

// Mostrar tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = filterTasks();

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = task.completed
            ? "task completed"
            : "task";

        const content = document.createElement("div");
        content.className = "task-content";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        content.appendChild(checkbox);
        content.appendChild(span);

        li.appendChild(content);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    if (filteredTasks.length === 0 && tasks.length > 0) {
        emptyMessage.textContent = "Nenhuma tarefa encontrada.";
    } else {
        emptyMessage.textContent = "Nenhuma tarefa cadastrada.";
    }

    updateCounters();
}

// Eventos dos filtros
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

// Eventos de adicionar
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Inicializar sistema
renderTasks();
