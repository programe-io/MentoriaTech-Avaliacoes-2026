
const STORAGE_KEY = "gerenciador_tarefas_v1";

const taskForm = document.getElementById("taskForm");
const taskId = document.getElementById("taskId");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");

const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const sortTasks = document.getElementById("sortTasks");

const cancelEdit = document.getElementById("cancelEdit");
const submitButton = document.getElementById("submitButton");
const deleteCompleted = document.getElementById("deleteCompleted");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = loadTasks();
let currentFilter = "todas";

// Carregar tarefas do LocalStorage
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

// Salvar tarefas
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        alert("Não foi possível salvar. Verifique o espaço disponível no navegador.");
        console.error(error);
    }
}

// Atualizar estatísticas
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
}

// Criar tarefa
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (!title) {
        alert("Informe o título da tarefa.");
        return;
    }

    const id = taskId.value;

    if (id) {
        const index = tasks.findIndex(task => task.id === id);

        if (index !== -1) {
            tasks[index] = {
                ...tasks[index],
                title,
                description: taskDescription.value.trim(),
                priority: taskPriority.value,
                date: taskDate.value
            };
        }
    } else {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            description: taskDescription.value.trim(),
            priority: taskPriority.value,
            date: taskDate.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask);
    }

    saveTasks();
    resetForm();
    renderTasks();
});

// Restaurar formulário
function resetForm() {
    taskForm.reset();
    taskId.value = "";
    taskPriority.value = "media";

    submitButton.textContent = "Adicionar tarefa";
    document.getElementById("formTitle").textContent = "Adicionar tarefa";

    cancelEdit.classList.add("hidden");
}

// Editar tarefa
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    taskId.value = task.id;
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskDate.value = task.date;

    submitButton.textContent = "Salvar alterações";
    document.getElementById("formTitle").textContent = "Editar tarefa";

    cancelEdit.classList.remove("hidden");

    taskTitle.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cancelar edição
cancelEdit.addEventListener("click", resetForm);

// Concluir ou reabrir tarefa
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

// Excluir tarefa
function deleteTask(id) {
    const confirmed = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmed) return;

    tasks = tasks.filter(task => task.id !== id);

    if (taskId.value === id) {
        resetForm();
    }

    saveTasks();
    renderTasks();
}

// Excluir tarefas concluídas
deleteCompleted.addEventListener("click", function() {
    const completed = tasks.filter(task => task.completed).length;

    if (completed === 0) {
        alert("Não existem tarefas concluídas.");
        return;
    }

    if (!confirm(`Deseja excluir ${completed} tarefa(s) concluída(s)?`)) {
        return;
    }

    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    renderTasks();
});

// Formatar data
function formatDate(date) {
    if (!date) return "Sem prazo";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

// Obter tarefas filtradas
function getFilteredTasks() {
    const search = searchTask.value.toLowerCase().trim();

    let filtered = tasks.filter(task => {
        const matchesSearch =
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search);

        const matchesFilter =
            currentFilter === "todas" ||
            (currentFilter === "pendentes" && !task.completed) ||
            (currentFilter === "concluidas" && task.completed);

        return matchesSearch && matchesFilter;
    });

    const priorityOrder = {
        alta: 3,
        media: 2,
        baixa: 1
    };

    switch (sortTasks.value) {
        case "recentes":
            filtered.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;

        case "antigas":
            filtered.sort((a, b) =>
                new Date(a.createdAt) - new Date(b.createdAt)
            );
            break;

        case "prioridade":
            filtered.sort((a, b) =>
                priorityOrder[b.priority] - priorityOrder[a.priority]
            );
            break;

        case "vencimento":
            filtered.sort((a, b) => {
                if (!a.date) return 1;
                if (!b.date) return -1;
                return a.date.localeCompare(b.date);
            });
            break;
    }

    return filtered;
}

// Renderizar tarefas
function renderTasks() {
    taskList.innerHTML = "";

    const filtered = getFilteredTasks();

    emptyMessage.style.display =
        filtered.length === 0 ? "block" : "none";

    filtered.forEach(task => {
        const card = document.createElement("article");

        card.className = `task-card priority-${task.priority}`;

        if (task.completed) {
            card.classList.add("completed");
        }

        const content = document.createElement("div");
        content.className = "task-content";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description || "Sem descrição";

        const meta = document.createElement("div");
        meta.className = "task-meta";

        const priority = document.createElement("span");
        priority.className = "priority-label";
        priority.textContent = `Prioridade: ${task.priority}`;

        const date = document.createElement("span");
        date.textContent = `Prazo: ${formatDate(task.date)}`;

        if (task.date && !task.completed) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dueDate = new Date(task.date + "T00:00:00");

            if (dueDate < today) {
                date.textContent += " · ATRASADA";
                date.style.color = "#dc2626";
                date.style.fontWeight = "bold";
            }
        }

        meta.append(priority, date);
        content.append(title, description, meta);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "btn-action btn-check";
        completeButton.textContent = task.completed ? "Reabrir" : "Concluir";
        completeButton.addEventListener("click", () => toggleTask(task.id));

        const editButton = document.createElement("button");
        editButton.className = "btn-action";
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => editTask(task.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn-action btn-delete";
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actions.append(completeButton, editButton, deleteButton);

        card.append(content, actions);
        taskList.appendChild(card);
    });

    updateStats();
}

// Filtros
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".filter-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");
        currentFilter = this.dataset.filter;

        renderTasks();
    });
});

// Pesquisa em tempo real
searchTask.addEventListener("input", renderTasks);

// Ordenação
sortTasks.addEventListener("change", renderTasks);

// Atualizar quando a página abrir
renderTasks();
