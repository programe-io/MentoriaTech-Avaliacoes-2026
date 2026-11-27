
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const emptyMessage = document.getElementById("emptyMessage");

const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Salvar tarefas no navegador
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

// Marcar como concluída
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
function filterTasks(filter) {
    currentFilter = filter;

    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderTasks();
}

// Mostrar tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkButton = document.createElement("button");
        checkButton.className = "check-button";
        checkButton.textContent = task.completed ? "✓" : "";
        checkButton.setAttribute(
            "aria-label",
            task.completed ? "Desmarcar tarefa" : "Concluir tarefa"
        );

        checkButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.appendChild(checkButton);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    // Atualizar informações
    const completed = tasks.filter(task => task.completed).length;

    taskCount.textContent =
        `${tasks.length} ${tasks.length === 1 ? "tarefa" : "tarefas"}`;

    completedCount.textContent = `${completed} concluídas`;

    // Mostrar mensagem quando não houver tarefas
    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";
}

// Eventos
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterTasks(button.dataset.filter);
    });
});

// Inicializar sistema
renderTasks();
