
const STORAGE_KEY = "taskflow_tasks";

let tasks = loadTasks();

// ELEMENTOS
const taskForm = document.getElementById("taskForm");
const taskId = document.getElementById("taskId");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const sortFilter = document.getElementById("sortFilter");

const submitButton = document.getElementById("submitButton");
const cancelEdit = document.getElementById("cancelEdit");

// LOCALSTORAGE
function loadTasks() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed) ? parsed.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.completed === "boolean" &&
            ["baixa", "media", "alta"].includes(task.priority)
        ) : [];

    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        alert("Não foi possível salvar as tarefas no navegador.");
        console.error(error);
    }
}

// CADASTRAR E EDITAR
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (!title) {
        alert("Digite o título da tarefa!");
        return;
    }

    const id = taskId.value;

    if (id) {
        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            alert("Tarefa não encontrada.");
            resetForm();
            return;
        }

        tasks[index] = {
            ...tasks[index],
            title,
            description: taskDescription.value.trim(),
            priority: taskPriority.value,
            date: taskDate.value
        };

    } else {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            description: taskDescription.value.trim(),
            priority: taskPriority.value,
            date: taskDate.value,
            completed: false,
            createdAt: Date.now()
        };

        tasks.unshift(newTask);
    }

    saveTasks();
    resetForm();
    renderTasks();
});

// LIMPAR FORMULÁRIO
function resetForm() {
    taskForm.reset();
    taskId.value = "";

    submitButton.textContent = "+ Adicionar tarefa";
    cancelEdit.classList.add("hidden");

    document.getElementById("formTitle").textContent =
        "Adicionar nova tarefa";
}

// CANCELAR EDIÇÃO
cancelEdit.addEventListener("click", resetForm);

// EDITAR TAREFA
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    taskId.value = task.id;
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskDate.value = task.date || "";

    submitButton.textContent = "Salvar alterações";
    cancelEdit.classList.remove("hidden");

    document.getElementById("formTitle").textContent =
        "Editar tarefa";

    taskTitle.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// CONCLUIR TAREFA
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

// EXCLUIR TAREFA
function deleteTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const confirmDelete = confirm(
        `Deseja excluir a tarefa "${task.title}"?`
    );

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    if (taskId.value === id) {
        resetForm();
    }

    saveTasks();
    renderTasks();
}

// EXCLUIR TAREFAS CONCLUÍDAS
document.getElementById("deleteCompleted")
    .addEventListener("click", function() {

        const completedCount = tasks.filter(
            task => task.completed
        ).length;

        if (!completedCount) {
            alert("Não existem tarefas concluídas.");
            return;
        }

        if (!confirm(
            `Deseja excluir ${completedCount} tarefa(s) concluída(s)?`
        )) return;

        tasks = tasks.filter(task => !task.completed);

        saveTasks();
        renderTasks();
    });

// FILTROS
searchInput.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
priorityFilter.addEventListener("change", renderTasks);
sortFilter.addEventListener("change", renderTasks);

// FORMATAR DATA SEM PROBLEMAS DE FUSO HORÁRIO
function formatDate(date) {
    if (!date) return "Sem prazo";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
}

function isOverdue(task) {
    if (!task.date || task.completed) return false;

    const today = new Date();

    const localToday =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return task.date < localToday;
}

// FILTRAR E ORDENAR
function getFilteredTasks() {
    let filtered = [...tasks];

    const search = searchInput.value.toLowerCase().trim();
    const status = statusFilter.value;
    const priority = priorityFilter.value;
    const sort = sortFilter.value;

    // Pesquisa
    if (search) {
        filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search)
        );
    }

    // Status
    if (status === "pendente") {
        filtered = filtered.filter(task => !task.completed);
    }

    if (status === "concluida") {
        filtered = filtered.filter(task => task.completed);
    }

    // Prioridade
    if (priority !== "todas") {
        filtered = filtered.filter(
            task => task.priority === priority
        );
    }

    // Ordenação
    if (sort === "recentes") {
        filtered.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (sort === "antigas") {
        filtered.sort((a, b) => a.createdAt - b.createdAt);
    }

    if (sort === "prioridade") {
        const levels = {
            alta: 3,
            media: 2,
            baixa: 1
        };

        filtered.sort(
            (a, b) => levels[b.priority] - levels[a.priority]
        );
    }

    if (sort === "vencimento") {
        filtered.sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;

            return a.date.localeCompare(b.date);
        });
    }

    return filtered;
}

// RENDERIZAR TAREFAS
function renderTasks() {
    const filtered = getFilteredTasks();

    taskList.replaceChildren();

    emptyMessage.classList.toggle(
        "hidden",
        filtered.length > 0
    );

    filtered.forEach(task => {
        const card = document.createElement("article");

        card.className =
            `task-card priority-${task.priority}`;

        if (task.completed) {
            card.classList.add("completed");
        }

        const content = document.createElement("div");
        content.className = "task-content";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent =
            task.description || "Sem descrição";

        const meta = document.createElement("div");
        meta.className = "task-meta";

        const priorityTag = document.createElement("span");
        priorityTag.className = `tag ${task.priority}`;

        const priorityNames = {
            alta: "Alta prioridade",
            media: "Média prioridade",
            baixa: "Baixa prioridade"
        };

        priorityTag.textContent = priorityNames[task.priority];

        const dateTag = document.createElement("span");
        dateTag.className = "tag";
        dateTag.textContent = `Prazo: ${formatDate(task.date)}`;

        if (isOverdue(task)) {
            dateTag.classList.add("overdue");
            dateTag.textContent += " (Atrasada)";
        }

        const statusTag = document.createElement("span");
        statusTag.className = "tag";
        statusTag.textContent = task.completed
            ? "Concluída"
            : "Pendente";

        meta.append(priorityTag, dateTag, statusTag);

        content.append(title, description, meta);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-button";
        completeButton.textContent = task.completed
            ? "Reabrir"
            : "Concluir";

        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.textContent = "Editar";

        editButton.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.append(
            completeButton,
            editButton,
            deleteButton
        );

        card.append(content, actions);
        taskList.appendChild(card);
    });

    updateStats();
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

    document.getElementById("progress").textContent =
        `${percentage}%`;
}

// INICIALIZAÇÃO
renderTasks();
