
const taskList = document.getElementById("taskList");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");

const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskDate = document.getElementById("taskDate");

const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editingId = null;

// SALVAR NO LOCALSTORAGE
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ABRIR MODAL
function openModal() {
    taskForm.reset();
    editingId = null;

    document.getElementById("modalTitle").textContent = "Nova tarefa";
    taskModal.classList.add("show");
    taskName.focus();
}

// FECHAR MODAL
function closeModal() {
    taskModal.classList.remove("show");
    taskForm.reset();
    editingId = null;
}

// ADICIONAR OU EDITAR TAREFA
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskName.value.trim();
    const description = taskDescription.value.trim();
    const date = taskDate.value;

    if (!name) return;

    if (editingId !== null) {
        const task = tasks.find(t => t.id === editingId);

        task.name = name;
        task.description = description;
        task.date = date;

    } else {
        const newTask = {
            id: Date.now(),
            name,
            description,
            date,
            completed: false
        };

        tasks.unshift(newTask);
    }

    saveTasks();
    renderTasks();
    closeModal();
});

// EXCLUIR TAREFA
function deleteTask(id) {
    if (!confirm("Deseja realmente excluir esta tarefa?")) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// EDITAR TAREFA
function editTask(id) {
    const task = tasks.find(t => t.id === id);

    if (!task) return;

    editingId = id;

    taskName.value = task.name;
    taskDescription.value = task.description;
    taskDate.value = task.date || "";

    document.getElementById("modalTitle").textContent = "Editar tarefa";

    taskModal.classList.add("show");
}

// CONCLUIR TAREFA
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

// ATUALIZAR ESTATÍSTICAS
function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    const percentage = total
        ? Math.round((completed / total) * 100)
        : 0;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("progress").textContent = percentage + "%";
}

// RENDERIZAR TAREFAS
function renderTasks() {
    taskList.innerHTML = "";

    const search = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.name.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search);

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(task => {

        const element = document.createElement("div");

        element.className = `task ${task.completed ? "completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Concluir tarefa");

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.name;

        const description = document.createElement("p");
        description.textContent = task.description || "Sem descrição.";

        info.append(title, description);

        if (task.date) {
            const date = document.createElement("small");
            date.className = "date";

            const [year, month, day] = task.date.split("-");

            date.textContent = `Entrega: ${day}/${month}/${year}`;

            info.appendChild(date);
        }

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "✎";
        editButton.title = "Editar";
        editButton.setAttribute("aria-label", "Editar tarefa");

        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✕";
        deleteButton.title = "Excluir";
        deleteButton.setAttribute("aria-label", "Excluir tarefa");

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.append(editButton, deleteButton);

        element.append(checkbox, info, actions);

        taskList.appendChild(element);
    });

    updateStats();
}

// FILTROS
function changeFilter(filter) {
    currentFilter = filter;

    document.querySelectorAll("[data-filter]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderTasks();
}

// EVENTOS DOS FILTROS
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        changeFilter(button.dataset.filter);
    });
});

// PESQUISA
searchInput.addEventListener("input", renderTasks);

// EVENTOS DO MODAL
document.getElementById("openModal").addEventListener("click", openModal);

document.getElementById("closeModal").addEventListener("click", closeModal);

document.getElementById("cancelModal").addEventListener("click", closeModal);

taskModal.addEventListener("click", event => {
    if (event.target === taskModal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// INICIALIZAÇÃO
renderTasks();
