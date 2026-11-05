
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Salvar tarefas no LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = taskInput.value.trim();

    if (!description) return;

    const task = {
        id: Date.now(),
        description: description,
        date: taskDate.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskForm.reset();
});

// Renderizar tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";

    const search = searchInput.value.toLowerCase();
    const selectedFilter = filter.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.description
            .toLowerCase()
            .includes(search);

        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "pending" && !task.completed) ||
            (selectedFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML =
            '<li class="empty">Nenhuma tarefa encontrada.</li>';
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("done");
        }

        // Informações da tarefa
        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("strong");
        title.textContent = task.description;

        const date = document.createElement("small");
        date.textContent = task.date
            ? "Vencimento: " + task.date
            : "Sem data definida";

        info.appendChild(title);
        info.appendChild(date);

        // Botões de ação
        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "↩" : "✓";
        completeBtn.title = "Concluir ou reabrir";
        completeBtn.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏";
        editBtn.className = "edit";
        editBtn.title = "Editar tarefa";
        editBtn.addEventListener("click", () => {
            editTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete";
        deleteBtn.title = "Excluir tarefa";
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.append(
            completeBtn,
            editBtn,
            deleteBtn
        );

        li.append(info, actions);
        taskList.appendChild(li);
    });

    updateCounters();
}

// Concluir ou reabrir tarefa
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

    if (!task) return;

    const newDescription = prompt(
        "Digite o novo nome da tarefa:",
        task.description
    );

    if (newDescription === null) return;

    if (!newDescription.trim()) {
        alert("O nome da tarefa não pode ficar vazio!");
        return;
    }

    const newDate = prompt(
        "Digite a nova data (AAAA-MM-DD) ou deixe vazio:",
        task.date
    );

    if (newDate === null) return;

    if (newDate && !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
        alert("Data inválida! Utilize AAAA-MM-DD.");
        return;
    }

    task.description = newDescription.trim();
    task.date = newDate;

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

// Excluir todas as tarefas concluídas
document.getElementById("clearCompleted")
    .addEventListener("click", function() {

        const completedTasks = tasks.some(task => task.completed);

        if (!completedTasks) {
            alert("Não existem tarefas concluídas.");
            return;
        }

        if (confirm("Deseja excluir todas as tarefas concluídas?")) {
            tasks = tasks.filter(task => !task.completed);

            saveTasks();
            renderTasks();
        }
    });

// Atualizar contadores
function updateCounters() {
    document.getElementById("total").textContent = tasks.length;

    document.getElementById("pending").textContent =
        tasks.filter(task => !task.completed).length;

    document.getElementById("completed").textContent =
        tasks.filter(task => task.completed).length;
}

// Filtros e pesquisa
filter.addEventListener("change", renderTasks);

searchInput.addEventListener("input", renderTasks);

// Carregar tarefas ao abrir a página
renderTasks();
