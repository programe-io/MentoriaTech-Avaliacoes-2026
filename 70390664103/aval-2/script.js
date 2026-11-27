
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "todas";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority");
    const date = document.getElementById("dateInput");

    const title = input.value.trim();

    if (!title) {
        alert("Digite o nome da tarefa!");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        priority: priority.value,
        date: date.value,
        completed: false
    };

    tasks.push(task);

    input.value = "";
    date.value = "";

    saveTasks();
    renderTasks();
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
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

    const newTitle = prompt(
        "Digite o novo nome da tarefa:",
        task.title
    );

    if (newTitle === null || !newTitle.trim()) return;

    task.title = newTitle.trim();

    saveTasks();
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;

    document.querySelectorAll(".filter").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderTasks();
}

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
    });
});

document.getElementById("searchInput").addEventListener(
    "input",
    renderTasks
);

function renderTasks() {
    const list = document.getElementById("taskList");
    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    let filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(search)
    );

    if (currentFilter === "pendentes") {
        filtered = filtered.filter(task => !task.completed);
    }

    if (currentFilter === "concluidas") {
        filtered = filtered.filter(task => task.completed);
    }

    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty">
                <h3>Nenhuma tarefa encontrada!</h3>
                <p>Adicione uma tarefa para começar.</p>
            </div>
        `;
    }

    filtered.forEach(task => {
        const item = document.createElement("div");

        item.className = "task-item";

        if (task.completed) {
            item.classList.add("done");
        }

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const details = document.createElement("p");
        details.textContent = task.date
            ? "Vencimento: " + task.date
            : "Sem data definida";

        const priority = document.createElement("span");
        priority.className = "priority " + task.priority;

        const priorityNames = {
            baixa: "Prioridade baixa",
            media: "Prioridade média",
            alta: "Prioridade alta"
        };

        priority.textContent = priorityNames[task.priority];

        info.append(title, details, priority);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const complete = document.createElement("button");
        complete.className = "complete-btn";
        complete.textContent = task.completed ? "↩️" : "✅";
        complete.title = "Concluir ou reabrir tarefa";
        complete.addEventListener("click", () => completeTask(task.id));

        const edit = document.createElement("button");
        edit.className = "edit-btn";
        edit.textContent = "✏️";
        edit.title = "Editar tarefa";
        edit.addEventListener("click", () => editTask(task.id));

        const remove = document.createElement("button");
        remove.className = "delete-btn";
        remove.textContent = "🗑️";
        remove.title = "Excluir tarefa";
        remove.addEventListener("click", () => deleteTask(task.id));

        actions.append(complete, edit, remove);
        item.append(info, actions);

        list.appendChild(item);
    });

    updateDashboard();
}

function updateDashboard() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("progress").style.width =
        percentage + "%";
}

renderTasks();
