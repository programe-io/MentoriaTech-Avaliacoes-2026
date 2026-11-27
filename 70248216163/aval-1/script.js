
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
}

function addTask(event) {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) return;

    const task = {
        id: Date.now(),
        title: title,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskForm.reset();
}

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

function deleteTask(id) {
    if (!confirm("Deseja excluir esta tarefa?")) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const newTitle = prompt("Editar tarefa:", task.title);

    if (newTitle === null) return;

    const title = newTitle.trim();

    if (!title) {
        alert("O nome da tarefa não pode ficar vazio.");
        return;
    }

    task.title = title;

    saveTasks();
    renderTasks();
}

function renderTasks() {
    const filter = filterTasks.value;

    let filteredTasks = tasks;

    if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <p class="empty">Nenhuma tarefa encontrada.</p>
        `;
    }

    filteredTasks.forEach(task => {
        const item = document.createElement("div");

        item.className = `task-item ${task.completed ? "completed" : ""}`;

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const details = document.createElement("p");

        let dateText = "Sem prazo";

        if (task.date) {
            const [year, month, day] = task.date.split("-");
            dateText = `${day}/${month}/${year}`;
        }

        details.textContent = `Prazo: ${dateText}`;

        const priority = document.createElement("span");
        priority.className = `priority ${task.priority}`;
        priority.textContent = task.priority;

        info.append(title, details);

        const actions = document.createElement("div");
        actions.className = "actions";

        const finishButton = document.createElement("button");
        finishButton.className = "finish-btn";
        finishButton.textContent = task.completed ? "Reabrir" : "Concluir";
        finishButton.addEventListener("click", () => toggleTask(task.id));

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => editTask(task.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actions.append(finishButton, editButton, deleteButton);

        item.append(info, priority, actions);

        taskList.appendChild(item);
    });

    updateDashboard();
}

taskForm.addEventListener("submit", addTask);

filterTasks.addEventListener("change", renderTasks);

renderTasks();
