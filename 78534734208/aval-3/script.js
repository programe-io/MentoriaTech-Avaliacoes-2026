
document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS PRINCIPAIS
  const taskList = document.getElementById("taskList");
  const taskDialog = document.getElementById("taskDialog");
  const projectDialog = document.getElementById("projectDialog");
  const taskForm = document.getElementById("taskForm");
  const projectForm = document.getElementById("projectForm");
  const activityList = document.getElementById("activityList");

  const taskCount = document.getElementById("taskCount");
  const pendingCount = document.getElementById("pendingCount");
  const completedCount = document.getElementById("completedCount");
  const projectCount = document.getElementById("projectCount");
  const emptyTasks = document.getElementById("emptyTasks");

  let completedTasks = 128;

  // ATUALIZAR ESTATÍSTICAS
  function updateStats() {
    const tasks = [...taskList.querySelectorAll(".task-item")];
    const pending = tasks.filter(
      task => !task.classList.contains("completed")
    ).length;

    taskCount.textContent = pending;
    pendingCount.textContent = pending;
    completedCount.textContent = completedTasks;
    projectCount.textContent =
      document.querySelectorAll(".project-card").length;

    emptyTasks.hidden = pending !== 0;
  }

  // REGISTRAR UMA ATIVIDADE RECENTE
  function addActivity(message) {
    const article = document.createElement("article");
    article.className = "activity-item";

    const icon = document.createElement("span");
    icon.className = "activity-icon";

    const iconElement = document.createElement("i");
    iconElement.className = "bx bx-check-circle";
    icon.appendChild(iconElement);

    const content = document.createElement("div");
    const description = document.createElement("p");
    description.textContent = message;

    const time = document.createElement("span");
    time.className = "activity-time";
    time.textContent = "Agora";

    content.append(description, time);
    article.append(icon, content);
    activityList.prepend(article);
  }

  // CONCLUIR OU REABRIR UMA TAREFA
  function toggleTask(task) {
    const wasCompleted = task.classList.contains("completed");
    const checkButton = task.querySelector(".task-check");
    const icon = checkButton.querySelector("i");
    const title = task.querySelector(".task-title").textContent;

    task.classList.toggle("completed", !wasCompleted);

    if (wasCompleted) {
      icon.className = "bx bx-circle";
      checkButton.setAttribute("aria-label", "Concluir tarefa");
      addActivity(`Você reabriu a tarefa: ${title}`);
    } else {
      icon.className = "bx bx-check-circle";
      checkButton.setAttribute("aria-label", "Reabrir tarefa");
      completedTasks++;
      addActivity(`Você concluiu a tarefa: ${title}`);
    }

    if (wasCompleted) {
      completedTasks = Math.max(0, completedTasks - 1);
    }

    updateStats();
  }

  // CONFIGURAR OS BOTÕES DE UMA TAREFA
  function configureTask(task) {
    const checkButton = task.querySelector(".task-check");
    const moreButton = task.querySelector(".more-button");

    checkButton.addEventListener("click", () => {
      toggleTask(task);
    });

    moreButton.addEventListener("click", () => {
      const title = task.querySelector(".task-title").textContent;

      if (confirm(`Deseja excluir a tarefa "${title}"?`)) {
        task.remove();
        updateStats();
        addActivity(`Tarefa removida: ${title}`);
      }
    });
  }

  // CONFIGURAR AS TAREFAS QUE JÁ EXISTEM NO HTML
  taskList.querySelectorAll(".task-item").forEach(configureTask);

  // ABRIR FORMULÁRIO DE NOVA TAREFA
  document.getElementById("newTaskBtn").addEventListener("click", () => {
    taskForm.reset();
    taskDialog.showModal();
    document.getElementById("taskTitleInput").focus();
  });

  // MOSTRAR APENAS AS TAREFAS
  function showTasks() {
    document.body.classList.add("tasks-view");

    document.querySelectorAll(".nav-button[data-view]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.view === "tasks"
      );
    });

    document.getElementById("tasksPanel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // VOLTAR PARA A VISÃO GERAL
  function showOverview() {
    document.body.classList.remove("tasks-view");

    document.querySelectorAll(".nav-button[data-view]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.view === "overview"
      );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // NAVEGAÇÃO DO MENU LATERAL
  document.querySelectorAll(".nav-button[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.view === "tasks") {
        showTasks();
      } else {
        showOverview();
      }
    });
  });

  document.getElementById("viewAllTasks").addEventListener("click", showTasks);

  // CRIAR NOVA TAREFA
  taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const titleInput = document.getElementById("taskTitleInput");
    const priorityInput = document.getElementById("taskPriorityInput");

    const title = titleInput.value.trim();
    const priority = priorityInput.value;

    if (!title) {
      titleInput.focus();
      return;
    }

    const task = document.createElement("article");
    task.className = "task-item";

    const checkButton = document.createElement("button");
    checkButton.className = "task-check";
    checkButton.setAttribute("aria-label", "Concluir tarefa");

    const checkIcon = document.createElement("i");
    checkIcon.className = "bx bx-circle";
    checkButton.appendChild(checkIcon);

    const info = document.createElement("div");
    info.className = "task-info";

    const taskTitle = document.createElement("p");
    taskTitle.className = "task-title";
    taskTitle.textContent = title;

    const meta = document.createElement("div");
    meta.className = "task-meta";

    const date = document.createElement("span");
    const dateIcon = document.createElement("i");
    dateIcon.className = "bx bx-calendar";
    date.append(dateIcon, document.createTextNode(" Hoje"));

    const priorityBadge = document.createElement("span");
    priorityBadge.className = "priority";

    if (priority === "Média") {
      priorityBadge.classList.add("medium");
    }

    if (priority === "Baixa") {
      priorityBadge.classList.add("low");
    }

    priorityBadge.textContent = priority;
    meta.append(date, priorityBadge);
    info.append(taskTitle, meta);

    const moreButton = document.createElement("button");
    moreButton.className = "more-button";
    moreButton.setAttribute("aria-label", "Excluir tarefa");

    const moreIcon = document.createElement("i");
    moreIcon.className = "bx bx-dots-horizontal-rounded";
    moreButton.appendChild(moreIcon);

    task.append(checkButton, info, moreButton);
    taskList.prepend(task);

    configureTask(task);
    taskDialog.close();
    taskForm.reset();

    updateStats();
    addActivity(`Nova tarefa criada: ${title}`);
  });

  // ABRIR FORMULÁRIO DE NOVO PROJETO
  function openProjectDialog() {
    projectForm.reset();
    projectDialog.showModal();
    document.getElementById("projectTitleInput").focus();
  }

  document.getElementById("newProjectBtn")
    .addEventListener("click", openProjectDialog);

  document.getElementById("quickProjectBtn")
    .addEventListener("click", openProjectDialog);

  // CRIAR PROJETO
  projectForm.addEventListener("submit", event => {
    event.preventDefault();

    const titleInput = document.getElementById("projectTitleInput");
    const descriptionInput =
      document.getElementById("projectDescriptionInput");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
      titleInput.focus();
      return;
    }

    const card = document.createElement("article");
    card.className = "project-card";

    const heading = document.createElement("div");
    heading.className = "project-heading";

    const icon = document.createElement("span");
    icon.className = "project-icon";

    const folderIcon = document.createElement("i");
    folderIcon.className = "bx bx-folder";
    icon.appendChild(folderIcon);

    const info = document.createElement("div");
    info.className = "project-info";

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = title;

    const projectDescription = document.createElement("p");
    projectDescription.textContent = description || "Novo projeto";

    info.append(projectTitle, projectDescription);
    heading.append(icon, info);

    const progressHeading = document.createElement("div");
    progressHeading.className = "progress-heading";

    const progressLabel = document.createElement("span");
    progressLabel.textContent = "Progresso";

    const progressValue = document.createElement("strong");
    progressValue.textContent = "0%";

    progressHeading.append(progressLabel, progressValue);

    const track = document.createElement("div");
    track.className = "progress-track";

    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = "0%";
    track.appendChild(fill);

    const footer = document.createElement("div");
    footer.className = "project-footer";

    const members = document.createElement("span");
    members.textContent = "1 membro";

    const duration = document.createElement("span");
    duration.textContent = "Novo";

    footer.append(members, duration);

    card.append(heading, progressHeading, track, footer);

    document.getElementById("projectList").prepend(card);

    projectDialog.close();
    projectForm.reset();

    updateStats();
    addActivity(`Novo projeto criado: ${title}`);
  });

  // FECHAR JANELAS
  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.close).close();
    });
  });

  // FECHAR JANELA AO CLICAR FORA DO FORMULÁRIO
  [taskDialog, projectDialog].forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });

  // NOTIFICAÇÕES
  document.getElementById("notificationBtn").addEventListener("click", () => {
    alert("Você está em dia com suas notificações!");
  });

  // PERFIL DO USUÁRIO
  document.getElementById("userBtn").addEventListener("click", () => {
    alert("Perfil do usuário: Aluno");
  });

  // CONFIGURAÇÕES
  document.getElementById("settingsBtn").addEventListener("click", () => {
    alert("Configurações do ProductivityHub");
  });

  // NÚMEROS INICIAIS
  updateStats();
});
