
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Salvar tarefas no navegador
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
function addTask(text) {
    const task = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();
}

// Concluir ou desmarcar tarefa
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

// Excluir tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

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

// Atualizar estatísticas
function updateDashboard() {
    totalTasks.textContent = tasks.length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;
}

// Mostrar tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = filterTasks();

    if (filteredTasks.length === 0) {
        const message = document.createElement("p");
        message.className = "empty";

        if (tasks.length === 0) {
            message.textContent = "Nenhuma tarefa cadastrada.";
        } else {
            message.textContent = "Nenhuma tarefa encontrada.";
        }

        taskList.appendChild(message);
    }

    filteredTasks.forEach(task => {
        const taskElement = document.createElement("div");

        taskElement.className = task.completed
            ? "task completed"
            : "task";

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const text = document.createElement("span");
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskInfo.appendChild(checkbox);
        taskInfo.appendChild(text);

        taskElement.appendChild(taskInfo);
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });

    updateDashboard();
}

// Evento de adicionar
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    addTask(text);

    taskInput.value = "";
    taskInput.focus();
});

// Eventos dos filtros
document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter").forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});

// Inicializar sistema
renderTasks();
