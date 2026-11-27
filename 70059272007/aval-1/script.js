
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Salvar tarefas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") return;

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
});

// Renderizar tarefas
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Editar";

        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.append(editButton, deleteButton);

        li.append(checkbox, span, actions);

        taskList.appendChild(li);
    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    updateStatistics();
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

// Editar tarefa
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const newText = prompt("Editar tarefa:", task.text);

    if (newText === null) return;

    if (newText.trim() === "") {
        alert("A tarefa não pode ficar vazia.");
        return;
    }

    task.text = newText.trim();

    saveTasks();
    renderTasks();
}

// Excluir tarefa
function deleteTask(id) {
    const confirmDelete = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// Atualizar estatísticas
function updateStatistics() {
    totalTasks.textContent = tasks.length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;
}

// Filtros
document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelector(".filter.active")
            .classList.remove("active");

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

// Inicializar sistema
renderTasks();
