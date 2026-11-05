
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const clearAll = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Salvar tarefas no LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Atualizar a tela
function renderTasks() {
    taskList.innerHTML = "";

    const search = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(search);

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty">Nenhuma tarefa encontrada.</p>';
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("done");
        }

        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        // Botão concluir
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Desfazer" : "Concluir";
        completeBtn.className = "complete-btn";

        completeBtn.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        // Botão editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.className = "edit-btn";

        editBtn.onclick = () => {
            const newText = prompt("Editar tarefa:", task.text);

            if (newText && newText.trim()) {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        // Botão excluir
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = () => {
            if (confirm("Deseja excluir esta tarefa?")) {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            }
        };

        actions.append(completeBtn, editBtn, deleteBtn);
        li.append(span, actions);
        taskList.appendChild(li);
    });

    // Atualizar contadores
    document.getElementById("total").textContent = tasks.length;

    document.getElementById("pending").textContent =
        tasks.filter(t => !t.completed).length;

    document.getElementById("completed").textContent =
        tasks.filter(t => t.completed).length;
}

// Adicionar tarefa
taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    saveTasks();
    taskInput.value = "";
    renderTasks();
});

// Pesquisar tarefas
searchInput.addEventListener("input", renderTasks);

// Filtros
document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        renderTasks();
    });
});

// Excluir todas as tarefas
clearAll.addEventListener("click", () => {
    if (tasks.length === 0) return;

    if (confirm("Deseja excluir todas as tarefas?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// Carregar tarefas ao abrir a página
renderTasks();
