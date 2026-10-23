// ===== ELEMENTOS DA PÁGINA =====
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

const newTaskButton = document.getElementById("newTaskButton");
const showAllTasksButton = document.getElementById("showAllTasks");
const newProjectButton = document.getElementById("newProjectButton");

const projectsGrid = document.getElementById("projectsGrid");
const notificationButton = document.getElementById("notificationButton");
const settingsButton = document.getElementById("settingsButton");

let completedTasks = 128;
let showCompletedTasks = true;

// ===== ATUALIZAR CONTADORES =====
function updateCounters() {
    const tasks = taskList.querySelectorAll(".task-item");
    const pendingTasks = taskList.querySelectorAll(
        ".task-item:not(.completed)"
    );

    taskCount.textContent = pendingTasks.length;
    completedCount.textContent = completedTasks;

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <p class="empty-message">
                Nenhuma tarefa cadastrada.
            </p>
        `;
    }
}

// ===== CRIAR UMA TAREFA =====
function createTask() {
    const taskName = prompt("Digite o nome da nova tarefa:");

    if (!taskName || taskName.trim() === "") {
        return;
    }

    const task = document.createElement("article");
    task.className = "task-item";

    const checkButton = document.createElement("button");
    checkButton.className = "task-check";
    checkButton.setAttribute("aria-label", "Concluir tarefa");

    checkButton.innerHTML = `
        <i class="bx bx-radio-circle"></i>
    `;

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const name = document.createElement("p");
    name.className = "task-name";
    name.textContent = taskName.trim();

    const metadata = document.createElement("div");
    metadata.className = "task-meta";

    const date = document.createElement("span");
    date.innerHTML = `
        <i class="bx bx-calendar"></i>
        Hoje
    `;

    const priority = document.createElement("span");
    priority.className = "priority";
    priority.innerHTML = `
        <i class="bx bx-flag"></i>
        normal
    `;

    metadata.append(date, priority);
    taskInfo.append(name, metadata);

    const moreButton = document.createElement("button");
    moreButton.className = "more-button";
    moreButton.setAttribute("aria-label", "Remover tarefa");

    moreButton.innerHTML = `
        <i class="bx bx-trash"></i>
    `;

    task.append(checkButton, taskInfo, moreButton);

    taskList.appendChild(task);

    updateCounters();
}

// ===== CONCLUIR OU REABRIR TAREFA =====
taskList.addEventListener("click", function (event) {
    const checkButton = event.target.closest(".task-check");

    if (!checkButton) {
        return;
    }

    const task = checkButton.closest(".task-item");

    if (!task) {
        return;
    }

    const wasCompleted = task.classList.contains("completed");

    task.classList.toggle("completed");

    const icon = checkButton.querySelector("i");

    if (task.classList.contains("completed")) {
        icon.className = "bx bx-check-circle";

        if (!wasCompleted) {
            completedTasks++;
        }
    } else {
        icon.className = "bx bx-radio-circle";

        completedTasks = Math.max(0, completedTasks - 1);
    }

    updateCounters();
});

// ===== REMOVER TAREFA =====
taskList.addEventListener("click", function (event) {
    const removeButton = event.target.closest(".more-button");

    if (!removeButton) {
        return;
    }

    const task = removeButton.closest(".task-item");

    if (!task) {
        return;
    }

    const wasCompleted = task.classList.contains("completed");

    const confirmed = confirm(
        "Deseja realmente remover esta tarefa?"
    );

    if (!confirmed) {
        return;
    }

    if (wasCompleted) {
        completedTasks = Math.max(0, completedTasks - 1);
    }

    task.remove();
    updateCounters();
});

// ===== BOTÃO NOVA TAREFA =====
newTaskButton.addEventListener("click", createTask);

// ===== VER TODAS AS TAREFAS =====
showAllTasksButton.addEventListener("click", function () {
    showCompletedTasks = !showCompletedTasks;

    const tasks = taskList.querySelectorAll(".task-item");

    tasks.forEach(function (task) {
        if (showCompletedTasks) {
            task.hidden = false;
        } else {
            task.hidden = task.classList.contains("completed");
        }
    });

    showAllTasksButton.textContent = showCompletedTasks
        ? "Ver pendentes"
        : "Ver todas";
});

// ===== CRIAR NOVO PROJETO =====
newProjectButton.addEventListener("click", function () {
    const projectName = prompt("Digite o nome do novo projeto:");

    if (!projectName || projectName.trim() === "") {
        return;
    }

    const project = document.createElement("article");
    project.className = "project-card";

    const heading = document.createElement("div");
    heading.className = "project-heading";

    const icon = document.createElement("div");
    icon.className = "project-icon";
    icon.innerHTML = `<i class="bx bx-folder"></i>`;

    const info = document.createElement("div");
    info.className = "project-info";

    const title = document.createElement("h3");
    title.textContent = projectName.trim();

    const description = document.createElement("p");
    description.textContent = "Novo projeto";

    info.append(title, description);
    heading.append(icon, info);

    const progressHeading = document.createElement("div");
    progressHeading.className = "progress-heading";

    const progressLabel = document.createElement("span");
    progressLabel.textContent = "Progresso";

    const progressValue = document.createElement("strong");
    progressValue.textContent = "0%";

    progressHeading.append(progressLabel, progressValue);

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressFill.style.width = "0%";

    progressBar.appendChild(progressFill);

    const footer = document.createElement("div");
    footer.className = "project-footer";

    const members = document.createElement("span");
    members.innerHTML = `
        <i class="bx bx-group"></i>
        1 membro
    `;

    const duration = document.createElement("span");
    duration.textContent = "Novo";

    footer.append(members, duration);

    project.append(
        heading,
        progressHeading,
        progressBar,
        footer
    );

    projectsGrid.appendChild(project);
});

// ===== NAVEGAÇÃO DO MENU =====
const navigationItems = document.querySelectorAll(".nav-item");

navigationItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navigationItems.forEach(function (navItem) {
            navItem.classList.remove("active");
        });

        item.classList.add("active");

        const view = item.dataset.view;

        if (view === "tasks") {
            taskList.querySelectorAll(".task-item").forEach(function (task) {
                task.hidden = task.classList.contains("completed");
            });

            showCompletedTasks = false;
            showAllTasksButton.textContent = "Ver todas";

            taskList.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        } else {
            taskList.querySelectorAll(".task-item").forEach(function (task) {
                task.hidden = false;
            });

            showCompletedTasks = true;
            showAllTasksButton.textContent = "Ver pendentes";

            document.querySelector(".statistics-section").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ===== NOTIFICAÇÕES =====
notificationButton.addEventListener("click", function () {
    alert("Você não tem novas notificações.");
});

// ===== CONFIGURAÇÕES =====
settingsButton.addEventListener("click", function () {
    alert("Área de configurações em desenvolvimento.");
});

// ===== INICIALIZAÇÃO =====
updateCounters();