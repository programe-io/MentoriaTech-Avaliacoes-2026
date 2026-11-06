
// Recupera as tarefas salvas no navegador
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Elementos da página
const taskForm = document.getElementById("taskForm");
const taskCode = document.getElementById("taskCode");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

// Salva as tarefas no navegador
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Cadastra uma nova tarefa
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const code = taskCode.value.trim();
    const title = taskTitle.value.trim();
    const priority = Number(taskPriority.value);

    // Validação do código
    if (!code) {
        alert("Informe o código da tarefa!");
        return;
    }

    // Validação do título
    if (title.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validação da prioridade
    if (![1, 2, 3].includes(priority)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verifica se o código já existe
    if (tasks.some(task => task.code === code)) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    const newTask = {
        code: code,
        title: title,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskForm.reset();
    taskPriority.value = "2";

    alert("Tarefa cadastrada com sucesso!");
});

// Exibe as tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <p class="empty-state">
                Nenhuma tarefa cadastrada. Adicione sua primeira tarefa!
            </p>
        `;
    }

    tasks.forEach(task => {
        const card = document.createElement("div");

        card.className = task.completed
            ? "task-card completed"
            : "task-card";

        card.innerHTML = `
            <div class="task-info">
                <h3>${escapeHTML(task.title)}</h3>

                <p>Código: ${escapeHTML(task.code)}</p>

                <p>
                    Status:
                    ${task.completed ? "Concluída" : "Pendente"}
                </p>

                <span class="priority priority-${task.priority}">
                    Prioridade:
                    ${getPriorityName(task.priority)}
                </span>
            </div>

            <div class="task-actions">

                <button class="btn-complete" data-action="toggle">
                    ${task.completed ? "Reabrir" : "Concluir"}
                </button>

                <select data-action="priority"
                    aria-label="Alterar prioridade">
                    <option value="1" ${task.priority === 1 ? "selected" : ""}>
                        Alta
                    </option>
                    <option value="2" ${task.priority === 2 ? "selected" : ""}>
                        Média
                    </option>
                    <option value="3" ${task.priority === 3 ? "selected" : ""}>
                        Baixa
                    </option>
                </select>

                <button class="btn-delete" data-action="delete">
                    Excluir
                </button>

            </div>
        `;

        // Identifica a tarefa correspondente
        card.dataset.code = task.code;

        taskList.appendChild(card);
    });

    updateSummary();
}

// Retorna o nome da prioridade
function getPriorityName(priority) {
    const names = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return names[priority] || "Não definida";
}

// Protege a exibição dos textos inseridos
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

// Atualiza os números do resumo
function updateSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").textContent =
        "Total: " + total;

    document.getElementById("completedTasks").textContent =
        "Concluídas: " + completed;

    document.getElementById("pendingTasks").textContent =
        "Pendentes: " + pending;
}

// Controla as ações das tarefas
taskList.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const card = button.closest(".task-card");
    if (!card) return;

    const code = card.dataset.code;
    const task = tasks.find(task => task.code === code);

    if (!task) return;

    // Marcar como concluída ou reabrir
    if (button.dataset.action === "toggle") {
        task.completed = !task.completed;
    }

    // Excluir tarefa
    if (button.dataset.action === "delete") {
        const confirmed = confirm(
            "Tem certeza que deseja excluir esta tarefa?"
        );

        if (!confirmed) return;

        tasks = tasks.filter(task => task.code !== code);
    }

    saveTasks();
    renderTasks();
});

// Alterar prioridade da tarefa
taskList.addEventListener("change", function(event) {
    if (event.target.dataset.action !== "priority") {
        return;
    }

    const card = event.target.closest(".task-card");
    if (!card) return;

    const code = card.dataset.code;
    const newPriority = Number(event.target.value);

    const task = tasks.find(task => task.code === code);

    if (!task || ![1, 2, 3].includes(newPriority)) {
        return;
    }

    task.priority = newPriority;

    saveTasks();
    renderTasks();
});

// Carrega as tarefas quando abrir a página
renderTasks();
